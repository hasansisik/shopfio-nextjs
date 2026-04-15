import { BilgiFlow } from "@/components/bilgi/bilgi-flow"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Bilgi Alın | shopfio",
  description: "Deneyiminizi kişiselleştirin ve dilediğiniz hedeflere ulaşın.",
}

export default function BilgiPage() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-12 h-12 border-4 border-[#95BF47]/20 border-t-[#95BF47] rounded-full animate-spin" />
        </div>
      }>
        <BilgiFlow />
      </Suspense>
    </main>
  )
}
