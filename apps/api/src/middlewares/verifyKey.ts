import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { auth } from "../lib/auth";

export const verifyApiKey = createMiddleware(async (c, next) => {
    const key = c.req.header('azen-api-key') ?? "";
    if(!key) throw new HTTPException(401, { message: "no api key"});

    const response = await auth.api.verifyApiKey({ body: { key }});

    if(!response || !response.valid) {
        throw new HTTPException(403, { message: response.error?.message ?? "Invalid API key"});
    };

    c.set("userId", response.key?.userId);
    c.set("apiKeyId", response.key?.id);

    await next();
});