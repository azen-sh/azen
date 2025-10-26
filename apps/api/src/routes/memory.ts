import { Hono} from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { createDb, schema, sql, eq, desc } from "db";
import { randomUUID } from "crypto";
import { embeddingsQueue } from "../queue/embedding-queue";
import { deleteMemoryVectors } from "../lib/vector";

const router = new Hono();

const MemoryInputSchema = z.object({
    text: z.string().min(1),
    dedupKey: z.string().optional(),
});

const { memory, embeddingJob } = schema;

router.post("/", async (c) => {
    const userId = c.get('userId');
    const db = createDb()
    if(!userId) throw new HTTPException(401, { message: "Not authenticated" });

    const body = await c.req.json();
    const parsed = MemoryInputSchema.safeParse(body);
    if(!parsed.success) {
        return c.json({ error: 'Invalid Request', details: parsed.error.format() }, 400);
    };
    const { text, dedupKey } = parsed.data;

    if(dedupKey) {
        const [existing] = await db
        .select()
        .from(memory)
        .where(sql`(metadata->>'dedupKey') = ${dedupKey}`)
        .limit(1);

        if(existing) {
            return c.json({ ok: true, memoryId: existing.id, duplicated: true, });
        };
    };

    const memId = randomUUID();
    const [rec] = await db
    .insert(memory)
    .values({
        id: memId,
        userId,
        content: text,
        metadata: dedupKey ? { dedupKey } : null,
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
        text: rec.content,
        userId,
    }, {
        attempts: Number(process.env.DLQ_ATTEMPTS ?? 5),
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: 1000,
        removeOnFail: 10000,
    });

    return c.json({
        ok: true,
        memoryId: rec.id,
        createdAt: rec.createdAt,
        status: 'processing',
    }, 201);
});

router.get("/", async (c) => {
    const userId = c.get('userId');
    const db = createDb();
    if(!userId) throw new HTTPException(401, { message: "Not authenticated" });

    const page = Math.max(1, Number(c.req.query('page') ?? 1));
    const per = Math.min(Math.max(1, Number(c.req.query('per') ?? 20)), 100);

    const offset = (page - 1) * per;

    const items = await db
    .select({
        id: memory.id,
        content: memory.content,
        metadata: memory.metadata,
        createdAt: memory.createdAt,
        embedded: memory.embedded,
    })
    .from(memory)
    .where(eq(memory.userId, userId))
    .orderBy(desc(memory.createdAt))
    .offset(offset)
    .limit(per);
    return c.json ({ memories: items, page, per });
});

router.get('/:id', async(c) => {
    const userId = c.get('userId');
    const db = createDb();
    if(!userId) throw new HTTPException(401, { message: 'Not authenticated' });
    
    const memoryId = c.req.param('id');
    const [rec] = await db.select().from(memory).where(eq(memory.id, memoryId)).limit(1);
    if(!rec || rec.userId !== userId) return c.json({ error: 'Not found' }, 404);

    return c.json(rec);
});

router.delete("/:id", async(c) => {
    const userId = c.get('userId');
    const db = createDb();
    if(!userId) throw new HTTPException(401, { message: 'Not authenticated' });

    const memoryId = c.req.param('id');
    const [rec] = await db.select().from(memory).where(eq(memory.id, memoryId)).limit(1);
    if (!rec || rec.userId !== userId) return c.json({ error: 'Not found' }, 404);

    const namespace = `user-${rec.userId}`;

    try {
        await deleteMemoryVectors(rec.id, namespace);
    } catch (err) {
        console.error('Failed to delete vectors for memory', err);
        return c.json({ error: "failed to delete vectors" }, 500);
    };

    try {
    await db.transaction(async (tx) => {
        await tx.delete(embeddingJob).where(eq(embeddingJob.memoryId, memoryId));
        await tx.delete(memory).where(eq(memory.id, memoryId));
    });
    } catch (err) {
        console.error("Failed to delete memory row after deleting vectors", err);
        return c.json({ error: "Failed to delete memory record" }, 500);
    };

    return c.json({ ok: true });
});

export default router;