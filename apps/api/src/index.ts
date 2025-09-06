import { Hono} from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { verifyApiKey } from "./middlewares/verifyKey";

const app = new Hono();
const PORT = Number(process.env.PORT || 8080);

app.use('*', logger());
app.use('*', cors());

app.get("/", (c) => {
    return c.json({
        status: "ok",
    });
});

app.get("/protected", verifyApiKey, (c) => {
    const userId = c.get("userId");
    const apiKeyId = c.get("apiKeyId");
    return c.json({
        status: `all good, userId: ${userId}, apiKeyId: ${apiKeyId}`,
    });
});

export default {
    port: PORT,
    fetch: app.fetch,
};