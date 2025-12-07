"use client"

import React, { useEffect, useMemo, useState } from "react"

type MediaItem = {
  type: "code"
  step?: number
  language?: "ts"
  code: string
  caption?: string
}

export default function ApiShowcase({
  initial = 1,
  media = [],
  showCaption = true,
}: {
  initial?: number
  media?: MediaItem[]
  showCaption?: boolean
}) {
  const steps = [
    {
      title: "Create memory",
      desc: "Create memories, attach metadata, and push to Azen with a single call.",
    },
    {
      title: "Search memory",
      desc: "Retrieve the most relevant memories for an agent or query.",
    },
    {
      title: "Fetch all memories",
      desc: "List or paginate through stored memories for inspection or export.",
    },
  ]

  const tsSnippets: MediaItem[] = [
    {
      step: 1,
      type: "code",
      caption: "Create memory (TypeScript)",
      code: `const response = await fetch("https://api.azen.sh/api/v1/memory", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "azen-api-key": process.env.AZEN_API_KEY!,
  },
  body: JSON.stringify({
    text: "User likes cold brew coffee",
    dedupKey: "preference:coffee",
  }),
})

const data = await response.json()
console.log(data)`,
    },
    {
      step: 2,
      type: "code",
      caption: "Search memory (TypeScript)",
      code: `const response = await fetch("https://api.azen.sh/api/v1/memory/search", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "azen-api-key": process.env.AZEN_API_KEY!,
  },
  body: JSON.stringify({
    query: "What drinks does the user like?",
    topK: 5,
  }),
})

const results = await response.json()
console.log(results)`,
    },
    {
      step: 3,
      type: "code",
      caption: "List memories (TypeScript)",
      code: `const response = await fetch(
  "https://api.azen.sh/api/v1/memory?page=1&per=20",
  {
    method: "GET",
    headers: {
      "azen-api-key": process.env.AZEN_API_KEY!,
    },
  }
)

const memories = await response.json()
console.log(memories)`,
    },
  ]

  const mergedMedia = media.length ? media : tsSnippets

  const [active, setActive] = useState<number>(initial)
  const [index, setIndex] = useState<number>(0)

  const mediaByStep = useMemo(() => {
    const map = new Map<number, MediaItem[]>()
    mergedMedia.forEach((m) => {
      const k = m.step ?? 0
      const arr = map.get(k) ?? []
      arr.push(m)
      map.set(k, arr)
    })
    return map
  }, [mergedMedia])

  const candidates = useMemo(() => {
    return mediaByStep.get(active) ?? mediaByStep.get(0) ?? mergedMedia
  }, [active, mediaByStep, mergedMedia])

  useEffect(() => {
    setIndex(0)
  }, [active])

  const current = candidates?.[index]

  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          <div>
            <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs bg-white/10 text-[#E6E6E6]">
              How it Works
            </span>

            <h2 className="text-4xl md:text-5xl font-light text-[#E6E6E6] leading-tight mb-4">
              An end-to-end flow for adding memory to your AI apps
            </h2>

            <p className="text-base text-gray-400 mb-12 max-w-xl">
              Click a step to update the interactive preview.
            </p>

            <div className="space-y-6">
              {steps.map((s, i) => {
                const idx = i + 1
                const isActive = idx === active

                return (
                  <button
                    key={i}
                    onClick={() => setActive(idx)}
                    className={`w-full text-left flex items-start gap-5 p-5 rounded-xl transition border ${
                      isActive
                        ? "bg-[#0f1113] border-neutral-900"
                        : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <div className={`w-9 text-xs ${isActive ? "text-white" : "text-slate-300"}`}>
                      {idx}
                    </div>

                    <div>
                      <div className={`${isActive ? "text-white" : "text-slate-300"}`}>
                        {s.title}
                      </div>
                      <div className="text-sm text-gray-400 mt-1 max-w-sm">
                        {s.desc}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <div className="relative rounded-3xl bg-[#0f1113] border border-neutral-900 shadow-xl overflow-hidden">

              <div className="relative w-full h-[520px] md:h-[620px] bg-[radial-gradient(ellipse_at_bottom,#1a1f2b_0%,#0f1113_45%,#08090a_100%)]">

                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <pre className="bg-black/90 rounded-xl p-6 text-sm font-mono leading-relaxed max-h-[85%] overflow-auto text-[#E6E6E6]">
                    {current?.code}
                  </pre>
                </div>

                {showCaption && current?.caption && (
                  <div className="absolute left-5 bottom-5 bg-black/80 text-slate-300 text-sm px-3 py-2 rounded-md">
                    {current.caption}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}