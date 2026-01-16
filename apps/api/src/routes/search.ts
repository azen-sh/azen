import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { db, schema, inArray } from "db";
import { embedBatch } from "../lib/vector";
import { queryVectors } from "../lib/vector";
import { decryptText } from "../lib/encrypt";

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
        throw new HTTPException(400, { message: "Invalid request body" });
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
        .where(inArray(memory.id, memIds))
    };

    const orderedMems = memIds
    .map((id) => {
      const m = mems.find((x) => x.id === id);
      if (!m) return null;

      return {
        id: m.id,
        content: decryptText(m.encryptedContent, m.iv, m.tag),
        metadata: m.metadata,
        createdAt: m.createdAt,
        embedded: m.embedded,
      };
    })
    .filter(Boolean);    
    
    return c.json({ 
        status: "success",
        memories: orderedMems, 
        rawMatches: matches 
    });
});

export default router;