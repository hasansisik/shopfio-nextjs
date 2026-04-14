"use client"

import * as React from "react"
import { 
  Check, 
  CreditCard, 
  Receipt, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Plus, 
  Download,
  Trash2,
  Wallet,
  History,
  Building2,
  Globe,
  Bitcoin as BtcIcon,
  Copy,
  ExternalLink,
  ChevronRight,
  BadgeCheck,
  ArrowUpRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function OdemelerPage() {
  const [selectedMethod, setSelectedMethod] = React.useState<"card" | "transfer" | "payoneer" | "crypto">("card")

  const paymentMethods = [
    { id: "card", label: "Kredi Kartı", icon: CreditCard, color: "bg-blue-500" },
    { id: "transfer", label: "Havale / EFT", icon: Building2, color: "bg-orange-500" },
    { id: "payoneer", label: "Payoneer", icon: Globe, color: "bg-[#95BF47]" },
    { id: "crypto", label: "Bitcoin / BTC", icon: BtcIcon, color: "bg-yellow-500" },
  ]

  const savedCards = [
    { type: "visa", number: "**** **** **** 4242", expiry: "12/26", isDefault: true },
    { type: "mastercard", number: "**** **** **** 8855", expiry: "08/25", isDefault: false },
  ]

  const bankAccounts = [
    { bank: "Ziraat Bankası", owner: "Shopfio Teknoloji A.Ş.", iban: "TR00 0000 0000 0000 0000 0000 00", currency: "TRY" },
    { bank: "Akbank", owner: "Shopfio Teknoloji A.Ş.", iban: "TR11 1111 1111 1111 1111 1111 11", currency: "TRY" },
  ]

  return (
    <div className="flex-1 p-6 md:p-10 space-y-10 min-h-screen max-w-[1400px] mx-auto pb-24">
      
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-3">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="w-8 h-[2px] bg-[#95BF47] rounded-full" />
            <span className="text-[10px] font-black text-[#95BF47] uppercase tracking-[0.2em]">Ödeme Ayarları</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-none"
          >
            Ödeme <span className="text-[#95BF47]">Yöntemleri</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-medium text-sm md:text-base max-w-xl"
          >
            Sizin için en uygun ödeme yöntemini seçin ve hesabınızı yapılandırın.
          </motion.p>
        </div>
      </section>

      {/* Payment Method Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
         {paymentMethods.map((method, i) => (
            <motion.button
               key={method.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 + (i * 0.1) }}
               onClick={() => setSelectedMethod(method.id as any)}
               className={cn(
                  "p-6 md:p-8 rounded-[40px] border-2 transition-all flex flex-col items-center gap-4 group relative overflow-hidden",
                  selectedMethod === method.id 
                     ? "border-[#95BF47] bg-white shadow-2xl shadow-[#95BF47]/10" 
                     : "border-gray-100 bg-white hover:border-gray-200"
               )}
            >
               <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110",
                  method.color
               )}>
                  <method.icon className="w-7 h-7" />
               </div>
               <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest transition-colors",
                  selectedMethod === method.id ? "text-gray-900" : "text-gray-400 group-hover:text-gray-900"
               )}>{method.label}</span>
               
               {selectedMethod === method.id && (
                  <motion.div 
                     layoutId="method-check"
                     className="absolute top-4 right-4"
                  >
                     <BadgeCheck className="w-6 h-6 text-[#95BF47]" />
                  </motion.div>
               )}
            </motion.button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Dynamic Content Area */}
        <div className="lg:col-span-8">
           <AnimatePresence mode="wait">
              {selectedMethod === "card" && (
                 <motion.div 
                    key="card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-[40px] p-8 md:p-10 border border-gray-100 shadow-sm space-y-8"
                 >
                    <div className="flex items-center justify-between uppercase tracking-widest text-[10px] font-black text-gray-400">
                       <span className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 font-bold">
                          <ShieldCheck className="w-4 h-4 text-[#95BF47]" /> GÜVENLİ KART DEPOLAMA
                       </span>
                       <span>{savedCards.length} KART KAYITLI</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {savedCards.map((card, i) => (
                          <div key={i} className="group relative">
                             <div className={cn(
                                "p-8 rounded-[32px] border-2 transition-all cursor-pointer relative overflow-hidden",
                                card.isDefault ? "border-[#95BF47] bg-[#95BF47]/[0.02]" : "border-gray-50 bg-[#fbfbfb] hover:border-gray-200"
                             )}>
                                <div className="flex justify-between items-start mb-10">
                                   <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold text-[10px] uppercase">
                                      {card.type}
                                   </div>
                                   {card.isDefault && (
                                      <span className="bg-[#95BF47] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-[#95BF47]/20">VARSAYILAN</span>
                                   )}
                                </div>
                                <div className="space-y-4">
                                   <p className="text-xl font-black text-gray-900 tracking-wider whitespace-nowrap">{card.number}</p>
                                   <div className="flex justify-between items-end">
                                      <div>
                                         <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">GÜNCEL SKT</p>
                                         <p className="text-sm font-black text-gray-900">{card.expiry}</p>
                                      </div>
                                      <Button variant="ghost" size="icon" className="rounded-xl text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                         <Trash2 className="w-4 h-4" />
                                      </Button>
                                   </div>
                                </div>
                             </div>
                          </div>
                       ))}
                       <button className="border-2 border-dashed border-gray-100 rounded-[32px] p-8 flex flex-col items-center justify-center gap-3 hover:border-[#95BF47] hover:bg-gray-50/50 transition-all text-gray-400 hover:text-[#95BF47] group">
                          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#95BF47] group-hover:text-white transition-all">
                             <Plus className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest">Yeni Kart Ekle</span>
                       </button>
                    </div>
                 </motion.div>
              )}

              {selectedMethod === "transfer" && (
                 <motion.div 
                    key="transfer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-[40px] p-8 md:p-10 border border-gray-100 shadow-sm space-y-8"
                 >
                    <div className="space-y-1 px-2">
                       <h3 className="text-xl font-black text-gray-900 tracking-tight">Banka Hesap Bilgilerimiz</h3>
                       <p className="text-xs font-medium text-gray-400">Havale veya EFT açıklama kısmına başvuru numaranızı yazmayı unutmayın.</p>
                    </div>

                    <div className="space-y-4">
                       {bankAccounts.map((acc, i) => (
                          <div key={i} className="p-8 rounded-[32px] border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[#95BF47]/30 transition-all group relative overflow-hidden">
                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                <div className="space-y-4">
                                   <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                         <Building2 className="w-5 h-5 text-orange-500" />
                                      </div>
                                      <span className="text-sm font-black text-gray-900 uppercase tracking-widest">{acc.bank}</span>
                                   </div>
                                   <div className="space-y-1">
                                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">IBAN NUMARASI</p>
                                      <p className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-3">
                                         {acc.iban}
                                         <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-[#95BF47]/10 hover:text-[#95BF47]">
                                            <Copy className="w-4 h-4" />
                                         </Button>
                                      </p>
                                   </div>
                                </div>
                                <div className="text-right space-y-2">
                                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">HESAP SAHİBİ</p>
                                   <p className="text-sm font-black text-gray-900 uppercase">{acc.owner}</p>
                                   <div className="inline-flex px-3 py-1 bg-white rounded-lg border border-gray-100 text-[10px] font-black text-gray-500 shadow-sm">
                                      {acc.currency}
                                   </div>
                                </div>
                             </div>
                             <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full" />
                          </div>
                       ))}
                    </div>
                 </motion.div>
              )}

              {selectedMethod === "payoneer" && (
                 <motion.div 
                    key="payoneer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden text-center"
                 >
                    <div className="absolute top-0 left-0 w-full h-2 bg-[#95BF47]" />
                    <div className="max-w-md mx-auto space-y-8">
                       <div className="w-20 h-20 mx-auto rounded-[24px] bg-[#95BF47] flex items-center justify-center shadow-2xl shadow-[#95BF47]/20">
                          <Globe className="w-10 h-10 text-white" />
                       </div>
                       <div className="space-y-3">
                          <h3 className="text-2xl font-black text-gray-900 tracking-tight">Payoneer Entegrasyonu</h3>
                          <p className="text-xs text-gray-400 font-medium leading-relaxed">Shopfio hesabınızı Payoneer ile bağlayarak global ödemelerinizi pürüzsüz bir şekilde yönetebilirsiniz.</p>
                       </div>
                       <div className="p-6 bg-gray-50 rounded-[32px] border border-gray-100 space-y-4">
                          <div className="flex items-center justify-between px-2">
                             <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-400" />
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">DURUM</span>
                             </div>
                             <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">BAĞLI DEĞİL</span>
                          </div>
                          <Button className="w-full h-14 rounded-2xl bg-[#95BF47] text-white hover:bg-black font-black transition-all shadow-xl shadow-[#95BF47]/20 uppercase tracking-widest text-[11px] flex gap-3">
                             Hesabı Bağla <ArrowUpRight className="w-4 h-4" />
                          </Button>
                       </div>
                    </div>
                 </motion.div>
              )}

              {selectedMethod === "crypto" && (
                 <motion.div 
                    key="crypto"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden"
                 >
                    <div className="flex flex-col md:flex-row items-center gap-10">
                       <div className="w-48 h-48 bg-white border border-gray-100 rounded-[40px] p-6 shadow-xl flex items-center justify-center shrink-0">
                          {/* Placeholder for QR Code */}
                          <div className="w-full h-full bg-gray-50 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center text-gray-300">
                             <Copy className="w-10 h-10 opacity-20" />
                          </div>
                       </div>
                       <div className="space-y-6 flex-1 text-center md:text-left">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full border border-yellow-100 text-yellow-600 font-black text-[9px] uppercase tracking-widest">
                             <BtcIcon className="w-3.5 h-3.5" /> Bitcon (BTC) Ağı Seçildi
                          </div>
                          <div className="space-y-4">
                             <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase tracking-[-0.02em]">Kripto ile Hızlı Ödeme</h3>
                             <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-sm">Tüm hizmetlerimizi piyasa değerine göre Bitcoin üzerinden de satın alabilirsiniz. Ödeme sonrası işlem onayınız otomatik olarak sisteme düşer.</p>
                          </div>
                          <div className="p-4 bg-gray-900 rounded-2xl border border-gray-800 flex items-center justify-between group cursor-pointer hover:border-[#95BF47]/50 transition-all">
                             <code className="text-[11px] text-[#95BF47] font-black tracking-tight overflow-hidden text-ellipsis mr-4">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</code>
                             <Button size="icon" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#95BF47] text-white shrink-0">
                                <Copy className="w-4 h-4" />
                             </Button>
                          </div>
                       </div>
                    </div>
                 </motion.div>
              )}
           </AnimatePresence>
        </div>

        {/* Right Sidebar: Security & Help */}
        <div className="lg:col-span-4 space-y-8">
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.8 }}
             className="bg-gray-900 rounded-[40px] p-8 text-white relative overflow-hidden group shadow-2xl"
           >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#95BF47]/20 blur-[80px] rounded-full" />
              <div className="relative z-10 space-y-6">
                 <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                    <ShieldCheck className="w-7 h-7 text-[#95BF47]" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-xl font-black tracking-tight leading-tight uppercase tracking-[-0.02em]">Güvenli Ödeme<br/>Altyapısı</h4>
                    <p className="text-gray-400 text-xs font-medium leading-relaxed">Tüm ödemeleriniz SSL sertifikalı ve global güvenlik protokollerine (PCI-DSS) uygun sistemler üzerinden gerçekleştirilir.</p>
                 </div>
                 <div className="pt-4 flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#95BF47] stroke-[4]" />
                    <span className="text-[10px] font-black text-gray-300 tracking-widest uppercase">%100 GÜVENLİ İŞLEM</span>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.9 }}
             className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm space-y-6"
           >
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">DESTEK VE İADE</h3>
              <div className="space-y-6">
                 <div className="flex items-start gap-3 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-[#95BF47]/10 transition-colors shrink-0">
                       <History className="w-4 h-4 text-gray-400 group-hover:text-[#95BF47]" />
                    </div>
                    <div>
                       <p className="text-xs font-black text-gray-900">Geri Ödeme Süresi</p>
                       <p className="text-[10px] text-gray-400 font-medium">İptallerde iadeniz 3 iş günü içinde hesabınıza yansır.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-[#95BF47]/10 transition-colors shrink-0">
                       <Zap className="w-4 h-4 text-gray-400 group-hover:text-[#95BF47]" />
                    </div>
                    <div>
                       <p className="text-xs font-black text-gray-900">Anında Onay</p>
                       <p className="text-[10px] text-gray-400 font-medium">Kredi kartı ve Kripto ödemeleri anında onaylanmaktadır.</p>
                    </div>
                 </div>
              </div>
              <Button variant="outline" className="w-full rounded-[20px] border-gray-100 h-14 text-[10px] font-black uppercase tracking-widest hover:border-[#95BF47] hover:text-[#95BF47] transition-all">
                 Tüm Detayları Gör
              </Button>
           </motion.div>
        </div>
      </div>
    </div>
  )
}
