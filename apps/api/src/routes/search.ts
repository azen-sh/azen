import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { db, schema, inArray } from "db";
import { embedBatch } from "../lib/vector";
import { queryVectors } from "../lib/vector";

const router = new Hono();

const { memory } = schema;

const SearchInputSchema = z.object({
    query: z.string().min(1),
    topK: z.number().min(1).max(50).optional(),
});

router.post("/", async (c) => {
    const userId = c.get("userId");
    if(!userId) throw new HTTPException(401, { message: "Not authenticated"});

    let body;
    try {
        body = await c.req.json();
    } catch (e) {
        throw new HTTPException(400, { message: "Request body must be valid JSON" });
    };

    const parsed = SearchInputSchema.safeParse(body);
    
    if(!parsed.success) {
        return c.json({
            status: "error",
            message: "Invalid request body",
            code: 400,
            details: parsed.error.format(),
        }, 400);
    };

    const { query, topK = 5 } = parsed.data;

    const [qEmb] = await embedBatch([query]);
    if(!qEmb) throw new HTTPException(500, { message: "Failed to embed query" });

    const matches = await queryVectors(qEmb, topK, `user-${userId}`);

    const memIds = Array.from(
        new Set(
            matches
            .map(m => m.id?.split("::")[0])
            .filter((id): id is string => !!id)
        ));
    
    let mems: Array<any> = [];    
    if(memIds.length > 0) {
        mems = await db
        .select()
        .from(memory)
        .where(inArray(memory.id, memIds))
    };

    const orderedMems = memIds.map(id => mems.find(m => m.id === id)).filter(Boolean);    
    return c.json({ memories: orderedMems, rawMatches: matches });
});

export default router;