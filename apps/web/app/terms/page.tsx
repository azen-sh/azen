import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Terms of Service | Azen AI Memory Infrastructure",
  description:
    "Terms of Service for Azen, an early-access AI memory infrastructure platform for developers. Read usage rules, data ownership, and liability limitations.",
  robots: "index, follow",
  keywords: [
    "Azen terms",
    "AI memory API terms",
    "developer API terms",
    "AI infrastructure legal",
  ],
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-[#E6E6E6] px-6 py-24">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <header className="space-y-6">
          {/* Logo */}
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-neutral-900 flex items-center justify-center text-white text-xl">
            <Image
              src="/logo.png"
              alt="Azen Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>

          <div>
            <span className="inline-block mb-4 px-3 py-1 rounded-full text-sm bg-white/10 text-[#E6E6E6]">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-400 text-lg">
              Last updated: December 2025
            </p>
          </div>
        </header>

        {/* Content */}
        <section className="space-y-8 text-gray-400 leading-relaxed text-sm">
          <p>
            Azen provides AI memory infrastructure APIs for developers. By using
            Azen, you agree to the following Terms of Service. If you do not
            agree, you may not use the platform.
          </p>

          <h2 className="text-white text-lg">1. Early Access / MVP Status</h2>
          <p>
            Azen is currently in early access and intended only for development,
            testing, and experimentation. The platform is not production-ready,
            and reliability, availability, and security are best-effort only.
          </p>

          <h2 className="text-white text-lg">2. Eligibility</h2>
          <p>
            You must be at least 18 years old and legally permitted to use
            software APIs to access Azen.
          </p>

          <h2 className="text-white text-lg">3. Accounts & API Keys</h2>
          <p>
            You are fully responsible for your account and API keys. Any misuse,
            abuse, or leaked credentials are your responsibility. Azen may
            revoke or suspend access at any time.
          </p>

          <h2 className="text-white text-lg">4. Acceptable Use</h2>
          <p>
            You may not use Azen to store or distribute illegal content, malware,
            attempt infrastructure attacks, or abuse the system in any form.
          </p>

          <h2 className="text-white text-lg">5. Free Access</h2>
          <p>
            Azen is currently 100% free during the MVP phase. Pricing, limits,
            and plans may be introduced in the future with notice.
          </p>

          <h2 className="text-white text-lg">6. Data Ownership</h2>
          <p>
            You fully own all memory, text, and metadata stored on Azen. Azen
            does not claim ownership of your data and only processes it to
            operate the service.
          </p>

          <h2 className="text-white text-lg">7. AI & Memory Disclaimer</h2>
          <p>
            Azen does not verify the accuracy of memory. We are not responsible
            for decisions, AI outputs, or outcomes generated using stored
            memory.
          </p>

          <h2 className="text-white text-lg">8. Security Disclaimer</h2>
          <p>
            Security is best-effort during early access. Do not store sensitive
            personal, financial, medical, or production secrets.
          </p>

          <h2 className="text-white text-lg">9. Service Availability</h2>
          <p>
            Azen is provided on an “as-is” and “as-available” basis. We do not
            guarantee uptime or durability.
          </p>

          <h2 className="text-white text-lg">10. Termination</h2>
          <p>
            We reserve the right to terminate or suspend access at any time for
            abuse or violations.
          </p>

          <h2 className="text-white text-lg">11. Limitation of Liability</h2>
          <p>
            Azen is not liable for data loss, system failures, downtime, or
            business losses. Usage is entirely at your own risk.
          </p>

          <h2 className="text-white text-lg">12. Governing Law</h2>
          <p>
          These Terms shall be governed by and interpreted in accordance with applicable international laws, without regard to conflict of law principles.
          </p>
        </section>
      </div>
    </main>
  )
}
