import { metricsRedis as redis } from "../redis/clients";
import { randomUUID } from "crypto";
import { db, sql } from "db";

const KEY_PREFIX = "usage";
const KEYS_SET = `${KEY_PREFIX}:keys`;
const BATCH_SIZE = 200;
const SYNC_INTERVAL = 10 * 60 * 1000; 

function parseKey(k: string) {
  const parts = k.split(":");
  if (parts.length < 5) return null;
  const [, userId, apiKeyId, date, routeGroup] = parts;
  return { userId, apiKeyId, date, routeGroup };
}

async function processBatch(keys: string[]) {
  if (!keys.length) return;

  const pipeline = redis.pipeline();
  keys.forEach((k) => pipeline.hgetall(k));
  const res = await pipeline.exec();

  if (!res) return;

  const rows = [];
  for (let i = 0; i < res.length; i++) {
    const [err, counts] = res[i] as any;
    if (err) continue;
    
    const key = keys[i];
    if (!key) continue;

    const parsed = parseKey(key);
    if (!parsed) {
      await redis.srem(KEYS_SET, key).catch(() => {});
      await redis.del(key).catch(() => {});
      continue;
    }

    const totalRequests = parseInt(counts.totalRequests || "0", 10);
    if (totalRequests === 0) {
      await redis.srem(KEYS_SET, key).catch(() => {});
      await redis.del(key).catch(() => {});
      continue;
    }

    const successCount = parseInt(counts.successCount || "0", 10);
    const errorCount = parseInt(counts.errorCount || "0", 10);
    const memoryCount = parseInt(counts.memoryCount || "0", 10);
    const searchCount = parseInt(counts.searchCount || "0", 10);

    rows.push({
      id: randomUUID(),
      userId: parsed.userId,
      apiKeyId: parsed.apiKeyId,
      date: parsed.date,
      routeGroup: parsed.routeGroup,
      totalRequests,
      successCount,
      errorCount,
      memoryCount,
      searchCount,
    });
  }

  if (!rows.length) return;

  const sqlChunks: any[] = [];
  
  rows.forEach((row, index) => {
    if (index > 0) {
      sqlChunks.push(sql`, `);
    }
    sqlChunks.push(sql`(${row.id}, ${row.userId}, ${row.apiKeyId}, ${row.date}, ${row.routeGroup}, ${row.totalRequests}, ${row.successCount}, ${row.errorCount}, ${row.memoryCount}, ${row.searchCount})`);
  });

  const query = sql`
    INSERT INTO api_usage
      (id, user_id, api_key_id, date, route_group, total_requests, success_count, error_count, memory_count, search_count)
    VALUES ${sql.join(sqlChunks, sql.raw(''))}  
    ON CONFLICT (user_id, api_key_id, date, route_group)
    DO UPDATE SET
      total_requests = api_usage.total_requests + EXCLUDED.total_requests,
      success_count = api_usage.success_count + EXCLUDED.success_count,
      error_count = api_usage.error_count + EXCLUDED.error_count,
      memory_count = api_usage.memory_count + EXCLUDED.memory_count,
      search_count = api_usage.search_count + EXCLUDED.search_count,
      updated_at = now();
  `;

  try {
    await db.execute(query);
    
    const cleanPipe = redis.pipeline();
    keys.forEach((k) => {
      cleanPipe.del(k);
      cleanPipe.srem(KEYS_SET, k);
    });
    await cleanPipe.exec();
  } catch (err) {
    console.error("[syncWorker] Database upsert failed:", err);
  }
}

export async function runSyncWorker() {
  const keys = await redis.smembers(KEYS_SET);
  if (!keys.length) return;

  for (let i = 0; i < keys.length; i += BATCH_SIZE) {
    const batch = keys.slice(i, i + BATCH_SIZE);
    await processBatch(batch);
  }
}

if (require.main === module) {
  console.log(`[syncWorker] Starting worker with ${SYNC_INTERVAL}ms interval`);
  
  runSyncWorker().catch((err) => {
    console.error("[syncWorker] Initial sync failed:", err);
  });

  setInterval(async () => {
    try {
      await runSyncWorker();
    } catch (err) {
      console.error("[syncWorker] Sync failed:", err);
    }
  }, SYNC_INTERVAL);

  process.on('SIGTERM', () => {
    console.log('[syncWorker] SIGTERM received, shutting down...');
    process.exit(0);
  });

  process.on('SIGINT', () => {
    console.log('[syncWorker] SIGINT received, shutting down...');
    process.exit(0);
  });
}