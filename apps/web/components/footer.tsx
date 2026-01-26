import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image"
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black py-16 px-6 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-neutral-900 flex items-center justify-center text-white text-xl">
              <Image
                src="/logo.png"
                alt="Azen Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <h3 className="font-semibold font-inter bg-linear-to-b from-[#F2F2F2] via-[#CFCFCF] to-[#9A9A9A] bg-clip-text text-transparent">
              Azen
            </h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Azen is a memory layer for AI applications and agents.
            </p>
          </div>

          <div>
            <h4 className="text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-light">
              <li><a href="/about" className="hover:text-white transition">About</a></li>
              <li><a href="https://app.azen.sh" className="hover:text-white transition">Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-light">
              <li><a href="https://docs.azen.sh" className="hover:text-white transition">Docs</a></li>
              <li><a href="https://docs.azen.sh/api-reference/introduction" className="hover:text-white transition">API Reference</a></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-light">
              <li><a href="mailto:govindvashishat@gmail.com" className="hover:text-white transition">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-light">
            © {new Date().getFullYear()} Azen. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a 
              href="https://x.com/Govind_vash02" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white transition">
              <FaXTwitter size={20} />
            </a>
            <a 
              href="https://github.com/azen-sh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white transition">
              <FaGithub size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/govind-vashishat-217701319/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white transition">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}