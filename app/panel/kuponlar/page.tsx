"use client"

import React from "react"
import { motion } from "framer-motion"
import { Tag, Ticket, Clock, CheckCircle2, Percent, Banknote } from "lucide-react"

export default function UserCouponsPage() {
  // In a real app, we'd fetch these from the backend
  // For now, it's a premium-looking placeholder
  const activeCoupons = [
    {
      id: "1",
      code: "WELCOME10",
      type: "percentage",
      value: 10,
      expiry: "2026-12-31",
      description: "İlk başvurunuza özel indirim"
    }
  ]

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Kuponlarım</h1>
        <p className="text-gray-500 font-medium">Size özel tanımlanan indirim ve fırsat kodları.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeCoupons.map((coupon) => (
          <motion.div 
            key={coupon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#95BF47]/5 transition-all overflow-hidden"
          >
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
                    Son kullanım: {new Date(coupon.expiry).toLocaleDateString('tr-TR')}
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
      </div>

      {activeCoupons.length === 0 && (
        <div className="bg-white rounded-[40px] border border-gray-100 p-20 text-center space-y-4 border-dashed">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
            <Tag className="w-10 h-10 text-gray-300" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900">Henüz yeni bir kuponun yok</h3>
            <p className="text-sm text-gray-400 font-medium">Yeni fırsatlar için takipte kal!</p>
          </div>
        </div>
      )}
    </div>
  )
}
