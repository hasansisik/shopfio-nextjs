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
  MessageSquare
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
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
      title: "Hizmet Başvurularım",
      url: "/panel/basvurular",
      icon: ClipboardList,
    },
    {
      title: "Hesap Ayarları",
      url: "/panel/ayarlar",
      icon: Settings,
    },
  ],
  navSecondary: [
    {
      title: "Destek Merkezi",
      url: "/panel/destek",
      icon: HelpCircle,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]! border-r-gray-200"
      variant="sidebar"
      {...props}
    >
      <SidebarHeader className="bg-[oklch(0.985_0.01_145)]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/panel">
                <div className="bg-[#95BF47] text-white flex aspect-square size-8 items-center justify-center rounded-lg shadow-sm">
                  <ShoppingBag className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-[#95BF47]">Shoprio</span>
                  <span className="truncate text-[10px] uppercase font-bold text-gray-400">Kullanıcı Paneli</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-[oklch(0.985_0.01_145)]">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-[oklch(0.985_0.01_145)] border-t border-gray-100/50">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
