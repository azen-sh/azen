import { Hono } from "hono";

const router = new Hono();

router.get("/", async (c) => {
    return c.json({
        status: "On keys route",
    });
});

export default router;