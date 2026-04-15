"use client"

import * as React from "react"
import { 
  User, 
  Lock, 
  Shield, 
  Camera,
  Trash2,
  Save,
  KeyRound,
  Mail,
  Phone,
  Globe,
  LogOut,
  Zap,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { editProfile, deleteUser, logout } from "@/redux/actions/userActions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function AyarlarPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user, loading } = useAppSelector((state) => state.user)
  
  const [activeTab, setActiveTab] = React.useState<"profile" | "security">("profile")
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = React.useState(false)

  // Form State
  const [formData, setFormData] = React.useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  })

  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }))
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      toast.error("Lütfen gerekli alanları doldurun")
      return
    }

    const payload: any = {
      name: formData.name,
      email: formData.email,
    }

    const result = await dispatch(editProfile(payload))
    if (editProfile.fulfilled.match(result)) {
       if (result.payload && result.payload.message && result.payload.message.includes("yeni e-posta")) {
         toast.success(result.payload.message)
         router.push(`/dogrulama?email=${encodeURIComponent(formData.email)}`)
       } else {
         toast.success("Profil başarıyla güncellendi")
       }
    } else {
      toast.error(result.payload as string || "Bir hata oluştu")
    }
  }

  const handleUpdatePassword = async () => {
     if (!formData.password || !formData.newPassword || !formData.confirmPassword) {
       toast.error("Lütfen şifre alanlarını doldurun")
       return
     }
     if (formData.newPassword !== formData.confirmPassword) {
       toast.error("Şifreler eşleşmiyor")
       return
     }

     const result = await dispatch(editProfile({
       name: formData.name,
       surname: "",
       email: formData.email,
       password: formData.newPassword
     } as any))

     if (editProfile.fulfilled.match(result)) {
       toast.success("Şifre başarıyla güncellendi")
       setFormData(prev => ({ ...prev, password: "", newPassword: "", confirmPassword: "" }))
     } else {
       toast.error(result.payload as string || "Bir hata oluştu")
     }
  }

  const handleDeleteAccount = async () => {
    if (!user?._id) return
    const result = await dispatch(deleteUser(user._id))
    if (deleteUser.fulfilled.match(result)) {
      toast.success("Hesabınız silindi")
      router.push("/giris")
    }
  }

  const menuItems = [
    { id: "profile", label: "Profil Bilgileri", icon: User, desc: "Kişisel detaylar ve avatar" },
    { id: "security", label: "Güvenlik & Şifre", icon: Lock, desc: "Hesap koruma ve şifre" },
  ]

  return (
    <div className="flex-1 p-6 md:p-10 space-y-6 min-h-screen max-w-[1200px] mx-auto pb-24">
      
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div className="space-y-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="w-6 h-[1.5px] bg-[#95BF47] rounded-full" />
            <span className="text-[9px] font-black text-[#95BF47] uppercase tracking-[0.2em]">Sistem Ayarları</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-none"
          >
            Hesabınızı <span className="text-[#95BF47]">Yönetin</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-medium text-xs max-w-xl"
          >
            Profil bilgilerinizi ve güvenliğinizi buradan güncelleyin.
          </motion.p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-4">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="bg-white rounded-[24px] p-2 border border-gray-100 shadow-sm overflow-hidden"
           >
              <div className="space-y-1">
                 {menuItems.map((item) => (
                    <button 
                      key={item.id} 
                      onClick={() => setActiveTab(item.id as any)}
                      className={cn(
                        "w-full flex items-center gap-3 p-2.5 rounded-[18px] transition-all group relative",
                        activeTab === item.id 
                          ? "bg-gray-900 text-white shadow-lg" 
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                       <div className={cn(
                          "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                          activeTab === item.id ? "bg-[#95BF47] text-white" : "bg-gray-50 text-gray-400 group-hover:bg-white"
                       )}>
                          <item.icon className="w-4 h-4" />
                       </div>
                       <div className="text-left">
                          <p className="text-[10px] font-black uppercase tracking-widest">{item.label}</p>
                          <p className={cn(
                             "text-[9px] font-bold mt-0.5",
                             activeTab === item.id ? "text-white/50" : "text-gray-400"
                          )}>{item.desc}</p>
                       </div>
                       {activeTab === item.id && (
                          <motion.div 
                             layoutId="tab-indicator"
                             className="absolute right-4 w-1 h-1 rounded-full bg-[#95BF47]"
                          />
                       )}
                    </button>
                 ))}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-50 px-1 space-y-1">
                 <button 
                   onClick={() => setIsDeleteAlertOpen(true)}
                   className="w-full flex items-center gap-3 p-2.5 rounded-[18px] text-red-500 hover:bg-red-50 transition-all font-black text-[10px] uppercase tracking-widest group"
                 >
                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
                       <Trash2 className="w-4 h-4" />
                    </div>
                    Hesabı Sil
                 </button>
                 <button 
                    onClick={async () => {
                      await dispatch(logout())
                      router.push("/giris")
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-[18px] text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all font-black text-[10px] uppercase tracking-widest group"
                 >
                    <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all">
                       <LogOut className="w-4 h-4" />
                    </div>
                    Oturumu Kapat
                 </button>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
             className="bg-[#95BF47] text-white rounded-[24px] p-5 space-y-4 relative overflow-hidden group shadow-xl shadow-[#95BF47]/10"
           >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                 <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                 <h4 className="text-base font-black tracking-tight">Pro Plan Aktif</h4>
                 <p className="text-white/70 text-[9px] font-bold leading-relaxed">Shopfio'nun tüm gelişmiş özelliklerine erişiminiz var.</p>
              </div>
              <Button className="w-full rounded-xl bg-white text-gray-900 hover:bg-black hover:text-white font-black h-10 text-[9px] tracking-widest uppercase transition-all shadow-lg">Faturaları Gör</Button>
           </motion.div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8">
           <AnimatePresence mode="wait">
              {activeTab === "profile" ? (
                 <motion.div 
                    key="profile"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-white rounded-[24px] p-6 md:p-8 border border-gray-100 shadow-sm relative overflow-hidden"
                 >
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#95BF47]/5 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                    
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row items-center gap-5 mb-8">
                       <div className="relative group">
                          <div className="w-20 h-20 rounded-[24px] bg-gray-50 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden relative ring-1 ring-gray-100 transition-transform group-hover:scale-105 duration-500">
                             <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                                {user?.picture ? (
                                   <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                   <User className="w-8 h-8" />
                                )}
                             </div>
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] cursor-pointer">
                                <Camera className="w-5 h-5 text-white" />
                             </div>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-[#95BF47] text-white flex items-center justify-center shadow-lg border-2 border-white z-10">
                             <Check className="w-3.5 h-3.5" />
                          </div>
                       </div>
                       <div className="text-center md:text-left space-y-1">
                          <h2 className="text-lg font-black text-gray-900 tracking-tight">{user?.name}</h2>
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                             <div className="flex items-center gap-2 px-2.5 py-1 bg-gray-50 rounded-lg border border-gray-100">
                                <Mail className="w-3 h-3 text-gray-400" />
                                <span className="text-[9px] font-black text-gray-600">{user?.email}</span>
                             </div>
                             <div className="flex items-center gap-2 px-2.5 py-1 bg-gray-50 rounded-lg border border-gray-100">
                                <Zap className="w-3 h-3 text-[#95BF47]" />
                                <span className="text-[9px] font-black text-[#95BF47]">Profesyonel</span>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <div className="space-y-1.5">
                          <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest pl-2">TAM ADINIZ</label>
                          <Input id="name" value={formData.name} onChange={handleInputChange} disabled={loading} className="rounded-xl h-10 border-gray-100 focus:ring-[#95BF47] text-[11px] font-black px-4 bg-white" />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest pl-2">E-POSTA ADRESİ</label>
                          <Input id="email" value={formData.email} onChange={handleInputChange} disabled={loading} className="rounded-xl h-10 border-gray-100 focus:ring-[#95BF47] text-[11px] font-black px-4 bg-white" />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest pl-2">TELEFON NUMARASI</label>
                          <div className="relative">
                             <Input placeholder="+90 5XX XXX XX XX" className="rounded-xl h-10 border-gray-100 focus:ring-[#95BF47] text-[11px] font-black pl-10 bg-white" />
                             <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                                <Phone className="w-3.5 h-3.5 text-gray-300" />
                             </div>
                          </div>
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest pl-2">WEB SİTESİ (OPSİYONEL)</label>
                          <div className="relative">
                             <Input placeholder="www.magazaniz.com" className="rounded-xl h-10 border-gray-100 focus:ring-[#95BF47] text-[11px] font-black pl-10 bg-white" />
                             <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                                <Globe className="w-3.5 h-3.5 text-gray-300" />
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                       <div className="flex items-center gap-2 text-gray-400">
                          <Check className="w-3.5 h-3.5 text-[#95BF47]" />
                          <span className="text-[8px] font-bold uppercase tracking-widest">Verileriniz korunuyor</span>
                       </div>
                       <Button 
                         onClick={handleSave} 
                         disabled={loading}
                         className="rounded-xl bg-gray-900 text-white hover:bg-black font-black h-10 px-6 text-[10px] tracking-widest uppercase transition-all active:scale-95 shadow-lg"
                       >
                          <Save className="w-3.5 h-3.5 mr-2" /> Kaydet
                       </Button>
                    </div>
                 </motion.div>
              ) : (
                 <motion.div 
                    key="security"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-white rounded-[24px] p-6 md:p-8 border border-gray-100 shadow-sm relative overflow-hidden"
                 >
                    <div className="absolute top-0 right-0 w-80 h-80 bg-orange-50 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                    
                    <div className="flex items-center gap-5 mb-8">
                       <div className="w-16 h-16 rounded-[20px] bg-orange-100/50 flex items-center justify-center border border-orange-100 shrink-0">
                          <Shield className="w-7 h-7 text-orange-500" />
                       </div>
                       <div className="space-y-0.5">
                          <h2 className="text-lg font-black text-gray-900 tracking-tight">Güvenlik</h2>
                          <p className="text-gray-400 text-[10px] font-bold">Şifrenizi düzenli olarak güncelleyin.</p>
                       </div>
                    </div>

                    <div className="space-y-5 max-w-lg">
                       <div className="space-y-1.5">
                          <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest pl-2">MEVCUT ŞİFRE</label>
                          <div className="relative">
                             <Input id="password" value={formData.password} onChange={handleInputChange} type="password" placeholder="••••••••" className="rounded-xl h-10 border-gray-100 focus:ring-[#95BF47] text-[11px] font-black pl-10 bg-white" />
                             <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                                <KeyRound className="w-3.5 h-3.5 text-gray-300" />
                             </div>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                             <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest pl-2">YENİ ŞİFRE</label>
                             <Input id="newPassword" value={formData.newPassword} onChange={handleInputChange} type="password" placeholder="••••••••" className="rounded-xl h-10 border-gray-100 focus:ring-[#95BF47] text-[11px] font-black bg-white" />
                          </div>
                          <div className="space-y-1.5">
                             <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest pl-2">TEKRAR</label>
                             <Input id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} type="password" placeholder="••••••••" className="rounded-xl h-10 border-gray-100 focus:ring-[#95BF47] text-[11px] font-black bg-white" />
                          </div>
                       </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                       <div className="flex -space-x-1">
                          {[1, 2, 3].map(i => (
                             <div key={i} className="w-5 h-5 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-[7px] font-black text-gray-400">
                                {i}
                             </div>
                          ))}
                          <div className="pl-2 text-[8px] font-black text-gray-400 uppercase tracking-widest flex items-center">
                             Adımlar Tamamlandı
                          </div>
                       </div>
                       <Button 
                         onClick={handleUpdatePassword} 
                         disabled={loading}
                         className="rounded-xl bg-[#95BF47] text-white hover:bg-[#86ac3f] font-black h-10 px-6 text-[10px] tracking-widest uppercase shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                       >
                          <Lock className="w-3.5 h-3.5" /> Güncelle
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
          description="Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir."
          onAction={handleDeleteAccount}
      />
    </div>
  )
}
