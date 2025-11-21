import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="mb-5 mt-5">
        <h1 className="text-xl text-white">Overview</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Manage your account, API keys and usage
        </p>
      </div>

      {/* Top cards (same structure as shadcn, just with your content) */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {/* Card 1: Quick start */}
        <section className="rounded-xl border-neutral-800 border bg-neutral-950/95 p-4">
          <h2 className="text-sm font-roboto">Getting started</h2>
          <p className="mt-1 text-xs text-neutral-400">
            Create an API key and send your first request to Azen.
          </p>
          <Link
            href="/keys"
            className="mt-3 inline-block rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-800 cursor-pointer"
          >
            Go to API keys
          </Link>
        </section>

        {/* Card 2: Usage summary */}
        <section className="rounded-xl border-neutral-800 border bg-neutral-950/95 p-4">
          <h2 className="text-sm font-roboto">Usage</h2>
          <p className="mt-1 text-xs text-neutral-400">
            High-level usage for this workspace.
          </p>
          <div className="mt-3 space-y-2 text-[11px] text-neutral-300">
            <div className="flex justify-between">
              <span>Tokens</span>
              <span>0 / 1,000,000</span>
            </div>
            <div className="h-[4px] overflow-hidden rounded-full bg-neutral-800">
              <div className="h-full w-0 bg-neutral-100" />
            </div>
            <div className="flex justify-between pt-1">
              <span>Searches</span>
              <span>0 / 10,000</span>
            </div>
            <div className="h-[4px] overflow-hidden rounded-full bg-neutral-800">
              <div className="h-full w-0 bg-neutral-100" />
            </div>
          </div>
        </section>

        {/* Card 3: SDK + docs */}
        <section className="rounded-xl border-neutral-800 border bg-neutral-950/95 p-4">
          <h2 className="text-sm font-roboto">SDK & docs</h2>
          <p className="mt-1 text-xs text-neutral-400">
            Install the TypeScript SDK and follow the quickstart.
          </p>
          <div className="mt-3 flex flex-col gap-2 text-[11px]">
            <code className="rounded-md bg-black/40 px-2 py-1 font-mono">
              npm install @azen/sdk
            </code>
            <Link
              href="https://your-azen-docs-url"
              className="text-xs text-neutral-300 hover:text-white"
            >
              Open documentation →
            </Link>
          </div>
        </section>
      </div>

      <section className="min-h-[260px] flex-1 rounded-xl border-neutral-800 border bg-neutral-950/95 p-4 md:min-h-[360px]">
        <h2 className="text-sm font-roboto">Workspace</h2>
        <p className="mt-1 text-xs text-neutral-400">
          This area can show API keys, memory stats, or project details as you build out the console.
        </p>
        <div className="mt-4 rounded-lg border border-dashed border-neutral-600 p-4 text-xs text-neutral-400">
          For now this is a placeholder. You can replace it with your API key table or memory overview later.
        </div>
      </section>
    </div>
  );
}
