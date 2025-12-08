"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import Image from "next/image"

export default function Navigation() {
  return (
    <>
      <nav className="w-full z-50 bg-black/90 backdrop-blur-sm p-2">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="mb-6 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-neutral-950 border border-white/5 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Azen Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-gray-400 hover:text-white transition">
              About
            </Link>
            <a 
              href="https://docs.azen.sh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition">
              Docs
            </a>
            <a href="https://app.azen.sh/dashboard" className="text-gray-400 hover:text-white transition">
              Dashboard
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://app.azen.sh/login">
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
            </a>

            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/5 transition"
                >
                  <Menu size={20} />
                </button>
              </SheetTrigger>

              <SheetContent 
                side="left"
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
                      <Image
                        src="/logo.png"
                        alt="Azen Logo"
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                      <h3 className="text-white tracking-tight">
                        Azen
                      </h3>
                    </div>
                  </div>
                  <SheetDescription className="mt-5 text-sm text-white">
                    Memory Layer for AI applications
                  </SheetDescription>
                </SheetHeader>

                <nav className="px-4 mt-4 flex flex-col gap-4">
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white text-base"
                    onClick={() => {}}
                  >
                    About
                  </Link>
                  <Link
                    href="https://docs.azen.sh"
                    className="text-gray-400 hover:text-white text-base"
                    onClick={() => {}}
                  >
                    Docs
                  </Link>
                  <a
                    href="https://app.azen.sh/dashboard"
                    className="text-gray-400 hover:text-white text-base"
                    onClick={() => {}}
                  >
                  Dashboard
                  </a>
                </nav>

                <SheetFooter className="px-4 mt-6">
                  <div className="w-full">
                    <a
                    href="https://app.azen.sh/login"
                    >
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
                    </a>
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
