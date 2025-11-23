"use client"

import { LogOut, User2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AccountSettingsPage({ user }: { user: { name: string; email: string; image: string | null } }) {
  const router = useRouter();
  function handleSignOut() {
    signOut().then(() => {
      router.push("/login");
    });
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Centered content container */}
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 py-8">
        {/* Page title */}
        <div className="space-y-1">
          <h1 className="text-xl font-roboto text-white">Settings</h1>
          <p className="text-sm text-neutral-400">
            Manage your account details for this Azen workspace
          </p>
        </div>

        {/* Account profile label */}
        <div className="flex items-center gap-2 text-sm font-medium text-neutral-200">
          <User2 className="h-4 w-4 text-neutral-400" />
          <span>Account Profile</span>
        </div>


        <section className="rounded-3xl border border-neutral-800 bg-[#0d0d0e] px-6 py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] md:px-8 md:py-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-800 text-base font-semibold text-neutral-50">
                <Image 
                src={user.image ?? ""}
                alt="User avatar"
                width={56}
                height={56}
                className="object-cover"
                priority
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
                    Name
                  </div>
                  <div className="mt-1 text-neutral-100">{user.name}</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
                    Email
                  </div>
                  <div className="mt-1 text-neutral-100">{user.email}</div>
                </div>
              </div>

              {/* Small note on the right */}
              <div className="mt-2 text-[11px] text-neutral-500 md:mt-0 md:text-right">
                This information is read-only for now.
                <br />
                Contact support if you need changes.
              </div>
            </div>
          </div>
        </section>

        {/* Sign out label */}
        <div className="text-sm font-medium text-neutral-200">Sign Out</div>

        {/* Sign out card */}
        <section className="rounded-3xl border border-neutral-800 bg-[#0d0d0e] px-6 py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] md:px-8 md:py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-medium text-white">Sign Out</div>
              <p className="mt-1 text-xs text-neutral-400">
                Sign out from your Azen account on this device.
              </p>
            </div>

            <Button
              type="button"
              size="sm"
              className="mt-1 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 md:mt-0 cursor-pointer"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
