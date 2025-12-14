import { Hono} from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { db, schema, and, sql, eq, desc } from "db";
import { randomUUID } from "crypto";
import { embeddingsQueue } from "../queue/embedding-queue";
import { deleteMemoryVectors } from "../lib/vector";
import { decryptText, encryptText } from "../lib/encrypt";

const router = new Hono();

const MemoryInputSchema = z.object({
    text: z.string().min(1),
    dedupKey: z.string().optional().nullish(),
});

const MemoryIdSchema = z.uuid();

const { memory, embeddingJob } = schema;

router.post("/", async (c) => {
    const userId = c.get('userId');
    if(!userId) throw new HTTPException(401, { message: "Not authenticated" });

    let body;
    try {
        body = await c.req.json();
    } catch (e) {
        throw new HTTPException(400, { message: "Request body must be valid JSON" });
    };

    const parsed = MemoryInputSchema.safeParse(body);

    if(!parsed.success) {
        return c.json({
            status: "error",
            message: "Invalid request body",
            code: 400,
            details: parsed.error.format(),
        }, 400);
    };

    const { text, dedupKey } = parsed.data;
    const normalizedDedupKey = dedupKey ?? undefined;
    if(normalizedDedupKey) {
        const [existing] = await db
        .select()
        .from(memory)
        .where(sql`(metadata->>'dedupKey') = ${normalizedDedupKey}`)
        .limit(1);

        if(existing) {
            return c.json({ 
                status: "success", 
                memoryId: existing.id, 
                duplicated: true,
                message: "Memory already exists with this dedupKey"
            });
        }
    };

    const memId = randomUUID();
    const { ciphertext, iv, tag } = encryptText(text);

    const [rec] = await db
    .insert(memory)
    .values({
        id: memId,
        userId,
        encryptedContent: ciphertext,
        iv,
        tag,
        metadata: normalizedDedupKey ? { normalizedDedupKey } : null,
    }).returning();

    if(!rec) {
        throw new HTTPException(500, { message: "Failed to create memory record" });
    };

    const jobId = randomUUID();
    const [jobRec] = await db
    .insert(embeddingJob)
    .values({
        id: jobId,
        memoryId: rec.id,
        userId,
        status: "queued",
    }).returning();

    if(!jobRec) {
        throw new HTTPException(500, { message: "Failed to create embedding job record" });
    };

    await embeddingsQueue.add('embed', {
        jobId: jobRec.id,
        memoryId: rec.id,
        text: text,
        userId,
    }, {
        attempts: Number(process.env.DLQ_ATTEMPTS ?? 5),
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: 1000,
        removeOnFail: 1000,
    });

    return c.json({
        status: "success",
        memoryId: rec.id,
        createdAt: rec.createdAt,
        embedding: 'processing',
    }, 201);
});

router.get("/", async (c) => {
    const userId = c.get('userId');
    if(!userId) throw new HTTPException(401, { message: "Not authenticated" });

    const pageNum = Number(c.req.query('page') ?? 1);
    const page = isNaN(pageNum) ? 1 : Math.max(1, pageNum);

    const perNum = Number(c.req.query('per') ?? 20);
    const per = isNaN(perNum) ? 20 : Math.min(Math.max(1, perNum), 100);

    const offset = (page - 1) * per;

    const items = await db
    .select({
        id: memory.id,
        encryptedContent: memory.encryptedContent,
        iv: memory.iv,
        tag: memory.tag,
        metadata: memory.metadata,
        createdAt: memory.createdAt,
        embedded: memory.embedded,
    })
    .from(memory)
    .where(eq(memory.userId, userId))
    .orderBy(desc(memory.createdAt))
    .offset(offset)
    .limit(per);

    const memories = items.map((m) => ({
        id: m.id,
        content: decryptText(m.encryptedContent, m.iv, m.tag),
        metadata: m.metadata,
        createdAt: m.createdAt,
        embedded: m.embedded,
    }));
    
    return c.json({ 
        status: "success",
        memories, 
        page, 
        per 
    });
});

router.get('/:id', async(c) => {
    const userId = c.get('userId');
    if(!userId) throw new HTTPException(401, { message: 'Not authenticated' });
    
    const memoryId = c.req.param('id');
    const parsedId = MemoryIdSchema.safeParse(memoryId);

    if(!parsedId.success) {
        return c.json({
            status: "error",
            message: "Invalid memory Id",
            code: 400,
        }, 400);
    };

    const [rec] = await db
    .select()
    .from(memory)
    .where(
        and(
            eq(memory.id, memoryId),
            eq(memory.userId, userId)
        )
    )
    .limit(1);

    if(!rec) {
        return c.json({
            status: 'success',
            memory: null,
            message: 'Memory does not exist or was already deleted'
        }, 200);
    }; 

    const content = decryptText(rec.encryptedContent, rec.iv, rec.tag);

    return c.json({
        status: "success",
        memory: {
            id: rec.id,
            content,
            metadata: rec.metadata,
            creadetAt: rec.createdAt,
            embedded: rec.embedded,
        },
    }, 200);
});

router.delete("/:id", async(c) => {
    const userId = c.get('userId');
    if(!userId) throw new HTTPException(401, { message: 'Not authenticated' });

    const memoryId = c.req.param('id');
    const parsedId = MemoryIdSchema.safeParse(memoryId);
    
    if(!parsedId.success) {
        return c.json({
            status: "error",
            message: "Invalid memory Id",
            code: 400
        }, 400);
    };

    const [rec] = await db
    .select()
    .from(memory)
    .where(
        and(
            eq(memory.id, memoryId),
            eq(memory.userId, userId),
        )
    )
    .limit(1);
    if (!rec) {
        return c.json({
            status: "success",
            deleted: false,
            memoryId: memoryId,
            reason: 'memory_not_found',
            message: 'Memory does not exist or was already deleted'
        }, 200);
    };

    const namespace = `user-${rec.userId}`;

    try {
        await deleteMemoryVectors(rec.id, namespace);
    } catch (err) {
        console.error('Failed to delete vectors for memory', err);
        throw new HTTPException(500, { message: "Failed to delete vectors for memory" });
    };

    try {
        await db.delete(embeddingJob).where(eq(embeddingJob.memoryId, memoryId));
        await db.delete(memory).where(eq(memory.id, memoryId));
    } catch (err) {
        console.error("Failed to delete memory row after deleting vectors", err);
        throw new HTTPException(500, { message: 'Failed to delete memory record' });
    };

    return c.json({ 
        status: "success",
        deleted: true,
        memoryId,
        message: "Memory deleted successfully"
     }, 200);
});

export default router;