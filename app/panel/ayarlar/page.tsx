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
  KeyRound,
  Mail,
  Phone,
  Globe,
  Bell,
  CreditCard,
  LogOut,
  Zap,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
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

  const menuItems = [
    { id: "profile", label: "Profil Bilgileri", icon: User, desc: "Kişisel detaylar ve avatar" },
    { id: "security", label: "Güvenlik & Şifre", icon: Lock, desc: "Hesap koruma ve şifre" },
  ]

  return (
    <div className="flex-1 p-6 md:p-10 space-y-10 min-h-screen max-w-[1400px] mx-auto pb-24">
      
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-3">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="w-8 h-[2px] bg-[#95BF47] rounded-full" />
            <span className="text-[10px] font-black text-[#95BF47] uppercase tracking-[0.2em]">Sistem Ayarları</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-none"
          >
            Hesabınızı <span className="text-[#95BF47]">Yönetin</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-medium text-sm md:text-base max-w-xl"
          >
            Profil bilgilerinizi, güvenlik tercihlerinizi ve abonelik detaylarınızı buradan güncelleyin.
          </motion.p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="bg-white rounded-[40px] p-4 border border-gray-100 shadow-sm overflow-hidden"
           >
              <div className="space-y-2">
                 {menuItems.map((item) => (
                    <button 
                      key={item.id} 
                      onClick={() => setActiveTab(item.id as any)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-[32px] transition-all group relative",
                        activeTab === item.id 
                          ? "bg-gray-900 text-white shadow-xl shadow-gray-200" 
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                       <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                          activeTab === item.id ? "bg-[#95BF47] text-white" : "bg-gray-50 text-gray-400 group-hover:bg-white"
                       )}>
                          <item.icon className="w-5 h-5" />
                       </div>
                       <div className="text-left">
                          <p className="text-xs font-black uppercase tracking-widest">{item.label}</p>
                          <p className={cn(
                             "text-[10px] font-bold mt-0.5",
                             activeTab === item.id ? "text-white/50" : "text-gray-400"
                          )}>{item.desc}</p>
                       </div>
                       {activeTab === item.id && (
                          <motion.div 
                             layoutId="tab-indicator"
                             className="absolute right-4 w-1.5 h-1.5 rounded-full bg-[#95BF47]"
                          />
                       )}
                    </button>
                 ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-50 px-2 space-y-2">
                 <button 
                   onClick={() => setIsDeleteAlertOpen(true)}
                   className="w-full flex items-center gap-4 p-4 rounded-[32px] text-red-500 hover:bg-red-50 transition-all font-black text-xs uppercase tracking-widest group"
                 >
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
                       <Trash2 className="w-5 h-5" />
                    </div>
                    Hesabı Sil
                 </button>
                 <button className="w-full flex items-center gap-4 p-4 rounded-[32px] text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all font-black text-xs uppercase tracking-widest group">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all">
                       <LogOut className="w-5 h-5" />
                    </div>
                    Oturumu Kapat
                 </button>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
             className="bg-[#95BF47] text-white rounded-[40px] p-8 space-y-6 relative overflow-hidden group shadow-2xl shadow-[#95BF47]/20"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                 <Zap className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                 <h4 className="text-xl font-black tracking-tight">Pro Plan Aktif</h4>
                 <p className="text-white/70 text-xs font-bold leading-relaxed">Shopfio'nun tüm gelişmiş özelliklerine sınırsız erişiminiz var.</p>
              </div>
              <Button className="w-full rounded-2xl bg-white text-gray-900 hover:bg-black hover:text-white font-black h-14 text-xs tracking-widest uppercase transition-all shadow-xl">Faturaları Gör</Button>
           </motion.div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8">
           <AnimatePresence mode="wait">
              {activeTab === "profile" ? (
                 <motion.div 
                   key="profile"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   className="bg-white rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden"
                 >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#95BF47]/5 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                    
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                       <div className="relative group">
                          <div className="w-32 h-32 rounded-[48px] bg-gray-50 flex items-center justify-center border-4 border-white shadow-2xl overflow-hidden relative ring-1 ring-gray-100 transition-transform group-hover:scale-105 duration-500">
                             <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                                <User className="w-16 h-16" />
                             </div>
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] cursor-pointer">
                                <Camera className="w-8 h-8 text-white" />
                             </div>
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-[#95BF47] text-white flex items-center justify-center shadow-lg border-2 border-white z-10">
                             <Check className="w-5 h-5" />
                          </div>
                       </div>
                       <div className="text-center md:text-left space-y-2">
                          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Hasan Bey</h2>
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                             <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-black text-gray-600">hasan@shopfio.com</span>
                             </div>
                             <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100">
                                <Zap className="w-4 h-4 text-[#95BF47]" />
                                <span className="text-xs font-black text-[#95BF47]">Profesyonel Kullanıcı</span>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-3">TAM ADINIZ</label>
                          <Input defaultValue="Hasan" className="rounded-2xl h-16 border-gray-100 focus:ring-[#95BF47] text-[13px] font-black padding-6" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-3">E-POSTA ADRESİ</label>
                          <Input defaultValue="hasan@shopfio.com" className="rounded-2xl h-16 border-gray-100 focus:ring-[#95BF47] text-[13px] font-black padding-6" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-3">TELEFON NUMARASI</label>
                          <div className="relative">
                             <Input placeholder="+90 5XX XXX XX XX" className="rounded-2xl h-16 border-gray-100 focus:ring-[#95BF47] text-[13px] font-black pl-14" />
                             <div className="absolute left-5 top-1/2 -translate-y-1/2">
                                <Phone className="w-5 h-5 text-gray-300" />
                             </div>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-3">WEB SİTESİ (OPSİYONEL)</label>
                          <div className="relative">
                             <Input placeholder="www.magazaniz.com" className="rounded-2xl h-16 border-gray-100 focus:ring-[#95BF47] text-[13px] font-black pl-14" />
                             <div className="absolute left-5 top-1/2 -translate-y-1/2">
                                <Globe className="w-5 h-5 text-gray-300" />
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="mt-12 pt-10 border-t border-gray-100 flex items-center justify-between">
                       <div className="flex items-center gap-2 text-gray-400">
                          <Check className="w-5 h-5 text-[#95BF47]" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Tüm verileriniz uçtan uca korunuyor</span>
                       </div>
                       <Button onClick={handleSave} className="rounded-2xl bg-gray-900 text-white hover:bg-black font-black h-16 px-12 text-sm tracking-widest uppercase shadow-2xl transition-all active:scale-95">
                          <Save className="w-4 h-4 mr-3" /> Değişiklikleri Kaydet
                       </Button>
                    </div>
                 </motion.div>
              ) : (
                 <motion.div 
                   key="security"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   className="bg-white rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden"
                 >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                    
                    <div className="flex items-center gap-8 mb-12">
                       <div className="w-24 h-24 rounded-[32px] bg-orange-100/50 flex items-center justify-center border border-orange-100 shrink-0">
                          <Shield className="w-10 h-10 text-orange-500" />
                       </div>
                       <div className="space-y-1">
                          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Güvenlik Kontrolü</h2>
                          <p className="text-gray-400 text-xs font-bold font-medium leading-relaxed">Hesabınızı daha güvenli hale getirmek için şifrenizi düzenli olarak güncelleyin.</p>
                       </div>
                    </div>

                    <div className="space-y-8 max-w-lg">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-3">MEVCUT ŞİFRE</label>
                          <div className="relative">
                             <Input type="password" placeholder="••••••••" className="rounded-2xl h-16 border-gray-100 focus:ring-[#95BF47] text-[13px] font-black pl-14" />
                             <div className="absolute left-5 top-1/2 -translate-y-1/2">
                                <KeyRound className="w-5 h-5 text-gray-300" />
                             </div>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-3">YENİ ŞİFRE</label>
                             <Input type="password" placeholder="••••••••" className="rounded-2xl h-16 border-gray-100 focus:ring-[#95BF47] text-[13px] font-black" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-3">YENİ ŞİFRE (TEKRAR)</label>
                             <Input type="password" placeholder="••••••••" className="rounded-2xl h-16 border-gray-100 focus:ring-[#95BF47] text-[13px] font-black" />
                          </div>
                       </div>
                    </div>

                    <div className="mt-12 pt-10 border-t border-gray-100 flex items-center justify-between">
                       <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                             <div key={i} className="w-8 h-8 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-[10px] font-black text-gray-400">
                                {i}
                             </div>
                          ))}
                          <div className="pl-4 text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">
                             Güvenlik Adımları 3/3 Tamamlandı
                          </div>
                       </div>
                       <Button onClick={handleSave} className="rounded-2xl bg-[#95BF47] text-white hover:bg-[#86ac3f] font-black h-16 px-12 text-sm tracking-widest uppercase shadow-2xl transition-all active:scale-95">
                          <Lock className="w-4 h-4 mr-3" /> Şifreyi Güncelle
                       </Button>
                    </div>
                 </motion.div>
              )}
           </AnimatePresence>
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
