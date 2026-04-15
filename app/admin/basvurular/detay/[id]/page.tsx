"use client"

import * as React from "react"
import { use } from "react"
import {
  ArrowLeft, CheckCircle2, FileText, Info,
  Zap, ChevronRight, Download, Lock, Copy, ExternalLink,
  Eye, EyeOff, Save, Loader2, User, StickyNote, Activity
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { adminGetApplication, adminUpdateApplication } from "@/redux/actions/adminActions"
import { toast } from "sonner"

export default function AdminApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const dispatch = useAppDispatch()
  const { currentApplication: app, loading } = useAppSelector((state) => state.admin)
  
  const [showPassword, setShowPassword] = React.useState(false)
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0)
  const [adminNote, setAdminNote] = React.useState("")
  const [isSaving, setIsSaving] = React.useState(false)

  React.useEffect(() => {
    if (id) {
      dispatch(adminGetApplication(id))
    }
  }, [id, dispatch])

  React.useEffect(() => {
    if (app) {
      const activeIdx = app.steps?.findIndex((s: any) => s.current)
      setCurrentStepIndex(activeIdx !== -1 ? activeIdx : 0)
      setAdminNote(app.adminNote || "")
    }
  }, [app])

  const copyToClipboard = (text: string | undefined | null, label: string) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    toast.success(`${label} kopyalandı`)
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    // Update steps logic
    const updatedSteps = app.steps.map((step: any, idx: number) => {
      if (idx < currentStepIndex) {
        return { ...step, completed: true, current: false, upcoming: false, date: step.date || new Date().toLocaleDateString('tr-TR') }
      } else if (idx === currentStepIndex) {
        return { ...step, completed: false, current: true, upcoming: false, date: step.date || new Date().toLocaleDateString('tr-TR') }
      } else {
        return { ...step, completed: false, current: false, upcoming: true, date: null }
      }
    })

    // Progress calculation
    const progress = Math.round(((currentStepIndex + 1) / app.steps.length) * 100)
    
    // Overall status mapping (Optional: match common status or just use step name)
    const currentStepName = app.steps[currentStepIndex]?.name || ""
    let status = app.status // Default to current

    if (currentStepName.includes("TAMAMLANDI") || currentStepName.includes("TESLİM")) {
      status = "Tamamlandı"
    } else if (currentStepName.includes("İPTAL")) {
      status = "İptal Edildi"
    } else {
      status = "İnceleniyor"
    }

    const result = await dispatch(adminUpdateApplication({ 
      id, 
      payload: { 
        status, 
        progress, 
        adminNote,
        steps: updatedSteps
      } 
    }))
    
    if (adminUpdateApplication.fulfilled.match(result)) {
      toast.success("Başvuru süreci güncellendi")
    } else {
      toast.error("Hata: " + result.payload)
    }
    setIsSaving(false)
  }

  if (loading && !app) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#95BF47]" />
      </div>
    )
  }

  if (!app) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[600px] gap-6">
        <div className="w-20 h-20 rounded-[32px] bg-gray-50 flex items-center justify-center text-gray-200">
           <Zap className="w-10 h-10" />
        </div>
        <p className="text-gray-500 font-black text-xl">Başvuru bulunamadı.</p>
        <Link href="/admin/basvurular">
          <Button className="rounded-2xl bg-[#95BF47] text-white px-10 h-14 font-black">Listeye Dön</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 md:p-10">
      <div className="max-w-[1200px] mx-auto space-y-8 pb-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href="/admin/basvurular">
              <Button variant="outline" size="icon" className="rounded-2xl w-14 h-14 border-gray-100 bg-white shadow-sm hover:border-[#95BF47] hover:text-[#95BF47] transition-all">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{app.package?.name} Kurulumu</h1>
                <span className={cn(
                  "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                  app.status === "Tamamlandı" ? "bg-green-50 text-green-600 border-green-100" :
                  app.status === "İptal Edildi" ? "bg-red-50 text-red-600 border-red-100" :
                  app.status === "Onay Bekliyor" ? "bg-blue-50 text-blue-600 border-blue-100" :
                  "bg-orange-50 text-orange-600 border-orange-100"
                )}>{app.status}</span>
              </div>
              <p className="text-gray-400 text-sm font-medium">
                Kodu: <span className="text-gray-900 font-black tracking-wider">#{app.appId}</span>
                {" · "}{new Date(app.createdAt).toLocaleDateString("tr-TR")}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2.5 bg-black text-white hover:bg-gray-800 px-10 h-14 rounded-2xl font-black text-sm transition-all disabled:opacity-50 shadow-xl"
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
               SÜRECİ KAYDET
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Management & Status */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Admin Management Panel */}
            <div className="bg-white rounded-[40px] p-8 md:p-10 border border-gray-100 shadow-sm space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#95BF47]/5 blur-3xl rounded-full" />
               
               <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                       <Activity className="w-5 h-5 text-[#95BF47]" />
                    </div>
                    SÜREÇ YÖNETİMİ
                  </h3>
                  <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block italic">Mevcut Aşama (Yol Haritası)</label>
                      <div className="relative">
                        <select
                          value={currentStepIndex}
                          onChange={(e) => setCurrentStepIndex(Number(e.target.value))}
                          className="w-full bg-gray-50 border border-gray-100 rounded-[20px] px-6 py-5 text-sm font-black focus:outline-none focus:ring-2 focus:ring-[#95BF47]/20 transition-all appearance-none cursor-pointer"
                        >
                          {(app.steps || []).map((step: any, idx: number) => (
                            <option key={idx} value={idx}>
                              Adım {idx + 1}: {step.name}
                            </option>
                          ))}
                        </select>
                        <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90 pointer-events-none" />
                      </div>
                      <p className="text-[11px] text-gray-400 font-medium ml-1">
                        Seçtiğiniz aşama otomatik olarak ilerleme yüzdesini (%{Math.round(((currentStepIndex + 1) / (app.steps?.length || 1)) * 100)}) hesaplar.
                      </p>
                    </div>
                  </div>
               </div>

               {/* Admin Note Section */}
               <div className="space-y-4 pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-2 ml-1">
                     <StickyNote className="w-4 h-4 text-gray-400" />
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block italic">Dahili Notlar</label>
                  </div>
                  <textarea 
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    placeholder="Bu başvuru ile ilgili operasyonel notlarınızı buraya girebilirsiniz..."
                    className="w-full min-h-[140px] bg-gray-50 border border-gray-100 rounded-[24px] p-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#95BF47]/10 transition-all resize-none"
                  />
               </div>
            </div>

            {/* Shopify Access Details */}
            {app.credentials && (
              <div className="bg-black rounded-[40px] p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#95BF47]/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#95BF47] flex items-center justify-center text-white">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white">Shopify Erişim Bilgileri</h3>
                        <p className="text-gray-500 text-xs font-medium">Kullanıcının panele giriş yapabileceği bilgiler.</p>
                      </div>
                    </div>
                    {app.credentials.url && (
                      <Link href={app.credentials.url} target="_blank">
                        <Button className="rounded-2xl bg-white/10 text-white hover:bg-white/20 border border-white/10 h-12 px-6 text-xs font-black flex gap-2">
                          Mağaza Paneli <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-[28px] bg-white/5 border border-white/5 space-y-1.5 group/item transition-all hover:bg-white/10 cursor-pointer" onClick={() => copyToClipboard(app.credentials.email, "E-posta")}>
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">E-Posta</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-white tracking-tight">{app.credentials.email}</p>
                        <Copy className="w-4 h-4 text-gray-600 group-hover/item:text-[#95BF47] transition-colors" />
                      </div>
                    </div>
                    <div className="p-6 rounded-[28px] bg-white/5 border border-white/5 space-y-1.5 group/item transition-all hover:bg-white/10 relative">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Şifre</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-white tracking-[0.2em] font-mono">
                          {showPassword ? app.credentials.password : "••••••••••••"}
                        </p>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setShowPassword(!showPassword)} className="p-2.5 hover:bg-white/10 rounded-xl transition-colors">
                            {showPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                          </button>
                          <button onClick={() => copyToClipboard(app.credentials.password, "Şifre")} className="p-2.5 hover:bg-white/10 rounded-xl transition-colors">
                            <Copy className="w-4 h-4 text-gray-500 hover:text-[#95BF47]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Roadmap Steps */}
            <div className="bg-white rounded-[40px] p-8 md:p-10 border border-gray-100 shadow-sm">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-10 flex items-center gap-3 italic">
                    <Zap className="w-4 h-4 text-[#95BF47]" />
                    KURULUM YOL HARİTASI (ÖNİZLEME)
                </h3>
                <div className="relative space-y-12 pl-4">
                    <div className="absolute left-[20px] top-4 bottom-4 w-1 bg-gray-50 rounded-full" />
                    {(app.steps || []).map((step: any, idx: number) => {
                        const isCompleted = idx < currentStepIndex
                        const isCurrent = idx === currentStepIndex
                        return (
                            <div key={idx} className="relative flex items-start gap-8">
                                <div className={cn(
                                    "relative w-10 h-10 rounded-[14px] flex items-center justify-center z-10 border-4 transition-all duration-500",
                                    isCompleted ? "bg-[#95BF47] border-[#95BF47]/10 text-white shadow-lg shadow-[#95BF47]/20" :
                                    isCurrent ? "bg-white border-[#95BF47] text-[#95BF47] shadow-xl ring-8 ring-[#95BF47]/5" :
                                    "bg-white border-gray-100 text-gray-200"
                                )}>
                                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-black">{idx + 1}</span>}
                                </div>
                                <div className="flex-1 min-w-0 pt-0.5">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className={cn(
                                            "text-base font-black tracking-tight uppercase",
                                            isCurrent ? "text-[#95BF47]" : isCompleted ? "text-gray-900" : "text-gray-300"
                                        )}>{step.name}</p>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase bg-gray-50 px-2 py-1 rounded-lg">
                                            {isCurrent ? "Şu anki Aşama" : isCompleted ? "Tamamlandı" : "Beklemede"}
                                        </span>
                                    </div>
                                    <p className={cn("text-[13px] font-medium leading-relaxed", isCurrent ? "text-gray-600" : "text-gray-300")}>{step.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
          </div>

          {/* Right Column: User & Side Info */}
          <div className="space-y-8">
            {/* Customer Information */}
            <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2 italic">
                <User className="w-4 h-4" /> MÜŞTERİ BİLGİSİ
              </h3>
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-[24px] bg-[#95BF47]/10 flex items-center justify-center text-3xl font-black text-[#95BF47]">
                  {app.user?.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <p className="font-black text-xl text-gray-900 leading-tight">{app.user?.name}</p>
                  <p className="text-sm text-gray-400 font-medium">{app.user?.email}</p>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-gray-50">
                <div className="flex justify-between items-center py-2">
                   <span className="text-xs text-gray-400 font-bold italic">Toplam Başvuru</span>
                   <span className="text-sm font-black text-gray-900">1</span>
                </div>
              </div>
            </div>

            {/* Application Data */}
            <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2 italic">
                  <FileText className="w-4 h-4 text-blue-500" /> BAŞVURU VERİLERİ
                </h3>
                <div className="space-y-6">
                   {[
                     { label: "Doğum Tarihi", value: app.formData?.birthDate },
                     { label: "IBAN", value: app.formData?.iban ? `TR${app.formData.iban}` : "–" },
                     { label: "Ödeme", value: app.paymentMethod?.toUpperCase() },
                   ].map((item, i) => (
                     <div key={i}>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{item.value || "Belirtilmemiş"}</p>
                     </div>
                   ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
