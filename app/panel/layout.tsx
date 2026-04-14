"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, ReactNode } from "react"
import { Zap } from "lucide-react"

const CAMPAIGNS = [
  "Bahar Kampanyası: Profesyonel Pakete Geçişte %25 İndirim Kodunuz: BAHAR25",
  "Mağaza Kurulum Süreçlerini Hızlandırdık: Artık 48 Saatte Mağazanız Yayında!",
  "Özel Teklif: Arkadaşını Davet Et, ₺1,000 shopfio Kredisi Kazan!",
  "Ücretsiz SEO Analizi: Kurumsal Paket Kullanıcıları İçin Başladı!"
]

function AnnouncementBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % CAMPAIGNS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-[#95BF47] text-white overflow-hidden relative h-(--announcement-height) flex items-center justify-center px-4 shrink-0 sticky top-0 z-50">
      <div className="absolute left-4 hidden md:flex items-center gap-2">
        <Zap className="w-3.5 h-3.5 fill-white" />
        <span className="text-[10px] font-medium tracking-widest">Kampanyalar</span>
      </div>

      <div className="relative h-full flex items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-[11px] font-medium tracking-tight whitespace-nowrap"
          >
            {CAMPAIGNS[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      <button className="absolute right-4 text-[10px] font-medium underline underline-offset-2 decoration-white/30 hover:decoration-white transition-all hidden md:block">
        Detayları Gör
      </button>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="[--announcement-height:36px] [--header-height:calc(--spacing(14))] h-svh flex flex-col overflow-hidden bg-background">
      <AnnouncementBar />
      <SidebarProvider className="flex flex-col flex-1 min-h-0 relative">
        <SiteHeader />
        <div className="flex flex-1 overflow-hidden min-h-0">
          <AppSidebar />
          <main className="flex-1 flex flex-col min-h-0 overflow-y-auto w-full">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}

