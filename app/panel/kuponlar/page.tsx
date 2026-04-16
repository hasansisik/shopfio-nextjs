"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tag, Ticket, Clock, CheckCircle2, Percent, Banknote, Trash2, Plus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { validateCoupon } from "@/redux/actions/couponActions"

export default function UserCouponsPage() {
  const dispatch = useAppDispatch()
  const [couponInput, setCouponInput] = useState("")
  const { loading: couponLoading } = useAppSelector((state) => state.coupon)

  // In a real app, we'd fetch these from the backend
  const [activeCoupons, setActiveCoupons] = useState([
    {
      id: "1",
      code: "WELCOME10",
      type: "percentage",
      value: 10,
      expiry: "2026-12-31",
      description: "İlk başvurunuza özel indirim"
    }
  ])

  const handleRedeem = async () => {
    if (!couponInput) return
    
    try {
      // Re-using the validation logic
      // In a full implementation, this might link to a 'claim' endpoint
      const result = await dispatch(validateCoupon({ code: couponInput, packageId: "pro" })).unwrap()
      
      if (result) {
        toast.success("Kupon başarıyla tanımlandı!")
        // For demo: add to list if not already there
        if (!activeCoupons.find(c => c.code === couponInput.toUpperCase())) {
          setActiveCoupons(prev => [...prev, {
            id: Date.now().toString(),
            code: couponInput.toUpperCase(),
            type: result.discountType,
            value: result.discountValue,
            expiry: result.expiresAt || "2026-12-31",
            description: "Yeni tanımlanan indirim"
          }])
        }
        setCouponInput("")
      }
    } catch (err: any) {
      toast.error(err || "Geçersiz veya süresi dolmuş kupon kodu.")
    }
  }

  const handleDelete = (id: string) => {
    setActiveCoupons(prev => prev.filter(c => c.id !== id))
    toast.info("Kupon listenizden kaldırıldı.")
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-12">
      {/* Header & Redeem Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#95BF47] font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            Özel Fırsatlar
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Kuponlarım</h1>
          <p className="text-gray-500 font-medium">Size özel tanımlanan indirim ve fırsat kodları.</p>
        </div>

        <div className="bg-white p-2 border border-gray-100 rounded-[24px] shadow-sm flex items-center gap-2 w-full md:w-[400px]">
          <div className="pl-4 text-gray-400">
            <Tag className="w-5 h-5" />
          </div>
          <input 
            type="text"
            placeholder="Kupon kodu girin..."
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
            className="flex-1 bg-transparent border-none outline-none font-bold text-sm placeholder:text-gray-300 h-10"
          />
          <Button 
            onClick={handleRedeem}
            disabled={couponLoading || !couponInput}
            className="rounded-[18px] bg-[#95BF47] hover:bg-black text-white px-6 font-black text-xs transition-all h-10 shadow-lg shadow-[#95BF47]/10"
          >
            {couponLoading ? "..." : "Bozdur"}
          </Button>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
        <AnimatePresence mode="popLayout">
          {activeCoupons.map((coupon) => (
            <motion.div 
              key={coupon.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#95BF47]/5 transition-all overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleDelete(coupon.id)}
                  className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Ticket Punch UI Decorations */}
              <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full border border-gray-100 z-10" />
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full border border-gray-100 z-10" />
              
              <div className="p-8 flex items-start gap-6">
                <div className="w-16 h-16 bg-[#95BF47]/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#95BF47] transition-colors">
                  <Ticket className="w-8 h-8 text-[#95BF47] group-hover:text-white transition-colors" />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#95BF47] uppercase tracking-widest bg-[#95BF47]/10 px-2 py-0.5 rounded-md">
                        {coupon.type === 'percentage' ? 'Yüzde İndirim' : 'Sabit İndirim'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{coupon.description}</h3>
                  </div>

                  <div className="bg-gray-50 border border-gray-100 border-dashed rounded-xl p-4 flex items-center justify-between group-hover:bg-[#95BF47]/5 group-hover:border-[#95BF47]/20 transition-colors">
                    <span className="text-2xl font-black text-gray-900 tracking-widest">{coupon.code}</span>
                    <div className="flex items-baseline gap-1 text-[#95BF47]">
                      {coupon.type === 'percentage' ? (
                        <>
                          <span className="text-2xl font-black">{coupon.value}</span>
                          <Percent className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <Banknote className="w-4 h-4" />
                          <span className="text-2xl font-black">{coupon.value}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      Son kullanım: {new Date(coupon.expiry || "").toLocaleDateString('tr-TR')}
                    </div>
                    <div className="flex items-center gap-1.5 text-[#95BF47]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      AKTİF
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {activeCoupons.length === 0 && (
        <div className="bg-white rounded-[40px] border border-gray-100 p-20 text-center space-y-6 border-dashed animate-in fade-in duration-500">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
            <Tag className="w-12 h-12 text-gray-300" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-gray-900">Henüz yeni bir kuponun yok</h3>
            <p className="text-sm text-gray-400 font-medium max-w-xs mx-auto">Harika indirimler yakalamak için bültenimize abone ol veya sosyal medyada bizi takip et!</p>
          </div>
          <Button 
            variant="outline"
            className="rounded-2xl h-12 px-8 border-gray-100 font-bold hover:bg-gray-50"
            onClick={() => window.location.reload()}
          >
            Yenile
          </Button>
        </div>
      )}
    </div>
  )
}
