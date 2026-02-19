import { Hono} from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import memoryRoute from "./routes/memory";
import searchRoute from "./routes/search";
import usageRoute from "./routes/usage";
import fs from "fs";
import path from "path";
import { trackUsage } from "./middlewares/trackUsage";
import { allowedOrigins } from "./config";
import { errorCodes } from "./lib/errorcodes";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = new Hono();
const PORT  = Number(process.env.PORT || 8080);

app.onError((err, c) => {
    console.error(`API Error on Path ${c.req.path}:`,err, err.message);
    if(err instanceof HTTPException) {
        const code = err.status;
        const statusText = errorCodes[code] ?? "internal_server_error";
        return c.json({
            status: statusText,
            message: err.message,
            code: err.status
        }, err.status);
    };
    
    return c.json({ 
        status: "internal_server_error", 
        message: "Internal Server Error: Unhandled exception.",
        code: 500, 
    }, 500);
});

app.use('*', logger());
app.use('*', cors({
    origin: allowedOrigins as string,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: ['Content-Type'],
    credentials: true,
}));
app.use("/api/v1/memory/*", authMiddleware, trackUsage);
app.use("/api/v1/usage", authMiddleware);

app.get("/", () => {
    return new Response("Welcome to Azen API", {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  });
  
app.get("/api/v1", (c) => {
    return c.json({
        "status": "ok",
    });
});

app.get("/openapi.yaml", (c) => {
    const filePath = path.join(process.cwd(), "openapi.yaml");
    const spec = fs.readFileSync(filePath, "utf8");

    return c.text(spec, 200, {
        "Content-Type": "application/yaml",
        "Cache-Control": "public, max-age=300"
    });
});

app.route("/api/v1/memory", memoryRoute);
app.route("/api/v1/memory/search", searchRoute);
app.route("/api/v1/usage", usageRoute);

export default {
    port: PORT,
    fetch: app.fetch,
};