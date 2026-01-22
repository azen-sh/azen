"use client"

import React, { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Copy, Check } from "lucide-react"
import Prism from "prismjs"
import "prismjs/components/prism-typescript"
import "prismjs/themes/prism-tomorrow.css"

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
      code: `import Azen from '@azen-sh/sdk';

const client = new Azen({ apiKey: 'AZEN_API_KEY' });

const response = await client.memory.create({
  text: 'I love hiking in the mountains',
});`,
    },
    {
      step: 2,
      type: "code",
      caption: "Search memory (TypeScript)",
      code: `import Azen from '@azen-sh/sdk';

const client = new Azen({
  apiKey: process.env['AZEN_API_KEY'],
});

const response = await client.memory.search({ query: 'outdoor activities', topK: 5 });

console.log(response.memories);`,
    },
    {
      step: 3,
      type: "code",
      caption: "List memories (TypeScript)",
      code: `import Azen from '@azen-sh/sdk';

const client = new Azen({
  apiKey: process.env['AZEN_API_KEY'],
});

for await (const memory of client.memory.list()) {
  console.log(memory.id);
}`,
    },
  ]

  const mergedMedia = media.length ? media : tsSnippets
  const [active, setActive] = useState<number>(initial)
  const [index, setIndex] = useState<number>(0)
  const [copied, setCopied] = useState(false)

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
    return mediaByStep.get(active) ?? mergedMedia
  }, [active, mediaByStep, mergedMedia])

  useEffect(() => {
    setIndex(0)
  }, [active])

  const current = candidates?.[index]

  const highlighted = useMemo(() => {
    if (!current?.code) return ""
    
    const grammar = Prism.languages.typescript as Prism.Grammar
    
    if (!grammar) return current.code

    return Prism.highlight(
      current.code,
      grammar,
      "typescript"
    )
  }, [current?.code])

  const handleCopy = async () => {
    if (!current?.code) return
    await navigator.clipboard.writeText(current.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

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
                        ? "bg-[#0f1113] border-neutral-900 shadow-lg"
                        : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <div className={`w-9 text-xs mt-1 ${isActive ? "text-white" : "text-slate-500"}`}>
                      0{idx}
                    </div>

                    <div>
                      <div className={`font-medium ${isActive ? "text-white" : "text-slate-300"}`}>
                        {s.title}
                      </div>
                      <div className="text-sm text-gray-400 mt-1 max-w-sm leading-relaxed">
                        {s.desc}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <div className="relative rounded-3xl bg-[#0f1113] border border-neutral-900 shadow-2xl overflow-hidden">
              <div className="relative w-full h-[520px] md:h-[620px]">
                <Image
                  src="/snippetbg2.png"
                  alt="Code background"
                  fill
                  priority
                  className="object-cover opacity-40"
                />

                <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
                  <div className="relative w-full max-w-[440px] bg-[#0b0d0f]/95 backdrop-blur-xl border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
                    
                    <div className="flex justify-between items-center px-5 py-3 border-b border-neutral-800/50 bg-white/5">
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                        {current?.language || 'typescript'}
                      </span>
                      <button
                        onClick={handleCopy}
                        className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                        aria-label="Copy code"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                    </div>

                    <pre className="p-6 text-xs md:text-sm font-mono leading-relaxed overflow-auto text-[#E6E6E6] custom-scrollbar">
                      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
                    </pre>
                  </div>
                </div>

                {showCaption && current?.caption && (
                  <div className="absolute left-10 bottom-10 bg-black/60 backdrop-blur-md border border-white/10 text-slate-300 text-xs px-3 py-2 rounded-lg">
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
