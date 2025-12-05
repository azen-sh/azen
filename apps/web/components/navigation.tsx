"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

// shadcn sheet imports (adjust path if your project places them differently)
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"

export default function Navigation() {
  return (
    <>
      <nav className="w-full z-50 bg-black/90 backdrop-blur-sm p-3">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left: Logo + Beta */}
          <div className="flex items-center gap-3">
            <div className="text-xl font-semibold tracking-tight text-white">azen</div>

            {/* BETA pill: bright blue */}
            <span className="px-3.5 py-1 rounded-full text-[#f2f2f2] text-xs font-semibold bg-[#1E5BFF]">
              BETA
            </span>
          </div>

          {/* Center: desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-400 hover:text-white text-sm transition">
              Features
            </Link>
            <a 
              href="https://docs.azen.sh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-sm transition">
              Docs
            </a>
            <Link href="#company" className="text-gray-400 hover:text-white text-sm transition">
              Team
            </Link>
          </div>

          {/* Right: CTA + mobile trigger */}
          <div className="flex items-center gap-4">
            <Button
              className="
                hidden md:inline-flex
                rounded-full px-5 py-2 text-[0.9rem]
                bg-[#171719] text-[#f2f2f2]
                hover:bg-[#1d1d20]
                transition-colors
                cursor-pointer
              "
            >
              Login
            </Button>

            {/* Mobile - shadcn Sheet trigger (hamburger) */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/5 transition"
                >
                  <Menu size={20} />
                </button>
              </SheetTrigger>

              <SheetContent side="left"
              className="
              w-80 bg-[#060606]
              border-r border-white/5      
              ring-0 shadow-none
              fixed inset-y-0 left-0
              overflow-y-auto
              data-[state=open]:animate-in data-[state=closed]:animate-out
            "
              >
                <SheetHeader className="pt-3 pb-4 px-4 mt-2">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-semibold tracking-tight text-white">azen</div>
                      <span className="px-3.5 py-1 rounded-full text-[#f2f2f2] text-xs font-semibold bg-[#1E5BFF]">
                        BETA
                      </span>
                    </div>
                  </div>

                  <SheetDescription className="mt-5 text-sm text-white">
                    Memory Layer for AI applications
                  </SheetDescription>
                </SheetHeader>

                <nav className="px-4 mt-4 flex flex-col gap-4">
                  <Link
                    href="#features"
                    className="text-gray-400 hover:text-white text-base"
                    onClick={() => {}}
                  >
                    Features
                  </Link>
                  <Link
                    href="#docs"
                    className="text-gray-400 hover:text-white text-base"
                    onClick={() => {}}
                  >
                    Docs
                  </Link>
                  <Link
                    href="#company"
                    className="text-gray-400 hover:text-white text-base"
                    onClick={() => {}}
                  >
                    Team
                  </Link>
                </nav>

                <SheetFooter className="px-4 mt-6">
                  <div className="w-full">
                    <Button
                      className="
                        w-full rounded-full px-5 py-2 text-[0.8rem]
                        bg-[#171719] text-[#f2f2f2]
                        hover:bg-[#1d1d20]
                        transition-colors
                        cursor-pointer
                      "
                    >
                      Login
                    </Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  )
}
