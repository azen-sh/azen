import IORedis from "ioredis";
import { REDIS_URL } from "../config";

export const bullRedis = new IORedis(REDIS_URL as string, {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
});

export const metricsRedis = new IORedis(REDIS_URL as string, {
  maxRetriesPerRequest: 2,
  enableReadyCheck: true,
});

bullRedis.on("error", (err) => {
  console.warn("[redis:bull] connection error:", err?.message ?? err);
});
metricsRedis.on("error", (err) => {
  console.warn("[redis:metrics] connection error:", err?.message ?? err);
});
