"use client"

import { 
  User, 
  Lock, 
  CreditCard, 
  Bell, 
  Shield, 
  Globe, 
  Camera,
  ChevronRight,
  Mail,
  Smartphone,
  Trash2,
  Save
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function AyarlarPage() {
  return (
    <div className="flex-1 p-4 md:p-6 bg-[oklch(0.985_0.01_145)] min-h-screen">
      <div className="w-full max-w-4xl space-y-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Hesap Ayarları</h1>
          <p className="text-gray-500 text-[11px] mt-0.5">Profil bilgilerinizi, güvenlik tercihlerinizi ve ödemelerinizi buradan yönetin.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar like tabs */}
            <div className="lg:col-span-1 space-y-1">
                {[
                    { id: "profile", label: "Profil Bilgileri", icon: User, active: true },
                    { id: "security", label: "Güvenlik & Şifre", icon: Lock },
                    { id: "billing", label: "Ödemeler & Faturalar", icon: CreditCard },
                ].map((item) => (
                    <button key={item.id} className={cn(
                        "w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all",
                        item.active ? "bg-white text-[#95BF47] shadow-sm" : "text-gray-500 hover:bg-white/50"
                    )}>
                        <div className="flex items-center gap-3">
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </div>
                        {item.active && <div className="w-1.5 h-1.5 rounded-full bg-[#95BF47]" />}
                    </button>
                ))}
                
                <div className="pt-8 px-2">
                    <button className="text-[11px] font-bold text-red-500 flex items-center gap-2 hover:opacity-70 transition-opacity">
                        <Trash2 className="w-3.5 h-3.5" /> Hesabı Kalıcı Olarak Sil
                    </button>
                </div>
            </div>

            {/* Main Area */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm space-y-8">
                    {/* Profile Header */}
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                                <User className="w-10 h-10 text-gray-300" />
                            </div>
                            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#95BF47] text-white flex items-center justify-center border-2 border-white shadow-sm transition-transform hover:scale-110">
                                <Camera className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-gray-900">Hasan</h2>
                            <p className="text-[11px] text-gray-500 font-medium">hasan@shoprio.com</p>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Adınız</label>
                            <Input defaultValue="Hasan" className="rounded-xl h-10 text-xs border-gray-100 focus:border-[#95BF47] focus:ring-[#95BF47]/10" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">E-posta Adresiniz</label>
                            <Input defaultValue="hasan@shoprio.com" className="rounded-xl h-10 text-xs border-gray-100 focus:border-[#95BF47] focus:ring-[#95BF47]/10" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Telefon Numarası</label>
                            <Input placeholder="+90 5XX XXX XX XX" className="rounded-xl h-10 text-xs border-gray-100 focus:border-[#95BF47] focus:ring-[#95BF47]/10" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Zaman Dilimi</label>
                            <div className="h-10 px-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500 cursor-pointer">
                                <span>(GMT+03:00) Istanbul</span>
                                <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button className="rounded-full bg-[#95BF47] text-white hover:bg-[#86ac3f] font-bold h-10 px-8 text-xs flex gap-2">
                           <Save className="w-3.5 h-3.5" /> Değişiklikleri Kaydet
                        </Button>
                    </div>
                </div>

                <div className="bg-[#95BF47]/5 border border-[#95BF47]/20 rounded-[20px] p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                        <Shield className="w-5 h-5 text-[#95BF47]" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900">İki Faktörlü Doğrulama</h3>
                        <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">Hesabınızı daha güvenli hale getirmek için girişte ek bir kod istenmesini sağlayabilirsiniz.</p>
                        <button className="text-[10px] font-bold text-[#95BF47] mt-3 hover:underline">ETKİNLEŞTİR</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
