"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { organization, updateUser } from "@/app/lib/auth-client";

export default function WelcomePage() {
  const router = useRouter();

  const [orgName, setOrgName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  async function handleCreateOrg() {
    setError(null);
    setLoading(true);

    try {
      const { data: orgData, error: createError } = await organization.create({
        name: orgName,
        slug,
        description: description || undefined,
        keepCurrentActiveOrganization: false,
      });

      if (createError) {
        setError(createError.message ?? "Failed to create organization");
        return;
      };

      if(!orgData?.id) {
        setError("Organization create failed");
        return;
      };

      const { error: setActiveError } = await organization.setActive({
        organizationId: orgData.id,
        organizationSlug: orgData.slug,
      });

      if (setActiveError) {
        setError(setActiveError.message ?? "Failed to set active organization");
        return;
      };

      await updateUser({
        hasCompletedOnboarding: true,
      });

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-xl">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-8 shadow-xl backdrop-blur">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Azen"
                width={44}
                height={44}
                className="rounded-full"
              />
              <div>
                <h1 className="text-xl font-medium tracking-tight">
                  Welcome to Azen
                </h1>
                <p className="text-sm text-neutral-400">
                  Let’s set up your workspace
                </p>
              </div>
            </div>

            <div className="my-6 h-px bg-neutral-800" />

            <p className="text-sm text-neutral-400 leading-relaxed">
              Organizations in Azen isolate memory, usage, and access.
              You can invite teammates, manage keys, and connect billing
              after setup.
            </p>

            {/* FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateOrg();
              }}
              className="mt-6 space-y-5"
            >
              {error && (
                <div className="rounded-md border border-red-500/40 bg-red-500/5 px-4 py-2 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Org name (browser required) */}
              <div className="space-y-1.5">
                <label className="text-sm text-neutral-300">
                  Organization name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Acme AI"
                  value={orgName}
                  onChange={(e) => {
                    setOrgName(e.target.value);
                    if (!slug) setSlug(slugify(e.target.value));
                  }}
                  className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-600"
                />
              </div>

              {/* Slug (browser required) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-neutral-300">
                    Workspace slug
                  </label>
                  <span className="text-xs text-neutral-500">
                    Used in URLs
                  </span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="acme"
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-600"
                />
                <p className="text-xs text-neutral-500">
                  azen.sh/{slug || "<slug>"}
                </p>
              </div>

              {/* Description (optional) */}
              <div className="space-y-1.5">
                <label className="text-sm text-neutral-300">
                  Description{" "}
                  <span className="text-neutral-500">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="What is this workspace for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full resize-none rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-600"
                />
              </div>

              {/* Info */}
              <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-xs text-neutral-400">
                You can change your organization details later. The slug
                identifies your workspace and APIs.
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-md bg-white py-2.5 text-sm font-medium text-black hover:bg-neutral-200"
                >
                  {loading ? "Creating workspace…" : "Create organization"}
                </Button>
              </div>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-neutral-500">
            This will be your default workspace. You can create more later.
          </p>
        </div>
      </div>
    </main>
  );
}
