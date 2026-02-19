"use client";

import { useEffect, useState } from "react";

type Memory = {
  id: string;
  content: string;
  createdAt: string;
  metadata: any;
  embedded: boolean;
};

type ApiResponse = {
  status: string;
  memories: Memory[];
  page: number;
  per: number;
  total_pages: number;
  total_count: number;
};

export default function MemoryPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchMemories = async (pageToFetch = 1, append = false) => {
    try {
      if (pageToFetch === 1) setLoading(true);
      else setLoadingMore(true);

      setError(null);
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
      const res = await fetch(`${baseUrl}/api/v1/memory?page=${pageToFetch}`, {
        method: "GET",
        credentials: "include", 
      });

      if (!res.ok) {
        throw new Error("Failed to fetch memories");
      }

      const data: ApiResponse = await res.json();

      if (data.status !== "success") {
        throw new Error("Invalid response");
      }

      setMemories((prev) =>
        append ? [...prev, ...data.memories] : data.memories
      );

      setPage(data.page);
      setTotalPages(data.total_pages);
      setTotalCount(data.total_count);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchMemories(1);
  }, []);

  const loadMore = () => {
    if (page < totalPages) {
      fetchMemories(page + 1, true);
    }
  };

  return (
    <div className="flex flex-1 flex-col p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">Memories</h1>
          <p className="text-sm text-neutral-400">
            {loading ? "Loading..." : `${totalCount} memories`}
          </p>
        </div>

        <button
          onClick={() => fetchMemories(1)}
          className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800 transition"
        >
          Refresh
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Loading */}
        {loading && (
          <div className="flex flex-1 items-center justify-center text-sm text-neutral-500">
            Loading memories...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-1 items-center justify-center text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && memories.length === 0 && (
          <div className="flex flex-1 items-center justify-center text-sm text-neutral-500">
            No memories found
          </div>
        )}

        {/* List */}
        {!loading && !error && memories.length > 0 && (
          <div className="space-y-3">
            {memories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}

            {/* Load More */}
            {page < totalPages && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-xs text-neutral-200 hover:bg-neutral-800 transition disabled:opacity-50"
                >
                  {loadingMore ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Memory Card ---------------- */

function MemoryCard({ memory }: { memory: Memory }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 hover:bg-neutral-900 transition">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-500 truncate">
          {memory.id}
        </span>

        <span className="text-xs text-neutral-500">
          {new Date(memory.createdAt).toLocaleString()}
        </span>
      </div>

      {/* Content */}
      <p
        className={`mt-2 text-sm text-neutral-200 ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {memory.content}
      </p>

      {/* Metadata / Flags */}
      <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
        {memory.embedded && (
          <span className="rounded bg-neutral-800 px-2 py-0.5">
            embedded
          </span>
        )}
        {memory.metadata && (
          <span className="rounded bg-neutral-800 px-2 py-0.5">
            metadata
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-neutral-400 hover:text-white transition"
        >
          {expanded ? "Show less" : "Show more"}
        </button>

        <button
          onClick={() => navigator.clipboard.writeText(memory.content)}
          className="text-xs text-neutral-400 hover:text-white transition"
        >
          Copy
        </button>
      </div>
    </div>
  );
}
