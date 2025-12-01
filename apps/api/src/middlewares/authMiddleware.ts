import { createMiddleware } from "hono/factory";
import { auth } from "../lib/auth";

export const authMiddleware = createMiddleware(async (c, next) => {
    console.log(c.req.header());
    const session = await auth.api.getSession({ headers: c.req.header() });
    console.log(session);
    
    if (!session || !session.user) {
        return c.json({ error: 'Unauthorized' }, 401);
    };

    const userId = session?.user.id;
    c.set("userId", userId);
    await next();
});