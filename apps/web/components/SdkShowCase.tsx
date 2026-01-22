"use client"

import React, { useState } from "react"
import Prism from "prismjs"
import "prismjs/components/prism-typescript"
import "prismjs/themes/prism-tomorrow.css"
import { Copy, Check } from "lucide-react" 
import Image from "next/image"

export default function SdkShowCase() {
  const installCmd = "npm install @azen-sh/sdk"

  const code = `import Azen from '@azen-sh/sdk';

const client = new Azen({
  apiKey: process.env['AZEN_API_KEY'],
});

const response = await client.memory.create({ text: 'I love hiking in the mountains' });

console.log(response);`

  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(null), 1200)
  }

  const highlighted = Prism.highlight(
    code,
    Prism.languages.typescript as Prism.Grammar,
    "typescript"
  )  

  return (
    <section className="relative bg-black text-white py-28 px-6 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block mb-3 px-3 py-1 rounded-full text-sm bg-white/10 text-[#E6E6E6]">
            Get Started
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-[#E6E6E6] leading-tight">
            Integrate in minutes
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            We provide SDK for memory integration for your agents — get up and running instantly
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="w-full">
            <div className="relative rounded-3xl bg-[#0f1113] border border-neutral-900 shadow-2xl overflow-hidden">
              <div className="absolute inset-0">
                <Image 
                  src="/snippetbg2.png"
                  alt="snippetbg"
                  fill
                  className="object-cover"
                  priority
                />                
              </div>

              <div className="relative p-4 md:p-6">
                <div className="bg-[#0b0d0f] border border-neutral-800 rounded-xl overflow-hidden">
                  
                  <div className="relative p-4 md:p-5">
                    <span className="block mb-2 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Install</span>
                    
                    <button
                      onClick={() => copy(installCmd, "install")}
                      className="absolute top-4 right-4 z-10 rounded-md bg-white/5 hover:bg-white/10 p-2 transition-colors"
                      aria-label="Copy install command"
                    >
                      {copied === "install" ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </button>

                    <pre className="text-xs md:text-sm font-mono text-[#E6E6E6] overflow-x-auto">
                      <code>{installCmd}</code>
                    </pre>
                  </div>

                  <div className="border-t border-neutral-800/60 mx-4" />

                  <div className="relative p-4 md:p-5">
                    <span className="block mb-2 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Quick start</span>

                    <button
                      onClick={() => copy(code, "code")}
                      className="absolute top-4 right-4 z-10 rounded-md bg-white/5 hover:bg-white/10 p-2 transition-colors"
                      aria-label="Copy code"
                    >
                      {copied === "code" ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </button>

                    <pre className="text-xs md:text-sm font-mono leading-relaxed max-h-[420px] overflow-auto text-[#E6E6E6] custom-scrollbar">
                      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
