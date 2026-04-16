"use client"

import { useState } from "react"
import { StepTerms, StepPreCheck, StepPersonal, StepBirthDate, StepIBAN, StepKYC, StepSuccess, StepShopifyLogin } from "./steps"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Star } from "lucide-react"
import Image from "next/image"

import { useSearchParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { createApplication } from "@/redux/actions/applicationActions"
import { plans } from "@/lib/pricing-data"
import { server } from "@/config"

import { loadUser, createSubs } from "@/redux/actions/userActions"
import * as React from "react"

export function BilgiFlow() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.application)
  const { user } = useAppSelector((state) => state.user)

  const [retryCount, setRetryCount] = React.useState(0)
  const processedRef = React.useRef<Set<string>>(new Set());
  
  React.useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  // Trigger createSubs and then poll for entitlements
  React.useEffect(() => {
    const isSuccess = searchParams.get("paymentStatus") === "success";
    const oid = searchParams.get("oid");
    const hasEntitlement = user?.entitlements?.some((e: any) => !e.isUsed);

    // Frontend guard: Only trigger once per OID in this component instance
    if (isSuccess && oid && !hasEntitlement && !processedRef.current.has(oid)) {
      processedRef.current.add(oid);
      dispatch(createSubs(oid)).then(() => {
        dispatch(loadUser());
      });
    }

    if (isSuccess && !hasEntitlement && retryCount < 5) {
      const timer = setTimeout(() => {
        dispatch(loadUser()).then(() => {
          setRetryCount(prev => prev + 1);
        });
      }, 2000); // Retry every 2 seconds
      return () => clearTimeout(timer);
    }
  }, [searchParams, user, retryCount, dispatch]);

  // Notify parent window (PaymentDialog) if we are in an iframe and payment was successful
  React.useEffect(() => {
    const isSuccess = searchParams.get("paymentStatus") === "success";
    if (isSuccess && window.parent !== window) {
      window.parent.postMessage('paytr_success', '*');
    }
  }, [searchParams]);

  const planId = searchParams.get("plan") || "pro"
  const method = searchParams.get("method") || "transfer"
  
  // Find if user has a valid entitlement for any package
  const activeEntitlement = user?.entitlements?.find((e: any) => !e.isUsed);
  const isPayTRSuccess = searchParams.get("paymentStatus") === "success";
  
  // Priority: 1. Active Entitlement, 2. URL param, 3. Default Pro
  const finalPlanId = activeEntitlement?.packageId || planId;
  const selectedPlan = plans.find(p => p.id === finalPlanId) || plans[1]

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
      paymentMethod: (activeEntitlement || isPayTRSuccess) ? 'card' : method,
      formData: {
        ...formData,
        hasShopify
      }
    }

    const result = await dispatch(createApplication(payload))
    if (createApplication.fulfilled.match(result)) {
      toast.success("Başvurunuz başarıyla alındı!")
      dispatch(loadUser()) // Refresh entitlements
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
  };
  const [isAuthorized, setIsAuthorized] = React.useState<boolean | null>(null)

  // Authorization Check
  React.useEffect(() => {
    if (!user) return;

    const checkAuth = async () => {
      // Check for active entitlement (card)
      const hasEntitlement = user.entitlements?.some((e: any) => !e.isUsed);
      
      // Check for pending skeleton app (transfer/card)
      let hasPendingApp = false;
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${server}/applications`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        hasPendingApp = data.applications?.some((a: any) => 
            a.status === 'Ödeme Bekleniyor' || a.status === 'Bilgi Bekleniyor'
        );
      } catch (e) {
        console.error("Auth check failed", e);
      }

      if (!hasEntitlement && !hasPendingApp && !isPayTRSuccess) {
        toast.error("Geçerli bir ödemeniz bulunmuyor. Lütfen önce plan seçin.");
        router.push("/panel");
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    };

    checkAuth();
  }, [user, router, isPayTRSuccess]);

  if (isAuthorized === null || loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 gap-4">
        <div className="w-12 h-12 border-4 border-[#95BF47]/20 border-t-[#95BF47] rounded-full animate-spin" />
        <p className="text-sm font-bold text-gray-400 animate-pulse uppercase tracking-widest">Yetkilendirme kontrol ediliyor...</p>
      </div>
    )
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
              {/* Header Info for Entitlements or Transfer */}
              {(activeEntitlement || isPayTRSuccess || method === 'transfer') && step < (hasShopify ? 8 : 7) && (
                <div className={cn(
                  "mb-8 p-4 border rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500",
                  (activeEntitlement || isPayTRSuccess) ? "bg-[#95BF47]/10 border-[#95BF47]/20" : "bg-orange-50 border-orange-100"
                )}>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg",
                      (activeEntitlement || isPayTRSuccess) ? "bg-[#95BF47] shadow-[#95BF47]/20" : "bg-orange-500 shadow-orange-500/20"
                    )}>
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-gray-900 leading-none">
                        {(activeEntitlement || isPayTRSuccess) ? "Kredi Kartı Ödemesi Onaylandı" : "Havale / EFT Ödemesi Seçildi"}
                      </h4>
                      <p className={cn(
                        "text-[10px] font-bold uppercase mt-1",
                        (activeEntitlement || isPayTRSuccess) ? "text-[#95BF47]" : "text-orange-500"
                      )}>
                        {activeEntitlement ? activeEntitlement.packageName : selectedPlan.name} PAKETİ
                      </p>
                    </div>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-lg border text-[10px] font-black",
                    (activeEntitlement || isPayTRSuccess) 
                      ? "bg-white border-[#95BF47]/20 text-[#95BF47]" 
                      : "bg-white border-orange-100 text-orange-500"
                  )}>
                    {(activeEntitlement || isPayTRSuccess) ? "ÖDEME ONAYLANDI" : "ÖDEME BEKLENİYOR"}
                  </div>
                </div>
              )}

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
                <StepSuccess 
                  onNext={() => router.push("/panel/basvurular")} 
                  isTransfer={method === 'transfer' && !activeEntitlement}
                />
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
