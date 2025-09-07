import { Hono} from "hono";
import { z } from "zod";

const router = new Hono();

router.get("/", async (c) => {
    const userId = c.get('userId');
    const apiKeyId = c.get('apiKeyId');
    return c.json({
        status: `all good, userId: ${userId}, apiKeyId: ${apiKeyId}`,
    });
});

export default router;