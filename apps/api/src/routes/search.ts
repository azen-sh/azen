import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { embedBatch } from "../lib/vector";
import { queryVectors } from "../lib/vector";

const router = new Hono();

const SearchInputSchema = z.object({
    query: z.string().min(1),
    topK: z.number().min(1).max(50).optional(),
});

router.post("/", async (c) => {
    const userId = c.get("userId");
    if(!userId) throw new HTTPException(401, { message: "Not authenticated"});
    
    const parsed = SearchInputSchema.safeParse(await c.req.json());
    if(!parsed.success) {
        return c.json({ error: "Invalid Request", details: parsed.error.format()}, 400);
    };

    const { query, topK = 5 } = parsed.data;
    const [qEmb] = await embedBatch([query]);
    console.log("qEmb", qEmb);
    if(!qEmb) throw new HTTPException(500, { message: "Failed to embed query" });
    const matches = await queryVectors(qEmb, topK, `user-${userId}`);
    console.log("matches",matches);

    return c.json({ ok: true,});
});

export default router;