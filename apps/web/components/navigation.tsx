"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { FaGithub } from "react-icons/fa"
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
    <nav className="w-full z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center">
        <div className="flex items-center gap-12">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl">
              <Image
                src="/logo.png"
                alt="Azen Logo"
                width={32}
                height={32}
              />
            </div>

            <span className="font-semibold font-inter bg-linear-to-b from-[#F2F2F2] via-[#CFCFCF] to-[#9A9A9A] bg-clip-text text-transparent">
              Azen
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-7 text-sm">
            <Link href="/about" className="text-neutral-400 hover:text-white transition">
              About
            </Link>
            <a
              href="https://docs.azen.sh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition"
            >
              Docs
            </a>
            <a
              href="https://app.azen.sh/dashboard"
              className="text-neutral-400 hover:text-white transition"
            >
              Dashboard
            </a>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/azen-sh/azen"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="
              hidden md:flex items-center justify-center
              h-8 w-8 rounded-md
              text-neutral-400 hover:text-white
              hover:bg-white/10
              transition
            "
          >
            <FaGithub size={18} />
          </a>

          <a href="https://app.azen.sh/login" className="hidden md:block">
            <Button
              className="
                h-8 px-4 rounded-md
                bg-white text-black
                hover:bg-neutral-200
                text-sm font-medium
              "
            >
              Get Started
            </Button>
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition"
              >
                <Menu size={20} />
              </button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-80 bg-black border-r border-white/10"
            >
              <SheetHeader className="px-5 pt-6">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex items-center gap-3">
                  <Image src="/logo.png" alt="Azen Logo" width={28} height={28} />
                  <span className="text-white font-medium">azen</span>
                </div>
                <SheetDescription className="mt-4 text-sm text-neutral-400">
                  Memory layer for AI applications
                </SheetDescription>
              </SheetHeader>

              <nav className="px-5 mt-8 flex flex-col gap-5">
                <Link href="/about" className="text-neutral-400 hover:text-white">
                  About
                </Link>
                <a href="https://docs.azen.sh" className="text-neutral-400 hover:text-white">
                  Docs
                </a>
                <a href="https://app.azen.sh/dashboard" className="text-neutral-400 hover:text-white">
                  Dashboard
                </a>
              </nav>

              <SheetFooter className="px-5 mt-10">
                <a href="https://app.azen.sh/login" className="w-full">
                  <Button className="w-full h-10 bg-white text-black hover:bg-neutral-200">
                    Get Started
                  </Button>
                </a>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}