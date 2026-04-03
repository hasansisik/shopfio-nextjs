"use client"

import { 
  MessageSquare, 
  LifeBuoy, 
  Send, 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  Plus, 
  ArrowUpRight,
  ThumbsUp,
  ThumbsDown,
  Mail,
  Smartphone
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export default function DestekPage() {
  const faqs = [
    { q: "Shopify mağazam ne zaman aktif olur?", a: "Başvurunuz onaylandıktan sonra seçtiğiniz pakete göre 2-5 iş günü içerisinde kurulum tamamlanır." },
    { q: "Ödemeyi nasıl yapabilirim?", a: "Panel üzerinden kredi kartı veya havale/EFT ile güvenle ödeme yapabilirsiniz." },
    { q: "Paketimi daha sonra yükseltebilir miyim?", a: "Evet, istediğiniz zaman aradaki farkı ödeyerek bir üst pakete geçiş yapabilirsiniz." },
  ]

  const myTickets = [
    { id: "T-1092", subject: "Tema Özelleştirme Hakkında", date: "2 gün önce", status: "Cevaplandı" },
    { id: "T-1085", subject: "Alan Adı Yönlendirme", date: "1 hafta önce", status: "Tamamlandı" },
  ]

  return (
    <div className="flex-1 p-4 md:p-6 bg-[oklch(0.985_0.01_145)] min-h-screen">
      <div className="w-full max-w-5xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Destek & Geri Bildirim</h1>
              <p className="text-gray-500 text-[11px] mt-0.5">Sorularınızı iletin, ekibimiz size en kısa sürede yardımcı olsun.</p>
            </div>
            <div className="flex gap-2">
               <Button className="rounded-full bg-[#95BF47] text-white hover:bg-[#86ac3f] font-bold h-9 px-5 text-xs flex gap-2">
                  <Plus className="w-3.5 h-3.5" /> Yeni Destek Talebi
               </Button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Form */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-[#95BF47]" />
                        Bize Mesaj Gönderin
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Konu Başlığı</label>
                                <Input placeholder="Örn: Tema Ayarları" className="rounded-xl h-10 text-xs border-gray-100" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Kategori</label>
                                <div className="h-10 px-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-400 cursor-pointer">
                                    <span>Seçiniz</span>
                                    <HelpCircle className="w-3.5 h-3.5 opacity-30" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Mesajınız</label>
                            <Textarea placeholder="Sorunuzu veya geri bildiriminizi buraya yazın..." className="rounded-xl min-h-[120px] text-xs border-gray-100 focus:border-[#95BF47] focus:ring-[#95BF47]/10" />
                        </div>
                        <div className="pt-2">
                            <Button className="rounded-full bg-gray-900 text-white hover:bg-gray-800 font-bold h-10 px-10 text-xs flex gap-2">
                                <Send className="w-3.5 h-3.5" /> Mesajı Gönder
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm overflow-hidden">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Aktif Taleplerim</h3>
                    <div className="space-y-3">
                        {myTickets.map((t, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-50 hover:bg-gray-50 transition-all cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                                        <Clock className="w-4 h-4 text-gray-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#95BF47] transition-colors">{t.subject}</h4>
                                        <p className="text-[10px] text-gray-400 font-medium">{t.id} • {t.date}</p>
                                    </div>
                                </div>
                                <div className={cn(
                                    "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
                                    t.status === "Cevaplandı" ? "bg-[#95BF47]/10 text-[#95BF47]" : "bg-gray-100 text-gray-400"
                                )}>
                                    {t.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Side Column */}
            <div className="space-y-6">
                <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Sıkça Sorulanlar</h3>
                    <div className="space-y-4">
                        {faqs.map((f, i) => (
                            <div key={i} className="space-y-1.5 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                <h4 className="text-[11px] font-bold text-gray-900 flex items-center gap-2">
                                    <HelpCircle className="w-3 h-3 text-[#95BF47]" /> {f.q}
                                </h4>
                                <p className="text-[10px] text-gray-500 leading-relaxed pr-2">{f.a}</p>
                            </div>
                        ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4 text-[10px] font-bold text-[#95BF47] hover:bg-[#95BF47]/5">TÜMÜNÜ GÖR</Button>
                </div>

                <div className="bg-[#95BF47] text-white rounded-[24px] p-6 relative overflow-hidden group cursor-pointer shadow-lg shadow-[#95BF47]/20">
                    <div className="absolute top-0 right-0 p-4 opacity-10 transform scale-150 group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-20 h-20" />
                    </div>
                    <h3 className="text-sm font-bold relative z-10">Bize Puan Verin</h3>
                    <p className="text-white/80 text-[10px] mt-1 relative z-10 leading-relaxed">Shoprio deneyiminizi nasıl değerlendirirsiniz?</p>
                    <div className="mt-6 flex items-center gap-3 relative z-10">
                        <button className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#95BF47] flex items-center justify-center transition-all">
                            <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#95BF47] flex items-center justify-center transition-all">
                            <ThumbsDown className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm space-y-4">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">DİĞER KANALLAR</h4>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs text-gray-600 hover:text-[#95BF47] transition-colors cursor-pointer">
                            <Mail className="w-4 h-4" /> destek@shoprio.com
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-600 hover:text-[#95BF47] transition-colors cursor-pointer">
                            <Smartphone className="w-4 h-4" /> WhatsApp Destek Hattı
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
