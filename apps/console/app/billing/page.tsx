"use client"

export default function BillingPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <div className="pointer-events-none select-none space-y-4 blur-sm opacity-40">
        <h1 className="text-xl font-semibold text-white">
          Plans &amp; billing
        </h1>
        <p className="text-sm text-neutral-400">
          View your current plan, usage and invoices.
        </p>

        <div className="mt-4 space-y-4">
          <div className="h-32 rounded-2xl border border-neutral-800 bg-neutral-900" />
          <div className="h-40 rounded-2xl border border-neutral-800 bg-neutral-900" />
        </div>
      </div>

      {/* Static "coming soon" card overlay inside content area */}
      <div className="pointer-events-auto absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950/95 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          <h2 className="text-sm font-semibold text-white">
            Billing dashboard in progress
          </h2>
          <p className="mt-2 text-xs text-neutral-400">
            We&apos;re finalizing the self-serve billing experience for Azen
            Good news! During this early access phase, all services are currently complimentary.
          </p>

          <div className="mt-4 space-y-1 text-xs text-neutral-300">
            <p className="text-neutral-300">
              The upcoming billing view will let you:
            </p>
            <ul className="list-disc space-y-1 pl-4 text-neutral-400">
              <li>Change plans and view limits</li>
              <li>Download invoices and receipts</li>
              <li>Manage payment methods and billing contacts</li>
            </ul>
          </div>

          <p className="mt-4 text-[11px] text-neutral-500">
            For any plan changes, invoicing details, or other requests right now, 
            simply email us and our team will take care of your needs 
            while we ship this dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
