"use client"

import * as React from "react"
import { use } from "react"
import {
  ArrowLeft, CheckCircle2, MessageSquare, FileText, Info,
  Zap, ChevronRight, Download, Lock, Copy, ExternalLink,
  Eye, EyeOff, Save, Loader2, ShoppingBag
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
  const [status, setStatus] = React.useState("")
  const [progress, setProgress] = React.useState(0)
  const [isSaving, setIsSaving] = React.useState(false)

  React.useEffect(() => {
    if (id) dispatch(adminGetApplication(id))
  }, [id, dispatch])

  React.useEffect(() => {
    if (app) {
      setStatus(app.status || "")
      setProgress(app.progress || 0)
    }
  }, [app])

  const copyToClipboard = (text: string | undefined | null, label: string) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    toast.success(`${label} kopyalandı`)
  }

  const handleSave = async () => {
    setIsSaving(true)
    const result = await dispatch(adminUpdateApplication({ id, payload: { status, progress } }))
    if (adminUpdateApplication.fulfilled.match(result)) {
      toast.success("Başvuru güncellendi")
    } else {
      toast.error("Hata: " + result.payload)
    }
    setIsSaving(false)
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#95BF47]" />
      </div>
    )
  }

  if (!app) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[600px] gap-4">
        <p className="text-gray-500 font-bold">Başvuru bulunamadı.</p>
        <Link href="/admin/basvurular">
          <Button className="rounded-2xl bg-[#95BF47] text-white">Listeye Dön</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 md:p-10">
      <div className="max-w-[1200px] mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href="/admin/basvurular">
              <Button variant="outline" size="icon" className="rounded-2xl w-12 h-12 border-gray-100 bg-white shadow-sm hover:border-[#95BF47] hover:text-[#95BF47] transition-all">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">{app.package?.name} Mağazası</h1>
                <span className={cn(
                  "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
                  app.status === "Tamamlandı" ? "bg-green-50 text-green-600 border border-green-100" :
                  app.status === "İptal Edildi" ? "bg-red-50 text-red-600 border border-red-100" :
                  app.status === "Onay Bekliyor" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                  "bg-orange-50 text-orange-600 border border-orange-100"
                )}>{app.status}</span>
              </div>
              <p className="text-gray-400 text-xs font-medium">
                Başvuru Kodu: <span className="text-gray-900 font-black">#{app.appId}</span>
                {" · "}{app.user?.name}
                {" · "}{new Date(app.createdAt).toLocaleDateString("tr-TR")} tarihinde oluşturuldu
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Admin Controls Card */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm"
            >
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <div className="w-1 h-4 bg-[#95BF47] rounded-full" />
                ADMIN KONTROLLERİ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Durum</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-black focus:outline-none focus:ring-2 focus:ring-[#95BF47]/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="İnceleniyor">İnceleniyor</option>
                    <option value="Onay Bekliyor">Onay Bekliyor</option>
                    <option value="Tamamlandı">Tamamlandı</option>
                    <option value="İptal Edildi">İptal Edildi</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    İlerleme: <span className="text-[#95BF47]">{progress}%</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#95BF47]"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-[#95BF47] hover:bg-[#86ac3f] text-white px-8 py-3 rounded-2xl font-black text-xs transition-all disabled:opacity-50 shadow-lg shadow-[#95BF47]/20"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  KAYDET
                </button>
              </div>
            </motion.div>

            {/* Credentials Card */}
            {app.credentials && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black rounded-[40px] p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden"
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
                        <p className="text-gray-500 text-xs font-medium">Kurulum tamamlandığında bu bilgilerle giriş yapılabilir.</p>
                      </div>
                    </div>
                    <Link href={app.credentials?.url || "#"} target="_blank">
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
                <div className="absolute left-[20px] top-4 bottom-4 w-1 bg-gray-50 rounded-full" />
                {(app.steps || []).map((step: any, idx: number) => {
                  const isCompleted = step.completed
                  const isCurrent = step.current
                  const isUpcoming = !isCompleted && !isCurrent
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative flex items-start gap-8 group"
                    >
                      <div className={cn(
                        "relative w-10 h-10 rounded-2xl flex items-center justify-center z-10 transition-all duration-500",
                        isCompleted ? "bg-[#95BF47] text-white shadow-lg shadow-[#95BF47]/20" :
                        isCurrent ? "bg-white border-4 border-[#95BF47] text-[#95BF47] shadow-xl ring-8 ring-[#95BF47]/5" :
                        "bg-white border-4 border-gray-100 text-gray-200"
                      )}>
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-black">{idx + 1}</span>}
                        {isCurrent && <div className="absolute inset-0 rounded-2xl border-4 border-[#95BF47] animate-ping opacity-20" />}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-center justify-between gap-4 mb-1">
                          <p className={cn(
                            "text-base font-black tracking-tight uppercase",
                            isCurrent ? "text-[#95BF47]" : isUpcoming ? "text-gray-300" : "text-gray-900"
                          )}>{step.name}</p>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-lg">{step.date}</span>
                        </div>
                        <div className={cn("transition-all duration-500", isCurrent ? "mt-4 p-5 bg-[#95BF47]/5 border border-[#95BF47]/10 rounded-3xl" : "opacity-60")}>
                          {isCurrent && (
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#95BF47] animate-pulse" />
                              <span className="text-[10px] text-[#95BF47] font-black tracking-widest uppercase">SÜRÜYOR</span>
                            </div>
                          )}
                          <p className={cn("text-[13px] font-medium leading-relaxed", isCurrent ? "text-gray-600" : isUpcoming ? "text-gray-300" : "text-gray-500")}>{step.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Details + Files */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                  <div className="w-1 h-4 bg-[#95BF47] rounded-full" />
                  BAŞVURU DETAYLARI
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Ad Soyad", value: app.formData?.name },
                    { label: "Doğum Tarihi", value: app.formData?.birthDate },
                    { label: "IBAN", value: app.formData?.iban ? `TR${app.formData.iban}` : null },
                    { label: "Ödeme Yöntemi", value: app.paymentMethod || "Havale" },
                    { label: "Shopify E-posta", value: app.formData?.shopifyEmail },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-3 border-b border-gray-50 hover:bg-gray-50/50 px-2 rounded-xl transition-colors">
                      <span className="text-xs text-gray-400 font-bold">{label}</span>
                      <span className="text-xs text-gray-900 font-black">{value || "–"}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                  <div className="w-1 h-4 bg-[#95BF47] rounded-full" />
                  EKLİ DOSYALAR
                </h3>
                <div className="space-y-4">
                  {[
                    { key: "idFront", label: "Kimlik Ön Yüz.jpg" },
                    { key: "idBack", label: "Kimlik Arka Yüz.jpg" },
                  ].map(({ key, label }) => app.formData?.[key] && (
                    <Link key={key} href={app.formData[key]} target="_blank" className="p-4 rounded-2xl border border-gray-50 hover:border-[#95BF47]/30 hover:bg-[#95BF47]/5 transition-all flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                          <FileText className="w-5 h-5 text-gray-400 group-hover:text-[#95BF47]" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-gray-900 truncate max-w-[150px]">{label}</p>
                          <p className="text-[10px] text-gray-400 font-bold">Sistem Kaydı</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#95BF47] group-hover:text-white transition-all">
                        <Download className="w-4 h-4" />
                      </div>
                    </Link>
                  ))}
                  {!(app.formData?.idFront || app.formData?.idBack) && (
                    <p className="text-xs text-gray-400 font-medium text-center py-10 italic">Henüz dosya eklenmemiş.</p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Customer Card */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <div className="w-1 h-4 bg-[#95BF47] rounded-full" />
                MÜŞTERİ BİLGİSİ
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#95BF47]/10 flex items-center justify-center text-2xl font-black text-[#95BF47]">
                  {app.user?.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <p className="font-black text-gray-900">{app.user?.name}</p>
                  <p className="text-xs text-gray-400 font-medium">{app.user?.email}</p>
                </div>
              </div>
              <Link href={`/admin/users`}>
                <Button variant="outline" className="w-full rounded-2xl border-gray-100 h-12 text-xs font-black hover:border-[#95BF47] hover:text-[#95BF47] transition-all">
                  Kullanıcı Profiline Git <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            {/* Support Card */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0f172a] rounded-[40px] p-8 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 blur-2xl group-hover:scale-150 transition-all duration-700" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <Info className="w-5 h-5 text-gray-400" />
                </div>
                <h4 className="text-xl font-black mb-3 leading-tight">Destek Talebi?</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-8 font-medium">Bu başvuruya ait destek taleplerini görüntüleyin.</p>
                <Link href="/admin/destek">
                  <Button variant="outline" className="rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-black h-12 text-xs transition-all w-full">
                    Destek Yönetimi <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
