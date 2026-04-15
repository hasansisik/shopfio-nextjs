"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { adminGetAllApplications, adminUpdateApplication } from "@/redux/actions/adminActions"
import { 
  ClipboardList, 
  Search, 
  Eye, 
  CheckCircle, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Filter
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function AdminApplicationsPage() {
  const dispatch = useAppDispatch()
  const { applications, loading } = useAppSelector((state) => state.admin)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    dispatch(adminGetAllApplications())
  }, [dispatch])

  const handleStatusChange = async (id: string, status: string) => {
    const result = await dispatch(adminUpdateApplication({ id, payload: { status } }))
    if (adminUpdateApplication.fulfilled.match(result)) {
      toast.success(`Durum güncellendi: ${status}`)
    } else {
      toast.error("Hata: " + result.payload)
    }
  }

  const filteredApps = applications.filter(a => 
    a.appId?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-[#95BF47]" />
            Tüm Başvurular
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Sistemdeki tüm mağaza kurulum taleplerini yönetin.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="App ID veya Kullanıcı..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#95BF47]/20 transition-all w-full md:w-64"
            />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-black">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center">
            <div className="w-12 h-12 border-4 border-[#95BF47]/20 border-t-[#95BF47] rounded-full animate-spin mx-auto" />
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-400 italic bg-white rounded-3xl border border-dashed border-gray-200">
            Kayıtlı başvuru bulunamadı.
          </div>
        ) : filteredApps.map((app) => (
          <div key={app._id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#95BF47]/10 flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-[#95BF47]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900 tracking-tight">{app.appId}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{app.package?.name}</p>
                </div>
              </div>
              
              <select 
                value={app.status}
                onChange={(e) => handleStatusChange(app._id, e.target.value)}
                className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full appearance-none cursor-pointer focus:outline-none ring-1 ring-inset ${
                  app.status === 'Tamamlandı' ? 'bg-green-50 text-green-700 ring-green-500/20' :
                  app.status === 'İptal Edildi' ? 'bg-red-50 text-red-700 ring-red-500/20' :
                  'bg-amber-50 text-amber-700 ring-amber-500/20'
                }`}
              >
                <option value="İnceleniyor">İnceleniyor</option>
                <option value="Onay Bekliyor">Onay Bekliyor</option>
                <option value="Tamamlandı">Tamamlandı</option>
                <option value="İptal Edildi">İptal Edildi</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50/50 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Müşteri</p>
                  <p className="text-xs font-bold text-gray-900">{app.user?.name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ödeme</p>
                  <p className="text-xs font-bold text-gray-700 uppercase">{app.paymentMethod}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold">
                 <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(app.createdAt).toLocaleDateString('tr-TR')}</span>
                 </div>
                 <div className="flex items-center gap-2 text-[#95BF47]">
                   <span>%{app.progress} İlerleme</span>
                 </div>
              </div>

              <Link 
                href={`/panel/basvurular/${app._id}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#1C1C1C] text-white text-xs font-bold hover:bg-black transition-all group"
              >
                Detayları İncele
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
