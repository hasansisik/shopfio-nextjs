"use client"

import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  ArrowUpRight, 
  Plus,
  ChevronRight,
  Clock,
  CheckCircle2,
  Package,
  ArrowRight,
  Zap,
  ShieldCheck,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SidebarInset } from "@/components/ui/sidebar"
export default function PanelPage() {
  const packages = [
    { 
      name: "Başlangıç", 
      price: "₺4,999", 
      desc: "Temel Shopify kurulumu ve tema yapılandırması.",
      features: ["Standart Tema", "Ürün Yükleme (50)", "Ödeme Ayarları"],
      color: "bg-blue-50",
      textColor: "text-blue-600",
      icon: Zap
    },
    { 
      name: "Profesyonel", 
      price: "₺12,499", 
      desc: "Özel tasarım ve gelişmiş pazarlama araçları.",
      features: ["Premium Tema", "SEO Optimizasyonu", "E-posta Pazarlama"],
      color: "bg-[#95BF47]/10",
      textColor: "text-[#95BF47]",
      icon: ShoppingBag,
      popular: true
    },
    { 
      name: "Kurumsal", 
      price: "₺29,999", 
      desc: "Tam kapsamlı çözüm ve 7/24 öncelikli destek.",
      features: ["App Entegrasyonları", "Lojistik Çözümleri", "Özel Raporlama"],
      color: "bg-purple-50",
      textColor: "text-purple-600",
      icon: ShieldCheck
    }
  ]

  const myApplication = {
    package: "Profesyonel Paket",
    status: "İşlemde",
    progress: 65,
    steps: ["Ödeme Alındı", "Bilgi Toplama", "Tasarım Aşaması", "Yayına Alma"]
  }

  return (
    <SidebarInset className="bg-white">
      <div className="flex-1 p-4 md:p-6 min-h-screen">
        <div className="w-full space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Panel'e Hoş Geldiniz, Hasan 👋</h1>
              <p className="text-gray-500 text-[11px] mt-0.5">Hizmet başvurularınızı ve mağaza kurulum süreçlerinizi buradan takip edin.</p>
            </div>
            <div className="flex gap-2">
               <Button variant="outline" className="rounded-full border-gray-200 h-9 px-4 text-xs font-bold bg-white">Süreç Rehberi</Button>
               <Button className="rounded-full bg-[#95BF47] text-white hover:bg-[#86ac3f] font-bold h-9 px-4 text-xs flex gap-2">
                  <Plus className="w-3.5 h-3.5" /> Yeni Hizmet Al
               </Button>
            </div>
          </div>

          {/* Active Application Status */}
          <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm relative overflow-hidden">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#95BF47]/10 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-[#95BF47]" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold tracking-wider">Aktif Başvuru</p>
                            <h2 className="text-base font-bold text-gray-900">{myApplication.package} - <span className="text-[#95BF47]">{myApplication.status}</span></h2>
                        </div>
                    </div>
                </div>
                <div className="flex-1 max-w-xl">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-gray-400">Kurulum İlerlemesi</span>
                        <span className="text-[10px] font-bold text-[#95BF47]">{myApplication.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#95BF47] transition-all duration-1000" style={{ width: `${myApplication.progress}%` }} />
                    </div>
                </div>
                <Button variant="outline" className="rounded-full border-gray-100 h-10 px-6 text-xs font-bold bg-white shadow-sm">Detayları Gör</Button>
             </div>
             
             {/* Step tracker circles */}
             <div className="mt-8 flex justify-between gap-2">
                {myApplication.steps.map((s, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1">
                        <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold",
                            i < 2 ? "bg-[#95BF47] text-white" : i === 2 ? "bg-[#95BF47]/20 text-[#95BF47] ring-2 ring-[#95BF47]/10" : "bg-gray-100 text-gray-300"
                        )}>
                            {i < 2 ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                        </div>
                        <span className={cn("text-[8px] font-bold text-center", i <= 2 ? "text-gray-900" : "text-gray-300")}>{s}</span>
                    </div>
                ))}
             </div>
          </div>

          <div className="pt-4">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Hizmet Paketlerimiz</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {packages.map((pkg, i) => (
                    <div key={i} className={cn(
                        "bg-white rounded-[28px] p-6 border border-gray-100 shadow-sm relative transition-all hover:shadow-md",
                        pkg.popular && "ring-2 ring-[#95BF47] ring-offset-2"
                    )}>
                        {pkg.popular && (
                            <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#95BF47] text-white text-[9px] font-bold px-3 py-1 rounded-full tracking-tighter shadow-sm">
                                En Popüler
                            </div>
                        )}
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-5", pkg.color)}>
                            <pkg.icon className={cn("w-5 h-5", pkg.textColor)} />
                        </div>
                        <h4 className="text-base font-bold text-gray-900">{pkg.name}</h4>
                        <div className="mt-1 flex items-baseline gap-1">
                            <span className="text-xl font-bold text-gray-900">{pkg.price}</span>
                            <span className="text-[10px] text-gray-400 font-bold">'den başlayan</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-3 leading-relaxed">{pkg.desc}</p>
                        
                        <div className="mt-6 space-y-2">
                            {pkg.features.map((f, fi) => (
                                <div key={fi} className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#95BF47]" />
                                    <span className="text-[10px] text-gray-600 font-medium">{f}</span>
                                </div>
                            ))}
                        </div>

                        <Button className={cn(
                            "w-full mt-8 rounded-full h-10 text-xs font-bold transition-all",
                            pkg.popular ? "bg-[#95BF47] text-white hover:bg-[#86ac3f]" : "bg-gray-900 text-white hover:bg-gray-800"
                        )}>
                            Paketi Seç <ArrowRight className="w-3.5 h-3.5 ml-2" />
                        </Button>
                    </div>
                ))}
              </div>
          </div>

        </div>
      </div>
    </SidebarInset>
  )
}
