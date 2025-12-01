import IORedis from "ioredis";

const REDIS_URL = process.env.REDIS_URL_DEV || "redis://redis:6379";

export const bullRedis = new IORedis(REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
});

export const metricsRedis = new IORedis(REDIS_URL, {
  maxRetriesPerRequest: 2,
  enableReadyCheck: true,
});

bullRedis.on("error", (err) => {
  console.warn("[redis:bull] connection error:", err?.message ?? err);
});
metricsRedis.on("error", (err) => {
  console.warn("[redis:metrics] connection error:", err?.message ?? err);
});
