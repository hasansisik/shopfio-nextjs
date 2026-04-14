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
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Hasan",
    email: "hasan@shoprio.com",
    avatar: "/avatars/hasan.jpg",
  },
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
      title: "Adsaify",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-[calc(var(--announcement-height)+var(--header-height))] h-[calc(100svh-var(--announcement-height)-var(--header-height))]! border-r-gray-200"
      variant="sidebar"
      {...props}
    >
      <SidebarHeader className="bg-[oklch(0.985_0.01_145)] space-y-4 px-4 py-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/panel">
                <div className="bg-[#95BF47] text-white flex aspect-square size-10 items-center justify-center rounded-2xl shadow-sm">
                  <ShoppingBag className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight ml-1">
                  <span className="truncate font-bold text-[#95BF47] text-lg">Shoprio</span>
                  <span className="truncate text-[10px] text-gray-400">Kullanıcı Paneli</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <Link href="/basvuru" className="block w-full">
          <button className="w-full bg-[#95BF47] hover:bg-[#86ac3f] text-white py-4 rounded-[2rem] font-bold flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-[#95BF47]/20 text-md">
            <PlusCircle className="size-4" />
            Başvuru Yap
          </button>
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-[oklch(0.985_0.01_145)]">
        <NavMain items={data.navMain} label="Yönetim" />
        <div className="mt-4">
          <NavMain items={data.navFooter} label="Hesabım" />
        </div>
      </SidebarContent>
      <SidebarFooter className="bg-[oklch(0.985_0.01_145)] border-t border-gray-100/50">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
