import { Hono} from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

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
    console.log(text, namespace, dedupKey);
    return c.json({
        status: `all good, userId: ${userId}`,
    });
});

export default router;