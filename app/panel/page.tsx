"use client"

import { 
  Plus, 
  CheckCircle2, 
  ArrowUpRight, 
  ShoppingBag, 
  Zap, 
  Clock,
  ArrowRight,
  MessageSquare,
  LayoutGrid,
  TrendingUp,
  Activity,
  X
} from "lucide-react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { getUserApplications } from "@/redux/actions/applicationActions"
import { loadUser } from "@/redux/actions/userActions"
import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { comparisonFeatures } from "@/lib/pricing-data"

export default function PanelPage() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)
  const { applications, loading } = useAppSelector((state) => state.application)

  React.useEffect(() => {
    dispatch(loadUser())
    dispatch(getUserApplications())
  }, [dispatch])

  // Get the most relevant (active) application for the dashboard highlight
  const activeApp = applications?.find((a: any) => a.status !== "Tamamlandı") || applications?.[0]
  
  const stats = [
    { label: "Aktif Süreç", value: applications?.length || 0, icon: Activity, color: "text-[#95BF47]", bg: "bg-[#95BF47]/10" },
    { label: "Bekleyen Aksiyon", value: applications?.filter((a: any) => a.progress < 100).length || 0, icon: Zap, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Destek Mesajı", value: "0", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-50" },
  ]

  const serviceTiers = [
    { 
      name: "Starter", 
      price: "₺4,999", 
      desc: "Temel Shopify kurulumu.",
      color: "bg-white",
      highlight: false
    },
    { 
      name: "Professional", 
      price: "₺12,499", 
      desc: "Özel tasarım ve pazarlama.",
      color: "bg-[#95BF47]",
      highlight: true
    },
    { 
      name: "Enterprise", 
      price: "₺29,999", 
      desc: "Tam kapsamlı çözüm.",
      color: "bg-white",
      highlight: false
    }
  ]

  return (
    <div className="flex-1 p-6 md:p-10 space-y-10 min-h-screen max-w-[1400px] mx-auto pb-24">
      
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="w-8 h-[2px] bg-[#95BF47] rounded-full" />
            <span className="text-[10px] font-black text-[#95BF47] uppercase tracking-[0.2em]">Kullanıcı Paneli</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight"
          >
            Tekrar Hoş Geldin, <span className="text-[#95BF47]">{user?.name || "Kullanıcı"}</span> 👋
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-medium text-sm md:text-base max-w-xl"
          >
            Mağaza kurulum süreçlerini ve yeni nesil Shopify çözümlerini buradan kolayca yönetebilirsin.
          </motion.p>
        </div>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.3 }}
        >
          <Link href="/basvuru">
            <Button className="rounded-[22px] bg-[#95BF47] text-white hover:bg-[#86ac3f] font-black px-10 h-16 text-sm flex gap-3 shadow-2xl shadow-[#95BF47]/30 transition-all transform hover:-translate-y-1 active:scale-95">
              <Plus className="w-5 h-5 stroke-[3]" /> Yeni Hizmet Al
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (i * 0.1) }}
            className="bg-white rounded-[32px] p-6 md:p-8 border border-gray-50 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all"
          >
            <div className="space-y-1">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-gray-900 tracking-tighter">{stat.value}</h3>
            </div>
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg, stat.color)}>
              <stat.icon className="w-6 h-6 stroke-[2.5]" />
            </div>
          </motion.div>
        ))}
      </section>

      {/* Main Feature: Active Process Overview */}
      {activeApp ? (
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
               <div className="w-1.5 h-6 bg-[#95BF47] rounded-full" />
               Devam Eden Kurulum
            </h2>
            <Link href="/panel/basvurular" className="text-[11px] font-black text-[#95BF47] hover:underline uppercase tracking-widest">Tümünü Gör</Link>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-[48px] p-8 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 w-96 h-96 bg-[#95BF47]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
             
             <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="flex items-center gap-6 shrink-0">
                   <div className="w-20 h-20 rounded-[32px] bg-[#95BF47] flex items-center justify-center text-white shadow-2xl shadow-[#95BF47]/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                      <ShoppingBag className="w-10 h-10 relative z-10" />
                   </div>
                   <div className="space-y-2">
                      <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-black uppercase rounded-lg border border-orange-100">
                         {activeApp.status}
                      </span>
                      <h3 className="text-xl font-black text-gray-900 tracking-tight">{activeApp.package?.name} Mağazası</h3>
                      <p className="text-xs text-gray-400 font-medium flex items-center gap-2">
                         ID: <span className="text-gray-900 font-black">#{activeApp.appId}</span>
                         <span className="w-1 h-1 rounded-full bg-gray-300" />
                         Son Güncelleme: <span className="text-gray-900 font-bold">{new Date(activeApp.updatedAt || activeApp.createdAt).toLocaleDateString('tr-TR')}</span>
                      </p>
                   </div>
                </div>

                <div className="flex-1 w-full max-w-2xl px-4">
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                         <div className="flex -space-x-3">
                            {activeApp.steps?.map((s: any, i: number) => (
                               <div key={i} className={cn(
                                  "w-10 h-10 rounded-full border-4 border-white flex items-center justify-center text-[10px] font-black shadow-sm transition-all",
                                  s.completed ? "bg-[#95BF47] text-white" : s.current ? "bg-white text-[#95BF47] ring-1 ring-[#95BF47]" : "bg-gray-100 text-gray-300"
                               )}>
                                  {s.completed ? <CheckCircle2 className="w-5 h-5 stroke-[3]" /> : i + 1}
                               </div>
                            ))}
                         </div>
                         <span className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">İlerleme Safhaları</span>
                      </div>
                      <div className="text-right">
                         <span className="text-2xl font-black text-[#95BF47]">{activeApp.progress}%</span>
                      </div>
                   </div>
                   <div className="h-3 bg-gray-50 rounded-full overflow-hidden relative border border-gray-100/50">
                      <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${activeApp.progress}%` }}
                         transition={{ duration: 1.5, ease: "circOut", delay: 1 }}
                         className="h-full bg-[#95BF47] shadow-[0_0_15px_rgba(149,191,71,0.5)] rounded-full"
                      />
                   </div>
                </div>

                <Link href={`/panel/basvurular/${activeApp._id}`} className="shrink-0 w-full lg:w-auto">
                   <Button className="w-full lg:w-auto rounded-2xl bg-gray-900 text-white hover:bg-black font-black h-16 px-10 text-xs shadow-xl transition-all hover:scale-105 active:scale-95">
                      Süreci Yönet <ArrowRight className="w-4 h-4 ml-3" />
                   </Button>
                </Link>
             </div>
          </motion.div>
        </section>
      ) : (
        <section className="bg-white rounded-[48px] p-12 border border-dashed border-gray-200 text-center flex flex-col items-center justify-center space-y-4">
           <div className="w-16 h-16 rounded-[24px] bg-gray-50 flex items-center justify-center text-gray-200">
              <Plus className="w-8 h-8 stroke-[3]" />
           </div>
           <h3 className="text-xl font-black text-gray-900">Henüz aktif bir süreciniz yok.</h3>
           <p className="text-gray-400 text-xs font-medium max-w-sm">Shopify mağazanızı hemen kurmak için yeni bir hizmet alarak süreci başlatabilirsiniz.</p>
           <Link href="/basvuru">
              <Button variant="outline" className="rounded-2xl border-gray-100 h-14 px-8 text-[11px] font-black hover:border-[#95BF47] hover:text-[#95BF47] transition-all">
                Mağaza Kurulumunu Başlat
              </Button>
           </Link>
        </section>
      )}

      {/* Services Section */}
      <section className="space-y-8">
         <div className="flex flex-col items-center text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">İşinizi Global'e Taşıyın</h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto font-medium">Bütçenize ve ihtiyacınıza uygun Shopify kurulum paketlerinden birini seçerek hemen fark yaratmaya başlayın.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceTiers.map((tier, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 * i }}
                 className={cn(
                    "rounded-[40px] p-8 md:p-10 border shadow-sm transition-all hover:shadow-2xl hover:-translate-y-2 relative group flex flex-col",
                    tier.highlight ? "bg-[#95BF47] border-[#86ac3f] text-white shadow-2xl shadow-[#95BF47]/30" : "bg-white border-gray-100 text-gray-900"
                 )}
               >
                  {tier.highlight && (
                     <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">
                        En Popüler
                     </div>
                  )}
                  
                  <div className="flex-1 space-y-6">
                     <div className="space-y-2">
                        <h4 className={cn("text-xs font-black uppercase tracking-[0.3em]", tier.highlight ? "text-white/70" : "text-gray-400")}>{tier.name}</h4>
                        <div className="flex items-baseline gap-1">
                           <span className="text-2xl md:text-3xl font-black tracking-tighter">{tier.price}</span>
                           <span className={cn("text-[9px] font-bold", tier.highlight ? "text-white/60" : "text-gray-400")}>'den başlayan</span>
                        </div>
                     </div>
                     
                     <p className={cn("text-sm font-medium leading-relaxed", tier.highlight ? "text-white/80" : "text-gray-400")}>
                        {tier.desc} Modern ve hızlı bir başlangıç için ihtiyacınız olan tüm temel Shopify yapılandırmaları.
                     </p>

                     <div className="space-y-4">
                        {comparisonFeatures.map((feature, idx) => {
                           const isAvailable = i === 0 ? feature.small : i === 1 ? feature.medium : feature.full;
                           if (!isAvailable && i === 0) return null; // Like landing page, keep basic short

                           return (
                              <div key={idx} className={cn("flex items-center gap-3", !isAvailable && "opacity-40")}>
                                 <div className={cn(
                                    "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                                    isAvailable 
                                       ? (tier.highlight ? "bg-white/20 text-white" : "bg-[#95BF47]/10 text-[#95BF47]")
                                       : (tier.highlight ? "bg-black/10 text-white/50" : "bg-gray-100 text-gray-400")
                                 )}>
                                    {isAvailable ? <CheckCircle2 className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3" />}
                                 </div>
                                 <span className={cn(
                                    "text-xs font-bold", 
                                    tier.highlight ? "text-white/90" : "text-gray-600",
                                    !isAvailable && (tier.highlight ? "text-white/50" : "text-gray-400 font-medium")
                                 )}>
                                    {feature.name}
                                 </span>
                              </div>
                           )
                        })}
                     </div>
                  </div>

                  <Button className={cn(
                    "w-full mt-10 rounded-2xl h-14 text-xs font-black transition-all shadow-lg active:scale-95",
                    tier.highlight ? "bg-white text-[#95BF47] hover:bg-gray-100 shadow-white/10" : "bg-gray-900 text-white hover:bg-black"
                  )}>
                     Paketi Detaylandır <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
               </motion.div>
            ))}
         </div>
      </section>

      {/* Decorative Footer Shape */}
      <div className="pt-20 text-center">
         <motion.div 
           animate={{ rotate: [0, 360] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="inline-block opacity-10"
         >
            <LayoutGrid className="w-16 h-16 text-gray-900" />
         </motion.div>
      </div>

    </div>
  )
}
