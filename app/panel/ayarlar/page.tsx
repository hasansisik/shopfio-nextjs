"use client"

import * as React from "react"
import { 
  User, 
  Lock, 
  Shield, 
  Camera,
  ChevronRight,
  Trash2,
  Save,
  KeyRound
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { AlertDialog } from "@/components/ui/alert-dialog"

export default function AyarlarPage() {
  const [activeTab, setActiveTab] = React.useState<"profile" | "security">("profile")
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = React.useState(false)

  const handleSave = () => {
    // Save logic
  }

  const handleDeleteAccount = () => {
    // Delete account logic
    console.log("Account deleted")
  }

  return (
    <div className="flex-1 p-4 md:p-6 bg-[oklch(0.985_0.01_145)] min-h-screen">
      <div className="w-full max-w-4xl space-y-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Hesap Ayarları</h1>
          <p className="text-gray-500 text-[11px] mt-0.5 font-medium">Profil bilgilerinizi ve güvenlik tercihlerinizi buradan yönetin.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar like tabs - Stripe Style */}
            <div className="lg:col-span-1">
                <div className="border p-1.5 rounded-2xl space-y-1">
                    {[
                        { id: "profile", label: "Profil Bilgileri", icon: User },
                        { id: "security", label: "Güvenlik & Şifre", icon: Lock },
                    ].map((item) => (
                        <button 
                            key={item.id} 
                            onClick={() => setActiveTab(item.id as any)}
                            className={cn(
                            "w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-all",
                            activeTab === item.id 
                                ? "bg-white text-[#95BF47] shadow-sm border border-gray-100" 
                                : "text-gray-500 hover:text-gray-900"
                        )}>
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                    ))}
                </div>
                
                <div className="mt-6 bg-red-50/50 p-1.5 rounded-2xl border">
                    <button 
                        onClick={() => setIsDeleteAlertOpen(true)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all group"
                    >
                        <Trash2 className="w-4 h-4" /> Hesabı Kalıcı Olarak Sil
                    </button>
                </div>
            </div>

            {/* Main Area */}
            <div className="lg:col-span-2">
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {activeTab === "profile" ? (
                        <div className="space-y-8">
                            {/* Profile Header */}
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                                        <User className="w-12 h-12 text-gray-200" />
                                    </div>
                                    <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#95BF47] text-white flex items-center justify-center border border-white shadow-sm transition-all hover:scale-110 active:scale-95">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-lg font-bold text-gray-900 tracking-tight leading-none">Hasan</h2>
                                    <p className="text-[11px] text-gray-400 font-medium">Kullanıcı Profilini Düzenle</p>
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white border border-gray-100 mt-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#95BF47]" />
                                        <span className="text-[10px] text-gray-500 font-bold">hasan@shoprio.com</span>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-400 pl-1">Adınız</label>
                                    <Input defaultValue="Hasan" className="rounded-xl h-11 text-xs border-gray-100 focus:border-[#95BF47] focus:ring-[#95BF47]/10 font-medium bg-white" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-400 pl-1">E-posta Adresiniz</label>
                                    <Input defaultValue="hasan@shoprio.com" className="rounded-xl h-11 text-xs border-gray-100 focus:border-[#95BF47] focus:ring-[#95BF47]/10 font-medium bg-white" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-400 pl-1">Telefon Numarası</label>
                                    <Input placeholder="+90 5XX XXX XX XX" className="rounded-xl h-11 text-xs border-gray-100 focus:border-[#95BF47] focus:ring-[#95BF47]/10 font-medium bg-white" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-400 pl-1">Zaman Dilimi</label>
                                    <div className="h-11 px-4 rounded-xl border border-gray-100 bg-white flex items-center justify-between text-xs text-gray-500 cursor-pointer font-medium hover:bg-gray-50 transition-colors">
                                        <span>(GMT+03:00) Istanbul</span>
                                        <ChevronRight className="w-4 h-4 opacity-30" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-2xl bg-orange-50/50 border border-orange-100 flex items-center justify-center">
                                    <KeyRound className="w-10 h-10 text-orange-500/50" />
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-lg font-bold text-gray-900 tracking-tight leading-none">Şifre İşlemleri</h2>
                                    <p className="text-[11px] text-gray-400 font-medium">Hesap güvenliğini korumak için güçlü bir şifre seçin.</p>
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-50 border border-orange-100 mt-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                        <span className="text-[10px] text-orange-600 font-bold">Son değişim: 3 ay önce</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5 max-w-md">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-400 pl-1">Mevcut Şifre</label>
                                    <Input type="password" placeholder="••••••••" className="rounded-xl h-11 text-xs border-gray-100 focus:border-[#95BF47] focus:ring-[#95BF47]/10 font-medium bg-white" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-400 pl-1">Yeni Şifre</label>
                                    <Input type="password" className="rounded-xl h-11 text-xs border-gray-100 focus:border-[#95BF47] focus:ring-[#95BF47]/10 font-medium bg-white" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-400 pl-1">Yeni Şifre (Tekrar)</label>
                                    <Input type="password" className="rounded-xl h-11 text-xs border-gray-100 focus:border-[#95BF47] focus:ring-[#95BF47]/10 font-medium bg-white" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <Button 
                            onClick={handleSave}
                            className="rounded-full bg-[#95BF47] text-white hover:bg-[#86ac3f] font-bold h-11 px-10 text-[11px] transition-all active:scale-95"
                        >
                           {activeTab === "profile" ? "Değişiklikleri Kaydet" : "Şifreyi Güncelle"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <AlertDialog 
          isOpen={isDeleteAlertOpen}
          onOpenChange={setIsDeleteAlertOpen}
          title="Hesabınızı silmek istediğinize emin misiniz?"
          description="Bu işlem geri alınamaz. Hesabınızla ilişkili tüm veriler, başvurular ve ayarlar kalıcı olarak silinecektir."
          onAction={handleDeleteAccount}
      />
    </div>
  )
}
