import { BilgiFlow } from "@/components/bilgi/bilgi-flow"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bilgi Alın | Shoprio",
  description: "Deneyiminizi kişiselleştirin ve dilediğiniz hedeflere ulaşın.",
}

export default function BilgiPage() {
  return (
    <main className="min-h-screen bg-white">
      <BilgiFlow />
    </main>
  )
}
