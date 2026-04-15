"use client"

import { useEffect, useState } from "react"
import { 
  Plus, CheckCircle2, ArrowUpRight, ShoppingBag, Search,
  Filter, MoreVertical, Zap
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { adminGetAllApplications, adminUpdateApplication } from "@/redux/actions/adminActions"
import { toast } from "sonner"

function ApplicationTracker({ app, index }: { app: any; index: number }) {
  const dispatch = useAppDispatch()

  const getIcon = (pkgName: string) => pkgName?.includes("Full") ? Zap : ShoppingBag
  const getColor = (pkgName: string) => {
    if (pkgName?.includes("Full")) return "bg-orange-500"
    if (pkgName?.includes("Profesyonel")) return "bg-[#95BF47]"
    return "bg-blue-500"
  }
  const Icon = getIcon(app.package?.name)
  const color = getColor(app.package?.name)

  const handleStatusChange = async (newStatus: string) => {
    const result = await dispatch(adminUpdateApplication({ id: app._id, payload: { status: newStatus } }))
    if (adminUpdateApplication.fulfilled.match(result)) {
      toast.success(`Durum güncellendi: ${newStatus}`)
    } else {
      toast.error("Hata: " + result.payload)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-[32px] p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#95BF47]/20 transition-all group relative overflow-hidden group/card"
    >
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        {/* Header Info */}
        <div className="flex items-start gap-5 shrink-0">
          <div className={cn(
            "w-16 h-16 rounded-[22px] flex items-center justify-center text-white shadow-xl relative overflow-hidden group-hover:scale-105 transition-transform duration-500",
            color
          )}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
            <Icon className="w-8 h-8 relative z-10" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 bg-gray-50 text-[10px] text-gray-500 rounded-lg">#{app.appId}</span>
              <select
                value={app.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-lg appearance-none cursor-pointer focus:outline-none border",
                  app.status === "Tamamlandı" ? "bg-green-50 text-green-600 border-green-100" :
                  app.status === "Onay Bekliyor" ? "bg-blue-50 text-blue-600 border-blue-100" :
                  app.status === "İptal Edildi" ? "bg-red-50 text-red-600 border-red-100" :
                  "bg-orange-50 text-orange-600 border-orange-100"
                )}
              >
                <option value="İnceleniyor">İnceleniyor</option>
                <option value="Onay Bekliyor">Onay Bekliyor</option>
                <option value="Tamamlandı">Tamamlandı</option>
                <option value="İptal Edildi">İptal Edildi</option>
              </select>
            </div>
            <h3 className="text-lg md:text-xl font-black text-gray-900 group-hover/card:text-[#95BF47] transition-colors">
              {app.package?.name} Mağazası
            </h3>
            <p className="text-[12px] text-gray-400 font-medium">
              {app.user?.name} · {new Date(app.createdAt).toLocaleDateString("tr-TR")} tarihinde başvuruldu
            </p>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex-1 max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#95BF47] animate-pulse" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Süreç Takibi</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-[#95BF47]">{app.progress}</span>
              <span className="text-[10px] font-bold text-gray-400">%</span>
            </div>
          </div>

          <div className="relative px-2">
            <div className="absolute top-[18px] left-8 right-8 h-1 bg-gray-50 rounded-full" />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `calc(${app.progress}% - 3rem)` }}
              transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
              className="absolute top-[18px] left-8 h-1 bg-[#95BF47] rounded-full shadow-[0_0_10px_rgba(149,191,71,0.3)]"
            />
            <div className="relative flex justify-between">
              {app.steps?.slice(0, 4).map((step: any, idx: number) => {
                const isCompleted = step.completed
                const isCurrent = step.current
                return (
                  <div key={idx} className="relative z-10 flex flex-col items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={cn(
                        "w-10 h-10 rounded-2xl border-4 flex items-center justify-center transition-all duration-300 shadow-md",
                        isCompleted ? "bg-[#95BF47] border-[#95BF47]/10 text-white" :
                        isCurrent ? "bg-white border-[#95BF47] text-[#95BF47] ring-8 ring-[#95BF47]/5" :
                        "bg-white border-white text-gray-200"
                      )}
                    >
                      {isCompleted ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                          <CheckCircle2 className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <span className="text-[11px] font-black">{idx + 1}</span>
                      )}
                    </motion.div>
                    <div className="text-center">
                      <p className={cn(
                        "text-[10px] font-black tracking-tighter whitespace-nowrap uppercase",
                        isCurrent ? "text-[#95BF47]" :
                        isCompleted ? "text-gray-900" : "text-gray-300"
                      )}>
                        {step.name}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="shrink-0 flex items-center gap-3">
          <Link href={`/admin/basvurular/detay/${app._id}`} className="block">
            <Button variant="ghost" className="rounded-2xl border border-gray-100 h-14 px-8 text-[11px] font-black hover:border-[#95BF47] hover:text-[#95BF47] hover:bg-white transition-all bg-white shadow-sm flex gap-3 group/btn">
              Detayları Gör
              <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center group-hover/btn:bg-[#95BF47] group-hover/btn:text-white transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-2xl h-14 w-14 text-gray-200 hover:text-gray-900 hover:bg-gray-50">
            <MoreVertical className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default function AdminApplicationsPage() {
  const dispatch = useAppDispatch()
  const { applications, loading } = useAppSelector((state) => state.admin)
  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(adminGetAllApplications())
  }, [dispatch])

  const filtered = applications.filter(a =>
    a.appId?.toLowerCase().includes(search.toLowerCase()) ||
    a.user?.name?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading && applications.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#95BF47]" />
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 md:p-10 min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-12 pb-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-2">
              <div className="w-10 h-1 bg-[#95BF47] rounded-full" />
              <span className="text-[10px] font-black text-[#95BF47] uppercase tracking-[0.2em]">Admin</span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-none">Tüm Başvurular</h1>
            <p className="text-gray-400 text-sm font-medium">Sisteme kayıtlı tüm mağaza kurulum taleplerini görüntüleyin ve yönetin.</p>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 bg-white/50 backdrop-blur-md p-4 rounded-[32px] border border-white">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 stroke-[3]" />
            <Input
              placeholder="Mağaza veya kullanıcı ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-2xl h-14 pl-14 pr-6 border-transparent bg-white shadow-sm focus-visible:ring-[#95BF47] text-xs font-bold transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="rounded-2xl border-transparent bg-white shadow-sm h-14 px-6 text-xs font-black flex gap-3 text-gray-600 hover:text-[#95BF47]">
              <Filter className="w-4 h-4" /> Filtrele
            </Button>
            <div className="h-8 w-[1px] bg-gray-200 mx-2" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Toplam</span>
              <p className="text-base font-black text-gray-900 tracking-tight">{filtered.length} Kayıt</p>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((app, i) => (
              <ApplicationTracker key={app._id} app={app} index={i} />
            ))}
          </AnimatePresence>

          {filtered.length === 0 && !loading && (
            <div className="p-20 rounded-[48px] border-4 border-dashed border-gray-100 flex flex-col items-center justify-center text-center space-y-4 bg-white/20">
              <div className="w-20 h-20 rounded-[28px] bg-white flex items-center justify-center text-gray-200 shadow-sm ring-1 ring-gray-50">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <p className="text-lg font-black text-gray-900">Başvuru bulunamadı</p>
              <p className="text-sm text-gray-400 font-medium">Arama kriterinize uygun kayıt yok.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
