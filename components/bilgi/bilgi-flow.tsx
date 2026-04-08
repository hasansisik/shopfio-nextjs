"use client"

import { useState } from "react"
import { StepPersonal, StepBirthDate, StepIBAN, StepKYC, StepSuccess } from "./steps"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import Image from "next/image"

export function BilgiFlow() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    iban: "",
    idFront: null,
    idBack: null,
  })

  const updateData = (newData: any) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const totalSteps = 5

  return (
    <div className="min-h-screen bg-[oklch(0.985_0.01_145)] flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      <div className="w-full max-w-4xl overflow-hidden relative z-10">
        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {step === 1 && (
                <StepPersonal 
                  data={formData} 
                  updateData={updateData} 
                  onNext={nextStep} 
                />
              )}
              {step === 2 && (
                <StepBirthDate 
                  data={formData} 
                  updateData={updateData} 
                  onNext={nextStep} 
                  onBack={prevStep} 
                />
              )}
              {step === 3 && (
                <StepIBAN 
                  data={formData} 
                  updateData={updateData} 
                  onNext={nextStep} 
                  onBack={prevStep} 
                />
              )}
              {step === 4 && (
                <StepKYC 
                  data={formData} 
                  updateData={updateData} 
                  onNext={nextStep} 
                  onBack={prevStep} 
                />
              )}
              {step === 5 && (
                <StepSuccess 
                  onNext={() => {
                    toast.success("Panele yönlendiriliyorsunuz...")
                    setTimeout(() => window.location.href = "/panel", 1000)
                  }} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        {step < 5 && (
          <div className="pb-12 flex justify-center gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className={cn(
                  "h-2 transition-all duration-500 rounded-full",
                  step === i ? "w-8 bg-[#95BF47]" : "w-2 bg-gray-200"
                )}
              />
            ))}
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
