import { Hono} from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import { verifyApiKey } from "./middlewares/verifyKey";
import memoryRoute from "./routes/memory";
import searchRoute from "./routes/search";

const app = new Hono();
const PORT  = Number(process.env.PORT || 8080);

app.onError((err, c) => {
    console.error(`API Error on Path ${c.req.path}:`,err, err.message);
    
    if(err instanceof HTTPException) {
        return c.json({
            status: "error",
            message: err.message,
            code: err.status
        }, err.status);
    };
    
    return c.json({ 
        status: "error", 
        message: "Internal Server Error: Unhandled exception." 
    }, 500);
});

app.use('*', logger());
app.use('*', cors());
app.use("/api/v1/memory/*", verifyApiKey);
app.use("/api/v1/memory/search/*", verifyApiKey);

app.get("/", (c) => {
    return c.json({
        status: "ok",
    });
});

app.route("/api/v1/memory", memoryRoute);
app.route("/api/v1/memory/search", searchRoute);

export default {
    port: PORT,
    fetch: app.fetch,
};