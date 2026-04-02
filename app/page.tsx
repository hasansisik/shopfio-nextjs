import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        
        {/* Dummy content to allow scrolling and testing header transition */}
        <section className="h-screen bg-gray-50 flex items-center justify-center p-20">
          <div className="max-w-4xl space-y-12">
            <h2 className="text-4xl font-bold text-black text-center">Scroll down to see the header transform</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-8 rounded-2xl bg-white shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl mb-6 flex items-center justify-center text-blue-600 font-bold">
                    {i}
                  </div>
                  <h3 className="text-xl font-bold mb-3">Feature {i}</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Detailed explanation of why this feature is essential for your Shopify store growth.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="h-screen bg-white flex items-center justify-center">
          <h2 className="text-4xl font-bold text-gray-200 uppercase tracking-widest">End of Landing Page</h2>
        </section>
      </main>
    </div>
  )
}
