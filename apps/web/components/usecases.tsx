"use client"

const cards = [
  {
    title: "AI Agents",
    desc: "Give agents long-term memory for user actions, preferences, and past tasks.",
    points: [
      "Persistent task memory",
      "User preference recall",
      "Multi-session continuity",
    ],
  },
  {
    title: "Chatbots & Assistants",
    desc: "Store conversations and retrieve relevant context to make responses more personal and consistent.",
    points: [
      "Conversation memory",
      "Context-aware replies",
      "Personalized interactions",
    ],
  },
  {
    title: "SaaS Applications",
    desc: "Add stateful AI features like personalization, recommendations, and saved context.",
    points: [
      "User-level memory",
      "Adaptive experiences",
      "Saved session context",
    ],
  },
  {
    title: "Automations & Workflows",
    desc: "Enable autonomous flows that remember previous steps and carry context across runs.",
    points: [
      "Step-by-step recall",
      "Cross-run state",
      "Autonomous task chaining",
    ],
  },
  {
    title: "RAG & Search Systems",
    desc: "Use vector search and memory ranking to surface the most relevant information instantly.",
    points: [
      "Semantic vector search",
      "Relevance ranking",
      "Low-latency retrieval",
    ],
  },
  {
    title: "Usage & Behavior Insights",
    desc: "Store user actions as memory to analyze patterns and power more adaptive product experiences.",
    points: [
      "Behavioral memory",
      "Pattern discovery",
      "Adaptive UX insights",
    ],
  },
]

export default function UseCases() {
  return (
    <section id="use-cases" className="py-24 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm text-slate-300 mb-4">
            Who is Azen For?
          </span>

          <h2 className="text-4xl md:text-5xl font-light text-[#E6E6E6]">
            Use cases
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            Azen brings durable memory and fast retrieval to many AI-first products —
            here are common ways teams use it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <article
              key={i}
              className="
                rounded-2xl 
                bg-[#0f1113] 
                border border-neutral-900 
                transition-all
                duration-300
                ease-out
                hover:scale-[1.02]
                hover:border-neutral-800
                cursor-pointer
                h-full
              "
            >
              <div className="px-8 py-10 flex flex-col h-full">

                <h3 className="text-lg font-medium text-[#E6E6E6] mb-3">
                  {c.title}
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {c.desc}
                </p>

                <div className="h-px w-full bg-neutral-900 mb-5" />

                <ul className="space-y-3 mt-auto">
                  {c.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-sm text-neutral-400"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
