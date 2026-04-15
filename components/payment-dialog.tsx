"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  Check, 
  ChevronRight, 
  CreditCard, 
  Building2, 
  Globe, 
  Bitcoin as BtcIcon, 
  ArrowLeft,
  Zap,
  ShieldCheck,
  Star,
  Copy,
  Plus,
  Clock,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { plans, comparisonFeatures } from "@/lib/pricing-data"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { createPortal } from "react-dom"
import Image from "next/image"
import { server } from "@/config"

interface PaymentDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function PaymentDialog({ isOpen, onClose }: PaymentDialogProps) {
  const router = useRouter()
  const [step, setStep] = React.useState<"plans" | "payment" | "status">("plans")
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>("pro")
  const [selectedMethod, setSelectedMethod] = React.useState<"transfer" | "card" | "payoneer" | "crypto">("transfer")
  const [mounted, setMounted] = React.useState(false)
  const [bankMethods, setBankMethods] = React.useState<any[]>([])
  const [paytrToken, setPaytrToken] = React.useState<string | null>(null)
  const [isLoadingPaytr, setIsLoadingPaytr] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    
    // Fetch dynamic public settings
    fetch(`${server}/auth/settings`)
      .then(res => res.json())
      .then(data => {
         if (data?.settings?.paymentMethods) {
             setBankMethods(data.settings.paymentMethods)
         }
      })
      .catch(console.error)

    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      setStep("plans")
      setPaytrToken(null)
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  React.useEffect(() => {
    if (step === "payment" && selectedMethod === "card" && !paytrToken && !isLoadingPaytr) {
      setIsLoadingPaytr(true);
      fetch(`${server}/paytr/token`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            amount: 1500, // Example package price or selected plan price
            email: "musteri@ornek.com", // Müşteri detayları
            merchantOid: "SF" + Date.now(),
         })
      })
      .then(r => r.json())
      .then(data => {
         if (data.token) {
            setPaytrToken(data.token);
            // inject iframe resizer
            const script = document.createElement('script');
            script.src = "https://www.paytr.com/js/iframeResizer.min.js";
            script.onload = () => {
                if ((window as any).iFrameResize) {
                    (window as any).iFrameResize({},'#paytriframe');
                }
            }
            document.body.appendChild(script);
         } else {
            console.error("PayTR Token Hatası", data);
         }
      })
      .catch(console.error)
      .finally(() => {
         setIsLoadingPaytr(false);
      });
    }
  }, [step, selectedMethod]);

  const handleComplete = () => {
    onClose()
    router.push("/basvuru")
  }

  const paymentMethods = [
    { id: "transfer", label: "Havale / EFT", icon: Building2, color: "bg-orange-500" },
    { id: "card", label: "Kredi Kartı (PayTR)", icon: CreditCard, color: "bg-blue-500" },
  ]

  // Steps animations
  const stepsVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }

  if (!mounted) return null

  const dialogContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000000] overflow-y-auto isolate">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-2xl cursor-pointer"
          />

          {/* Dialog Container */}
          <div className="fixed inset-0 w-full h-full bg-[#fbfbfb] flex flex-col isolate">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="flex-1 flex flex-col h-full w-full"
            >
              {/* Header */}
              <div className="p-3 md:p-5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0 sticky top-0 z-20">
                 <div className="flex items-center gap-6 max-w-[1200px] mx-auto w-full">
                    <div className="flex items-center gap-4">
                       <div className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center">
                          <Image
                            src="/logo.png"
                            alt="Shopfio Logo"
                            width={120}
                            height={120}
                            className="object-contain"
                            priority
                          />
                       </div>
                       <div>
                          <h2 className="text-base md:text-lg font-bold text-gray-900 tracking-tight leading-none">Yeni başvuru süreci</h2>
                          <div className="flex items-center gap-2 mt-1">
                             <div className={cn("w-1.5 h-1.5 rounded-full transition-colors", step === "plans" ? "bg-[#95BF47]" : "bg-gray-200")} />
                             <div className={cn("w-1.5 h-1.5 rounded-full transition-colors", step === "payment" ? "bg-[#95BF47]" : "bg-gray-200")} />
                             <div className={cn("w-1.5 h-1.5 rounded-full transition-colors", step === "status" ? "bg-[#95BF47]" : "bg-gray-200")} />
                             <span className="text-[10px] font-semibold text-gray-400 ml-1">
                                {step === "plans" ? "Plan seçimi" : step === "payment" ? "Ödeme yapılandırması" : "İşlem durumu"}
                             </span>
                          </div>
                       </div>
                    </div>
                    <div className="flex-1" />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={onClose}
                      className="w-10 h-10 rounded-xl hover:bg-gray-50 text-gray-400"
                    >
                       <X className="w-6 h-6 font-light" />
                    </Button>
                 </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto bg-[#fdfdfd]">
                 <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 md:py-14">
                    <AnimatePresence mode="wait">
                       {step === "plans" ? (
                         <motion.div 
                           key="plans"
                           {...stepsVariants}
                           className="space-y-10"
                         >
                            <div className="text-center space-y-2 max-w-2xl mx-auto">
                               <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight">İşinizi global'e taşıyın</h3>
                               <p className="text-[13px] text-gray-400 font-medium leading-relaxed">
                                 Bütçenize ve ihtiyacınıza uygun Shopify paketlerinden birini seçin.
                               </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
                               {plans.map((plan, i) => {
                                  const isPro = plan.id === "pro";
                                  return (
                                     <button
                                       key={plan.id}
                                       onClick={() => setSelectedPlan(plan.id)}
                                       className={cn(
                                         "relative flex flex-col p-6 md:p-8 rounded-[32px] border-2 transition-all duration-500 text-left group",
                                         selectedPlan === plan.id 
                                            ? isPro ? "border-[#95BF47] bg-[#95BF47] shadow-2xl shadow-[#95BF47]/30 scale-[1.02] z-10" : "border-[#95BF47] bg-white shadow-2xl shadow-[#95BF47]/10" 
                                            : "border-gray-100 bg-white shadow-sm hover:border-[#95BF47]/30"
                                       )}
                                     >
                                        {isPro && (
                                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-tight whitespace-nowrap shadow-lg">
                                             En popüler
                                          </div>
                                        )}

                                        <div className="space-y-4 mb-8">
                                           <div className="space-y-0.5">
                                              <span className={cn(
                                                 "text-[10px] font-bold leading-none",
                                                 isPro && selectedPlan === plan.id ? "text-white/70" : "text-[#95BF47]"
                                              )}>{plan.name}</span>
                                              <div className="flex items-baseline gap-1">
                                                 <span className={cn(
                                                    "text-3xl font-bold tracking-tight",
                                                    isPro && selectedPlan === plan.id ? "text-white" : "text-gray-900"
                                                 )}>₺{plan.price}</span>
                                                 <span className={cn(
                                                    "text-[10px] font-medium opacity-60",
                                                    isPro && selectedPlan === plan.id ? "text-white" : "text-gray-400"
                                                 )}>'den başlayan</span>
                                              </div>
                                           </div>
                                           <p className={cn(
                                              "text-[11px] font-medium leading-relaxed opacity-80",
                                              isPro && selectedPlan === plan.id ? "text-white" : "text-gray-500"
                                           )}>{plan.description}</p>
                                        </div>

                                        <div className="space-y-4 mb-auto">
                                           {comparisonFeatures.map((feature, featureIdx) => {
                                              const isAvailable = i === 0 ? feature.small : i === 1 ? feature.medium : feature.full;
                                              return (
                                                 <div key={featureIdx} className={cn(
                                                   "flex items-center gap-3 transition-opacity",
                                                   !isAvailable && "opacity-20"
                                                 )}>
                                                    <div className={cn(
                                                       "w-5 h-5 rounded-full flex items-center justify-center shrink-0 border",
                                                       isPro && selectedPlan === plan.id 
                                                          ? isAvailable ? "bg-white text-[#95BF47] border-white" : "bg-transparent text-white/30 border-white/20"
                                                          : isAvailable ? "bg-[#95BF47]/10 text-[#95BF47] border-transparent" : "bg-gray-100/50 text-gray-300 border-transparent"
                                                    )}>
                                                       <Check className={cn("w-3 h-3 stroke-[4]", !isAvailable && "opacity-0")} />
                                                    </div>
                                                    <span className={cn(
                                                       "text-[11px] font-bold",
                                                       isPro && selectedPlan === plan.id ? "text-white" : "text-gray-700"
                                                    )}>{feature.name}</span>
                                                 </div>
                                              )
                                           })}
                                        </div>

                                        <div className={cn(
                                           "w-full h-11 mt-8 rounded-xl flex items-center justify-center font-bold text-[11px] transition-all",
                                           selectedPlan === plan.id 
                                              ? isPro ? "bg-white text-[#95BF47] shadow-lg" : "bg-[#95BF47] text-white shadow-lg" 
                                              : "bg-gray-100 text-gray-400 group-hover:bg-[#95BF47] group-hover:text-white"
                                        )}>
                                           {selectedPlan === plan.id ? "Seçildi" : "Paketi seç"}
                                        </div>
                                     </button>
                                  )
                               })}
                            </div>
                         </motion.div>
                       ) : step === "payment" ? (
                         <motion.div 
                           key="payment"
                           {...stepsVariants}
                           className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
                         >
                            <div className="lg:col-span-8 space-y-10">
                               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                  {paymentMethods.map((method) => (
                                     <button
                                        key={method.id}
                                        onClick={() => setSelectedMethod(method.id as any)}
                                        className={cn(
                                           "p-4 md:p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 group aspect-square justify-center",
                                           selectedMethod === method.id 
                                              ? "border-[#95BF47] bg-white shadow-lg shadow-[#95BF47]/5" 
                                              : "border-gray-50 bg-white hover:border-[#95BF47]/20"
                                        )}
                                     >
                                        <div className={cn("w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105", method.color)}>
                                           <method.icon className="w-6 h-6 md:w-7 md:h-7" />
                                        </div>
                                        <span className={cn(
                                           "text-[10px] font-bold text-center leading-tight",
                                           selectedMethod === method.id ? "text-gray-900" : "text-gray-400"
                                        )}>{method.label}</span>
                                     </button>
                                  ))}
                               </div>

                               {/* Method Selection Feedback UI */}
                               <div className="bg-white rounded-[32px] p-8 md:p-12 border border-gray-100 shadow-sm min-h-[350px] flex flex-col items-center justify-center text-center">
                                  {selectedMethod === "card" && (
                                     <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
                                        {!paytrToken ? (
                                          <div className="flex flex-col items-center justify-center py-10 space-y-4">
                                             <div className="w-16 h-16 border-4 border-[#95BF47] border-t-transparent rounded-full animate-spin"></div>
                                             <p className="text-gray-500 font-medium text-sm">Güvenli ödeme altyapısı yükleniyor...</p>
                                          </div>
                                        ) : (
                                          <div className="w-full min-h-[500px] border border-gray-100 rounded-3xl overflow-hidden bg-white shadow-inner relative">
                                            <script src="https://www.paytr.com/js/iframeResizer.min.js"></script>
                                            <iframe 
                                                src={`https://www.paytr.com/odeme/guvenli/${paytrToken}`} 
                                                id="paytriframe" 
                                                frameBorder="0" 
                                                scrolling="no" 
                                                style={{ width: "100%", minHeight: "600px" }}
                                            />
                                          </div>
                                        )}
                                        {/* Security Badges */}
                                        <div className="flex items-center justify-center gap-3 opacity-50 mt-4">
                                          <div className="px-4 py-2 bg-gray-50 rounded-xl text-[10px] font-bold text-gray-400">Mastercard</div>
                                          <div className="px-4 py-2 bg-gray-50 rounded-xl text-[10px] font-bold text-gray-400">VISA</div>
                                          <div className="px-4 py-2 bg-gray-50 rounded-xl text-[10px] font-bold text-gray-400">AMEX</div>
                                          <div className="px-4 py-2 bg-gray-50 rounded-xl text-[10px] font-bold text-gray-400">256-bit SSL</div>
                                        </div>
                                     </div>
                                  )}

                                  {selectedMethod === "transfer" && (
                                     <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500 text-left">
                                        <div className="text-center space-y-2 mb-8">
                                          <h4 className="text-xl font-bold text-gray-900">Banka transferi bilgileri</h4>
                                          <p className="text-xs text-gray-400">Ödemeyi aşağıdaki IBAN adresine gönderin.</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          {bankMethods.length > 0 ? bankMethods.map((item, idx) => (
                                            <div key={idx} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 space-y-3 relative group">
                                              <div className="flex justify-between items-start">
                                                <div>
                                                  <p className="text-[10px] font-bold text-[#95BF47]">{item.name}</p>
                                                  <p className="text-[11px] font-bold text-gray-900 mt-1">{item.holderName}</p>
                                                </div>
                                                <button className="text-gray-300 hover:text-[#95BF47] transition-colors">
                                                  <Copy className="w-4 h-4" />
                                                </button>
                                              </div>
                                              <p className="text-[10px] font-mono font-medium text-gray-500 break-all bg-white p-2 rounded-lg border border-gray-100">{item.iban}</p>
                                            </div>
                                          )) : (
                                             <div className="col-span-2 text-center py-4 text-xs font-bold text-gray-400">Aktif banka hesabı bulunamadı.</div>
                                          )}
                                        </div>
                                     </div>
                                  )}
                               </div>
                            </div>

                            {/* Right Sidebar: Summary */}
                            <div className="lg:col-span-4 space-y-8">
                               <div className="bg-gray-900 rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl min-h-[350px] flex flex-col justify-between">
                                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#95BF47]/20 blur-[100px] rounded-full" />
                                  <div className="relative z-10 space-y-10">
                                     <div className="space-y-2">
                                        <span className="text-[10px] font-bold text-[#95BF47]">Sipariş özeti</span>
                                        <h4 className="text-2xl font-bold text-white tracking-tight leading-none">Ödeme bilgisi</h4>
                                     </div>
                                     
                                     <div className="space-y-6">
                                        <div className="flex justify-between items-center text-[11px] font-semibold text-gray-400">
                                           <span>Seçilen paket</span>
                                           <span className="text-white">{plans.find(p => p.id === selectedPlan)?.name}</span>
                                        </div>
                                        <div className="w-full h-[1px] bg-white/10" />
                                        <div className="flex justify-between items-end">
                                           <span className="text-[10px] font-bold text-[#95BF47] mb-2">Toplam tutar</span>
                                           <div className="text-right">
                                              <p className="text-4xl font-bold tracking-tighter">₺{plans.find(p => p.id === selectedPlan)?.price}</p>
                                              <p className="text-[10px] font-medium text-gray-500 mt-1">Vergiler dahil</p>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                                  
                                  <div className="relative z-10 pt-8">
                                     <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <ShieldCheck className="w-5 h-5 text-[#95BF47]" />
                                        <p className="text-[10px] font-bold text-[#95BF47]">Güvenli ödeme</p>
                                     </div>
                                  </div>
                               </div>
                               
                               <div className="bg-white rounded-[32px] p-8 border border-gray-100 flex items-center gap-5 shadow-sm">
                                  <div className="w-12 h-12 bg-[#95BF47]/10 rounded-2xl flex items-center justify-center shrink-0">
                                     <Building2 className="w-6 h-6 text-[#95BF47]" />
                                  </div>
                                  <div className="space-y-0.5">
                                     <p className="text-[11px] font-bold text-gray-900">PCI-DSS Uyumlu</p>
                                     <p className="text-[10px] font-medium text-gray-400 tracking-tight">Küresel güvenlik standardı</p>
                                  </div>
                               </div>
                            </div>
                         </motion.div>
                       ) : (
                         <motion.div 
                           key="status"
                           {...stepsVariants}
                           className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-8"
                         >
                            <div className={cn(
                              "w-32 h-32 rounded-[3rem] flex items-center justify-center shadow-2xl animate-bounce",
                              selectedMethod === "card" ? "bg-[#95BF47]/10 text-[#95BF47]" : "bg-blue-50 text-blue-500"
                            )}>
                               {selectedMethod === "card" ? (
                                 <CheckCircle2 className="w-16 h-16" />
                               ) : (
                                 <Clock className="w-16 h-16" />
                               )}
                            </div>
                            
                            <div className="space-y-4 max-w-md">
                               <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                                  {selectedMethod === "card" ? "Ödeme Başarıyla Tamamlandı!" : "Ödemeniz Kontrol Ediliyor"}
                               </h3>
                               <p className="text-sm font-medium text-gray-400 leading-relaxed">
                                  {selectedMethod === "card" 
                                    ? "Başvurunuz başarıyla alındı. Artık yönetim panelinden sürecinizi takip edebilirsiniz." 
                                    : "Banka transferi bildiriminiz başarıyla alındı. Ekiplerimiz ödemeyi onayladıktan sonra başvurunuz aktif edilecektir."}
                               </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-8">
                               <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Başvuru No</p>
                                  <p className="text-sm font-bold text-gray-900 mt-1">#SF-{(Math.random() * 10000).toFixed(0)}</p>
                               </div>
                               <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Durum</p>
                                  <p className={cn("text-sm font-bold mt-1", selectedMethod === "card" ? "text-[#95BF47]" : "text-blue-500")}>
                                     {selectedMethod === "card" ? "Tamamlandı" : "İnceleniyor"}
                                  </p>
                               </div>
                            </div>

                            <Button 
                              onClick={() => window.location.href = '/basvuru'}
                              className="w-full max-w-sm h-14 md:h-16 rounded-2xl bg-[#95BF47] text-white hover:bg-black font-bold text-sm shadow-xl shadow-[#95BF47]/20 transition-all transform hover:-translate-y-1 active:scale-95 group"
                            >
                               Kuruluma başla
                               <ChevronRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
                            </Button>
                         </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
              </div>

              {/* Footer */}
              <div className="p-5 md:p-8 bg-white border-t border-gray-100 sticky bottom-0 z-20">
                 <div className="max-w-[1200px] mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="hidden md:flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
                       <Check className="w-4 h-4 text-[#95BF47] stroke-[4]" />
                       <span className="text-[10px] font-semibold text-gray-500">Kesintisiz teknik destek paneli</span>
                    </div>
                    
                    <div className="flex items-center gap-4 w-full md:w-auto">
                       {step === "payment" && (
                         <Button 
                           variant="ghost" 
                           onClick={() => setStep("plans")}
                           className="flex-1 md:flex-none rounded-2xl h-12 md:h-14 px-8 text-[11px] font-bold text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
                         >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Vazgeç
                         </Button>
                       )}
                       {!(step === "payment" && selectedMethod === "card") && (
                         <Button 
                           onClick={
                             step === "plans" 
                               ? () => {
                                   setStep("payment");
                                 }
                               : () => router.push(`/basvuru?plan=${selectedPlan}&method=${selectedMethod}`)
                           }
                           disabled={step === "plans" && !selectedPlan}
                           className="flex-1 md:flex-none rounded-2xl bg-[#95BF47] text-white hover:bg-black font-bold h-12 md:h-15 px-8 md:px-14 text-[12px] shadow-lg shadow-[#95BF47]/20 transition-all transform hover:-translate-y-0.5 active:scale-95"
                         >
                            {step === "plans" 
                              ? "Ödeme adımına geç" 
                              : "Ödemeyi tamamla & başvur"}
                            <ChevronRight className="w-4 h-4 ml-3" />
                         </Button>
                       )}
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )

  return createPortal(dialogContent, document.body)
}
