"use client"

export default function CTA() {
  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">

        {/* Icon */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <rect x="4.5" y="3" width="15" height="5.5" rx="1" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
            <rect x="4.5" y="9" width="15" height="5.5" rx="1" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
            <rect x="4.5" y="15" width="15" height="5.5" rx="1" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#E6E6E6] leading-tight mb-4">
          Build AI that remembers starting today
        </h2>

        {/* Subtext */}
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Azen provides fast memory creation, retrieval, vector search, and real-time usage insights.
          Get started and make your AI applications truly stateful across sessions
        </p>

        {/* CTA Button */}
        <button
          className="
            inline-flex items-center justify-center
            rounded-full px-8 py-3.5
            bg-white hover:bg-gray-100 cursor-pointer
            text-black font-semibold text-sm
            shadow-md shadow-[#d8c7ff]/20
            hover:brightness-95 transition
          "
        >
          Get Started
        </button>

      </div>
    </section>
  )
}
