"use client"

import { useParams } from "next/navigation"
import { 
  ArrowLeft, 
  Clock, 
  Send,
  MoreVertical,
  Paperclip,
  ShieldCheck,
  Calendar,
  Tag,
  LifeBuoy
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { INITIAL_TICKETS } from "@/lib/support-data"

export default function DestekDetayPage() {
  const { id } = useParams()

  const ticketData = INITIAL_TICKETS.find(t => t.id === id) || INITIAL_TICKETS[0]

  return (
    <div className="flex-1 p-4 md:p-8 bg-[oklch(0.985_0.01_145)] flex flex-col min-h-0 h-full overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/panel/destek">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 transition-all">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-lg font-bold text-gray-900">{ticketData.subject}</h1>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider",
                  ticketData.status === "Cevaplandı" ? "bg-[#95BF47]/10 text-[#95BF47]" : "bg-gray-100 text-gray-400"
                )}>{ticketData.status}</span>
              </div>
              <p className="text-gray-500 text-[11px] font-medium tracking-tight">Talep ID: <span className="text-gray-900 font-bold">#{ticketData.id}</span> • {ticketData.createdAt}</p>
            </div>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="rounded-full border-gray-100 h-9 px-5 text-xs font-bold bg-white">Talebi Kapat</Button>
             <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <MoreVertical className="w-4 h-4 text-gray-400" />
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
          {/* Messages Column */}
          <div className="lg:col-span-3 flex flex-col min-h-0">
            <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
               {/* Ticket Info Bar */}
               <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between text-[10px] font-medium text-gray-400 tracking-widest shrink-0">
                  <span>Konuşma Geçmişi</span>
                  <div className="flex items-center gap-2">
                     <Clock className="w-3 h-3" /> Son Güncelleme: {ticketData.lastUpdate}
                  </div>
               </div>

               {/* Thread */}
               <div className="p-6 space-y-8 flex-1 overflow-y-auto">
                  {ticketData.messages.map((msg) => (
                    <div key={msg.id} className={cn(
                      "flex gap-4",
                      msg.sender === "me" ? "flex-row-reverse" : "flex-row"
                    )}>
                       <Avatar className="h-10 w-10 shrink-0 rounded-2xl">
                          <AvatarFallback className={cn(
                            "font-bold text-xs",
                            msg.sender === "me" ? "bg-[#95BF47] text-white" : "bg-gray-100 text-gray-500"
                          )}>
                             {msg.sender === "me" ? "H" : msg.expertName?.charAt(0)}
                          </AvatarFallback>
                       </Avatar>
                       <div className={cn(
                         "flex flex-col space-y-1.5 max-w-[80%]",
                         msg.sender === "me" ? "items-end" : "items-start"
                       )}>
                          <div className="flex items-center gap-2 px-1">
                             <span className="text-[11px] font-bold text-gray-900">
                               {msg.sender === "me" ? "Siz" : msg.expertName}
                             </span>
                             <span className="text-[10px] text-gray-400 font-medium">{msg.time}</span>
                          </div>
                          <div className={cn(
                            "p-4 rounded-2xl text-[12px] leading-relaxed font-medium",
                            msg.sender === "me" 
                              ? "bg-gray-900 text-white rounded-tr-none shadow-md shadow-gray-200" 
                              : "bg-white border border-gray-100 text-gray-700 rounded-tl-none shadow-sm"
                          )}>
                             {msg.text}
                          </div>
                       </div>
                    </div>
                  ))}
               </div>

               {/* Reply Box */}
               <div className="p-4 border-t border-gray-50 bg-gray-50/20 shrink-0">
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden focus-within:border-[#95BF47] transition-all">
                     <Textarea 
                       placeholder="Cevabınızı buraya yazın..." 
                       className="border-none focus:ring-0 min-h-[60px] p-4 text-xs font-medium placeholder:text-gray-300 resize-none"
                     />
                     <div className="p-2 bg-gray-50/50 flex items-center justify-between">
                        <Button variant="ghost" size="sm" className="rounded-full text-[10px] font-medium text-gray-400 hover:text-gray-600 gap-2">
                           <Paperclip className="w-3.5 h-3.5" /> Dosya Ekle
                        </Button>
                        <Button className="rounded-full bg-[#95BF47] text-white hover:bg-[#86ac3f] font-bold h-8 px-6 text-[11px] gap-2">
                           <Send className="w-3.5 h-3.5" /> Cevabı Gönder
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-4">
             <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm space-y-6">
                <div>
                   <h4 className="text-[10px] font-medium text-gray-400 tracking-widest mb-4">TALEP BİLGİLERİ</h4>
                   <div className="space-y-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-xl bg-[#95BF47]/5 flex items-center justify-center">
                            <Tag className="w-3.5 h-3.5 text-[#95BF47]" />
                         </div>
                         <div>
                            <p className="text-[9px] text-gray-400 font-medium tracking-tight">Kategori</p>
                            <p className="text-[11px] font-bold text-gray-900">{ticketData.category}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
                            <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                         </div>
                         <div>
                            <p className="text-[9px] text-gray-400 font-medium tracking-tight">Öncelik</p>
                            <p className="text-[11px] font-bold text-gray-900">{ticketData.priority}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                            <Calendar className="w-3.5 h-3.5 text-blue-500" />
                         </div>
                         <div>
                            <p className="text-[9px] text-gray-400 font-medium tracking-tight">Oluşturulma</p>
                            <p className="text-[11px] font-bold text-gray-900">{ticketData.date}</p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="pt-6 border-t border-gray-50">
                   <h4 className="text-[10px] font-medium text-gray-400 tracking-widest mb-4">SORUMLU ÜYE</h4>
                   <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/50 border border-gray-50">
                      <Avatar className="h-9 w-9 rounded-xl">
                         <AvatarFallback className="bg-gray-200 text-gray-500 font-medium text-[10px]">
                           {ticketData.member.initials}
                         </AvatarFallback>
                      </Avatar>
                      <div>
                         <p className="text-xs font-bold text-gray-900">{ticketData.member.name}</p>
                         <p className="text-[9px] text-gray-400 font-medium tracking-tight">{ticketData.member.role}</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-black text-white rounded-[24px] p-5">
                <h4 className="text-xs font-bold mb-2 flex items-center gap-2">
                   <LifeBuoy className="w-4 h-4 text-[#95BF47]" /> Hızlı Çözüm
                </h4>
                <p className="text-[10px] text-gray-400 leading-relaxed font-medium">Destek ekibimiz size daha hızlı yardımcı olabilmemiz için talebinizle ilgili ekran görüntülerini paylaşabilirsiniz.</p>
             </div>
          </div>
        </div>
    </div>
  )
}
