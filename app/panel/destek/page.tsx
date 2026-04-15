"use client"

import * as React from "react"
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
  Smartphone,
  ChevronRight,
  Zap,
  Phone,
  MessageCircle,
  FileQuestion,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { createTicket, getUserTickets } from "@/redux/actions/supportActions"
import { toast } from "sonner"

export default function DestekPage() {
  const dispatch = useAppDispatch()
  const { tickets, loading, success } = useAppSelector((state) => state.support)
  
  const [ticketForm, setTicketForm] = React.useState({
    subject: "",
    message: ""
  })
  const [selectedCategory, setSelectedCategory] = React.useState("Mağaza Ayarları")
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false)

  React.useEffect(() => {
    dispatch(getUserTickets())
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketForm.subject || !ticketForm.message) {
      return toast.error("Lütfen tüm alanları doldurun.")
    }

    const result = await dispatch(createTicket({
      ...ticketForm,
      category: selectedCategory
    }))

    if (createTicket.fulfilled.match(result)) {
      setTicketForm({ subject: "", message: "" })
    }
  }

  const myTickets = tickets || []

  const categories = [
    "Mağaza Ayarları",
    "Teknik Destek",
    "Ödeme İşlemleri",
    "Hesap İşlemleri",
    "Geri Bildirim"
  ]

  const faqs = [
    { q: "Shopify mağazam ne zaman aktif olur?", a: "Başvurunuz onaylandıktan sonra seçtiğiniz pakete göre 2-5 iş günü içerisinde kurulum tamamlanır." },
    { q: "Ödemeyi nasıl yapabilirim?", a: "Panel üzerinden kredi kartı veya havale/EFT ile güvenle ödeme yapabilirsiniz." },
    { q: "Paketimi daha sonra yükseltebilir miyim?", a: "Evet, istediğiniz zaman aradaki farkı ödeyerek bir üst pakete geçiş yapabilirsiniz." },
  ]

  return (
    <div className="flex-1 p-6 md:p-10 space-y-10  max-w-[1400px] mx-auto pb-24">
      
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="w-8 h-[2px] bg-[#95BF47] rounded-full" />
            <span className="text-[10px] font-black text-[#95BF47] uppercase tracking-[0.2em]">Destek Merkezi</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-none"
          >
            Size Nasıl <span className="text-[#95BF47]">Yardımcı</span> Olabiliriz?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-medium text-sm md:text-base max-w-xl"
          >
            Mağaza kurulumunuz veya Shopify hakkındaki tüm sorularınızı uzman ekibimize iletin. 
          </motion.p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form & Main Content */}
        <div className="lg:col-span-2 space-y-8">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
             className="bg-white rounded-[40px] p-8 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden group"
           >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#95BF47]/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-[#95BF47]/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-[#95BF47]" />
                 </div>
                 Hızlı Destek Formu
              </h3>
              
              <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">KONU BAŞLIĞI</label>
                        <Input 
                           value={ticketForm.subject}
                           onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                           placeholder="Yardım almak istediğiniz konuyu özetleyin" 
                           className="rounded-2xl h-14 border-gray-100 focus:ring-[#95BF47] text-xs font-bold" 
                        />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">KATEGORİ</label>
                       <div className="relative">
                          <button 
                             onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                             className="w-full h-14 px-5 rounded-2xl border border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs text-gray-900 font-black cursor-pointer group-hover:bg-white transition-all focus:ring-2 focus:ring-[#95BF47]/10"
                          >
                             <span>{selectedCategory}</span>
                             <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isCategoryOpen && "rotate-180")} />
                          </button>
                          
                          <AnimatePresence>
                             {isCategoryOpen && (
                                <motion.div 
                                   initial={{ opacity: 0, y: 5 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   exit={{ opacity: 0, y: 5 }}
                                   className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-[24px] shadow-2xl p-2 z-[60] overflow-hidden"
                                >
                                   {categories.map((cat) => (
                                      <button 
                                         key={cat}
                                         onClick={() => {
                                            setSelectedCategory(cat)
                                            setIsCategoryOpen(false)
                                         }}
                                         className={cn(
                                            "w-full text-left px-4 py-3 rounded-xl text-[11px] font-black transition-colors",
                                            selectedCategory === cat ? "bg-[#95BF47] text-white" : "text-gray-600 hover:bg-gray-50"
                                         )}
                                      >
                                         {cat}
                                      </button>
                                   ))}
                                </motion.div>
                             )}
                          </AnimatePresence>
                       </div>
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">MESAJINIZ</label>
                    <Textarea 
                       value={ticketForm.message}
                       onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                       placeholder="Sorunuzu buraya detaylıca yazabilirsiniz..." 
                       className="rounded-[32px] min-h-[160px] border-gray-100 focus:ring-[#95BF47] text-xs font-bold p-6" 
                    />
                 </div>

                 <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                       <Zap className="w-4 h-4 text-orange-400" />
                       Ortalama yanıt süresi: <span className="text-gray-900 font-black">15 Dakika</span>
                    </div>
                    <Button 
                       onClick={handleSubmit}
                       disabled={loading}
                       className="rounded-2xl bg-gray-900 text-white hover:bg-black font-black h-14 px-10 text-xs shadow-xl transition-all disabled:opacity-50"
                    >
                       {loading ? "Gönderiliyor..." : "Talep Gönder"} <Send className="w-4 h-4 ml-3" />
                    </Button>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
             className="bg-white rounded-[40px] p-8 md:p-10 border border-gray-100 shadow-sm"
           >
              <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#95BF47]/10 flex items-center justify-center">
                       <Clock className="w-5 h-5 text-[#95BF47]" />
                    </div>
                    Aktif Taleplerim
                 </div>
                 <span className="text-[10px] font-black text-gray-400 px-3 py-1 bg-gray-50 rounded-lg">{myTickets.length} TALEP</span>
              </h3>
              
              <div className="space-y-4">
                 {myTickets.map((ticket, i) => (
                    <Link key={i} href={`/panel/destek/${ticket._id}`} className="block">
                      <motion.div 
                        whileHover={{ x: 5 }}
                        className="p-5 rounded-[28px] border border-gray-50 hover:border-[#95BF47]/20 hover:bg-[#95BF47]/5 transition-all flex items-center justify-between group cursor-pointer"
                      >
                         <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 group-hover:bg-white flex items-center justify-center transition-colors">
                            <FileQuestion className="w-6 h-6 text-gray-300 group-hover:text-[#95BF47]" />
                            </div>
                            <div>
                               <h4 className="text-sm font-black text-gray-900 group-hover:text-[#95BF47] transition-colors">{ticket.subject}</h4>
                               <p className="text-[10px] text-gray-400 font-bold mt-0.5 uppercase tracking-widest">
                                 {ticket.ticketId} <span className="mx-1 text-gray-200">•</span> {ticket.category} <span className="mx-1 text-gray-200">•</span> {new Date(ticket.createdAt).toLocaleDateString('tr-TR')}
                               </p>
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-4">
                            <div className={cn(
                               "px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest",
                               ticket.status === "Cevaplandı" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"
                            )}>
                               {ticket.status}
                            </div>
                            <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-[#95BF47] group-hover:text-white transition-all">
                               <ChevronRight className="w-4 h-4" />
                            </div>
                         </div>
                      </motion.div>
                    </Link>
                 ))}
              </div>
           </motion.div>
        </div>

        {/* Sidebar Info Cards */}
        <div className="space-y-8">
           {/* FAQ Section */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.6 }}
             className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm"
           >
              <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3">
                 <div className="w-1 h-5 bg-[#95BF47] rounded-full" />
                 Sıkça Sorulanlar
              </h3>
              <div className="space-y-6">
                 {faqs.map((faq, i) => (
                    <div key={i} className="group cursor-pointer">
                       <h4 className="text-xs font-black text-gray-900 group-hover:text-[#95BF47] flex items-start gap-2 leading-tight transition-colors">
                          <Plus className="w-3.5 h-3.5 mt-0.5 text-[#95BF47]" />
                          {faq.q}
                       </h4>
                       <p className="text-[11px] text-gray-400 font-medium mt-2 pl-5 leading-relaxed overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500">
                          {faq.a}
                       </p>
                    </div>
                 ))}
              </div>
              <Button variant="outline" className="w-full mt-8 rounded-2xl border-gray-100 h-12 text-[10px] font-black uppercase tracking-widest hover:text-[#95BF47] hover:border-[#95BF47]">Tüm Rehberi Gör</Button>
           </motion.div>

           {/* Quick Action Support Card */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.7 }}
             className="bg-black rounded-[40px] p-8 text-white relative overflow-hidden group shadow-2xl"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#95BF47]/20 blur-3xl rounded-full" />
              <div className="relative z-10 space-y-6">
                 <div className="w-12 h-12 rounded-2xl bg-[#95BF47] flex items-center justify-center shadow-lg shadow-[#95BF47]/40 ring-4 ring-[#95BF47]/10">
                    <Smartphone className="w-6 h-6" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-xl font-black tracking-tight">Anında Destek Alın</h4>
                    <p className="text-gray-500 text-[11px] font-medium leading-relaxed">Daha hızlı iletişim için WhatsApp ve telefon hatlarımız 09:00 - 18:00 arası aktiftir.</p>
                 </div>
                 <div className="space-y-3 pt-2">
                    <Button className="w-full rounded-2xl bg-white/10 hover:bg-[#95BF47] text-white font-black h-12 text-xs transition-all border border-white/5 flex gap-3 group/btn">
                       <MessageCircle className="w-4 h-4 text-[#95BF47] group-hover/btn:text-white" /> WhatsApp Destek
                    </Button>
                    <Button className="w-full rounded-2xl bg-white/10 hover:bg-gray-800 text-white font-black h-12 text-xs transition-all border border-white/5 flex gap-3">
                       <Phone className="w-4 h-4 text-gray-400" /> Bizi Arayın
                    </Button>
                 </div>
              </div>
           </motion.div>

           {/* Contact Channels Card */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.8 }}
             className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm space-y-4"
           >
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">RESMİ KANALLAR</p>
              <div className="space-y-4">
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-[#95BF47]/10 transition-colors">
                       <Mail className="w-4 h-4 text-gray-400 group-hover:text-[#95BF47]" />
                    </div>
                    <div>
                       <p className="text-xs font-black text-gray-900">destek@shopfio.com</p>
                       <p className="text-[10px] text-gray-400 font-bold uppercase">e-posta ile ulaşın</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                       <Smartphone className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                    </div>
                    <div>
                       <p className="text-xs font-black text-gray-900">@ShopfioGlobal</p>
                       <p className="text-[10px] text-gray-400 font-bold uppercase">sosyal medya</p>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  )
}
