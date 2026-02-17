"use client"

export default function MemorySettingsPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <div className="pointer-events-none select-none space-y-4 blur-sm opacity-40">
        <h1 className="text-xl font-semibold text-white">
          Memory settings
        </h1>
        <p className="text-sm text-neutral-400">
          Configure how Azen stores and retains your application memory.
        </p>

        <div className="mt-4 space-y-4">
          <div className="h-32 rounded-2xl border border-neutral-800 bg-neutral-900" />
          <div className="h-40 rounded-2xl border border-neutral-800 bg-neutral-900" />
        </div>
      </div>

      <div className="pointer-events-auto absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950/95 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          <h2 className="text-sm font-semibold text-white">
            Memory settings coming soon
          </h2>
          <p className="mt-2 text-xs text-neutral-400">
            We&apos;re building a dedicated interface to control retention,
            encryption, and workspace-level memory policies.
          </p>

          <div className="mt-4 space-y-1 text-xs text-neutral-300">
            <p className="text-neutral-300">
              You&apos;ll soon be able to:
            </p>
            <ul className="list-disc space-y-1 pl-4 text-neutral-400">
              <li>Configure per-project memory retention rules</li>
              <li>Export or purge memory for specific tenants</li>
            </ul>
          </div>

          <p className="mt-4 text-[11px] text-neutral-500">
            If you&apos;re evaluating Azen and need specific controls today,
            reach out to us and we&apos;ll set them up for you.
          </p>
        </div>
      </div>
    </div>
  )
}
