"use client";

{/*"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="pt-24 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 lg:col-span-6">
            <h1 className="text-4xl md:text-[4.5rem] lg:text-[5rem] font-light tracking-tight text-white leading-tight">
              Memory Layer for AI applications
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
            Azen is a memory layer with clean APIs for storing, retrieving, and ranking context with real-time metrics and secure workspace management.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button className="rounded-full bg-white text-black px-6 py-3 font-medium shadow-sm hover:bg-gray-100 cursor-pointer">
                Get Started 
              </Button>

              <Button
                variant="outline"
                className="rounded-full border-0 text-white hover:text-white bg-[#171719] hover:bg-[#1d1d20] px-5 py-3 cursor-pointer"
              >
                About Us
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm text-gray-400">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded">Instant memory</div>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded">Vector search</div>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded">Workspace control</div>
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg rounded-3xl bg-[#f5f5f5] dark:bg-[#0f1113] p-10 md:p-12">
              <div
                className="relative rounded-2xl bg-white p-6 shadow-sm"
                style={{ minHeight: 460 }} 
              >
                <div className="absolute left-1/2 -translate-x-1/2 top-24 md:top-28 w-[70%] md:w-[60%] lg:w-[55%]">
                  <div className="rounded-xl bg-white shadow-md border border-white/5 p-4">
                    <div className="flex items-center">
                      <div className="flex-1 text-sm text-slate-800 font-medium">Can I bo</div>
                      <div className="ml-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M22 2L11 13"
                            stroke="#111827"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 2L15 22L11 13L2 9L22 2Z"
                            stroke="#111827"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-2 h-3 rounded-b-lg"
                    style={{ background: "linear-gradient(90deg,#21d07a,#b1ff5d)" }}
                  />
                </div>

                <div className="absolute left-4 bottom-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M6 5v14l11-7L6 5z" fill="#fff" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}*/}

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="pt-24 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* LEFT: content */}
          <div className="md:col-span-7 lg:col-span-6">
            <h1 className="text-4xl md:text-[4.5rem] lg:text-[5rem] font-light tracking-tight text-white leading-tight">
              Memory Layer for AI applications
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
            Azen is a memory layer with clean APIs for storing, retrieving, and ranking context with real-time metrics and secure workspace management.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button className="rounded-full bg-white text-black px-6 py-3 font-medium shadow-sm hover:bg-gray-100 cursor-pointer">
                Get Started 
              </Button>

              <Button
                variant="outline"
                className="rounded-full border-0 text-white hover:text-white bg-[#171719] hover:bg-[#1d1d20] px-5 py-3 cursor-pointer"
              >
                About Us
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm text-gray-400">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded">Instant memory</div>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded">Vector search</div>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded">Workspace control</div>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className="md:col-span-5 lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-lg h-[500px] md:h-[600px] rounded-3xl overflow-hidden bg-[#0f1113]">
  <Image
    src="/hero.png"
    alt="Azen Memory Layer Preview"
    fill
    priority
    className="object-cover"
  />
</div>
          </div>
        </div>
      </div>
    </section>
  )
}
