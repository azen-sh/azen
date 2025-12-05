import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black py-16 px-6 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Logo + Name */}
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-neutral-800 flex items-center justify-center text-white text-xl">
              A
            </div>

            <h3 className="text-lg font-semibold text-white tracking-tight">
              Azen
            </h3>

            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Azen is a memory layer for AI applications and agents.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-light">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Features</a></li>
              <li><a href="#" className="hover:text-white transition">Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-light">
              <li><a href="#" className="hover:text-white transition">Docs</a></li>
              <li><a href="#" className="hover:text-white transition">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition">Guides</a></li>
              <li><a href="#" className="hover:text-white transition">Examples</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-light">
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-light">
            © 2025 Azen. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
