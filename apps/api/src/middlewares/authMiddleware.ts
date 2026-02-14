import { createMiddleware } from "hono/factory";
import { auth } from "../lib/auth";

export const authMiddleware = createMiddleware(async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session || !session.user) {
        return c.json({ error: 'Unauthorized' }, 401);
    };

    const userId = session.user.id;
    const organizationId = session.session.activeOrganizationId;

    if (!organizationId) {
        return c.json({ error: "Unauthorized" }, 401);
    };

    c.set("userId", userId);
    c.set("organizationId", organizationId);
    await next();
});