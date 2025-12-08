"use client"

import React from "react"

export default function Features({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full max-w-sm mx-auto rounded-3xl bg-black p-6 overflow-hidden shadow-2xl ${className}`}
    >
      {/* Header */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white leading-tight">
          Never Lose User Context Again
        </h2>
        <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
          Azen retrieves preferences, behaviors, and history on demand.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative z-10 mt-10 pl-8">
        {/* Vertical line */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-neutral-700" />

        {/* Created Memory Label */}
        <div className="relative mb-6 h-8">
          <div className="absolute left-[-34px] top-0">
            <span className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-1 text-[11px] font-medium text-white shadow-lg shadow-green-600/20">
              <span className="w-2 h-2 rounded-full bg-white" />
              CREATED MEMORY
            </span>
          </div>
        </div>

        {/* Created Memory Block */}
        <div className="relative mb-10">
          <div className="rounded-xl bg-[#0f1113] border border-neutral-900 p-4 shadow-md backdrop-blur-sm">
            <p className="text-sm text-neutral-200">
              User: <span className="text-white font-semibold">Team meeting on Friday at 2 PM with Alice and Bob.</span>
            </p>
            <p className="mt-2 text-xs text-neutral-500">16 Nov 2025 · 15:14 IST</p>
          </div>
        </div>

        {/* Retrieved Memory Label */}
        <div className="relative mb-24">
          <div className="absolute left-[-34px] top-0">
            <span className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1 text-[11px] font-medium text-white shadow-lg shadow-blue-600/20">
              <span className="w-2 h-2 rounded-full bg-white" />
              RETRIEVED MEMORY
            </span>
          </div>
        </div>

        {/* Retrieved Memory Block */}
        <div className="relative">
          <div className="rounded-xl bg-[#0f1113] border border-neutral-900 p-4 shadow-md backdrop-blur-sm">
            <p className="text-sm text-neutral-200">
              AI responds: <span className="text-white font-semibold">Team meeting at 2 PM with Alice and Bob on Friday.</span>
            </p>
            <p className="mt-2 text-xs text-neutral-500">18 Nov 2025 · 15:15 IST</p>
          </div>
        </div>
      </div>
    </div>
  )
}
