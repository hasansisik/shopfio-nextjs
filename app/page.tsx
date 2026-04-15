import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Onboarding } from "@/components/landing/onboarding"
import { CaseStudies } from "@/components/landing/case-studies"
import { Pricing } from "@/components/landing/pricing"
import { FAQ } from "@/components/landing/faq"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Onboarding />
        <Pricing />
        <FAQ />
        <CTASection />
        <Footer />
      </main>
    </div>
  )
}
