import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const cards = [
  {
    title: "Create & store memory effortlessly",
    description:
      "Add long-term memory to your AI apps using clean, simple APIs. Store text, metadata, and user context with one request.",
    image: "/placeholders/llm-grid.png",
  },
  {
    title: "Retrieve & rank context intelligently",
    description:
      "Azen performs fast vector search and relevance ranking, returning only the most meaningful context for your model.",
    image: "/placeholders/create-agent.png",
  },
  {
    title: "Monitor usage with real-time insights",
    description:
      "Track total requests, memory creates and retrievals, and manage your workspace easily through a lightweight dashboard.",
    image: "/placeholders/security-shield.png",
  },
]


export default function Cards() {
  return (
    <section id="features" className="py-24 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Top heading + description */}
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
            Azen gives developers simple APIs for creating, retrieving, and ranking memory with real time metrics and an intuitive developer experience.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Card
              key={i}
              className="
                rounded-2xl 
                overflow-hidden 
                bg-[#101011]
                border border-neutral-900
                shadow-sm
                transition-transform duration-300 ease-out
                hover:scale-[1.02]
                cursor-pointer
              "
            >
              {/* Image - taller height */}
              <div className="relative w-full h-80 md:h-96 bg-[#101011]">
                <Image
                  src="/dash.png"
                  alt={c.title}
                  fill
                  className="object-cover"
                />
              </div>

              <CardContent className="px-6 pb-8 pt-6">
                <CardHeader className="p-0">
                  <CardTitle className="text-lg font-medium text-[#E6E6E6] mb-2">
                    {c.title}
                  </CardTitle>
                </CardHeader>

                <p className="text-gray-400 text-sm leading-relaxed">{c.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}