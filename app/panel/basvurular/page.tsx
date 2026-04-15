"use client"

import { 
  Plus, 
  CheckCircle2, 
  ArrowUpRight, 
  ShoppingBag, 
  Search,
  Filter,
  MoreVertical,
  Activity,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import PaymentDialog from "@/components/payment-dialog"
import * as React from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { getUserApplications } from "@/redux/actions/applicationActions"

function ApplicationTracker({ app, index }: { app: any, index: number }) {
  const getIcon = (pkgName: string) => {
    if (pkgName?.includes("Full")) return Zap
    return ShoppingBag
  }

  const getColor = (pkgName: string) => {
    if (pkgName?.includes("Full")) return "bg-orange-500"
    if (pkgName?.includes("Profesyonel")) return "bg-[#95BF47]"
    return "bg-blue-500"
  }

  const Icon = getIcon(app.package?.name)
  const color = getColor(app.package?.name)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-[32px] p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#95BF47]/20 transition-all group relative overflow-hidden group/card"
    >
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        {/* Header Info */}
        <div className="flex items-start gap-5 shrink-0">
          <div className={cn(
            "w-16 h-16 rounded-[22px] flex items-center justify-center text-white shadow-xl relative overflow-hidden group-hover:scale-105 transition-transform duration-500",
            color
          )}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
            <Icon className="w-8 h-8 relative z-10" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-gray-50 text-[10px] text-gray-500 rounded-lg ">
                #{app.appId}
              </span>
              <div className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide",
                app.status === "Tamamlandı" ? "bg-green-50 text-green-600 border border-green-100" : 
                app.status === "Onay Bekliyor" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                "bg-orange-50 text-orange-600 border border-orange-100"
              )}>
                {app.status}
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-black text-gray-900 group-hover/card:text-[#95BF47] transition-colors">{app.package?.name} Mağazası</h3>
            <p className="text-[12px] text-gray-400 font-medium">{new Date(app.createdAt).toLocaleDateString('tr-TR')} tarihinde başvuruldu</p>
          </div>
        </div>

        {/* Enhanced Stepper */}
        <div className="flex-1 max-w-3xl">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#95BF47] animate-pulse" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Süreç Takibi</span>
             </div>
             <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-[#95BF47]">{app.progress}</span>
                <span className="text-[10px] font-bold text-gray-400">%</span>
             </div>
          </div>
          
          <div className="relative px-2">
            {/* Background Track */}
            <div className="absolute top-[18px] left-8 right-8 h-1 bg-gray-50 rounded-full" />
            
            {/* Animated Progress Line */}
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `calc(${app.progress}% - 3rem)` }}
               transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
               className="absolute top-[18px] left-8 h-1 bg-[#95BF47] rounded-full shadow-[0_0_10px_rgba(149,191,71,0.3)]"
            />
            
            <div className="relative flex justify-between">
              {app.steps?.slice(0, 4).map((step: any, idx: number) => {
                const isCompleted = step.completed
                const isCurrent = step.current
                
                return (
                  <div key={idx} className="relative z-10 flex flex-col items-center gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className={cn(
                        "w-10 h-10 rounded-2xl border-4 flex items-center justify-center transition-all duration-300 shadow-md",
                        isCompleted ? "bg-[#95BF47] border-[#95BF47]/10 text-white" :
                        isCurrent ? "bg-white border-[#95BF47] text-[#95BF47] ring-8 ring-[#95BF47]/5 shadow-[#95BF47]/20" :
                        "bg-white border-white text-gray-200"
                      )}
                    >
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <CheckCircle2 className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <span className="text-[11px] font-black">{idx + 1}</span>
                      )}
                    </motion.div>
                    
                    <div className="text-center space-y-1">
                      <p className={cn(
                        "text-[10px] font-black tracking-tighter whitespace-nowrap uppercase",
                        isCurrent ? "text-[#95BF47]" : 
                        isCompleted ? "text-gray-900" : "text-gray-300"
                      )}>
                        {step.name}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0 flex items-center gap-3">
           <Link href={`/panel/basvurular/${app._id}`} className="block">
              <Button variant="ghost" className="rounded-2xl border border-gray-100 h-14 px-8 text-[11px] font-black hover:border-[#95BF47] hover:text-[#95BF47] hover:bg-white transition-all bg-white shadow-sm flex gap-3 group/btn">
                Detayları Gör 
                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center group-hover/btn:bg-[#95BF47] group-hover/btn:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Button>
           </Link>
           <Button variant="ghost" size="icon" className="rounded-2xl h-14 w-14 text-gray-200 hover:text-gray-900 hover:bg-gray-50">
             <MoreVertical className="w-6 h-6" />
           </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default function BasvurularPage() {
  const [isPaymentOpen, setIsPaymentOpen] = React.useState(false)
  const dispatch = useAppDispatch()
  const { applications, loading } = useAppSelector((state: any) => state.application)

  React.useEffect(() => {
    dispatch(getUserApplications())
  }, [dispatch])

  if (loading && applications.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#95BF47]"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 md:p-10  min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-12 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-3 mb-2"
            >
               <div className="w-10 h-1 bg-[#95BF47] rounded-full" />
               <span className="text-[10px] font-black text-[#95BF47] uppercase tracking-[0.2em]">Panelim</span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-none">Başvurularım</h1>
            <p className="text-gray-400 text-sm font-medium">Aktif Shopify mağaza kurulum süreçlerinizi bu panel üzerinden canlı takip edin.</p>
          </div>
          <Button 
            onClick={() => setIsPaymentOpen(true)}
            className="rounded-[22px] bg-[#95BF47] text-white hover:bg-[#86ac3f] font-black px-10 h-16 text-sm flex gap-3 shadow-2xl shadow-[#95BF47]/30 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            <Plus className="w-5 h-5 stroke-[3]" /> Yeni Hizmet Al
          </Button>
        </div>

        {/* Glassmorphic Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 bg-white/50 backdrop-blur-md p-4 rounded-[32px] border border-white">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 stroke-[3]" />
              <Input 
                placeholder="Mağaza veya başvuru kodu ara..." 
                className="rounded-2xl h-14 pl-14 pr-6 border-transparent bg-white shadow-sm focus-visible:ring-[#95BF47] text-xs font-bold transition-all"
              />
           </div>
           <div className="flex items-center gap-4">
              <Button variant="outline" className="rounded-2xl border-transparent bg-white shadow-sm h-14 px-6 text-xs font-black flex gap-3 text-gray-600 hover:text-[#95BF47]">
                <Filter className="w-4 h-4" /> Filtrele
              </Button>
              <div className="h-8 w-[1px] bg-gray-200 mx-2" />
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Başvuru Sayısı</span>
                <p className="text-base font-black text-gray-900 tracking-tight">{applications.length} Kayıt</p>
              </div>
           </div>
        </div>

        {/* Applications List */}
        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {applications.map((app: any, index: number) => (
              <ApplicationTracker key={app._id} app={app} index={index} />
            ))}
          </AnimatePresence>

          {/* Premium Empty State */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-12 md:p-20 rounded-[48px] border-4 border-dashed border-gray-100 flex flex-col items-center justify-center text-center space-y-6 group hover:border-[#95BF47]/20 transition-all bg-white/20 hover:bg-white/40"
          >
             <div className="w-24 h-24 rounded-[32px] bg-white flex items-center justify-center text-gray-200 group-hover:text-[#95BF47] group-hover:scale-110 transition-all shadow-sm ring-1 ring-gray-50">
                <Plus className="w-10 h-10 stroke-[3]" />
             </div>
             <div className="space-y-2">
                <h3 className="text-xl font-black text-gray-900">Yeni bir mağaza mı kurmak istiyorsunuz?</h3>
                <p className="text-sm text-gray-400 max-w-sm mx-auto font-medium">Global pazarda yerinizi almak için profesyonel kurulum hizmetimizden yararlanın.</p>
             </div>
             <Button 
                onClick={() => setIsPaymentOpen(true)}
                variant="outline" 
                className="rounded-2xl border-gray-200 h-14 px-12 text-xs font-black hover:bg-white hover:border-[#95BF47] hover:text-[#95BF47] transition-all bg-white/50 backdrop-blur-sm shadow-sm"
              >
                Hizmetleri İncele
             </Button>
          </motion.div>
        </div>

        {/* Black Friday style Support Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0f172a] rounded-[48px] p-8 md:p-14 relative overflow-hidden group shadow-2xl"
        >
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#95BF47]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-[#95BF47]/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-12">
               <div className="space-y-6 text-center xl:text-left max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                     <div className="w-2 h-2 rounded-full bg-[#95BF47] animate-pulse" />
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">7/24 Destek Ekibi</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">Süreç Hakkında Bilgi mi Almak İstiyorsunuz?</h2>
                  <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed opacity-80">
                    Tüm başvuru ve kurulum süreçlerimiz uzman ekibimiz tarafından titizlikle yönetilmektedir. Merak ettiğiniz her şey için Süreç Rehberimizi inceleyebilir veya destek ekibimizle görüşebilirsiniz.
                  </p>
                  <div className="flex flex-wrap justify-center xl:justify-start gap-4 pt-4">
                     <Button className="rounded-2xl bg-[#95BF47] text-white hover:bg-[#86ac3f] font-black h-16 px-10 shadow-xl shadow-[#95BF47]/20 text-sm transition-all transform hover:-translate-y-1">
                        Destek Talebi Aç
                     </Button>
                     <Button className="rounded-2xl bg-white/5 text-white hover:bg-white/10 font-black h-16 px-10 text-sm border border-white/10 transition-all">
                        Rehberi Görüntüle
                     </Button>
                  </div>
               </div>
               <div className="hidden lg:block shrink-0 relative">
                  <motion.div 
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="relative w-48 h-48 text-[#95BF47]/20 drop-shadow-[0_0_30px_rgba(149,191,71,0.2)]"
                  >
                     <Zap className="w-full h-full fill-current stroke-[0.5]" />
                  </motion.div>
               </div>
            </div>
        </motion.div>

        {/* Payment Dialog */}
        <PaymentDialog isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />
      </div>
    </div>
  )
}
