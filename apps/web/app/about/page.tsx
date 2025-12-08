import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Azen | AI Memory Infrastructure for Developers",
  description:
    "Learn about Azen, the developer-first AI memory infrastructure for building context-aware, stateful AI systems. Early access platform for long-term memory, retrieval, and ranking.",
  keywords: [
    "Azen AI",
    "AI memory infrastructure",
    "long-term memory for AI",
    "vector memory API",
    "developer AI tools",
    "AI context storage",
  ],
  robots: "index, follow",
}


export default function AboutPage() {
  return (
    <section className="py-24 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-20">
          {/* Logo */}
          <div className="w-12 h-12 mb-6 rounded-xl bg-white/5 border border-neutral-900 flex items-center justify-center text-white text-xl">
            <Image
              src="/logo.png"
              alt="Azen Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>

          <span className="inline-block mb-4 px-3 py-1 rounded-full text-sm bg-white/10 text-[#E6E6E6]">
            About Azen
          </span>
          <h1 className="text-4xl md:text-5xl font-light leading-tight text-[#E6E6E6] mb-6 max-w-4xl">
            The memory layer built for real-world AI applications
          </h1>
        </div>

        {/* Story Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              While building products and AI applications, we kept running into a
              structural limitation of modern AI systems: every request is
              stateless. The model forgets everything unless you manually send
              the entire history again.
            </p>
            <p>
              At first this looks manageable. But as conversations grow longer
              and applications become more complex, the cost compounds quickly.
              Token usage increases, latency rises, and systems become harder to
              reason about.
            </p>
          </div>

          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              To make AI feel persistent, developers are forced to build fragile
              memory pipelines: databases for raw logs, embedding systems for
              semantic search, custom ranking logic, and complex prompt
              orchestration.
            </p>
            <p>
              Memory ends up scattered across application code instead of
              existing as a first-class system. Debugging becomes difficult.
              Behavior becomes unpredictable. Costs become opaque.
            </p>
          </div>

          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              The core realization behind Azen was simple: memory should not live
              inside prompts. It should exist as dedicated infrastructure
              persistent, structured, searchable, and independent from any
              single model request.
            </p>
            <p>
              Instead of flooding every prompt with full history, applications
              should retrieve only the most relevant pieces of memory at the
              right time.
            </p>
          </div>

          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              Azen was built to become that missing memory layer. Not a document
              database. Not a chat log store. But a system designed specifically
              for long-term AI context.
            </p>
            <p>
              Today, Azen is in early access and focused purely on one thing:
              doing text memory reliably and predictably for developers who want
              to experiment with persistent AI behavior.
            </p>
          </div>

          <div className="pt-8 border-t border-neutral-900">
            <p className="text-gray-400 leading-relaxed">
              Azen is not production-ready yet. It is built in public with early
              developers, real feedback, and real constraints. The goal is to
              evolve memory into a stable, universal layer for future AI
              systems.
            </p>
          </div>
        </div>

        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-2xl font-light text-[#E6E6E6] mb-6">
            What&apos;s Next
          </h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              Right now, Azen handles text memory. You can store conversations,
              retrieve relevant context, and let your AI remember past
              interactions without resending everything.
            </p>
            <p>
              We&apos;re testing with early users, fixing bugs, and learning what
              actually matters when building memory into real applications. The
              goal is simple: make memory work reliably before adding complexity.
            </p>
            <p>
              If you&apos;re building something with AI and want to experiment with
              persistent memory, reach out. We&apos;re working closely with developers
              who are trying to solve this problem.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}