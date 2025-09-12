import { Hono} from "hono";
import { z } from "zod";
import { chunkText } from "../lib/chunk";

const router = new Hono();

router.post("/", async (c) => {
    const userId = c.get('userId');
    const apiKeyId = c.get('apiKeyId');

    const body = await c.req.json();
    chunkText(body.text);
    return c.json({
        status: `all good, userId: ${userId}, apiKeyId: ${apiKeyId}`,
    });
});

export default router;