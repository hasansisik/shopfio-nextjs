"use client"
 
import * as React from "react"

import {
  BadgeCheck,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { useAppDispatch } from "@/redux/hook"
import { logout } from "@/redux/actions/userActions"
import { useRouter } from "next/navigation"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
             <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar || undefined} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar || undefined} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar || undefined} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/panel/ayarlar">
                  <DropdownMenuItem className="cursor-pointer">
                    <BadgeCheck className="w-4 h-4" />
                    Hesap Ayarları
                  </DropdownMenuItem>
                </Link>
                <Link href="/panel/odemeler">
                  <DropdownMenuItem className="cursor-pointer">
                    <CreditCard className="w-4 h-4" />
                    Ödeme & Faturalar
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onSelect={(e) => {
                  e.preventDefault()
                  setShowLogoutDialog(true)
                }} 
                className="text-red-500 focus:text-red-500 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Çıkış Yap
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <AlertDialog 
        isOpen={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        title="Çıkış yapmak istediğinize emin misiniz?"
        description="Oturumunuz kapatılacak ve tekrar giriş yapmanız gerekecektir."
        cancelLabel="İptal"
        actionLabel="Evet, Çıkış Yap"
        onAction={async () => {
          await dispatch(logout())
          router.push("/giris")
        }}
      />
    </>
  )
}
