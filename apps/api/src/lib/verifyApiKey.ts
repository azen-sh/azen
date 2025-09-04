import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { auth } from "./better-auth";

export const verifyApiKey = createMiddleware(async (c, next) => {

    const result = await auth.api.getSession({
      headers: c.req.raw.headers,
    })
    console.log(result);

    await next();
});