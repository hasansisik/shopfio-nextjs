"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, ReactNode } from "react"
import { Zap } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { getPublicSettings } from "@/redux/actions/applicationActions"
import Link from "next/link"

function AnnouncementBar({ settings }: { settings: any }) {
  const [index, setIndex] = useState(0)
  const campaigns = settings?.storeConfig?.campaigns || []
  const label = settings?.storeConfig?.announcementLabel || "Kampanyalar"

  useEffect(() => {
    if (campaigns.length > 1) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % campaigns.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [campaigns.length])

  if (campaigns.length === 0) return null

  const currentCampaign = campaigns[index]

  return (
    <div className="bg-[#95BF47] text-white overflow-hidden relative h-(--announcement-height) flex items-center justify-center px-4 shrink-0 sticky top-0 z-50">
      <div className="absolute left-4 hidden md:flex items-center gap-2">
        <Zap className="w-3.5 h-3.5 fill-white" />
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>

      <div className="relative h-full flex items-center justify-center text-center px-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-[11px] font-bold tracking-tight whitespace-nowrap"
          >
            {currentCampaign.text}
          </motion.p>
        </AnimatePresence>
      </div>

      {currentCampaign.link && (
        <Link 
          href={currentCampaign.link}
          className="absolute right-4 text-[10px] font-bold underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all hidden md:block uppercase tracking-tighter"
        >
          Detayları Gör
        </Link>
      )}
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const dispatch = useAppDispatch()
  const { globalSettings } = useAppSelector((state) => state.application)

  useEffect(() => {
    dispatch(getPublicSettings())
  }, [dispatch])

  return (
    <div className="[--announcement-height:36px] [--header-height:calc(--spacing(14))] h-svh flex flex-col overflow-hidden bg-background">
      <AnnouncementBar settings={globalSettings} />
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

