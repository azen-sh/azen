import { Hono} from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { prisma } from 'db';
import { embeddingsQueue } from "../queue/embedding-queue";
import { deleteMemoryVectors } from "../lib/vector";

const router = new Hono();

const MemoryInputSchema = z.object({
    text: z.string().min(1),
    dedupKey: z.string().optional(),
});

router.post("/", async (c) => {
    const userId = c.get('userId');
    if(!userId) throw new HTTPException(401, { message: "Not authenticated" });

    const body = await c.req.json();
    const parsed = MemoryInputSchema.safeParse(body);
    if(!parsed.success) {
        return c.json({ error: 'Invalid Request', details: parsed.error.format() }, 400);
    };
    const { text, dedupKey } = parsed.data;
    
    if(dedupKey) {
        const existing = await prisma.memory.findFirst({
            where: {
                userId,
                metadata: {
                    path: ['dedupKey'], equals: dedupKey,
                },
            },
        });
        if(existing) {
            return c.json({ ok: true, memoryId: existing.id, duplicated: true, });
        };
    };

    const rec = await prisma.memory.create({
        data: {
            userId,
            content: text,
            metadata: { dedupKey: dedupKey ?? null, },
        },
    });

    const jobRec = await prisma.embeddingJob.create({
        data: {
            memoryId: rec.id,
            userId,
            status: 'pending',
        },
    });

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
    if(!userId) throw new HTTPException(401, { message: "Not authenticated" });

    const page = Math.max(1, Number(c.req.query('page') ?? 1));
    const per = Math.min(Math.max(1, Number(c.req.query('per') ?? 20)), 100);

    const items = await prisma.memory.findMany({
        where: {
            userId,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * per,
        take: per,
        select: {
            id: true,
            content: true,
            metadata: true,
            createdAt: true,
            embedded: true,
        },
    });
    return c.json ({ memories: items, page, per });
});

router.get('/:id', async(c) => {
    const userId = c.get('userId');
    if(!userId) throw new HTTPException(401, { message: 'Not authenticated' });
    
    const memoryId = c.req.param('id');
    const rec = await prisma.memory.findUnique({ where: { id: memoryId, }, });
    if(!rec || rec.userId !== userId) return c.json({ error: 'Not found' }, 404);

    return c.json(rec);
});

router.delete("/:id", async(c) => {
    const userId = c.get('userId');
    if(!userId) throw new HTTPException(401, { message: 'Not authenticated' });

    const memoryId = c.req.param('id');
    const rec = await prisma.memory.findUnique({ where: { id: memoryId } });
    if (!rec || rec.userId !== userId) return c.json({ error: 'Not found' }, 404);

    const namespace = `user-${rec.userId}`;

    try {
        await deleteMemoryVectors(rec.id, namespace);
    } catch (err) {
        console.error('Failed to delete vectors for memory', err);
        return c.json({ error: "failed to delete vectors" }, 500);
    };

    try {
        await prisma.memory.delete({ where: { id: memoryId }, });
        await prisma.embeddingJob.deleteMany({ where: { memoryId: memoryId }, });
    } catch (err) {
        console.error("Failed to delete memory row after deleting vectors", err);
        return c.json({ error: "Failed to delete memory record" }, 500);
    };

    return c.json({ ok: true });
});

export default router;