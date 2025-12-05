"use client"

import Image from "next/image"

const items = [
  {
    title: "🔹 1. Memory API",
    desc: "Create, update, delete, and retrieve memories with a single API call.",
    img: "/placeholders/memory-api.png",
  },
  {
    title: "🔹 2. Vector Search Engine",
    desc: "Fast embedding search with metadata filtering and scoring.",
    img: "/placeholders/vector-search.png",
  },
  {
    title: "🔹 3. Automatic Embedding Pipeline",
    desc: "We generate embeddings (or plug your model) with batching + optimization.",
    img: "/placeholders/embedding-pipeline.png",
  },
  {
    title: "🔹 4. Context Ranking & Scoring",
    desc: "Azen ranks memory relevance for you (recency, semantic similarity, importance).",
    img: "/placeholders/context-ranking.png",
  },
  {
    title: "🔹 5. Multi-Store Support",
    desc: "Choose Postgres, Redis, or Azen’s built-in store.",
    img: "/placeholders/multi-store.png",
  },
  {
    title: "🔹 6. Real-time Analytics Dashboard",
    desc: "Usage counts, cost breakdown, request logs, token usage, errors.",
    img: "/placeholders/analytics.png",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-[#E6E6E6] mb-4">
            Built to Keep You Moving, Not Micro-Managing
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto">
            From planning to progress tracking, Azen gives teams the tools they need to manage tasks,
            lead projects, and hit goals — without the chaos.
          </p>
        </div>

        {/* Cards grid (3 columns on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((it, idx) => (
            <article
              key={idx}
              className="rounded-2xl overflow-hidden bg-neutral-900 border border-white/6 shadow-sm"
            >
              {/* visual area */}
              <div className="p-6">
                {/* Replace placeholder div below with <Image src={it.img} .../> if you have assets */}
                <div className="h-40 rounded-xl bg-gradient-to-br from-white/4 via-white/6 to-white/3 flex items-center justify-center overflow-hidden">
                  {/* placeholder */}
                  <div className="text-3xl text-slate-400 select-none">{/* optional icon */}</div>
                </div>
              </div>

              {/* content */}
              <div className="px-6 pb-6 pt-2">
                <h3 className="text-lg font-semibold text-[#E6E6E6] mb-2">{it.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{it.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
