import { Hono} from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { prisma } from 'db';

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

    await prisma.embeddingJob.create({
        data: {
            memoryId: rec.id,
            userId,
            status: 'pending',
        },
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
    const per = Math.min(Math.max(1, Number(c.req.query('per')) ?? 20), 100);

    const items = prisma.memory.findMany({
        where: {
            userId,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page -1) * per,
        take: per,
        select: {
            id: true,
            content: true,
            metadata: true,
            createdAt: true,
            embedded: true,
        },
    });
    return c.json ({ items, page, per });
});

export default router;