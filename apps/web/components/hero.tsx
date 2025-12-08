import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="pt-16 md:pt-24 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 lg:col-span-6">
            <h1 className="text-4xl md:text-[4.5rem] lg:text-[5rem] font-light tracking-tight text-white leading-tight">
              Memory Layer for AI applications
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
              Azen is a memory layer with clean APIs for storing, retrieving, and ranking context with real-time metrics and workspace management.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="https://app.azen.sh">
                <Button className="rounded-full bg-white text-black px-6 py-3 font-medium shadow-sm hover:bg-gray-100 cursor-pointer">
                  Get Started 
                </Button>
              </a>

              <Link href="/about">
                <Button
                  variant="outline"
                  className="rounded-full border-0 text-white hover:text-white bg-[#171719] hover:bg-[#1d1d20] px-5 py-3 cursor-pointer"
                >
                  About Us
                </Button>
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm text-gray-400">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded">Instant memory</div>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded">Vector search</div>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded">Workspace control</div>
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-[#0f1113]">
              <Image
                src="/hero.png"
                alt="Azen Memory Layer Preview"
                width={700}
                height={800}
                priority
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}