import { Hono} from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import apiKeysRoute from "./routes/keys"

const app = new Hono();
const PORT = Number(process.env.PORT || 8080);

app.use('*', logger());
app.use('*', cors());

app.get("/", (c) => {
    return c.json({
        status: "ok",
    });
});

app.route("/api/keys", apiKeysRoute);

export default {
    port: PORT,
    fetch: app.fetch,
};