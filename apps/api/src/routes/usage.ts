import { Hono } from "hono";
import { db, sql } from "db";

const router = new Hono();

function isoDateString(d: Date) {
  return d.toISOString().slice(0, 10);
}

router.get("/", async (c) => {
  const userId = c.get("userId");
  const organizationId = c.get("organizationId");

  if (!userId || !organizationId) return c.json({ error: "Unauthorized" }, 401);

  const endDate = new Date();
  const end = isoDateString(endDate);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 29);
  const start = isoDateString(startDate);

  const result = await db.execute(sql`
    SELECT
      date,
      route_group,
      SUM(total_requests) AS total_requests,
      SUM(success_count) AS success_count,
      SUM(error_count) AS error_count,
      SUM(memory_count) AS memory_count,
      SUM(search_count) AS search_count
    FROM api_usage
    WHERE organization_id = ${organizationId}
      AND date BETWEEN ${start} AND ${end}
    GROUP BY date, route_group
    ORDER BY date ASC;
  `);

  const rows = result.rows;

  const labels: string[] = [];
  const map = new Map<string, { 
    memory_create: number; 
    memory_search: number; 
    total: number; 
    success: number; 
    error: number 
  }>();

  for (let i = 0; i < 30; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const ds = isoDateString(d);
    labels.push(ds);
    map.set(ds, { memory_create: 0, memory_search: 0, total: 0, success: 0, error: 0 });
  }

  for (const r of rows) {
    const date = r.date as string;
    const rg = r.route_group as string;
    
    const totalRequests = Number(r.total_requests) || 0;
    const successCount = Number(r.success_count) || 0;
    const errorCount = Number(r.error_count) || 0;
    const memoryCount = Number(r.memory_count) || 0;
    const searchCount = Number(r.search_count) || 0;

    const cell = map.get(date);
    if (!cell) continue;

    if (rg === "memory_create") {
      cell.memory_create += memoryCount;
    } else if (rg === "memory_search") {
      cell.memory_search += searchCount;
    }

    cell.total += totalRequests;
    cell.success += successCount;
    cell.error += errorCount;
  }

  const memoryCreateSeries = labels.map((d) => map.get(d)!.memory_create);
  const memorySearchSeries = labels.map((d) => map.get(d)!.memory_search);
  const totalSeries = labels.map((d) => map.get(d)!.total);
  const successSeries = labels.map((d) => map.get(d)!.success);
  const errorSeries = labels.map((d) => map.get(d)!.error);

  const summary = {
    total_requests: totalSeries.reduce((a, b) => a + b, 0),
    success_count: successSeries.reduce((a, b) => a + b, 0),
    error_count: errorSeries.reduce((a, b) => a + b, 0),
    memory_count: memoryCreateSeries.reduce((a, b) => a + b, 0),
    search_count: memorySearchSeries.reduce((a, b) => a + b, 0),
  };

  return c.json({
    range: { start, end },
    labels,
    series: {
      memory_create: memoryCreateSeries,
      memory_search: memorySearchSeries,
      total: totalSeries,
      success: successSeries,
      error: errorSeries,
    },
    summary,
  });
});

export default router;