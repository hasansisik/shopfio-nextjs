"use client"

import Image from "next/image"
import { Check, X, ShoppingBag, CreditCard, RefreshCw, Share2, Globe, Sparkles, ShieldCheck, Headphones, Zap, TrendingUp, Maximize, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
    { name: "Başlangıç", price: "4.999", description: "Yolculuğuna yeni başlayan satıcılar için mükemmel." },
    { name: "Profesyonel", price: "9.999", description: "Düzenli cirosu olan büyüyen işletmeler için en iyisi.", highlight: true },
    { name: "Full Paket", price: "13.999", description: "Kurumsal ölçeklendirme için ihtiyacınız olan her şey." },
]

const comparisonFeatures = [
    { name: "Özelleştirilebilir Ödeme Sayfası", icon: ShoppingBag, small: true, medium: true, full: true },
    { name: "Otomatik VIP Portalları", icon: CreditCard, small: true, medium: true, full: true },
    { name: "Chargeback (İtiraz) Yönetimi", icon: RefreshCw, small: false, medium: true, full: true },
    { name: "MID Yönetimi ve Yönlendirme", icon: Share2, small: false, medium: true, full: true },
    { name: "Çoklu Para Birimi Desteği", icon: Globe, small: true, medium: true, full: true },
    { name: "Akıllı Kayıp Kurtarma AI", icon: Sparkles, small: false, medium: true, full: true },
    { name: "Dolandırıcılık Önleme", icon: ShieldCheck, small: false, medium: true, full: true },
    { name: "7/24 Özel Teknik Destek", icon: Headphones, small: false, medium: false, full: true },
    { name: "24 Saatte Satışa Başlayın", icon: Zap, small: false, medium: false, full: true },
    { name: "Yüksek Ödeme Onay Oranları", icon: TrendingUp, small: false, medium: true, full: true },
    { name: "Ölçeklenebilir Mimari", icon: Maximize, small: false, medium: true, full: true },
]

export function Pricing() {
    return (
        <section id="pricing" className="relative w-full pt-10 pb-20 overflow-hidden">
            <div className="max-w-[1140px] mx-auto px-6">

                {/* Header Area */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-center bg-[#95bf47]/10 w-6 h-6 rounded-md p-1">
                            <Image src="/shopify.png" alt="Shopify" width={16} height={16} className="object-contain" />
                        </div>
                        <span className="text-[12px] font-bold tracking-tight text-gray-600">Shopify İçin Tasarlandı</span>
                    </div>

                    <h2 className="max-w-[800px] text-[32px] sm:text-[42px] font-bold tracking-tight text-black leading-tight mb-4">
                        Abonelik Başarınız İçin En İyi <br />
                        Planı <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#95BF47] to-[#5BB13C]">Seçin</span>
                    </h2>
                    <p className="max-w-[480px] text-base text-gray-500 font-medium leading-relaxed">
                        Shopfio ile ölçeklendirmeye bugün başlayın. İhtiyaçlarınıza en uygun paketi seçin.
                    </p>
                </div>

                {/* Mobile/Tablet View - Interactive Cards */}
                <div className="lg:hidden flex flex-col gap-8">
                    {plans.map((plan, i) => (
                        <div key={i} className={cn(
                            "relative flex flex-col p-8 rounded-[32px] border transition-all duration-500",
                            plan.highlight 
                                ? "bg-white border-[#95BF47] shadow-[0_20px_50px_rgba(149,191,71,0.15)] ring-1 ring-[#95BF47]/20" 
                                : "bg-white border-gray-100 shadow-sm"
                        )}>
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#95BF47] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                    En Popüler
                                </div>
                            )}
                            
                            <div className="mb-8 text-center sm:text-left">
                                <h3 className={cn("text-xl font-bold mb-2", plan.highlight ? "text-[#95BF47]" : "text-gray-900")}>
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline justify-center sm:justify-start gap-1 mb-4">
                                    <span className="text-3xl font-bold">₺{plan.price}</span>
                                    <span className="text-gray-400 text-sm">/aylık</span>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="space-y-4 mb-10">
                                {comparisonFeatures.map((feature, idx) => {
                                    const isAvailable = i === 0 ? feature.small : i === 1 ? feature.medium : feature.full;
                                    if (!isAvailable && i === 0) return null; // Only show included features for basic on mobile for clarity
                                    
                                    return (
                                        <div key={idx} className={cn(
                                            "flex items-center gap-3",
                                            !isAvailable && "opacity-30"
                                        )}>
                                            <div className={cn(
                                                "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                                                isAvailable ? "bg-[#95BF47]/10 text-[#95BF47]" : "bg-gray-100 text-gray-400"
                                            )}>
                                                {isAvailable ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3" />}
                                            </div>
                                            <span className="text-[14px] font-medium text-gray-600">{feature.name}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <button className={cn(
                                "w-full py-4 rounded-2xl font-bold transition-all active:scale-95",
                                plan.highlight 
                                    ? "bg-[#95BF47] text-white shadow-lg shadow-green-500/20" 
                                    : "bg-gray-900 text-white hover:bg-black"
                            )}>
                                {plan.name} Paketi Seç
                            </button>
                        </div>
                    ))}
                </div>

                {/* Desktop View - Comparison Matrix */}
                <div className="hidden lg:block relative bg-white rounded-[32px] border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)] overflow-hidden">
                    <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-stretch border-b border-gray-100">
                        <div className="p-8 border-r border-gray-50 flex items-center justify-center">
                        </div>
                        {plans.map((plan, i) => (
                            <div key={i} className={cn(
                                "p-8 flex flex-col items-center justify-center gap-2 border-r border-gray-50 last:border-r-0 relative",
                                plan.highlight ? "bg-[#95BF47]/5" : "bg-white"
                            )}>
                                <span className={cn(
                                    "text-[16px] font-bold capitalize",
                                    plan.highlight ? "text-[#95BF47]" : "text-gray-900"
                                )}>{plan.name}</span>
                                <span className="text-[24px] font-bold text-gray-900 tracking-tight">₺ {plan.price}</span>
                                <p className="text-[11px] text-gray-400 font-medium text-center max-w-[140px] leading-tight">
                                    {plan.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {comparisonFeatures.map((feature, i) => (
                        <div key={i} className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-stretch text-center border-b border-gray-100 last:border-0 hover:bg-gray-50/20 transition-colors">
                            <div className="p-5 border-r border-gray-50 flex items-center justify-start px-10 gap-4">
                                <div className="p-2.5 rounded-xl bg-[#95BF47]/10 flex-shrink-0">
                                    <feature.icon className="w-4 h-4 text-[#95BF47]" />
                                </div>
                                <span className="text-[13px] font-bold text-gray-600 transition-colors group-hover:text-black whitespace-nowrap">{feature.name}</span>
                            </div>

                            {/* Values Mapping */}
                            {[feature.small, feature.medium, feature.full].map((active, idx) => (
                                <div key={idx} className={cn(
                                    "p-6 flex items-center justify-center border-r border-gray-50 last:border-r-0",
                                    idx === 1 ? "bg-[#95BF47]/5" : "bg-white"
                                )}>
                                    {active ? (
                                        <div className="w-7 h-7 rounded-full bg-[#95BF47]/10 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-[#95BF47] stroke-[3]" />
                                        </div>
                                    ) : (
                                        <X className="w-5 h-5 text-gray-200" />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
