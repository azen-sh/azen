"use client"

import Image from "next/image"

const cards = [
  {
    image: "/use-cases/ai-agents.png",
    title: "AI Agents",
    desc: "Give agents long-term memory for user actions, preferences, and past tasks.",
  },
  {
    image: "/use-cases/chatbots.png",
    title: "Chatbots & Assistants",
    desc: "Store conversations and retrieve relevant context to make responses more personal and consistent.",
  },
  {
    image: "/use-cases/saas.png",
    title: "SaaS Applications",
    desc: "Add stateful AI features like personalization, recommendations, and saved context.",
  },
  {
    image: "/use-cases/automations.png",
    title: "Automations & Workflows",
    desc: "Enable autonomous flows that remember previous steps and carry context across runs.",
  },
  {
    image: "/use-cases/rag-search.png",
    title: "RAG & Search Systems",
    desc: "Use vector search and memory ranking to surface the most relevant information instantly.",
  },
  {
    image: "/use-cases/insights.png",
    title: "Usage & Behavior Insights",
    desc: "Store user actions as memory to analyze patterns and power more adaptive product experiences.",
  },
]


export default function UseCases() {
  return (
    <section id="use-cases" className="py-24 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm text-slate-300 mb-4">
            Who is Azen For?
          </span>

          <h2 className="text-4xl md:text-5xl font-light text-[#E6E6E6]">Use cases</h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            Azen brings durable memory and fast retrieval to many AI-first products — 
            here are common ways teams use it.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <article
              key={i}
              className="
                rounded-2xl 
                bg-[#101011] 
                border border-neutral-900 
                overflow-hidden 
                transition-transform 
                duration-300
                ease-out
                hover:scale-[1.02]
                cursor-pointer
              "
            >
              {/* Image - covers full width */}
              <div className="relative w-full h-56 md:h-64 bg-[#101011]">
                <Image
                  src="/dash.png"
                  alt={c.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Body */}
              <div className="px-6 py-6">
                <h3 className="text-lg font-medium text-[#E6E6E6] mb-2">{c.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}