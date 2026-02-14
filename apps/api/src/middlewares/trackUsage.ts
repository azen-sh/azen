import { createMiddleware } from "hono/factory";
import { metricsRedis as redis } from "../redis/clients";

const TTL = 60 * 60 * 24 * 7;
const KEY_PREFIX = "usage";
const KEYS_SET = `${KEY_PREFIX}:keys`;

export const trackUsage = createMiddleware(async (c, next) => {
  const userId = c.get("userId");
  const apiKeyId = c.get("apiKeyId");
  const organizationId = c.get("organizationId");

  if (!userId || !apiKeyId || !organizationId) {
    return await next();
  };

  const method = c.req.method;
  const path = c.req.path;

  let routeGroup: string | null = null;
  let perRouteField: "memoryCount" | "searchCount" | null = null;

  if (method === "POST" && path === "/api/v1/memory") {
    routeGroup = "memory_create";
    perRouteField = "memoryCount";
  } else if (method === "POST" && path === "/api/v1/memory/search") {
    routeGroup = "memory_search";
    perRouteField = "searchCount";
  }

  if (!routeGroup) {
    return await next();
  }

  let success = true;
  try {
    await next();
    if ((c.res.status ?? 200) >= 400) success = false;
  } catch (err) {
    success = false;
    throw err;
  } finally {
    try {
      const date = new Date().toISOString().slice(0, 10);
      const key = `${KEY_PREFIX}:${organizationId}:${userId}:${apiKeyId}:${date}:${routeGroup}`;

      const pipeline = redis.pipeline();
      pipeline.hincrby(key, "totalRequests", 1);
      pipeline.hincrby(key, success ? "successCount" : "errorCount", 1);

      if (success) {
        if (perRouteField === "memoryCount") {
          pipeline.hincrby(key, "memoryCount", 1);
        } else if (perRouteField === "searchCount") {
          pipeline.hincrby(key, "searchCount", 1);
        }
      }

      pipeline.sadd(KEYS_SET, key);
      pipeline.expire(key, TTL);
      pipeline.expire(KEYS_SET, TTL);

      await pipeline.exec();
    } catch (e) {
      console.error("[trackUsage] Metrics error:", e);
    }
  }
});
