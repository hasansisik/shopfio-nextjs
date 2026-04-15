"use client"

import { use, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { adminGetAllApplications, adminUpdateApplication } from "@/redux/actions/adminActions"
import {
  Search,
  Clock,
  ChevronRight,
  ShoppingBag,
  CheckCircle2,
  XCircle,
  HelpCircle,
  User,
  Calendar,
  Zap,
  ArrowUpRight,
  MoreVertical,
  ChevronLeft,
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Maps URL slug → actual DB status value
const STATUS_MAP: Record<string, { label: string; dbValue: string; color: string; icon: any }> = {
  "inceleniyor":    { label: "İnceleniyor",    dbValue: "İnceleniyor",    color: "amber",  icon: Clock },
  "onay-bekliyor":  { label: "Onay Bekliyor",  dbValue: "Onay Bekliyor",  color: "blue",   icon: Search },
  "tamamlandi":     { label: "Tamamlandı",     dbValue: "Tamamlandı",     color: "green",  icon: CheckCircle2 },
  "iptal-edildi":   { label: "İptal Edildi",   dbValue: "İptal Edildi",   color: "red",    icon: XCircle },
}

export default function FilteredApplicationsPage({ params }: { params: Promise<{ status: string }> }) {
  const { status: slug } = use(params)
  const dispatch = useAppDispatch()
  const { applications, loading } = useAppSelector((state) => state.admin)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

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

  const sortedApplications = [...applications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filtered = sortedApplications
    .filter(a => statusInfo ? a.status === statusInfo.dbValue : true)
    .filter(a =>
      a.appId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.package?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedApplications = filtered.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, slug])


  const StatusIcon = statusInfo?.icon || HelpCircle

  if (loading && applications.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#95BF47]" />
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-[1400px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm",
            statusInfo?.color === 'amber' && "bg-amber-50 text-amber-500 border-amber-100",
            statusInfo?.color === 'blue'  && "bg-blue-50 text-blue-500 border-blue-100",
            statusInfo?.color === 'green' && "bg-green-50 text-green-600 border-green-100",
            statusInfo?.color === 'red'   && "bg-red-50 text-red-500 border-red-100",
            !statusInfo && "bg-[#95BF47]/10 text-[#95BF47] border-[#95BF47]/20"
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
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 stroke-[3]" />
          <Input
            placeholder="Arama yapın..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-xl h-12 pl-14 pr-6 border-transparent bg-white shadow-sm focus-visible:ring-[#95BF47] text-xs font-bold transition-all w-72"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/20">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Başvuru / Paket</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Kullanıcı</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tarih</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedApplications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm",
                        app.package?.name?.includes("Full") ? "bg-orange-500" : 
                        app.package?.name?.includes("Profesyonel") ? "bg-[#95BF47]" : "bg-blue-500"
                      )}>
                        {app.package?.name?.includes("Full") ? <Zap className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 mb-0.5 tracking-wider">#{app.appId}</p>
                        <p className="text-xs font-black text-gray-900">{app.package?.name} Mağazası</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#95BF47]/10 group-hover:text-[#95BF47] transition-all">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">{app.user?.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{app.user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-xs text-gray-600">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-gray-300" />
                        {new Date(app.createdAt).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 text-gray-300 group-hover:text-gray-900 transition-colors">
                      <Link href={`/admin/basvurular/detay/${app._id}`}>
                        <Button variant="ghost" className="rounded-xl h-8 px-3 text-[10px] font-black flex gap-1.5 hover:bg-[#95BF47]/10 hover:text-[#95BF47]">
                          DETAYLAR <ArrowUpRight className="w-3 h-3 text-[#95BF47]" />
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50 bg-gray-50/30">
            <p className="text-xs font-bold text-gray-500">
              Gösterilen: <span className="text-gray-900">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filtered.length)}</span> / {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0 rounded-lg border-gray-200"
              >
                <span className="sr-only">Önceki</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "h-8 min-w-8 px-2 rounded-lg text-xs font-bold transition-all",
                      currentPage === page 
                        ? "bg-[#95BF47] text-white" 
                        : "text-gray-500 hover:bg-gray-100"
                    )}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0 rounded-lg border-gray-200"
              >
                <span className="sr-only">Sonraki</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 rounded-[28px] bg-gray-50 flex items-center justify-center text-gray-200 mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <p className="text-gray-400 font-bold text-sm italic">Bu kategoride başvuru bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  )
}
