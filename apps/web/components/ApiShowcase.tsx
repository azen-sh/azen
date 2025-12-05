"use client"

import { useState, useMemo } from "react"
import Image from "next/image"

type MediaItem =
  | {
      type: "code"
      step?: number // optional step mapping
      language?: "js" | "ts" | "bash" | "curl"
      code: string
      caption?: string
    }
  | {
      type: "video" | "gif" | "image"
      step?: number
      src: string
      alt?: string
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
      title: "Build & deploy your memory pipeline",
      desc:
        "Create memories, attach metadata, and push to Azen with a single call.",
    },
    {
      title: "Agent uses stored context",
      desc: "Agents retrieve relevant memories to make responses personal and accurate.",
    },
    {
      title: "Refine & optimize",
      desc: "Tune ranking, adjust filters, and improve memory relevance over time.",
    },
    {
      title: "Escalate to humans",
      desc: "Route complex issues to a human operator when needed.",
    },
    {
      title: "Monitor usage & insights",
      desc: "See requests, creates, retrievals, and workspace activity in one place.",
    },
  ]

  // state
  const [active, setActive] = useState<number>(initial)

  // Build a map of step -> media items (allows multiple per step)
  const mediaByStep = useMemo(() => {
    const map = new Map<number, MediaItem[]>()
    media.forEach((m) => {
      const stepIndex = (m as any).step ?? 0 // 0 = general / fallback
      const arr = map.get(stepIndex) ?? []
      arr.push(m)
      map.set(stepIndex, arr)
    })
    return map
  }, [media])

  // choose media for currently active step, else fallback to step 0 or first available
  const currentMedia = useMemo<MediaItem | null>(() => {
    const candidates = mediaByStep.get(active) ?? mediaByStep.get(0) ?? media
    if (!candidates || candidates.length === 0) return null
    // prefer first candidate (you can extend to carousel)
    return candidates[0] ?? null
  }, [active, mediaByStep, media])

  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* LEFT: Numbered steps column */}
          <div className="pr-4">
            <h3 className="text-sm text-slate-400 mb-4">How it works</h3>
            <h2 className="text-4xl md:text-5xl font-light text-[#E6E6E6] leading-tight mb-8">
              An end-to-end flow for adding memory to your AI apps
            </h2>

            <div className="space-y-6">
              {steps.map((s, i) => {
                const idx = i + 1
                const isActive = idx === active
                return (
                  <button
                    key={i}
                    onClick={() => setActive(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setActive(idx)
                      }
                    }}
                    className={`w-full text-left flex items-start gap-6 p-4 rounded-lg focus:outline-none ${
                      isActive
                        ? "bg-neutral-900 border border-neutral-800 shadow-sm"
                        : "opacity-60 hover:opacity-90"
                    }`}
                    aria-current={isActive ? "true" : "false"}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium ${
                        isActive ? "bg-amber-50 text-black" : "bg-white/5 text-slate-300"
                      }`}
                    >
                      {idx.toString().padStart(2, "0")}
                    </div>

                    <div>
                      <div className={`text-base font-semibold ${isActive ? "text-white" : "text-slate-300"}`}>
                        {s.title}
                      </div>
                      <div className="text-sm text-slate-400 mt-1 leading-relaxed">{s.desc}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* RIGHT: Interactive visual panel */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl">
              <div className="p-6 md:p-8 flex items-start">
                <div className="w-full rounded-2xl bg-white/3 p-4 md:p-6">
                  {/* media area */}
                  <div className="relative w-full rounded-xl overflow-hidden bg-neutral-800" style={{ minHeight: 420 }}>
                    {currentMedia ? (
                      currentMedia.type === "code" ? (
                        <div className="p-6 md:p-8">
                          <div className="mb-3 text-xs text-slate-300">API Endpoint</div>
                          <pre className="bg-black/90 rounded-md p-4 text-xs font-mono text-green-400 overflow-auto">
                            {(currentMedia as any).code}
                          </pre>
                          {showCaption && currentMedia.caption ? (
                            <div className="mt-3 text-sm text-slate-400">{currentMedia.caption}</div>
                          ) : null}
                        </div>
                      ) : currentMedia.type === "video" || currentMedia.type === "gif" ? (
                        <video
                          className="w-full h-full object-cover"
                          src={(currentMedia as any).src}
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <div className="relative h-[420px] md:h-[520px] w-full">
                          <Image
                            src={(currentMedia as any).src}
                            alt={(currentMedia as any).alt ?? "Azen visual"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )
                    ) : (
                      // fallback: existing screenshot if no media provided
                      <div className="relative h-[420px] md:h-[520px] w-full">
                        <Image src="/dash.png" alt="Azen dashboard preview" fill className="object-cover" />
                      </div>
                    )}

                    {/* small in-panel caption area */}
                    {showCaption && currentMedia && currentMedia.caption ? (
                      <div className="absolute left-6 bottom-6 bg-black/80 text-slate-300 text-sm px-3 py-2 rounded-md">
                        {currentMedia.caption}
                      </div>
                    ) : null}

                    {/* optional overlay frame */}
                    <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-white/4" />
                  </div>
                </div>
              </div>
            </div>

            {/* caption below visual */}
            <div className="mt-4 text-sm text-slate-500">
              Click a step to preview its API endpoint or demo visualization.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
