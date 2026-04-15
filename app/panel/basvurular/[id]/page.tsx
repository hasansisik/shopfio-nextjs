"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { 
  ArrowLeft, 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  Info,
  Calendar,
  Zap,
  ChevronRight,
  MoreVertical,
  Download,
  Lock,
  Copy,
  ExternalLink,
  Eye,
  EyeOff
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { getApplicationDetails } from "@/redux/actions/applicationActions"

export default function BasvuruDetayPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { currentApplication: app, loading } = useAppSelector((state) => state.application)
  const [showPassword, setShowPassword] = React.useState(false)

  React.useEffect(() => {
    if (id) {
      dispatch(getApplicationDetails(id as string))
    }
  }, [id, dispatch])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#95BF47]"></div>
      </div>
    )
  }

  if (!app) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[600px] gap-4">
        <p className="text-gray-500 font-bold">Başvuru bulunamadı.</p>
        <Link href="/panel/basvurular">
           <Button className="rounded-2xl bg-[#95BF47] text-white">Listeye Dön</Button>
        </Link>
      </div>
    )
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} kopyalandı`)
  }

  return (
    <div className="flex-1 p-4 md:p-10">
      <div className="max-w-[1200px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href="/panel/basvurular">
              <Button variant="outline" size="icon" className="rounded-2xl w-12 h-12 border-gray-100 bg-white shadow-sm hover:border-[#95BF47] hover:text-[#95BF47] transition-all">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">{app.package?.name} Mağazası</h1>
                <span className={cn(
                  "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
                  app.status === "Tamamlandı" || app.status === "Tamamlanmak Üzere" ? "bg-green-50 text-green-600 border border-green-100" : "bg-orange-50 text-orange-600 border border-orange-100"
                )}>{app.status}</span>
              </div>
              <p className="text-gray-400 text-xs font-medium">Başvuru Kodu: <span className="text-gray-900 font-black">#{app.appId}</span> • {new Date(app.createdAt).toLocaleDateString('tr-TR')} tarihinde oluşturuldu</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* STORE CREDENTIALS CARD - NEW */}
            {app.credentials && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black rounded-[40px] p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden group"
              >
                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#95BF47]/10 blur-[100px] rounded-full pointer-events-none" />
                 
                 <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#95BF47] flex items-center justify-center text-white">
                             <Lock className="w-6 h-6" />
                          </div>
                          <div>
                             <h3 className="text-lg font-black text-white">Mağaza Erişim Bilgileri</h3>
                             <p className="text-gray-500 text-xs font-medium">Kurulum tamamlandığında bu bilgilerle giriş yapabilirsiniz.</p>
                          </div>
                       </div>
                       <Link href={app.credentials.url} target="_blank">
                          <Button className="rounded-2xl bg-white/10 text-white hover:bg-white/20 border border-white/10 h-12 px-6 text-xs font-black flex gap-2">
                             Panel <ExternalLink className="w-4 h-4" />
                          </Button>
                       </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="p-5 rounded-3xl bg-white/5 border border-white/5 space-y-1 group/item transition-all hover:bg-white/10 cursor-pointer" onClick={() => copyToClipboard(app.credentials.email, "E-posta")}>
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">E-Posta</p>
                          <div className="flex items-center justify-between">
                             <p className="text-sm font-bold text-white tracking-tight">{app.credentials.email}</p>
                             <Copy className="w-4 h-4 text-gray-600 group-hover/item:text-[#95BF47] transition-colors" />
                          </div>
                       </div>
                       
                       <div className="p-5 rounded-3xl bg-white/5 border border-white/5 space-y-1 group/item transition-all hover:bg-white/10 relative">
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Şifre</p>
                          <div className="flex items-center justify-between">
                             <p className="text-sm font-bold text-white tracking-[0.2em]">
                                {showPassword ? app.credentials.password : "••••••••••••"}
                             </p>
                             <div className="flex items-center gap-2">
                                <button onClick={() => setShowPassword(!showPassword)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                   {showPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                                </button>
                                <button onClick={() => copyToClipboard(app.credentials.password, "Şifre")} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                   <Copy className="w-4 h-4 text-gray-500 hover:text-[#95BF47]" />
                                </button>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="mt-8 flex items-center gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
                       <Info className="w-5 h-5 text-orange-400 shrink-0" />
                       <p className="text-[11px] text-orange-200/80 font-medium">Lütfen güvenliğiniz için ilk girişinizden sonra şifrenizi Shopify paneli üzerinden değiştirmeyi unutmayın.</p>
                    </div>
                 </div>
              </motion.div>
            )}

            {/* Progress Stepper Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[40px] p-8 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden"
            >
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#95BF47]/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[#95BF47]" />
                    </div>
                    Kurulum Yol Haritası
                  </h3>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-xs font-black text-[#95BF47]">{app.progress}%</span>
                    <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${app.progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-[#95BF47]"
                      />
                    </div>
                  </div>
               </div>
               
               <div className="relative space-y-12 pl-4">
                  {/* Vertical Track Line */}
                  <div className="absolute left-[20px] top-4 bottom-4 w-1 bg-gray-50 rounded-full" />
                  
                  {app.steps.map((step, idx) => {
                    const isCompleted = step.completed
                    const isCurrent = step.current
                    const isUpcoming = step.upcoming

                    return (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative flex items-start gap-8 group"
                      >
                         {/* Step Icon / Circle */}
                         <div className={cn(
                           "relative w-10 h-10 rounded-2xl flex items-center justify-center z-10 transition-all duration-500",
                           isCompleted ? "bg-[#95BF47] text-white shadow-lg shadow-[#95BF47]/20" : 
                           isCurrent ? "bg-white border-4 border-[#95BF47] text-[#95BF47] shadow-xl shadow-[#95BF47]/10 ring-8 ring-[#95BF47]/5" : 
                           "bg-white border-4 border-gray-100 text-gray-200"
                         )}>
                            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : 
                             <span className="text-xs font-black">{idx + 1}</span>}
                            
                            {isCurrent && (
                              <div className="absolute inset-0 rounded-2xl border-4 border-[#95BF47] animate-ping opacity-20" />
                            )}
                         </div>

                         {/* Step Content */}
                         <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex items-center justify-between gap-4 mb-1">
                               <p className={cn(
                                 "text-base font-black tracking-tight uppercase",
                                 isCurrent ? "text-[#95BF47]" : 
                                 isUpcoming ? "text-gray-300" : "text-gray-900"
                               )}>
                                 {step.name}
                               </p>
                               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-lg">
                                 {step.date}
                               </span>
                            </div>
                            
                            <div className={cn(
                              "transition-all duration-500",
                              isCurrent ? "mt-4 p-5 bg-[#95BF47]/5 border border-[#95BF47]/10 rounded-3xl" : "opacity-60"
                            )}>
                               {isCurrent && (
                                 <div className="flex items-center gap-2 mb-2">
                                   <div className="w-1.5 h-1.5 rounded-full bg-[#95BF47] animate-pulse" />
                                   <span className="text-[10px] text-[#95BF47] font-black tracking-widest uppercase">SÜRÜYOR</span>
                                 </div>
                               )}
                               <p className={cn(
                                 "text-[13px] font-medium leading-relaxed",
                                 isCurrent ? "text-gray-600" : isUpcoming ? "text-gray-300" : "text-gray-500"
                               )}>
                                 {step.desc}
                               </p>
                            </div>
                         </div>
                      </motion.div>
                    )
                  })}
               </div>
            </motion.div>

            {/* Application Info Footer Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm"
                >
                   <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                     <div className="w-1 h-4 bg-[#95BF47] rounded-full" /> 
                     BAŞVURU DETAYLARI
                   </h3>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-50 hover:bg-gray-50/50 px-2 rounded-xl transition-colors">
                         <span className="text-xs text-gray-400 font-bold">Ad Soyad</span>
                         <span className="text-xs text-gray-900 font-black">{app.formData?.name || "-"}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-50 hover:bg-gray-50/50 px-2 rounded-xl transition-colors">
                         <span className="text-xs text-gray-400 font-bold">Doğum Tarihi</span>
                         <span className="text-xs text-gray-900 font-black">{app.formData?.birthDate || "-"}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-50 hover:bg-gray-50/50 px-2 rounded-xl transition-colors">
                         <span className="text-xs text-gray-400 font-bold">IBAN</span>
                         <span className="text-xs text-gray-900 font-black">TR{app.formData?.iban || "-"}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-50 hover:bg-gray-50/50 px-2 rounded-xl transition-colors">
                         <span className="text-xs text-gray-400 font-bold">Ödeme Yöntemi</span>
                         <span className="text-xs text-gray-900 font-black uppercase">{app.paymentMethod || "Havale"}</span>
                      </div>
                   </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm"
                >
                   <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                     <div className="w-1 h-4 bg-[#95BF47] rounded-full" /> 
                     EKLİ DOSYALAR
                   </h3>
                   <div className="space-y-4">
                      {app.formData?.idFront && (
                        <Link href={app.formData.idFront} target="_blank" className="p-4 rounded-2xl border border-gray-50 hover:border-[#95BF47]/30 hover:bg-[#95BF47]/5 transition-all flex items-center justify-between group cursor-pointer">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                 <FileText className="w-5 h-5 text-gray-400 group-hover:text-[#95BF47]" />
                              </div>
                              <div>
                                 <p className="text-xs font-black text-gray-900 truncate max-w-[150px]">Kimlik Ön Yüz.jpg</p>
                                 <p className="text-[10px] text-gray-400 font-bold">Sistem Kaydı</p>
                              </div>
                           </div>
                           <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#95BF47] group-hover:text-white transition-all">
                             <Download className="w-4 h-4" />
                           </div>
                        </Link>
                      )}
                      {app.formData?.idBack && (
                        <Link href={app.formData.idBack} target="_blank" className="p-4 rounded-2xl border border-gray-50 hover:border-[#95BF47]/30 hover:bg-[#95BF47]/5 transition-all flex items-center justify-between group cursor-pointer">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                 <FileText className="w-5 h-5 text-gray-400 group-hover:text-[#95BF47]" />
                              </div>
                              <div>
                                 <p className="text-xs font-black text-gray-900 truncate max-w-[150px]">Kimlik Arka Yüz.jpg</p>
                                 <p className="text-[10px] text-gray-400 font-bold">Sistem Kaydı</p>
                              </div>
                           </div>
                           <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#95BF47] group-hover:text-white transition-all">
                             <Download className="w-4 h-4" />
                           </div>
                        </Link>
                      )}
                      {!(app.formData?.idFront || app.formData?.idBack) && (
                        <p className="text-xs text-gray-400 font-medium text-center py-10 italic">Henüz dosya eklenmemiş.</p>
                      )}
                   </div>
                </motion.div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">


            {/* Quick Action Card Support */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="bg-[#0f172a] rounded-[40px] p-8 text-white overflow-hidden relative group"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 blur-2xl group-hover:scale-150 transition-all duration-700" />
               <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                    <Info className="w-5 h-5 text-gray-400" />
                  </div>
                  <h4 className="text-xl font-black mb-3 leading-tight">Desteğe mi İhtiyacınız Var?</h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-8 font-medium">Kurulum süreci hakkında teknik ekibimizle anında iletişime geçin.</p>
                  <Button variant="outline" className="rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-black h-12 text-xs transition-all">
                     Destek Merkezi <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
