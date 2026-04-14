"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  MoreVertical, 
  CheckCircle2, 
  Clock,
  User,
  ShieldCheck,
  Download,
  FileText
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { supportData } from "@/lib/data/support"

export default function DestekDetayPage() {
  const { id } = useParams()
  
  // Find ticket from our dynamic data source
  const ticket = supportData.find(t => t.id === id) || supportData[0]

  return (
    <div className="flex-1 flex flex-col h-screen max-h-screen bg-white">
      {/* Ticket Management header */}
      <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-6">
          <Link href="/panel/destek">
             <Button variant="outline" size="icon" className="rounded-2xl w-12 h-12 border-gray-100 hover:border-[#95BF47] hover:text-[#95BF47] transition-all">
                <ArrowLeft className="w-5 h-5" />
             </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
               <h1 className="text-xl font-black text-gray-900 tracking-tight">{ticket.subject}</h1>
               <span className={cn(
                  "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
                  ticket.status === "Tamamlandı" ? "bg-green-50 text-green-600 border border-green-100" : "bg-orange-50 text-orange-600 border border-orange-100"
               )}>
                  {ticket.status}
               </span>
            </div>
            <p className="text-xs text-gray-400 font-medium flex items-center gap-2">
               Talep ID: <span className="text-gray-900 font-black">#{ticket.id}</span>
               <span className="w-1 h-1 rounded-full bg-gray-300" />
               Açılış: <span className="text-gray-900 font-bold">{ticket.createdDate}</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ATANAN UZMAN</span>
              <p className="text-sm font-black text-gray-900">{ticket.assignedExpert.name}</p>
           </div>
           <Button variant="outline" size="icon" className="rounded-2xl border-gray-100">
              <MoreVertical className="w-5 h-5 text-gray-400" />
           </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#fbfbfb]">
          <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
             <AnimatePresence>
                {ticket.messages.map((msg, idx) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={cn(
                      "flex gap-4 max-w-[85%] md:max-w-[70%]",
                      msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                     {/* Avatar */}
                     <div className={cn(
                       "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-black text-xs shadow-sm",
                       msg.sender === "user" ? "bg-gray-900 text-white" : "bg-[#95BF47] text-white"
                     )}>
                        {msg.sender === "user" ? "H" : ticket.assignedExpert.avatar}
                     </div>
                     
                     <div className={cn(
                       "space-y-2",
                       msg.sender === "user" ? "items-end" : "items-start"
                     )}>
                        <div className={cn(
                           "p-5 rounded-[28px] shadow-sm relative",
                           msg.sender === "user" ? "bg-white text-gray-900 rounded-tr-none border border-gray-100" : "bg-white text-gray-900 rounded-tl-none border border-gray-100"
                        )}>
                           <p className="text-sm font-medium leading-relaxed">{msg.message}</p>
                           
                           {/* Attachments */}
                           {msg.attachments && msg.attachments.length > 0 && (
                             <div className="mt-4 pt-4 border-t border-gray-50 space-y-2">
                               {msg.attachments.map((file, fi) => (
                                 <div key={fi} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group cursor-pointer hover:bg-[#95BF47]/5 transition-all">
                                    <div className="flex items-center gap-3">
                                       <FileText className="w-4 h-4 text-gray-400 group-hover:text-[#95BF47]" />
                                       <span className="text-[11px] font-black text-gray-700">{file.name}</span>
                                    </div>
                                    <Download className="w-4 h-4 text-gray-300 group-hover:text-[#95BF47]" />
                                 </div>
                               ))}
                             </div>
                           )}
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold px-2">{msg.time}</p>
                     </div>
                  </motion.div>
                ))}
             </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="p-6 md:p-10 shrink-0 bg-white border-t border-gray-100">
             <div className="max-w-4xl mx-auto relative group">
                <Textarea 
                  placeholder="Mesajınızı buraya yazın..."
                  className="rounded-[32px] min-h-[100px] border-gray-200 focus:border-[#95BF47] focus:ring-[#95BF47]/10 p-6 pr-32 text-sm font-bold shadow-xl shadow-gray-100"
                />
                <div className="absolute right-4 bottom-4 flex items-center gap-2">
                   <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100 text-gray-400">
                      <Paperclip className="w-5 h-5" />
                   </Button>
                   <Button className="rounded-2xl bg-[#95BF47] text-white hover:bg-[#86ac3f] font-black h-12 px-6 flex gap-2 shadow-lg shadow-[#95BF47]/20">
                      Gönder <Send className="w-4 h-4" />
                   </Button>
                </div>
             </div>
             <p className="text-center mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">Uzman ekibimiz mesai saatleri içinde 15 dakika içinde yanıt vermektedir.</p>
          </div>
        </div>

        {/* Sidebar Desktop */}
        <div className="hidden lg:block w-80 border-l border-gray-100 p-8 space-y-8 bg-white overflow-y-auto">
           <div className="space-y-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">TALEBİ YÖNETEN</h4>
              <div className="bg-gray-50 rounded-[32px] p-6 text-center space-y-4">
                 <div className="w-16 h-16 mx-auto rounded-[24px] bg-[#95BF47] flex items-center justify-center text-xl font-black text-white shadow-lg">
                    {ticket.assignedExpert.avatar}
                 </div>
                 <div>
                    <p className="text-sm font-black text-gray-900">{ticket.assignedExpert.name}</p>
                    <p className="text-[#95BF47] text-[10px] font-black uppercase tracking-widest mt-1">{ticket.assignedExpert.role}</p>
                 </div>
                 <div className="pt-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full">
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                       <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">ÇEVRİMİÇİ</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">TALEP DETAYI</h4>
              <div className="space-y-3">
                 <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-[11px] text-gray-400 font-bold">Kategori</span>
                    <span className="text-[11px] text-gray-900 font-black">{ticket.category}</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-[11px] text-gray-400 font-bold">Öncelik</span>
                    <span className="text-[11px] text-gray-900 font-black">{ticket.priority}</span>
                 </div>
                 <div className="flex justify-between items-center py-2">
                    <span className="text-[11px] text-gray-400 font-bold">Son İşlem</span>
                    <span className="text-[11px] text-gray-900 font-black">Az önce</span>
                 </div>
              </div>
           </div>

           <div className="bg-[#0f172a] rounded-[32px] p-6 text-white space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                 <ShieldCheck className="w-5 h-5 text-[#95BF47]" />
              </div>
              <h4 className="text-sm font-black tracking-tight">Destek Kalitesi</h4>
              <p className="text-gray-400 text-[10px] leading-relaxed font-medium">Bu görüşme kalite standartları gereği kayıt altına alınmaktadır.</p>
              <Button variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10 h-10 text-[10px] font-black">Talebi Kapat</Button>
           </div>
        </div>
      </div>
    </div>
  )
}
