import { Hono} from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { verifyApiKey } from "./middlewares/verifyKey";
import memoryRoute from "./routes/memory";
import searchRoute from "./routes/search";

const app = new Hono();
const PORT = Number(process.env.PORT || 8080);

app.use('*', logger());
app.use('*', cors());
app.use("/api/memory/*", verifyApiKey);
app.use("/api/memory/search/*", verifyApiKey);

app.get("/", (c) => {
    return c.json({
        status: "ok",
    });
});

app.route("/api/memory", memoryRoute);
app.route("/api/memory/search", searchRoute);

export default {
    port: PORT,
    fetch: app.fetch,
};