"use client"

import * as React from "react"
import {
  LifeBuoy,
  Send,
  LayoutDashboard,
  ClipboardList,
  Users,
  Settings,
  ShoppingBag,
  PlusCircle,
  HelpCircle,
  MessageSquare,
  Truck,
  Megaphone
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import PaymentDialog from "@/components/payment-dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { loadUser } from "@/redux/actions/userActions"

const data = {
  navMain: [
    {
      title: "Genel Bakış",
      url: "/panel",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Başvurularım",
      url: "/panel/basvurular",
      icon: ClipboardList,
    },
    {
      title: "Gönderio",
      url: "#",
      icon: Truck,
      disabled: true,
      badge: "Yakında",
    },
    {
      title: "shopfio",
      url: "#",
      icon: Megaphone,
      disabled: true,
      badge: "Yakında",
    },
  ],
  navFooter: [
    {
      title: "Destek Talebim",
      url: "/panel/destek",
      icon: MessageSquare,
    },
    {
      title: "Hesap Ayarları",
      url: "/panel/ayarlar",
      icon: Settings,
    },
  ]
}

const adminData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Kullanıcılar",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Başvurular",
      url: "/admin/basvurular",
      icon: ClipboardList,
      items: [
        { title: "Tümü", url: "/admin/basvurular" },
        { title: "İnceleniyor", url: "/admin/basvurular/inceleniyor" },
        { title: "Onay Bekliyor", url: "/admin/basvurular/onay-bekliyor" },
        { title: "Tamamlandı", url: "/admin/basvurular/tamamlandi" },
        { title: "İptal Edildi", url: "/admin/basvurular/iptal-edildi" },
      ]
    },
    {
      title: "Destek Talepleri",
      url: "/admin/destek",
      icon: MessageSquare,
    },
  ],
  navFooter: [
    {
      title: "Ödeme Ayarları",
      url: "/admin/odeme-ayarlari",
      icon: Settings,
    },
    {
      title: "Mağaza Ayarları",
      url: "/admin/magaza-ayarlari",
      icon: ShoppingBag,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const isAdminPath = pathname.startsWith('/admin')

  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)

  React.useEffect(() => {
    if (!user) {
      dispatch(loadUser())
    }
  }, [dispatch, user])

  const userData = {
    name: user?.name || "Kullanıcı",
    email: user?.email || "",
    avatar: user?.picture || "",
  }

  return (
    <Sidebar
      className="top-[calc(var(--announcement-height)+var(--header-height))] h-[calc(100svh-var(--announcement-height)-var(--header-height))]! border-r-gray-200"
      variant="sidebar"
      {...props}
    >
      <SidebarHeader className="bg-[oklch(0.985_0.01_145)] space-y-4 px-4 py-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent active:bg-transparent h-auto p-0">
              <a href="/panel" className="flex items-center justify-center py-2">
                <Image
                  src="/logo.png"
                  alt="Shopfio Logo"
                  width={120}
                  height={40}
                  className="w-full max-w-[60px] h-auto object-contain"
                  priority
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {!isAdminPath && (
          <Link href="/basvuru" className="w-full bg-[#95BF47] hover:bg-[#86ac3f] text-white py-4 rounded-[2rem] font-bold flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-[#95BF47]/20 text-md">
            <PlusCircle className="size-4" />
            Başvuru Yap
          </Link>
        )}
      </SidebarHeader>
      <SidebarContent className="bg-[oklch(0.985_0.01_145)]">
        <NavMain items={isAdminPath ? adminData.navMain : data.navMain} label={isAdminPath ? "Sistem Yönetimi" : "Yönetim"} />
        <div className="mt-4">
          <NavMain items={isAdminPath ? adminData.navFooter : data.navFooter} label={isAdminPath ? "Ayarlar" : "Hesabım"} />
        </div>
      </SidebarContent>
      <SidebarFooter className="bg-[oklch(0.985_0.01_145)] border-t border-gray-100/50">
        <NavUser user={userData} />
      </SidebarFooter>

    </Sidebar>
  )
}
