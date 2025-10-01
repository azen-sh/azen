import { Hono } from "hono";
import { z } from "zod";

const router = new Hono();

const SearchInputSchema = z.object({
    query: z.string().min(1),
    topK: z.number().min(1).max(50).optional(),
});

router.get("/", async (c) => {
    return c.json({ message: "Hello, world!" });
});

export default router;