import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const cards = [
  {
    title: "Create & store memory effortlessly",
    description:
      "Add long-term memory to your AI apps using clean, simple APIs. Store text, metadata, and user context with one request.",
    points: [
      "Single API call to create memory",
      "Supports text + metadata",
      "Optimized for long-term storage",
    ],
  },
  {
    title: "Retrieve & rank context intelligently",
    description:
      "Azen performs fast vector search and relevance ranking, returning only the most meaningful context for your model.",
    points: [
      "Low-latency retrieval",
      "Relevance-based ranking",
      "Context-aware filtering",
    ],
  },
  {
    title: "Monitor usage with real-time insights",
    description:
      "Track total requests, memory creates and retrievals, and manage your workspace easily through a lightweight dashboard.",
    points: [
      "Live request metrics",
      "Memory usage analytics",
      "Workspace-level visibility",
    ],
  },
]

export default function Cards() {
  return (
    <section id="features" className="py-24 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16">
          <div className="md:col-span-6">
            <span className="inline-block mb-3 px-3 py-1 rounded-full text-sm bg-white/10 text-[#E6E6E6]">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-[#E6E6E6] p-2">
              The complete memory layer for AI applications
            </h2>
          </div>
          <div className="md:col-span-6">
            <p className="text-lg text-gray-400">
              Azen gives developers simple APIs for creating, retrieving,
              and ranking memory with real time metrics and an intuitive
              developer experience.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Card
              key={i}
              className="
                rounded-2xl
                bg-[#0f1113]
                border border-neutral-900
                shadow-sm
                transition-all duration-300 ease-out
                hover:scale-[1.02]
                hover:border-neutral-800
                cursor-pointer
                h-full
              "
            >
              <CardContent className="px-8 py-10 flex flex-col h-full">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg font-medium text-[#E6E6E6] leading-snug">
                    {c.title}
                  </CardTitle>
                </CardHeader>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {c.description}
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
