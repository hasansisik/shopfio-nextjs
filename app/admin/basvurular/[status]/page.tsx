"use client"

import { use, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { adminGetAllApplications, adminUpdateApplication } from "@/redux/actions/adminActions"
import {
  ClipboardList,
  Search,
  Clock,
  ChevronRight,
  ShoppingBag,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Maps URL slug → actual DB status value
const STATUS_MAP: Record<string, { label: string; dbValue: string; color: string; icon: any }> = {
  "inceleniyor":    { label: "İnceleniyor",    dbValue: "İnceleniyor",    color: "amber",  icon: Clock },
  "onay-bekliyor":  { label: "Onay Bekliyor",  dbValue: "Onay Bekliyor",  color: "blue",   icon: Eye },
  "tamamlandi":     { label: "Tamamlandı",     dbValue: "Tamamlandı",     color: "green",  icon: CheckCircle2 },
  "iptal-edildi":   { label: "İptal Edildi",   dbValue: "İptal Edildi",   color: "red",    icon: XCircle },
}

export default function FilteredApplicationsPage({ params }: { params: Promise<{ status: string }> }) {
  const { status: slug } = use(params)
  const dispatch = useAppDispatch()
  const { applications, loading } = useAppSelector((state) => state.admin)
  const [searchTerm, setSearchTerm] = useState("")

  const statusInfo = STATUS_MAP[slug]

  useEffect(() => {
    dispatch(adminGetAllApplications())
  }, [dispatch])

  const handleStatusChange = async (id: string, newStatus: string) => {
    const result = await dispatch(adminUpdateApplication({ id, payload: { status: newStatus } }))
    if (adminUpdateApplication.fulfilled.match(result)) {
      toast.success(`Durum güncellendi: ${newStatus}`)
    } else {
      toast.error("Hata: " + result.payload)
    }
  }

  const filtered = applications
    .filter(a => statusInfo ? a.status === statusInfo.dbValue : true)
    .filter(a =>
      a.appId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const StatusIcon = statusInfo?.icon || HelpCircle

  const statusBadgeClass = (status: string) => {
    if (status === 'Tamamlandı') return 'bg-green-50 text-green-700 ring-green-500/20'
    if (status === 'İptal Edildi') return 'bg-red-50 text-red-700 ring-red-500/20'
    if (status === 'Onay Bekliyor') return 'bg-blue-50 text-blue-700 ring-blue-500/20'
    return 'bg-amber-50 text-amber-700 ring-amber-500/20'
  }

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center",
            statusInfo?.color === 'amber' && "bg-amber-50 text-amber-500",
            statusInfo?.color === 'blue'  && "bg-blue-50 text-blue-500",
            statusInfo?.color === 'green' && "bg-green-50 text-green-600",
            statusInfo?.color === 'red'   && "bg-red-50 text-red-500",
            !statusInfo && "bg-[#95BF47]/10 text-[#95BF47]"
          )}>
            <StatusIcon className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              {statusInfo?.label ?? "Tüm Başvurular"}
            </h1>
            <p className="text-sm text-gray-400 font-medium mt-0.5">
              <span className="font-black text-gray-900">{filtered.length}</span> başvuru listeleniyor
            </p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="App ID veya kullanıcı ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#95BF47]/20 transition-all w-64"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-24 flex justify-center">
            <div className="w-12 h-12 border-4 border-[#95BF47]/20 border-t-[#95BF47] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-24 text-center">
            <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center mx-auto mb-4 text-gray-200">
              <ClipboardList className="w-8 h-8" />
            </div>
            <p className="text-gray-400 font-bold text-sm">Bu kategoride başvuru bulunamadı.</p>
          </div>
        ) : filtered.map((app) => (
          <div key={app._id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#95BF47]/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-[#95BF47]" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900 tracking-tight">{app.appId}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{app.package?.name}</p>
                </div>
              </div>

              <select
                value={app.status}
                onChange={(e) => handleStatusChange(app._id, e.target.value)}
                className={cn(
                  "text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full appearance-none cursor-pointer focus:outline-none ring-1 ring-inset",
                  statusBadgeClass(app.status)
                )}
              >
                <option value="İnceleniyor">İnceleniyor</option>
                <option value="Onay Bekliyor">Onay Bekliyor</option>
                <option value="Tamamlandı">Tamamlandı</option>
                <option value="İptal Edildi">İptal Edildi</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50/70 rounded-2xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Müşteri</span>
                  <span className="text-xs font-bold text-gray-900">{app.user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ödeme</span>
                  <span className="text-xs font-bold text-gray-700 uppercase">{app.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tarih</span>
                  <span className="text-xs font-bold text-gray-700">{new Date(app.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">İlerleme</span>
                  <span className="text-[10px] font-black text-[#95BF47]">%{app.progress}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#95BF47] rounded-full transition-all duration-700"
                    style={{ width: `${app.progress}%` }}
                  />
                </div>
              </div>

              <Link
                href={`/panel/basvurular/${app._id}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gray-900 text-white text-xs font-bold hover:bg-black transition-all active:scale-95"
              >
                Detayları İncele
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
