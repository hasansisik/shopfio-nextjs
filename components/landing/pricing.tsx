"use client"

import Image from "next/image"
import { Check, X, ShoppingBag, CreditCard, RefreshCw, Share2, Globe, Sparkles, ShieldCheck, Headphones, Zap, TrendingUp, Maximize, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
    { name: "Small", price: "4.999", description: "Perfect for new merchants starting their journey." },
    { name: "Medium", price: "9.999", description: "Best for growing businesses with steady volume.", highlight: true },
    { name: "Full Paket", price: "13.999", description: "Everything you need for enterprise scaling." },
]

const comparisonFeatures = [
    { name: "Customizable Checkout", icon: ShoppingBag, small: true, medium: true, full: true },
    { name: "Auto Generate VIP Portals", icon: CreditCard, small: true, medium: true, full: true },
    { name: "Chargeback Mitigation", icon: RefreshCw, small: false, medium: true, full: true },
    { name: "MID Management & Routing", icon: Share2, small: false, medium: true, full: true },
    { name: "Multi-Currency Support", icon: Globe, small: true, medium: true, full: true },
    { name: "Smart Salvage AI", icon: Sparkles, small: false, medium: true, full: true },
    { name: "Fraud Prevention", icon: ShieldCheck, small: false, medium: true, full: true },
    { name: "24/7 Dedicated Support", icon: Headphones, small: false, medium: false, full: true },
    { name: "Start Selling Within 24h", icon: Zap, small: false, medium: false, full: true },
    { name: "Unmatched Approval Rates", icon: TrendingUp, small: false, medium: true, full: true },
    { name: "Engineered For Scale", icon: Maximize, small: false, medium: true, full: true },
]

export function Pricing() {
    return (
        <section className="relative w-full pt-0 pb-20  overflow-hidden">
            <div className="max-w-[1100px] mx-auto px-6">

                {/* Header Area - Balanced & Refined */}
                <div className="flex flex-col items-center text-center mb-12">
                    <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-center bg-[#95bf47]/10 w-6 h-6 rounded-md p-1">
                            <Image src="/shopify.png" alt="Shopify" width={16} height={16} className="object-contain" />
                        </div>
                        <span className="text-[12px] font-bold tracking-tight text-gray-600">Built For Shopify</span>
                    </div>

                    <h2 className="max-w-[700px] text-[28px] md:text-[42px] font-bold tracking-tight text-black leading-tight mb-4">
                        Choose the Best Plan for Your <br />
                        Subscription <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#95BF47] to-[#5BB13C]">Success</span>
                    </h2>
                    <p className="max-w-[480px] text-sm md:text-base text-gray-500 font-medium leading-relaxed">
                        Stop patching apps together, Shopfio handles subscriptions, payments, and growth in one place.
                    </p>
                </div>

                {/* Unified Feature Matrix - No more separate cards, everything in the table headers */}
                <div className="relative bg-white rounded-[32px] border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)] overflow-hidden">
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
