import { createMiddleware } from "hono/factory";
import { auth } from "../lib/auth";
import { getCookie } from "hono/cookie";

export const authMiddleware = createMiddleware(async (c, next) => {
    console.log("headers",c.req.raw.headers);
    const sessionToken = getCookie(c, 'better-auth.session_token');
    console.log("sessionToken",sessionToken);
    const session = await auth.api.getSession({ headers: c.req.header() });
    console.log(session);

    if (!session || !session.user) {
        return c.json({ error: 'Unauthorized' }, 401);
    };

    const userId = session?.user.id;
    c.set("userId", userId);
    await next();
});