"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  Info,
  Calendar,
  Package,
  ShieldCheck,
  Globe,
  Zap,
  ChevronRight,
  MoreVertical,
  Download
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function BasvuruDetayPage() {
  const { id } = useParams()

  // This would typically come from an API
  const app = {
    id: id as string,
    service: "Shopfit Mağaza Kurulumu",
    type: "Kurulum",
    date: "25 Mart 2024",
    status: "İşlemde",
    progress: 65,
    description: "Shopify altyapısı üzerine kurulu, modern ve hızlı bir mağaza kurulum süreci.",
    steps: [
      { name: "Siparişi Alındı", date: "25 Mart 2024, 10:30", completed: true },
      { name: "Veri Toplama Formu", date: "26 Mart 2024, 14:15", completed: true },
      { name: "Tema Tasarım Aşaması", date: "28 Mart 2024, 09:00", current: true },
      { name: "Ürün ve İçerik Yükleme", date: "Bekleniyor", upcoming: true },
      { name: "Final Onay ve Teslimat", date: "Bekleniyor", upcoming: true },
    ],
    details: [
      { label: "Paket Tipi", value: "Profesyonel Paket" },
      { label: "Tahmini Tamamlanma", value: "05 Nisan 2024" },
      { label: "Atanan Uzman", value: "Deniz Yılmaz" },
      { label: "Destek Seviyesi", value: "7/24 Öncelikli" },
    ],
    documents: [
      { name: "Marka Varlıkları (Logo/Renk)", size: "4.2 MB", date: "26 Mart" },
      { name: "Ürün Listesi (.xlsx)", size: "1.1 MB", date: "26 Mart" },
      { name: "Mağaza Politikaları Taslağı", size: "850 KB", date: "27 Mart" },
    ]
  }

  return (
    <div className="flex-1 p-4 md:p-6 bg-[oklch(0.985_0.01_145)] min-h-screen">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/panel/basvurular">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 transition-all">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-lg font-bold text-gray-900">{app.service}</h1>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[9px] font-bold",
                  app.status === "Tamamlandı" ? "bg-green-100 text-green-700" : "bg-[#95BF47]/10 text-[#95BF47]"
                )}>{app.status}</span>
              </div>
              <p className="text-gray-500 text-[11px] font-medium tracking-tight">Başvuru ID: <span className="text-gray-900 font-bold">#{app.id}</span> • {app.date}</p>
            </div>
          </div>
          <div className="flex gap-2">
             <Link href="/panel/mesajlar">
               <Button variant="outline" className="rounded-full border-gray-100 h-9 px-5 text-xs font-bold bg-white flex gap-2">
                  <MessageSquare className="w-3.5 h-3.5" /> Uzmana Soru Sor
               </Button>
             </Link>
             <Link href="/panel/mesajlar">
               <Button className="rounded-full bg-gray-900 text-white hover:bg-black font-bold h-9 px-5 text-xs">Aksiyon Al</Button>
             </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Progress Stepper Card */}
            <div className="bg-white rounded-[28px] p-6 border border-gray-100 shadow-sm relative overflow-hidden">
               <h3 className="text-sm font-bold text-gray-900 mb-8 flex items-center gap-2">
                 <Zap className="w-4 h-4 text-[#95BF47]" /> Kurulum Yol Haritası
               </h3>
               
               <div className="relative space-y-6 pl-4">
                  {/* Vertical Line */}
                  <div className="absolute left-[20px] top-2 bottom-2 w-0.5 bg-gray-50" />
                  
                  {app.steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-5">
                       <div className={cn(
                         "w-4 h-4 rounded-full mt-1 flex items-center justify-center z-10",
                         step.completed ? "bg-[#95BF47] text-white" : 
                         step.current ? "bg-white border-2 border-[#95BF47]" : "bg-gray-100 border border-gray-200"
                       )}>
                          {step.completed ? <CheckCircle2 className="w-2.5 h-2.5" /> : 
                           step.current ? <div className="w-1.5 h-1.5 bg-[#95BF47] rounded-full animate-pulse" /> : null}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-4">
                             <p className={cn("text-[12px] font-bold", step.upcoming ? "text-gray-400" : "text-gray-900")}>
                               {step.name}
                             </p>
                             <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{step.date}</span>
                          </div>
                          {step.current && (
                            <div className="mt-3 p-3 bg-[#95BF47]/5 border border-[#95BF47]/10 rounded-2xl">
                               <p className="text-[10px] text-[#95BF47] font-bold mb-1 uppercase tracking-wider">Şu Anki Aşama</p>
                               <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                                  Tasarım ekibimiz mağazanızın görsel kimliğini Shopify altyapısına uyarlıyor. Marka renkleriniz ve logonuz kullanılmaktadır.
                               </p>
                            </div>
                          )}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Application Info Footer Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm">
                   <h3 className="text-[12px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                     <Info className="w-4 h-4 text-gray-400" /> Detaylar
                   </h3>
                   <div className="space-y-4">
                      {app.details.map((detail, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                           <span className="text-[11px] text-gray-500 font-medium">{detail.label}</span>
                           <span className="text-[11px] text-gray-900 font-bold">{detail.value}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm">
                   <h3 className="text-[12px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                     <FileText className="w-4 h-4 text-gray-400" /> Dosyalarım
                   </h3>
                   <div className="space-y-3">
                      {app.documents.map((doc, i) => (
                        <div key={i} className="p-3 rounded-xl border border-gray-50 hover:bg-gray-50/50 transition-all flex items-center justify-between group cursor-pointer">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                                 <FileText className="w-3.5 h-3.5 text-gray-400" />
                              </div>
                              <div>
                                 <p className="text-[11px] font-bold text-gray-900 truncate max-w-[120px]">{doc.name}</p>
                                 <p className="text-[9px] text-gray-400 font-medium">{doc.size} • {doc.date}</p>
                              </div>
                           </div>
                           <Download className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-900 transition-colors" />
                        </div>
                      ))}
                   </div>
                </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            {/* Assigned Expert Card */}
            <div className="bg-white rounded-[28px] p-6 border border-gray-100 shadow-sm text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                   <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#95BF47] to-lime-300 p-0.5 shadow-lg">
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                         <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-400 overflow-hidden">
                            DY
                         </div>
                      </div>
                   </div>
                   <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-4 border-white rounded-full" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm">Deniz Yılmaz</h4>
                <p className="text-gray-500 text-[10px] font-bold mb-5 tracking-widest uppercase mt-1">Geliştirme Uzmanı</p>
                <div className="flex gap-2">
                   <Link href="/panel/mesajlar" className="flex-1">
                     <Button className="w-full rounded-full bg-[#95BF47] text-white hover:bg-[#86ac3f] font-bold h-8 text-[11px]">Mesaj Gönder</Button>
                   </Link>
                </div>
            </div>

            {/* Quick Action Card */}
            <div className="bg-gray-900 rounded-[28px] p-6 text-white overflow-hidden relative group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12 blur-2xl group-hover:scale-150 transition-all duration-700" />
               <div className="relative z-10">
                  <h4 className="text-base font-bold mb-2">Desteğe İhtiyacınız mı Var?</h4>
                  <p className="text-gray-400 text-[11px] leading-relaxed mb-6 font-medium">Kurulum süreci hakkında her türlü sorunuz için teknik destek ekibimizle anında iletişime geçebilirsiniz.</p>
                  <Button variant="outline" className="w-full rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold h-10 text-[11px]">
                     Destek Merkezine Git <ChevronRight className="w-3.5 h-3.5 ml-2" />
                  </Button>
               </div>
            </div>

            {/* Stats Card Mini */}
            <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-[#95BF47]/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#95BF47]" />
               </div>
               <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Tahmini Teslimat</p>
                  <p className="text-sm font-bold text-gray-900">10 GÜN KALDI</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
