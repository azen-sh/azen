"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "@/app/lib/auth-client";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const params = useSearchParams();

  async function handleGoogleSignin() {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      newUserCallbackURL: "/welcome",
    });
  }

  async function handleGithubSignin() {
    await signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      newUserCallbackURL: "/welcome",
    });
  }

  async function handleEmailSignin() {
    setSubmitError(null);
  
    const form = formRef.current;
    if (!form) return;
  
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
  
    setLoading(true);
    try {
      const { error } = await signIn.magicLink({
        email,
        name: email.split("@")[0],
        callbackURL: "/dashboard",
        newUserCallbackURL: "/welcome",
        errorCallbackURL: "/login?error=login_link_error"
      });
  
      if (error) {
        setSubmitError(error.message ?? "Something went wrong.");
        return;
      };
  
      setSuccessMessage("Login link sent! Check your email.");
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    if(params.get("error") === "login_link_error") {
      setSubmitError("Failed to login please try again");
    };
  }, [params]);
  
  return (
    <main className="flex min-h-screen bg-black text-white">
      <section className="hidden w-1/2 flex-col items-center justify-center gap-6 border-r border-neutral-900 bg-black px-12 lg:flex">
        <div className="flex max-w-md flex-col items-start gap-4">
          <a href="https://azen.sh">
            <Image
              src="/logo.png"
              alt="Azen Logo"
              width={48}
              height={48}
              className="rounded-full"
            />
          </a>

          <div>
            <h1 className="text-4xl tracking-tight">Azen</h1>
            <p className="mt-4 text-neutral-400">
              Memory infrastructure for AI products. Persist, search, and reason
              over your apps&apos; past interactions.
            </p>
          </div>

          <div className="mt-4 space-y-2 text-xs text-neutral-500">
            <p>・ Vector + semantic memory in one place</p>
            <p>・ Tenant-safe isolation out of the box</p>
            <p>・ SDK-first, infra-grade reliability</p>
          </div>
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center bg-neutral-950/65 px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-medium text-white">Sign in to Azen</h1>
            <p className="text-sm text-neutral-400">
              Developer-first memory infrastructure for AI applications.
            </p>
          </div>

          {successMessage && (
            <div className="flex border-l-4 border-green-500 bg-green-500/5 px-4 py-3 text-sm text-green-400">
              {successMessage}
            </div>
          )}

          {submitError && (
            <div className="flex border-l-4 border-red-500 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {submitError}
            </div>
          )}

          <form ref={formRef} className="space-y-4">
            <div className="space-y-2">
              <label className="text-neutral-300">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neutral-500 mt-1"
              />
            </div>

            <Button
              type="button"
              disabled={loading}
              onClick={handleEmailSignin}
              className="w-full rounded-md bg-white py-2 text-sm font-medium text-black hover:bg-neutral-200 cursor-pointer mt-1"
            >
              Continue with email
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-800" />
            <span className="text-xs text-neutral-500">OR</span>
            <div className="h-px flex-1 bg-neutral-800" />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={handleGoogleSignin}
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-neutral-700 bg-black py-2 text-sm text-white hover:bg-neutral-900 cursor-pointer"
            >
              <FcGoogle className="h-4 w-4" />
              Google
            </Button>

            <Button
              type="button"
              onClick={handleGithubSignin}
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-neutral-700 bg-black py-2 text-sm text-white hover:bg-neutral-900 cursor-pointer"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </Button>
          </div>

          <p className="pt-2 text-center text-[11px] leading-relaxed text-neutral-500">
            By signing in, you agree to the{" "}
            <a
              href="https://azen.sh/terms"
              className="underline underline-offset-2 hover:text-neutral-300"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="https://azen.sh/privacy"
              className="underline underline-offset-2 hover:text-neutral-300"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
