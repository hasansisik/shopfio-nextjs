import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />

        <section className="h-screen bg-white flex items-center justify-center">
          <h2 className="text-4xl font-bold text-gray-200 uppercase tracking-widest">End of Landing Page</h2>
        </section>
      </main>
    </div>
  )
}
