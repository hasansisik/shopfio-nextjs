"use client"

import { useEffect, useState } from "react"
import { 
  Plus, CheckCircle2, ArrowUpRight, ShoppingBag, Search,
  Filter, MoreVertical, Zap, User, Calendar, Clock, ChevronLeft, ChevronRight
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { adminGetAllApplications, adminUpdateApplication } from "@/redux/actions/adminActions"
import { toast } from "sonner"

export default function AdminApplicationsPage() {
  const dispatch = useAppDispatch()
  const { applications, loading } = useAppSelector((state) => state.admin)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("Tümü")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

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

  const filtered = sortedApplications.filter(a => {
    const matchesSearch = 
      a.appId?.toLowerCase().includes(search.toLowerCase()) ||
      a.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.package?.name?.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "Tümü" || a.status === statusFilter;

    return matchesSearch && matchesStatus;
  })

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedApplications = filtered.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [search, statusFilter])

  if (loading && applications.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#95BF47]" />
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 md:p-10 min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-8 pb-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-2">
              <div className="w-10 h-1 bg-[#95BF47] rounded-full" />
              <span className="text-[10px] font-black text-[#95BF47] uppercase tracking-[0.2em]">Sistem Yönetimi</span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-none">Başvurular</h1>
            <p className="text-gray-400 text-sm font-medium">Tüm mağaza kurulum taleplerini listeleyin ve yönetin.</p>
          </div>
        </div>

        {/* Search & Stats Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 stroke-[3]" />
            <Input
              placeholder="Mağaza, kullanıcı veya ID ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl h-12 pl-14 pr-6 border-transparent bg-gray-50 focus-visible:ring-[#95BF47] text-xs font-bold transition-all"
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-100 rounded-xl h-12 pl-4 pr-10 text-xs font-bold text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#95BF47]/20 cursor-pointer"
              >
                <option value="Tümü">Tüm Durumlar</option>
                <option value="İnceleniyor">İnceleniyor</option>
                <option value="Onay Bekliyor">Onay Bekliyor</option>
                <option value="Ödeme Bekleniyor">Ödeme Bekleniyor</option>
                <option value="Tamamlandı">Tamamlandı</option>
                <option value="İptal Edildi">İptal Edildi</option>
              </select>
              <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>

            <div className="h-10 w-[1px] bg-gray-100" />
            <div className="text-right">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1 block">Toplam Kayıt</span>
              <p className="text-lg font-black text-gray-900 leading-none">{filtered.length}</p>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/20">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Başvuru / Paket</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Kullanıcı</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tarih</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Durum</th>
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
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-700">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {new Date(app.createdAt).toLocaleDateString('tr-TR')}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                          <Clock className="w-3 h-3" />
                          {new Date(app.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        className={cn(
                          "text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-xl border-none focus:ring-0 cursor-pointer transition-all",
                          app.status === "Tamamlandı" ? "bg-green-50 text-green-600" :
                          app.status === "Onay Bekliyor" ? "bg-blue-50 text-blue-600" :
                          app.status === "İptal Edildi" ? "bg-red-50 text-red-600" :
                          app.status === "Ödeme Bekleniyor" ? "bg-amber-50 text-amber-600" :
                          "bg-orange-50 text-orange-600"
                        )}
                      >
                        <option value="İnceleniyor">İnceleniyor</option>
                        <option value="Onay Bekliyor">Onay Bekliyor</option>
                        <option value="Ödeme Bekleniyor">Ödeme Bekleniyor</option>
                        <option value="Tamamlandı">Tamamlandı</option>
                        <option value="İptal Edildi">İptal Edildi</option>
                      </select>
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
              <p className="text-lg font-black text-gray-900">Başvuru bulunamadı</p>
              <p className="text-sm text-gray-400 font-medium">Lütfen farklı bir arama kelimesi veya filtre deneyin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
