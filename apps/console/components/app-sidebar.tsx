"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  KeyRound,
  CreditCard,
  SlidersHorizontal,
  HelpCircle,
  BookOpen,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "API Keys", href: "/keys", icon: KeyRound },
  { title: "Plans & Billing", href: "/billing", icon: CreditCard },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  const [settingsOpen, setSettingsOpen] = React.useState(
    pathname.startsWith("/settings")
  );

  React.useEffect(() => {
    setSettingsOpen(pathname.startsWith("/settings"));
  }, [pathname]);

  return (
    <Sidebar collapsible="icon" className="bg-black text-white" {...props}>
      {/* TOP: logo + trigger (like your screenshot) */}
      <SidebarHeader className="px-3 pt-4 pb-3">
        <div
          className={cn(
            "flex items-center justify-between",
            // when collapsed (icon mode), stack them vertically & center
            "group-data-[collapsible=icon]:flex-col",
            "group-data-[collapsible=icon]:items-center",
            "group-data-[collapsible=icon]:gap-2"
          )}
        >
          {/* Logo only, no text */}
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
            O
          </button>

          {/* Sidebar trigger icon */}
          <SidebarTrigger className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-900 hover:text-white" />
        </div>
      </SidebarHeader>

      {/* MAIN NAV */}
      <SidebarContent className="flex h-full flex-col px-2 pb-3 mt-4">
        {/* MAIN NAV */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || (item.href === "/dashboard" && pathname === "/");

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
                <span className="truncate group-data-[collapsible=icon]:hidden">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* SETTINGS BLOCK (outside nav) */}
        <div className="-mt-1">
          {/* main settings row */}
          <button
            type="button"
            onClick={() => router.push("/settings/account")}
            className={cn(
              "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-neutral-400 hover:bg-neutral-900 hover:text-white transition",
              "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0",
              pathname.startsWith("/settings") && "bg-neutral-900 text-white"
            )}
          >
            <SlidersHorizontal className="h-4 w-4 shrink-0" />
            <span className="truncate group-data-[collapsible=icon]:hidden">Settings</span>
          </button>

          {/* submenu – only in expanded mode */}
          {settingsOpen && (
            <div className="mt-2 ml-3 space-y-1 border-l border-neutral-700 pl-5 text-[13px] group-data-[collapsible=icon]:hidden">
              <Link
                href="/settings/account"
                className={cn(
                  "block py-0.5 text-neutral-400 hover:text-white",
                  pathname === "/settings/account" && "text-white"
                )}
              >
                Account
              </Link>
              <Link
                href="/settings/memory"
                className={cn(
                  "block py-0.5 text-neutral-400 hover:text-white",
                  pathname === "/settings/memory" && "text-white"
                )}
              >
                Memory
              </Link>
            </div>
          )}
        </div>

        {/* push Support/Docs + footer down */}
        <div className="flex-1" />

        {/* SUPPORT + DOCS (unchanged, just make sure labels hide in icon mode) */}
        <div className="space-y-1 px-1 pb-2">
          <Link
            href="/support"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-neutral-400 hover:bg-neutral-900 hover:text-white transition group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">Support</span>
          </Link>

          <Link
            href="https://your-docs-url.com"
            target="_blank"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-neutral-400 hover:bg-neutral-900 hover:text-white transition group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          >
            <BookOpen className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">Documentation</span>
          </Link>
        </div>
      </SidebarContent>

      {/* BOTTOM: account dropdown (unchanged) */}
      <SidebarFooter className="border-t border-neutral-900 px-2 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex w-full items-center gap-2 rounded-xl bg-neutral-950 px-3 py-2 text-left text-xs text-neutral-200 hover:bg-neutral-900",
                // when sidebar is collapsed to icon, make this a small round button
                "group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:rounded-full"
              )}
            >
              <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-neutral-700 text-[11px] font-medium">
                G
              </div>

              {/* hide text when sidebar is collapsed */}
              <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">Govind&apos;s Organization</span>
                <span className="truncate text-[10px] text-neutral-400">
                  govindvashishat@gmail.com
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="top"
            align="start"
            sideOffset={8}
            className="w-64 border-neutral-800 bg-neutral-950 text-white"
          >
            <DropdownMenuLabel className="text-xs font-medium">Govind Vashishat</DropdownMenuLabel>
            <p className="px-2 text-[11px] text-neutral-400">govindvashishat@gmail.com</p>

            <DropdownMenuSeparator className="bg-neutral-800" />

            <DropdownMenuItem
              className="text-xs text-neutral-200 focus:bg-neutral-900 focus:text-white"
              onClick={() => {}}
            >
              Account settings
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-neutral-800" />

            <DropdownMenuItem
              className="text-xs text-red-400 focus:bg-red-950 focus:text-red-400"
              onClick={() => {
                console.log("Sign out");
              }}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
