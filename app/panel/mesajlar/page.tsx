"use client"

import * as React from "react"
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Paperclip, 
  Smile, 
  Send,
  Check,
  CheckCheck,
  Circle
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { INITIAL_CHATS, INITIAL_MESSAGES } from "@/lib/chat-data"

export default function MesajlarPage() {
  const [selectedChat, setSelectedChat] = React.useState(INITIAL_CHATS[0])
  const [messages, setMessages] = React.useState(INITIAL_MESSAGES)
  const [message, setMessage] = React.useState("")

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      chatId: selectedChat.id,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: "me",
      status: "sent"
    }

    setMessages([...messages, newMessage])
    setMessage("")
    
    // Auto scroll logic could be here
  }

  const filteredMessages = messages.filter(m => m.chatId === selectedChat.id)

  return (
    <div className="flex-1 flex bg-[oklch(0.985_0.01_145)] h-[calc(100vh-var(--announcement-height)-var(--header-height))] overflow-hidden">
      {/* Left Sidebar: Chat List */}
      <div className="w-full md:w-[350px] lg:w-[400px] border-r border-gray-100 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-50 flex items-center justify-between">
           <h1 className="text-lg font-bold text-gray-900 leading-none">Mesajlar</h1>
           <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                 <MoreVertical className="w-4 h-4 text-gray-400" />
              </Button>
           </div>
        </div>
        
        <div className="p-3">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <Input 
                placeholder="Mesajlarda ara..." 
                className="pl-9 h-9 bg-gray-50/50 border-none rounded-xl text-xs focus-visible:ring-1 focus-visible:ring-[#95BF47]/30"
              />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto">
           {INITIAL_CHATS.map((chat) => (
             <div 
               key={chat.id}
               onClick={() => setSelectedChat(chat)}
               className={cn(
                 "flex items-center gap-3 p-4 cursor-pointer transition-all border-b border-gray-50/50",
                 selectedChat.id === chat.id ? "bg-[#95BF47]/5" : "hover:bg-gray-50"
               )}
             >
                <div className="relative shrink-0">
                   <Avatar className="h-12 w-12 rounded-2xl">
                      <AvatarFallback className="bg-gray-100 font-bold">{chat.name.charAt(0)}</AvatarFallback>
                   </Avatar>
                   {chat.online && (
                     <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                   )}
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-center mb-0.5">
                      <h3 className="text-sm font-bold text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-[10px] text-gray-400 font-medium">{chat.time}</span>
                   </div>
                   <div className="flex justify-between items-center gap-2">
                       <p className="text-[11px] text-gray-500 truncate font-medium">{chat.lastMessage}</p>
                       {chat.unread > 0 && (
                         <div className="min-w-[18px] h-[18px] rounded-full bg-[#95BF47] text-white text-[9px] font-bold flex items-center justify-center px-1">
                            {chat.unread}
                         </div>
                       )}
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Right Area: Chat Content */}
      <div className="hidden md:flex flex-1 flex-col bg-white relative">
         {/* Chat Header */}
         <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 shadow-sm">
            <div className="flex items-center gap-3">
               <Avatar className="h-10 w-10 rounded-xl">
                  <AvatarFallback className="bg-gray-100 font-bold">{selectedChat.name.charAt(0)}</AvatarFallback>
               </Avatar>
               <div>
                  <h2 className="text-sm font-bold text-gray-900 leading-none">{selectedChat.name}</h2>
                  <div className="flex items-center gap-1.5 mt-1">
                     <Circle className={cn("w-1.5 h-1.5 fill-current", selectedChat.online ? "text-green-500" : "text-gray-300")} />
                     <p className="text-[10px] text-gray-400 font-bold tracking-tight">
                        {selectedChat.online ? "Şu an çevrimiçi" : "Çevrimdışı"}
                     </p>
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-1">
               <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                  <Phone className="w-4 h-4 text-gray-400" />
               </Button>
               <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                  <Search className="w-4 h-4 text-gray-400" />
               </Button>
               <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
               </Button>
            </div>
         </div>

         {/* Chat Messages Area with Green Wallpaper */}
         <div 
           className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 relative"
           style={{
             backgroundColor: "#f6fcf6",
             backgroundImage: "radial-gradient(#e8f2e8 0.5px, transparent 0.5px)",
             backgroundSize: "20px 20px"
           }}
          >
            <div className="flex justify-center mb-6">
               <span className="px-3 py-1 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest shadow-sm">
                  Bugün
               </span>
            </div>

            {filteredMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn(
                  "flex",
                  msg.sender === "me" ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                  "max-w-[80%] rounded-2xl p-3 shadow-sm relative group",
                  msg.sender === "me" 
                    ? "bg-[#95BF47] text-white rounded-tr-none" 
                    : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                )}>
                   <p className="text-[12.5px] leading-relaxed font-medium">{msg.text}</p>
                   <div className={cn(
                     "flex items-center gap-1.5 mt-1 justify-end",
                     msg.sender === "me" ? "text-white/70" : "text-gray-400"
                   )}>
                      <span className="text-[9px] font-bold">{msg.time}</span>
                      {msg.sender === "me" && (
                        msg.status === "read" ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />
                      )}
                   </div>
                </div>
              </div>
            ))}
         </div>

         {/* Chat Input */}
         <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 max-w-4xl mx-auto">
               <Button type="button" variant="ghost" size="icon" className="rounded-full h-10 w-10 shrink-0 text-gray-400 hover:text-gray-600">
                  <Smile className="w-5 h-5" />
               </Button>
               <Button type="button" variant="ghost" size="icon" className="rounded-full h-10 w-10 shrink-0 text-gray-400 hover:text-gray-600">
                  <Paperclip className="w-5 h-5" />
               </Button>
               <div className="flex-1 relative">
                  <Input 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Bir mesaj yazın..."
                    className="h-10 rounded-full bg-gray-50 border-none px-4 text-xs focus-visible:ring-1 focus-visible:ring-[#95BF47]/30"
                  />
               </div>
               <Button 
                 type="submit"
                 className={cn(
                    "rounded-full h-10 w-10 shrink-0 shadow-lg transition-all",
                    message.trim() ? "bg-[#95BF47] hover:bg-[#86ac3f] text-white scale-100" : "bg-gray-100 text-gray-400 scale-95 opacity-50"
                 )}
                 disabled={!message.trim()}
               >
                  <Send className={cn("w-4 h-4 ml-0.5")} />
               </Button>
            </div>
         </form>
      </div>
    </div>
  )
}
