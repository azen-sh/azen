import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Privacy Policy | Azen AI Memory Infrastructure",
  description:
    "Privacy Policy for Azen explaining what data is collected, how it is used, and how early access data is handled.",
  robots: "index, follow",
  keywords: [
    "Azen privacy policy",
    "AI memory data privacy",
    "developer API privacy",
  ],
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-[#E6E6E6] px-6 py-24">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="space-y-6">
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
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-lg">
              Last updated: December 2025
            </p>
          </div>
        </header>

        <section className="space-y-8 text-gray-400 leading-relaxed text-sm">
          <p>
            This Privacy Policy explains how Azen collects, uses, and protects
            information during early access.
          </p>

          <h2 className="text-white text-lg">1. Information We Collect</h2>
          <p>
            We may collect email address, account identifiers, API usage logs,
            IP address, stored text memory, and technical diagnostics.
          </p>

          <h2 className="text-white text-lg">2. How We Use Data</h2>
          <p>
            Data is used for authentication, abuse prevention, system
            monitoring, debugging, and improving reliability.
          </p>

          <h2 className="text-white text-lg">3. What We Do NOT Do</h2>
          <p>
            We do not sell user data. We do not train public AI models on private
            memory. We do not access memory unless support is requested.
          </p>

          <h2 className="text-white text-lg">4. Data Storage & Security</h2>
          <p>
            Data is stored using standard cloud infrastructure. Security is
            best-effort during early access.
          </p>

          <h2 className="text-white text-lg">5. Third-Party Services</h2>
          <p>
            We may use third-party providers for hosting, analytics, monitoring,
            and infrastructure operations.
          </p>

          <h2 className="text-white text-lg">6. Cookies</h2>
          <p>
            Cookies may be used for authentication, sessions, and basic
            analytics.
          </p>

          <h2 className="text-white text-lg">7. User Rights</h2>
          <p>
            You may request account deletion, memory deletion, or a basic data
            export.
          </p>

          <h2 className="text-white text-lg">8. Data Retention</h2>
          <p>
            Data is retained while your account is active and deleted after
            reasonable time upon request.
          </p>

          <h2 className="text-white text-lg">9. Children&apos;s Privacy</h2>
          <p>
            Azen is not intended for users under the age of 13.
          </p>

          <h2 className="text-white text-lg">10. Policy Updates</h2>
          <p>
            This Privacy Policy may change as Azen evolves.
          </p>
        </section>
      </div>
    </main>
  )
}
