"use client"

import { 
  ClipboardList, 
  Search, 
  Filter, 
  MoreVertical,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ArrowUpRight,
  ShoppingBag,
  Zap,
  CreditCard,
  Globe,
  Package
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function BasvurularPage() {
  const applications = [
    { 
      id: "APP-2024-001", 
      service: "Shopfit Mağaza Kurulumu", 
      date: "25 Mart 2024", 
      status: "İşlemde", 
      type: "Kurulum",
      logo: "/shopify.png",
      color: "bg-green-50"
    },
    { 
      id: "APP-2024-002", 
      service: "Adsaify Başvurusu", 
      date: "22 Mart 2024", 
      status: "Beklemede", 
      type: "Reklam",
      logo: "https://adsaify.com/icon.png",
      color: "bg-blue-50"
    },
    { 
      id: "APP-2024-003", 
      service: "Gönderio Başvurusu", 
      date: "20 Mart 2024", 
      status: "Tamamlandı", 
      type: "Lojistik",
      isLucide: true,
      icon: Package,
      color: "bg-orange-50"
    },
    { 
      id: "APP-2024-004", 
      service: "Shopify Başlangıç Paketi", 
      date: "18 Mart 2024", 
      status: "Tamamlandı", 
      type: "Hizmet",
      logo: "/shopify.png",
      color: "bg-green-50"
    },
    { 
      id: "APP-2024-005", 
      service: "Shopify Full Paketi", 
      date: "15 Mart 2024", 
      status: "Beklemede", 
      type: "Hizmet",
      logo: "/shopify.png",
      color: "bg-green-50"
    },
  ]

  return (
    <div className="flex-1 p-4 md:p-6 bg-[oklch(0.985_0.01_145)] min-h-screen">
      <div className="w-full space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Hizmet Başvurularım</h1>
            <p className="text-gray-500 text-[11px] mt-0.5">Aldığınız hizmetleri ve başvuru durumlarını buradan yönetin.</p>
          </div>
          <Button className="rounded-full bg-[#95BF47] text-white hover:bg-[#86ac3f] font-bold px-5 h-9 text-xs flex gap-2">
            <Plus className="w-3.5 h-3.5" /> Yeni Hizmet Al
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white rounded-[20px] p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden", 
                    app.logo ? "p-0 bg-transparent" : cn("p-1.5", app.color)
                  )}>
                      {app.logo ? (
                          <div className="relative w-full h-full">
                              <Image 
                                  src={app.logo} 
                                  alt={app.service} 
                                  fill 
                                  className={cn("object-contain", app.service.includes("Adsaify") && "object-cover")}
                              />
                          </div>
                      ) : app.icon ? (
                          <app.icon className="w-4 h-4 text-gray-900" />
                      ) : null}
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-lg h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-3.5 h-3.5 text-gray-400" />
                  </Button>
                </div>

                <div className="space-y-0.5 mb-3">
                  <h3 className="font-bold text-gray-900 text-[13px] leading-tight">{app.service}</h3>
                  <p className="text-gray-500 text-[10px] font-bold tracking-tight">{app.type}</p>
                </div>
              </div>

              <div>
                <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold mb-0.5 tracking-tight">{app.date}</p>
                    <p className="text-[11px] font-bold text-gray-900 tracking-tight">#{app.id}</p>
                  </div>
                  <div className={cn(
                      "flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold w-fit",
                      app.status === "Tamamlandı" ? "bg-green-50 text-green-700" : 
                      app.status === "Beklemede" ? "bg-blue-50 text-blue-700" :
                      "bg-orange-50 text-orange-700"
                  )}>
                      <div className={cn(
                          "w-1 h-1 rounded-full",
                          app.status === "Tamamlandı" ? "bg-green-500" : 
                          app.status === "Beklemede" ? "bg-blue-500" :
                          "bg-orange-500"
                      )} />
                      {app.status}
                  </div>
                </div>

                <div className="mt-3">
                    <Button variant="outline" className="w-full rounded-lg border-gray-100 h-8 text-[11px] font-bold group-hover:border-[#95BF47] group-hover:text-[#95BF47] transition-colors flex gap-2">
                        Detayları Gör <ArrowUpRight className="w-3 h-3 ml-0.5" />
                    </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Application Card Compact */}
          <button className="bg-white/50 rounded-[20px] p-4 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-[#95BF47] hover:bg-white transition-all group min-h-[160px]">
             <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#95BF47]/10 transition-colors">
                <Plus className="w-4 h-4 text-gray-300 group-hover:text-[#95BF47] transition-colors" />
             </div>
             <div className="text-center">
                 <h3 className="font-bold text-[13px] text-gray-900">Hizmet Al</h3>
                 <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">İhtiyacınıza uygun yeni bir <br/> kurulum başvurusu başlatın.</p>
             </div>
          </button>
        </div>

        {/* Application Stats / Info Banner Compact */}
        <div className="bg-black text-white rounded-[20px] p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            <div className="space-y-2 max-w-lg relative z-10">
                <h3 className="text-base font-bold tracking-tight leading-tight">Başvurunuz Onay Bekliyor Mu?</h3>
                <p className="text-gray-400 text-[10px] leading-relaxed">
                   Yeni başvurularınız ortalama 24 saat içerisinde uzman ekibimiz tarafından incelenir ve size geri dönüş yapılır. Süreç hakkında bilgi almak için destek hattımızı kullanabilirsiniz.
                </p>
                <div className="flex gap-4 pt-1">
                    <div className="flex flex-col">
                        <span className="text-[8px] text-gray-500 font-bold tracking-widest">Aktif Başvuru</span>
                        <span className="text-sm font-bold">12 Adet</span>
                    </div>
                    <div className="w-[1px] h-6 bg-gray-800" />
                    <div className="flex flex-col">
                        <span className="text-[8px] text-gray-500 font-bold tracking-widest">Onay Oranı</span>
                        <span className="text-sm font-bold text-[#95BF47]">%98.4</span>
                    </div>
                </div>
            </div>
            <div className="shrink-0 relative z-10">
                <Button className="rounded-full bg-[#95BF47] text-white hover:bg-[#86ac3f] font-bold px-6 h-8 text-[11px]">
                    Süreç Rehberini Oku
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}
