"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode, useEffect } from "react"
import { useAppSelector } from "@/redux/hook"
import { useRouter } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    // Wait until loading is fully complete before making any routing decision
    if (loading) return

    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/panel')
    }
  }, [user, isAuthenticated, loading, router])

  // Show spinner while loading OR while redirecting non-admins
  if (loading || !isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#95BF47]/20 border-t-[#95BF47] rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Yönetici Paneli Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="[--announcement-height:0px] [--header-height:calc(--spacing(14))] h-svh flex flex-col overflow-hidden bg-background">
      <SidebarProvider className="flex flex-col flex-1 min-h-0 relative">
        <SiteHeader />
        <div className="flex flex-1 overflow-hidden min-h-0">
          <AppSidebar />
          <main className="flex-1 flex flex-col min-h-0 overflow-y-auto w-full bg-gray-50/50">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}
