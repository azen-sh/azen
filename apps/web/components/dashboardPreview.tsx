"use client"

import Image from "next/image"

export default function DashboardPreview() {
  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#E6E6E6] leading-tight">
            Your AI Memory Activity,
            <br />
            All in One Place
          </h2>
          <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
            Get a complete view of requests, memory operations, API keys, and account settings, all from a fast, developer-first dashboard.
          </p>
        </div>

        <div
          className="
            relative
            rounded-3xl
            overflow-hidden
            bg-neutral-900
            shadow-xl
            max-w-6xl mx-auto
            h-[200px] sm:h-[400px] md:h-[500px] lg:h-[570px]
          "
        >
          <Image
            src="/dash.png"
            alt="Azen dashboard preview"
            fill
            priority
            className="object-contain object-top"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-36 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  )
}