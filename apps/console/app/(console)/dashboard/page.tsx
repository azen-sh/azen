"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import SummaryCard from "@/components/SummaryCard";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
} from "@/components/ui/chart";

import CustomTooltip from "@/components/CustomToolTip";

export default function App() {
  const [usage, setUsage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUsageMetrics = async () => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
      const response = await fetch(`${baseUrl}/api/v1/usage`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to load usage metrics");
      }

      const data = await response.json();
      setUsage(data);
      setLoading(false);
    } catch (err) {
      console.error("fetch usage failed", err);
      toast.error("Failed to load usage metrics");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsageMetrics();
  }, []);

  const chartData =
    (usage?.labels ?? []).map((label: string, i: number) => ({
      date: label,
      total: usage?.series?.total?.[i] ?? 0,
      memory_create: usage?.series?.memory_create?.[i] ?? 0,
      memory_search: usage?.series?.memory_search?.[i] ?? 0,
    })) ?? [];

  return (
    <div className="w-full min-h-screen px-3 py-4 bg-black overflow-hidden">
      <div className="max-w-full">
        {/* Heading */}
        <div className="mb-2 mt-3">
          <h1 className="text-xl text-white">Overview</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Manage your account, API keys and usage
          </p>
        </div>

        {/* Scroll Panel */}
        <div
          className="flex h-[calc(100vh-110px)] flex-col rounded-xl border border-neutral-800 bg-[#0b0b0c] p-6 mt-5 -ml-3 -mr-3 mx-[-2px] panel-scroll overflow-y-auto"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="flex flex-col">
            {loading && (
              <div className="text-neutral-400 text-sm">Loading usage...</div>
            )}

            {usage && (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <SummaryCard
                    title="Total Requests"
                    value={usage.summary.total_requests}
                  />
                  <SummaryCard
                    title="Success"
                    value={usage.summary.success_count}
                  />
                  <SummaryCard
                    title="Memory Creates"
                    value={usage.summary.memory_count}
                  />
                  <SummaryCard
                    title="Retrievals"
                    value={usage.summary.search_count}
                  />
                </div>

                {/* SHADCN CHART */}
                <div className="rounded-xl border bg-black border-neutral-800 p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm text-white">Requests over time</h2>
                    <div className="text-xs text-neutral-400">
                      Last <strong>{chartData.length}</strong> days
                    </div>
                  </div>

                  <ChartContainer
                    config={{
                      total: { label: "Total", color: "#F5F7FA" },
                      memory_create: { label: "Memory Creates", color: "#16A34A" },
                      memory_search: { label: "Searches", color: "#3B82F6" },
                    }}
                    className="h-[420px] w-full"
                  >
                    <LineChart data={chartData}>
                      <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />

                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        interval="preserveStartEnd"
                        minTickGap={25}
                        tick={{ fill: "#9CA3AF", fontSize: 11 }}
                        tickFormatter={(value) => {
                          const d = new Date(value);
                          return d.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          });
                        }}
                      />

                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#9CA3AF", fontSize: 11 }}
                        allowDecimals={false}
                      />

                      <ChartTooltip cursor={false} content={<CustomTooltip />} />
                      <ChartLegend />

                      <Line dataKey="total" stroke="#9CA3AF" strokeWidth={2} dot={false} />
                      <Line dataKey="memory_search" stroke="#16A34A" strokeWidth={2} dot={false} />
                      <Line dataKey="memory_create" stroke="#1D4ED8" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ChartContainer>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
