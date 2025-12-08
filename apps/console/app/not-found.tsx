import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-[#E6E6E6] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8">
        
        <div className="w-12 h-12 mx-auto rounded-xl bg-white/5 border border-neutral-900 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Azen Logo"
            width={36}
            height={36}
            className="object-contain"
          />
        </div>

        <div>
          <h1 className="text-5xl font-light mb-4">404</h1>
          <p className="text-gray-400">
            This page doesn&apos;t exist.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-5 py-2 rounded-lg bg-white text-black text-sm font-medium hover:opacity-90 transition"
          >
            Dashboard
          </Link>

          <Link
            href="https://docs.azen.sh"
            className="px-5 py-2 rounded-lg border border-neutral-800 text-sm text-gray-300 hover:border-neutral-700 transition"
          >
            Docs
          </Link>
        </div>
      </div>
    </main>
  )
}
