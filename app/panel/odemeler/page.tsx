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
          {/* Plans/Services */}
          {plans.map((plan, i) => {
            return (
              <div 
                key={i} 
                className={cn(
                  "relative flex flex-col p-6 rounded-[24px] border transition-all duration-300",
                  plan.highlight 
                    ? "bg-white border-[#95BF47] shadow-[0_20px_50px_rgba(149,191,71,0.08)] ring-1 ring-[#95BF47]/10" 
                    : "bg-white border-gray-100 shadow-sm hover:border-[#95BF47]/30 transition-all cursor-pointer"
                )}
              >
                <div className="mb-6">
                  <h3 className={cn("text-sm font-bold mb-1", plan.highlight ? "text-[#95BF47]" : "text-gray-900")}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-2xl font-bold text-gray-900">₺{plan.price}</span>
                    <span className="text-gray-400 text-[10px] font-bold">/ TEK ALIM</span>
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
                  className={cn(
                    "w-full rounded-xl font-bold h-10 text-xs transition-all",
                    plan.highlight
                      ? "bg-[#95BF47] text-white hover:bg-[#86ac3f]"
                      : "bg-gray-900 text-white hover:bg-black font-bold"
                  )}
                >
                   {plan.name} Hizmeti Al
                </Button>
              </div>
            )
          })}
        </div>

        {/* Payment History Full Width */}
        <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#95BF47]" />
            Ödeme Geçmişi
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="pb-4 text-[10px] font-medium text-gray-400 tracking-wider">Hizmet / Paket</th>
                  <th className="pb-4 text-[10px] font-medium text-gray-400 tracking-wider">İşlem Tarihi</th>
                  <th className="pb-4 text-[10px] font-medium text-gray-400 tracking-wider">Miktar</th>
                  <th className="pb-4 text-[10px] font-medium text-gray-400 tracking-wider">Durum</th>
                  <th className="pb-4 text-[10px] font-medium text-gray-400 tracking-wider text-right">Fatura</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: "Profesyonel Paket Kurulumu", date: "15 Nisan 2024", amount: "₺9.999", status: "Tamamlandı" },
                  { name: "Ek Güvenlik Modülü", date: "02 Nisan 2024", amount: "₺1.250", status: "Tamamlandı" },
                  { name: "MID Entegrasyon Desteği", date: "24 Mart 2024", amount: "₺3.500", status: "Tamamlandı" },
                ].map((invoice, i) => (
                  <tr key={i} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#95BF47]/10 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-[#95BF47]" />
                        </div>
                        <span className="text-[11px] font-bold text-gray-900">{invoice.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-[11px] text-gray-500 font-medium">{invoice.date}</td>
                    <td className="py-4 text-[11px] font-bold text-gray-900">{invoice.amount}</td>
                    <td className="py-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#95BF47]/10 text-[#95BF47] text-[9px] font-bold">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" className="h-8 px-3 text-[10px] font-medium text-gray-400 hover:text-[#95BF47] group-hover:bg-white">
                        <Receipt className="w-3.5 h-3.5 mr-1" />
                        PDF İndir
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
