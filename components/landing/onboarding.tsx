"use client"

import Image from "next/image"
import { Rocket, Box, LineChart, Globe } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

const steps = [
  {
    id: "01",
    step: "STEP 1",
    title: "İşletmenizi Bağlayın",
    description: "Ödemelerinizi kolayca bağlayın ve mağazanızı senkronize edin. Shopfio sizi hızlıca onaylatır ve satışa başlamanızı sağlar.",
    image: "/o1.avif",
    bgIcon: Globe,
    color: "#3B82F6"
  },
  {
    id: "02",
    step: "STEP 2",
    title: "Stratejinizi Belirleyin",
    description: "Size özel büyüme planınızı oluşturun ve abonelik modellerini hayata geçirin. Her işletme için özelleştirilmiş ölçeklendirme yolları.",
    image: "/o2.avif",
    bgIcon: Box,
    color: "#8B5CF6"
  },
  {
    id: "03",
    step: "STEP 3",
    title: "Gelire Dönüştürün",
    description: "Tıklamaları nakit akışına dönüştüren optimize edilmiş ödeme sayfalarıyla cirolarınızı artırın. Akıllı upsell ve sepet kontrolü.",
    image: "/o3.avif",
    bgIcon: Rocket,
    color: "#10B981"
  },
  {
    id: "04",
    step: "STEP 4",
    title: "Otomatik Pilotta Büyütün",
    description: "Gerçek zamanlı analizlerle veriye dayalı kararlar alın ve mağazanızı otomatik olarak ölçeklendirin. Eksiksiz uzman desteği yanınızda.",
    image: "/o4.avif",
    bgIcon: LineChart,
    color: "#95BF47"
  }
]

interface OnboardingCardProps {
  step: typeof steps[0]
  index: number
  scrollYProgress: any
}

function OnboardingCard({ step, index, totalSteps }: { step: typeof steps[0], index: number, totalSteps: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Start scaling down when it's reaching the top
  const scale = useTransform(scrollYProgress, [0.5, 0.8], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0.8]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "sticky top-32 md:top-40 w-full mb-16 md:mb-32 last:mb-16",
        index === 0 ? "pt-0" : "pt-0"
      )}
      style={{ zIndex: index + 10 }}
    >
      <motion.div
        style={{ scale, opacity }}
        className="w-full max-w-[940px] h-[360px] md:h-[460px] mx-auto bg-white rounded-[20px] md:rounded-[32px] border border-gray-100 shadow-[0_30px_70px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row items-stretch"
      >
        {/* Left Side: Content */}
        <div className="relative flex-1 p-8 md:p-12 flex flex-col justify-center">
          <div className="absolute top-0 left-0 p-8 md:p-12 opacity-[0.03] select-none pointer-events-none">
             <span className="text-[100px] md:text-[160px] font-bold leading-none tracking-tighter text-black">
                  {step.id}
             </span>
          </div>

          <div className="relative z-10">
              <div className={cn(
                  "inline-flex px-3 py-1 rounded-lg text-[9px] font-bold tracking-widest text-white shadow-md mb-5 uppercase",
                  index === 0 ? "bg-blue-500" : index === 1 ? "bg-purple-500" : index === 2 ? "bg-emerald-500" : "bg-[#95BF47]"
              )}>
              {step.step}
              </div>
              <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight leading-tight">
              {step.title}
              </h3>
              <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed max-w-[340px]">
              {step.description}
              </p>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="flex-[1.1] relative bg-[#F9FAFB] flex items-center justify-center p-4 md:p-6">
           <div className="relative w-full h-full rounded-xl md:rounded-[20px] overflow-hidden shadow-lg border border-gray-100/50">
              <Image 
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                  priority
              />
           </div>
        </div>
      </motion.div>
    </div>
  )
}

export function Onboarding() {
  return (
    <section id="onboarding" className="relative w-full py-20 bg-[oklch(0.985_0.01_145)]">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Header - Fixed height/spacing to avoid overlap */}
        <div className="flex flex-col items-center mb-20 md:mb-32">
          <div className="mb-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm">
            <div className="flex items-center justify-center bg-[#95bf47]/10 w-7 h-7 rounded-lg overflow-hidden p-1.5">
              <Image src="/shopify.png" alt="Shopify" width={18} height={18} className="object-contain" />
            </div>
            <span className="text-xs font-bold tracking-tight text-gray-700">Dakikalar İçinden Katılım</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight text-center">
             <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#95BF47] to-[#5BB13C]">Shopfio</span> Nasıl Çalışır?
          </h2>
        </div>

        {/* Cards Stack using Natural Sticky Stacking */}
        <div className="relative flex flex-col">
          {steps.map((step, index) => (
            <OnboardingCard 
                key={step.id}
                step={step}
                index={index}
                totalSteps={steps.length}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
