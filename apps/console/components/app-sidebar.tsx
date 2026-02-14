"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner";
import Image from "next/image"
import { CreateOrgModal } from "./CreateOrgModal"
import { signOut, useListOrganizations, useSession, authClient } from "@/app/lib/auth-client"

import {
  LayoutDashboard,
  KeyRound,
  CreditCard,
  SlidersHorizontal,
  HelpCircle,
  BookOpen,
  Building2,
  ChevronDown,
  Check,
  Plus,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils"

type User = {
  id: string
  name: string
  email: string
  image: string | null
}

type Organization = {
  id: string
  name: string
}

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "API Keys", href: "/keys", icon: KeyRound },
  { title: "Plans & Billing", href: "/billing", icon: CreditCard },
]

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar> & {
    user: User
  }
) {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = props

  const [openCreateOrg, setOpenCreateOrg] = React.useState(false)

  const { data: orgData, isPending } = useListOrganizations()
  const orgs: Organization[] = (orgData ?? []) as Organization[]

  const { data: session } = useSession()
  const activeOrgId = session?.session?.activeOrganizationId ?? null

  const currentOrg =
    orgs.find((o) => o.id === activeOrgId) ?? null

  async function handleSignOut() {
    await signOut()
    router.push("/login")
  }

  async function handleOrgSwitch(orgId: string) {
    if (!orgId) return

    const { error } = await authClient.organization.setActive({
      organizationId: orgId,
    })

    if (error) {
      toast.error("Failed to switch organizaion");
      return
    }

    window.location.reload()
  }

  const [settingsOpen, setSettingsOpen] = React.useState(
    pathname.startsWith("/settings")
  )

  React.useEffect(() => {
    setSettingsOpen(pathname.startsWith("/settings"))
  }, [pathname])

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="bg-black text-white border-r border-white/5"
        {...props}
      >
        {/* HEADER (ORG SWITCH) */}
        <SidebarHeader className="px-3 pt-4 pb-3">

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-2 w-full text-left rounded-md px-2 py-1.5",
                  "hover:bg-white/5 transition",
                  "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                )}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5">
                  <Building2 className="h-4 w-4 text-white/80" />
                </div>

                <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
                  <span className="text-sm font-medium truncate">
                    {isPending
                      ? "Organization..."
                      : currentOrg?.name ?? "No Org"}
                  </span>
                  <span className="text-[11px] text-white/40">
                    Organization
                  </span>
                </div>

                <ChevronDown className="ml-auto h-4 w-4 text-white/40 group-data-[collapsible=icon]:hidden" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="w-56 bg-neutral-950 border border-white/10 text-white"
            >
              {orgs.map((org) => {
                const isActive = org.id === activeOrgId

                return (
                  <DropdownMenuItem
                    key={org.id}
                    onClick={() => handleOrgSwitch(org.id)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <span>{org.name}</span>
                    {isActive && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                )
              })}

              <DropdownMenuSeparator className="bg-white/10" />

              <DropdownMenuItem
                onClick={() => setOpenCreateOrg(true)}
                className="cursor-pointer"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create organization
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-white/10" />

              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-400 focus:text-red-400 cursor-pointer"
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </SidebarHeader>

        {/* CONTENT */}
        <SidebarContent className="flex h-full flex-col px-2 mt-4">

          {/* NAV ITEMS */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active =
                pathname === item.href ||
                (item.href === "/dashboard" && pathname === "/")

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-neutral-400 hover:bg-neutral-900 hover:text-white transition",
                    "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0",
                    active && "bg-neutral-900 text-white"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate group-data-[collapsible=icon]:hidden">
                    {item.title}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* SETTINGS */}
          <div>
            <button
              onClick={() => router.push("/settings/account")}
              className={cn(
                "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-neutral-400 hover:bg-neutral-900 hover:text-white transition",
                pathname.startsWith("/settings") && "bg-neutral-900 text-white"
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">
                Settings
              </span>
            </button>

            {settingsOpen && (
              <div className="mt-2 ml-3 space-y-1 border-l border-neutral-700 pl-5 text-[13px]">
                <Link href="/settings/account" className="block text-neutral-400 hover:text-white">
                  Account
                </Link>
                <Link href="/settings/memory" className="block text-neutral-400 hover:text-white">
                  Memory
                </Link>
              </div>
            )}
          </div>

          <div className="flex-1" />

          {/* SUPPORT */}
          <div className="space-y-1 px-1 pb-2">
            <Link
              href="mailto:govindvashishat@gmail.com"
              className="flex items-center gap-2 px-3 py-2 text-xs text-neutral-400 hover:text-white"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">
                Support
              </span>
            </Link>

            <Link
              href="https://docs.azen.sh"
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 text-xs text-neutral-400 hover:text-white"
            >
              <BookOpen className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">
                Documentation
              </span>
            </Link>
          </div>

        </SidebarContent>

        {/* FOOTER (USER MENU) */}
        <SidebarFooter className="border-t border-neutral-900 px-2 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-2 rounded-xl bg-neutral-950 px-3 py-2 text-xs text-neutral-200">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-700">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt="User"
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                  ) : (
                    <span>{user.name?.charAt(0)}</span>
                  )}
                </div>

                <div className="flex flex-col truncate">
                  <span>{user.name}</span>
                  <span className="text-[10px] text-neutral-400">
                    {user.email}
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 bg-neutral-950 border border-neutral-800 text-white">
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => router.push("/settings/account")}>
                Account settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-400"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>

      </Sidebar>

      {/* MODAL */}
      <CreateOrgModal
        open={openCreateOrg}
        onOpenChange={setOpenCreateOrg}
      />
    </>
  )
}
