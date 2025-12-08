"use client"

import { Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signIn } from "@/app/lib/auth-client"
import Image from "next/image";

export default function LoginPage() {
  async function handleGoogleSignin() {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <main className="flex min-h-screen bg-black text-white">
      {/* Left branding side */}
      <section className="hidden bg-azen-panel w-1/2 flex-col items-center justify-center gap-6 border-r border-neutral-900 bg-black px-12 lg:flex">
        <div className="flex flex-col items-start gap-4 max-w-md">
          <Image
            src="/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-full"
          />

          <div>
            <h1 className="text-4xl tracking-tight">
              Azen
            </h1>
            <p className="mt-2 text-neutral-400">
              Memory infrastructure for AI products. Persist, search,
              and reason over your apps&apos; past interactions.
            </p>
          </div>

          {/* Sub points */}
          <div className="mt-4 space-y-2 text-xs text-neutral-500">
            <p>・ Vector + semantic memory in one place</p>
            <p>・ Tenant-safe isolation out of the box</p>
            <p>・ SDK-first, infra-grade reliability</p>
          </div>
        </div>
      </section>

      {/* Right auth side */}
      <section className="flex flex-1 items-center justify-center bg-neutral-950/65 px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-lg">
              Welcome to Azen Console
            </h2>
            <p className="text-sm text-neutral-400">
              Sign in to manage your API keys, usage, and memory spaces.
            </p>
          </div>

          {/* Auth card */}
          <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0e] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
            <Button
              type="button"
              onClick={handleGoogleSignin}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-neutral-200 cursor-pointer"
            >
              <Chrome className="h-4 w-4" />
              Continue with Google
            </Button>
          </div>

          {/* Legal / meta */}
          <p className="text-center text-[11px] leading-relaxed text-neutral-500">
            By signing in, you agree to the{" "}
            <a
            href="https://azen.sh/terms"
            className="underline underline-offset-2 hover:text-neutral-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a 
            href="https://azen.sh/privacy"
            className="underline underline-offset-2 hover:text-neutral-300">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
