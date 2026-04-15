"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { adminGetAllTickets, adminReplyTicket } from "@/redux/actions/adminActions"
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Clock, 
  User as UserIcon,
  ChevronRight,
  Circle,
  Reply,
  Send
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function AdminSupportPage() {
  const dispatch = useAppDispatch()
  const { tickets, loading } = useAppSelector((state) => state.admin)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [replyMessage, setReplyMessage] = useState("")
  const [isReplying, setIsReplying] = useState(false)

  useEffect(() => {
    dispatch(adminGetAllTickets())
  }, [dispatch])

  const handleReply = async () => {
    if (!replyMessage.trim()) return
    setIsReplying(true)
    const result = await dispatch(adminReplyTicket({ id: selectedTicket._id, message: replyMessage }))
    if (adminReplyTicket.fulfilled.match(result)) {
      toast.success("Cevap gönderildi")
      setReplyMessage("")
      setSelectedTicket(result.payload)
    } else {
      toast.error("Hata: " + result.payload)
    }
    setIsReplying(false)
  }

  const filteredTickets = tickets.filter(t => 
    t.subject?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.ticketId?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      {/* Sidebar List */}
      <div className="w-full md:w-[400px] border-r border-gray-100 bg-white flex flex-col min-h-0 shrink-0">
        <div className="p-6 border-b border-gray-100 shrink-0">
           <h1 className="text-xl font-black text-gray-900 flex items-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6 text-[#95BF47]" />
            Destek Merkezi
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Talep veya Kullanıcı ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#95BF47]/20 transition-all w-full"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {loading ? (
             <div className="py-10 text-center">
                <div className="w-6 h-6 border-2 border-[#95BF47]/20 border-t-[#95BF47] rounded-full animate-spin mx-auto" />
             </div>
          ) : filteredTickets.map((t) => (
            <button
              key={t._id}
              onClick={() => setSelectedTicket(t)}
              className={`w-full text-left p-4 rounded-2xl transition-all border ${
                selectedTicket?._id === t._id 
                ? 'bg-[#95BF47]/5 border-[#95BF47]/20 ring-1 ring-[#95BF47]/10' 
                : 'bg-white border-transparent hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-black text-[#95BF47] tracking-widest uppercase truncate">{t.ticketId}</span>
                <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                  t.status === 'Cevaplandı' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                }`}>
                  {t.status}
                </div>
              </div>
              <h3 className="text-sm font-bold text-gray-900 truncate">{t.subject}</h3>
              <div className="flex items-center justify-between mt-2">
                 <p className="text-xs text-gray-500 font-medium truncate">{t.user?.name}</p>
                 <span className="text-[10px] text-gray-400">{new Date(t.updatedAt).toLocaleDateString('tr-TR')}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden bg-gray-50/50 flex flex-col min-h-0">
        {selectedTicket ? (
          <>
            {/* Ticket Header */}
            <div className="p-8 bg-white border-b border-gray-100 shrink-0">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-black text-[#95BF47] uppercase tracking-[0.2em]">{selectedTicket.category}</span>
                    <Circle className="w-1 h-1 fill-gray-300 text-gray-300" />
                    <span className="text-xs font-bold text-gray-400">{selectedTicket.ticketId}</span>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 leading-tight">{selectedTicket.subject}</h2>
                </div>
                <div className="flex flex-col items-end">
                   <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ring-4 ring-white shadow-sm mb-2">
                      <UserIcon className="w-5 h-5 text-gray-400" />
                   </div>
                   <p className="text-xs font-bold text-gray-900">{selectedTicket.user?.name}</p>
                   <p className="text-[10px] text-gray-400 font-medium">{selectedTicket.user?.email}</p>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 min-h-0">
              {/* Initial Message */}
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0">
                    <UserIcon className="w-5 h-5 text-gray-400" />
                 </div>
                 <div className="flex-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedTicket.message}</p>
                    <p className="mt-4 text-[10px] text-gray-400 font-medium tracking-wide">
                      {new Date(selectedTicket.createdAt).toLocaleString('tr-TR')}
                    </p>
                 </div>
              </div>

              {/* Replies */}
              {selectedTicket.replies?.map((reply: any, i: number) => (
                <div key={i} className={`flex gap-4 ${reply.sender?.role === 'admin' ? 'flex-row-reverse' : ''}`}>
                   <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                      reply.sender?.role === 'admin' ? 'bg-[#95BF47] text-white' : 'bg-gray-100 text-gray-400'
                   }`}>
                      {reply.sender?.role === 'admin' ? 'A' : <UserIcon className="w-5 h-5" />}
                   </div>
                   <div className={`flex-1 p-6 rounded-3xl border shadow-sm ${
                      reply.sender?.role === 'admin' 
                      ? 'bg-[#1C1C1C] text-white border-transparent' 
                      : 'bg-white text-gray-700 border-gray-100'
                   }`}>
                      <p className="text-sm leading-relaxed">{reply.message}</p>
                      <p className={`mt-4 text-[10px] font-medium tracking-wide ${
                        reply.sender?.role === 'admin' ? 'text-gray-400' : 'text-gray-400'
                      }`}>
                        {new Date(reply.createdAt).toLocaleString('tr-TR')}
                      </p>
                   </div>
                </div>
              ))}
            </div>

            {/* Reply Area */}
            <div className="p-8 bg-white border-t border-gray-100 shrink-0">
               <div className="relative">
                  <textarea 
                    placeholder="Yanıtınızı yazın..." 
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="w-full bg-gray-50 border border-transparent rounded-3xl p-6 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-[#95BF47] transition-all resize-none h-32"
                  />
                  <button 
                    onClick={handleReply}
                    disabled={isReplying || !replyMessage.trim()}
                    className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#95BF47] hover:bg-[#86ac3f] text-white px-6 py-3 rounded-2xl font-black text-xs transition-all disabled:opacity-50"
                  >
                    {isReplying ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                    GÖNDER
                  </button>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
             <div className="w-20 h-20 bg-gray-100 rounded-[2.5rem] flex items-center justify-center mb-6">
                <MessageSquare className="w-10 h-10 text-gray-300" />
             </div>
             <h3 className="text-lg font-black text-gray-900 tracking-tight">Destek Talebi Seçin</h3>
             <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">Mesajlaşmayı başlatmak ve sorunları çözmek için soldaki listeden bir talep seçin.</p>
          </div>
        )}
      </div>
    </div>
  )
}
