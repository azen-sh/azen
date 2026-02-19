import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { auth } from "../lib/auth";

export const authMiddleware = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (session && session.user) {
    const userId = session.user.id;
    const organizationId = session.session.activeOrganizationId;

    if (!organizationId) {
      throw new HTTPException(403, { message: "Unauthorized" });
    }

    c.set("userId", userId);
    c.set("organizationId", organizationId);
    return await next();
  }

  const key = c.req.header("azen-api-key") ?? "";
  if (!key) throw new HTTPException(401, { message: "no api key" });

  const response = await auth.api.verifyApiKey({ body: { key } });

  if (!response || !response.valid) {
    const code = response?.error?.code;

    if (code === "RATE_LIMITED") {
      throw new HTTPException(429, {
        message: response.error?.message ?? "Rate limit exceeded for this API key",
      });
    }

    throw new HTTPException(403, {
      message: response.error?.message ?? "Invalid API key",
    });
  }

  const userId = response.key?.userId;
  const apiKeyId = response.key?.id;
  const organizationId = response.key?.metadata?.organizationId;

  if (!organizationId || !userId || !apiKeyId) {
    throw new HTTPException(403, {
      message: "Invalid API key",
    });
  }

  c.set("userId", userId);
  c.set("apiKeyId", apiKeyId);
  c.set("organizationId", organizationId);
  await next();
});