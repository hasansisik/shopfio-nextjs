"use client"

import * as React from "react"
import { Check, CreditCard, Receipt, Star, Zap, ShieldCheck, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { plans, comparisonFeatures } from "@/lib/pricing-data"

export default function OdemelerPage() {
  const currentPlan = "pro" // This would normally come from an API/User state

  return (
    <div className="flex-1 p-4 md:p-6 bg-[oklch(0.985_0.01_145)] min-h-screen">
      <div className="w-full space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Ödeme & Faturalar</h1>
            <p className="text-gray-500 text-[11px] mt-0.5 font-medium">Abonelik planınızı yönetin ve fatura geçmişinizi görüntüleyin.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Plans */}
          {plans.map((plan, i) => {
            const isCurrent = plan.id === currentPlan
            return (
              <div 
                key={i} 
                className={cn(
                  "relative flex flex-col p-6 rounded-[24px] border transition-all duration-300",
                  plan.highlight 
                    ? "bg-white border-[#95BF47] shadow-[0_20px_50px_rgba(149,191,71,0.08)] ring-1 ring-[#95BF47]/10" 
                    : "bg-white border-gray-100 shadow-sm"
                )}
              >
                {isCurrent && (
                  <div className="absolute -top-3 left-6 bg-gray-900 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Mevcut Planınız
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className={cn("text-sm font-bold mb-1", plan.highlight ? "text-[#95BF47]" : "text-gray-900")}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-2xl font-bold text-gray-900">₺{plan.price}</span>
                    <span className="text-gray-400 text-[10px] font-bold">/AYLIK</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  {comparisonFeatures.slice(0, 6).map((feature, idx) => {
                    const isAvailable = plan.id === "basic" ? feature.small : plan.id === "pro" ? feature.medium : feature.full
                    return (
                      <div key={idx} className={cn("flex items-center gap-2", !isAvailable && "opacity-30")}>
                        <div className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center shrink-0",
                          isAvailable ? "bg-[#95BF47]/10 text-[#95BF47]" : "bg-gray-100 text-gray-400"
                        )}>
                          {isAvailable ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : <Check className="w-2.5 h-2.5 opacity-0" />}
                        </div>
                        <span className="text-[11px] font-medium text-gray-600">{feature.name}</span>
                      </div>
                    )
                  })}
                </div>

                <Button 
                  disabled={isCurrent}
                  className={cn(
                    "w-full rounded-xl font-bold h-10 text-xs transition-all",
                    isCurrent 
                      ? "bg-gray-100 text-gray-400 hover:bg-gray-100 cursor-default" 
                      : plan.highlight
                        ? "bg-[#95BF47] text-white hover:bg-[#86ac3f]"
                        : "bg-gray-900 text-white hover:bg-black"
                  )}
                >
                  {isCurrent ? "Aktif Kullanılıyor" : `${plan.name} Pakete Geç`}
                </Button>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Method */}
          <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#95BF47]" />
              Ödeme Yöntemi
            </h3>
            <div className="p-4 rounded-2xl border border-gray-50 bg-gray-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 bg-white border border-gray-100 rounded flex items-center justify-center">
                  <span className="text-[8px] font-bold text-blue-600">VISA</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">•••• •••• •••• 4242</p>
                  <p className="text-[10px] text-gray-400 font-medium">Son kullanma: 12/26</p>
                </div>
              </div>
              <Button variant="ghost" className="text-[10px] font-bold text-[#95BF47] h-8 px-3 rounded-lg hover:bg-[#95BF47]/5">Düzenle</Button>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#95BF47]" />
              Fatura Geçmişi
            </h3>
            <div className="space-y-2">
              {[
                { date: "01 Nisan 2024", amount: "₺9.999", status: "Ödendi" },
                { date: "01 Mart 2024", amount: "₺9.999", status: "Ödendi" },
              ].map((invoice, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-50 hover:bg-gray-50/50 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <Receipt className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-900">{invoice.date}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{invoice.amount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded-full bg-[#95BF47]/10 text-[#95BF47] text-[9px] font-bold">{invoice.status}</span>
                    <ArrowRight className="w-3 h-3 text-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
