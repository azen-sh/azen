import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Cards from "@/components/cards"
import Footer from "@/components/footer"
import CTA from "@/components/cta"
import DashboardPreview from "@/components/dashboardPreview"
import UseCases from "@/components/usecases"
import ApiShowcase from "@/components/ApiShowcase"
import Features from "@/components/features"

export default function Page() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <Features />
      <Cards />
      <ApiShowcase />
      <UseCases />
      <DashboardPreview />
      <CTA />
      <Footer />
    </main>
  )
}
