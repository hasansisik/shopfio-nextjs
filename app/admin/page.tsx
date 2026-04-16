"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { adminGetStats } from "@/redux/actions/adminActions"
import { 
  Users, 
  ShoppingBag, 
  MessageSquare, 
  DollarSign,
  TrendingUp,
  ArrowRight,
  Loader2,
  Clock,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const dispatch = useAppDispatch()
  const { stats, loading } = useAppSelector((state) => state.admin)
  const [period, setPeriod] = useState('all')

  useEffect(() => {
    dispatch(adminGetStats(period))
  }, [dispatch, period])

  const statCards = [
    {
      title: "TOPLAM KULLANICI",
      value: stats?.users || 0,
      icon: Users,
      color: "blue",
      link: "/admin/users",
      subText: "Sistemde kayıtlı toplam müşteri"
    },
    {
      title: "AKTİF BAŞVURULAR",
      value: stats?.applications?.active || 0,
      icon: ShoppingBag,
      color: "amber",
      link: "/admin/basvurular",
      subText: `${stats?.applications?.total || 0} toplam başvuru içinden`
    },
    {
      title: "DESTEK TALEPLERİ",
      value: stats?.support?.open || 0,
      icon: MessageSquare,
      color: "purple",
      link: "/admin/destek",
      subText: `${stats?.support?.total || 0} toplam talepten açık olanlar`
    },
    {
      title: "TOPLAM HASILAT",
      value: `₺${(stats?.revenue || 0).toLocaleString('tr-TR')}`,
      icon: DollarSign,
      color: "emerald",
      link: "/admin/basvurular",
      subText: period === 'all' ? "Tüm zamanların toplam hasılatı" : "Seçili dönemde elde edilen hasılat"
    }
  ]

  return (
    <div className="p-6 md:p-10 space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-[#95BF47]" />
            Yönetim Paneli
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-medium italic">Shopfio operasyonel durum ve sistem istatistikleri.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <select 
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none bg-white border border-gray-100 rounded-2xl px-6 py-3 pr-12 text-sm font-bold text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#95BF47]/20 focus:border-[#95BF47] transition-all cursor-pointer"
            >
              <option value="all">Tüm Zamanlar</option>
              <option value="today">Bugün</option>
              <option value="yesterday">Dün</option>
              <option value="thisWeek">Bu Hafta</option>
              <option value="thisMonth">Bu Ay</option>
              <option value="3months">Son 3 Ay</option>
              <option value="6months">Son 6 Ay</option>
              <option value="thisYear">Bu Yıl</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="hidden md:flex bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">SİSTEM CANLI</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading && !stats ? (
           Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm h-48 animate-pulse flex flex-col justify-between">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl" />
                <div className="space-y-2">
                   <div className="w-20 h-3 bg-gray-50 rounded" />
                   <div className="w-32 h-8 bg-gray-50 rounded" />
                </div>
             </div>
           ))
        ) : (
          statCards.map((card, i) => (
            <Link 
              key={i} 
              href={card.link}
              className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#95BF47]/5 transition-all duration-500 relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-[0.03] group-hover:scale-150 transition-transform duration-700 bg-${card.color}-500`} />
              
              <div className="relative z-10 space-y-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 bg-${card.color}-50 text-${card.color}-500`}>
                  <card.icon className="w-7 h-7" />
                </div>
                
                <div>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-0.5">{card.title}</p>
                  <h2 className="text-3xl font-black text-gray-900 mt-1">{card.value}</h2>
                </div>
  
                <div className="pt-4 flex items-center justify-between">
                  <p className="text-[10px] font-bold text-gray-400 leading-tight w-2/3">{card.subText}</p>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#95BF47] group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Summary / Charts Placeholder */}
        <div className="lg:col-span-2 bg-gray-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-[#95BF47] opacity-10 rounded-full blur-[100px] -mr-48 -mt-48" />
           
           <div className="relative z-10 h-full flex flex-col">
              <h3 className="text-2xl font-black tracking-tight">Performans Özeti</h3>
              <p className="text-gray-400 text-sm mt-2 max-w-md font-medium">Platform kullanımı ve dönüşüm oranları beklentiler dahilinde seyrediyor.</p>
              
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-10">
                 <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                       <Clock className="w-6 h-6 text-[#95BF47]" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">ORT. KURULUM SÜRESİ</p>
                       <p className="text-xl font-black mt-1">42.5 Saat</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                       <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">BAŞARI ORANI</p>
                       <p className="text-xl font-black mt-1">%98.2</p>
                    </div>
                 </div>
              </div>

              <div className="mt-auto pt-16">
                 <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">HAFTALIK KAPASİTE</span>
                    <span className="text-[10px] font-black text-[#95BF47] uppercase tracking-widest">74% DOLULUK</span>
                 </div>
                 <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5">
                    <div className="h-full w-[74%] bg-[#95BF47] rounded-full shadow-[0_0_15px_rgba(149,191,71,0.5)]" />
                 </div>
              </div>
           </div>
        </div>

        {/* Action Panel */}
        <div className="bg-[#95BF47]/5 rounded-[3rem] p-10 border border-[#95BF47]/10 flex flex-col">
           <div className="w-14 h-14 rounded-2xl bg-[#95BF47] text-white flex items-center justify-center mb-6 shadow-lg shadow-[#95BF47]/20">
              <ShoppingBag className="w-7 h-7" />
           </div>
           <h4 className="text-xl font-black text-gray-900">Operasyonel<br />Kontrol</h4>
           <p className="text-sm text-gray-500 mt-4 leading-relaxed font-medium capitalize">Tüm başvuruları, kullanıcıları ve teknik destek taleplerini bu panelden yönetebilirsiniz.</p>
           
           <div className="mt-8 space-y-3">
              <Link href="/admin/users" className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-[#95BF47] transition-all group">
                 <span className="text-xs font-black uppercase tracking-tight">KULLANICI LİSTESİ</span>
                 <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#95BF47] transition-all" />
              </Link>
              <Link href="/admin/basvurular" className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-[#95BF47] transition-all group">
                 <span className="text-xs font-black uppercase tracking-tight">BAŞVURU YÖNETİMİ</span>
                 <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#95BF47] transition-all" />
              </Link>
           </div>
        </div>
      </div>
    </div>
  )
}
