import { Hono} from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { prisma } from 'db';

const router = new Hono();

const MemoryInputSchema = z.object({
    text: z.string().min(1),
    namespace: z.string().optional(),
    dedupKey: z.string().optional(),
});

router.post("/", async (c) => {
    const userId = c.get('userId');
    if(!userId) throw new HTTPException(401, { message: "Not authenticated" });

    const body = await c.req.json();
    const parsed = MemoryInputSchema.safeParse(body);
    console.log(parsed);
    if(!parsed.success) {
        return c.json({ error: 'Invalid Request', details: parsed.error.format() }, 400);
    };
    const { text, namespace, dedupKey } = parsed.data;
    
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
            metadata: { namespace: namespace ?? null, dedupKey: dedupKey ?? null, },
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

export default router;