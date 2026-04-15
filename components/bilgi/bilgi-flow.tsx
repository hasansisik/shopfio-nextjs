"use client"

import { useState } from "react"
import { StepTerms, StepPreCheck, StepPersonal, StepBirthDate, StepIBAN, StepKYC, StepSuccess, StepShopifyLogin } from "./steps"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import Image from "next/image"

import { useSearchParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { createApplication } from "@/redux/actions/applicationActions"
import { plans } from "@/lib/pricing-data"

export function BilgiFlow() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.application)

  const planId = searchParams.get("plan") || "pro"
  const method = searchParams.get("method") || "transfer"
  const selectedPlan = plans.find(p => p.id === planId) || plans[1]

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
    setStep(3)
  }

  const handleFinalSubmit = async () => {
    const payload = {
      package: selectedPlan,
      paymentMethod: method,
      formData: {
        ...formData,
        hasShopify
      }
    }

    const result = await dispatch(createApplication(payload))
    if (createApplication.fulfilled.match(result)) {
      toast.success("Başvurunuz başarıyla alındı!")
      nextStep()
    } else {
      toast.error(result.payload as string || "Bir hata oluştu")
    }
  }

  const nextStep = () => {
    const maxSteps = hasShopify ? 8 : 7
    setStep(prev => Math.min(prev + 1, maxSteps))
  }

  const prevStep = () => {
    if (step === 3) {
      setHasShopify(null)
      setStep(2)
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
              {/* STEP 1: Terms */}
              {step === 1 && <StepTerms onNext={() => setStep(2)} />}

              {/* STEP 2: Pre-Check */}
              {step === 2 && <StepPreCheck onSelect={handlePreCheck} />}

              {/* Step 3: Personal Info */}
              {step === 3 && <StepPersonal data={formData} updateData={updateData} onNext={nextStep} />}

              {/* Common Steps after Personal */}
              {/* Step Birth Date */}
              {step === 4 && <StepBirthDate data={formData} updateData={updateData} onNext={nextStep} onBack={prevStep} />}

              {/* Step IBAN */}
              {step === 5 && <StepIBAN data={formData} updateData={updateData} onNext={nextStep} onBack={prevStep} />}

              {/* Step KYC */}
              {step === 6 && (
                <StepKYC 
                  data={formData} 
                  updateData={updateData} 
                  onNext={hasShopify ? nextStep : handleFinalSubmit} 
                  onBack={prevStep} 
                  loading={loading}
                />
              )}

              {/* Conditional Shopify Step (Moved to after KYC) */}
              {hasShopify && step === 7 && (
                <StepShopifyLogin 
                  data={formData} 
                  updateData={updateData} 
                  onNext={handleFinalSubmit} 
                  onBack={prevStep} 
                  loading={loading}
                />
              )}

              {/* Step Success */}
              {((hasShopify && step === 8) || (!hasShopify && step === 7)) && (
                <StepSuccess onNext={() => router.push("/panel/basvurular")} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        {hasShopify !== null && step > 2 && step < (hasShopify ? 8 : 7) && (
          <div className="pb-12 flex justify-center gap-3">
            {Array.from({ length: hasShopify ? 5 : 4 }).map((_, idx) => {
              const i = idx + 3; // Offset for Step 1/2 being Terms and PreCheck
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
        <Image src="/logo.png" alt="shopfio Logo" width={100} height={32} className="h-8 w-auto object-contain" />
        <div className="px-2 py-0.5 rounded bg-gray-200 text-gray-500 text-[10px] font-bold tracking-wider">Onboarding</div>
      </div>
    </div>
  )
}
