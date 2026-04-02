"use client"

import Image from "next/image"
import { Rocket, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { FeatureCard } from "./feature-card"

export function Features() {
  const subscribers = [
    { name: "Shopify", amount: "$39.99", time: "1m ago" },
    { name: "Shopify", amount: "$39.99", time: "1m ago" },
    { name: "Shopify", amount: "$39.99", time: "1m ago" },
  ]

  const chartData = [
    { label: "JAN", height: "35%", val: "$106K" },
    { label: "FEB", height: "30%", val: "$230K" },
    { label: "MAR", height: "45%", val: "$320K" },
    { label: "APR", height: "55%", val: "$390K" },
    { label: "MAY", height: "70%", val: "$450K" },
    { label: "JUN", height: "100%", val: "$720K", highlight: true },
  ]

  return (
    <section className="relative w-full py-24 mb-12 bg-[#F9F9FB] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Header Area - Hero Badge Style */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="mb-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md hover:scale-[1.02] duration-300 cursor-default">
            <div className="flex items-center justify-center bg-[#95bf47]/10 w-8 h-8 rounded-lg overflow-hidden p-1.5">
              <Image src="/shopify.png" alt="Shopify" width={20} height={20} className="object-contain" />
            </div>
            <span className="text-sm font-bold tracking-tight text-gray-700">Built For Shopify</span>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="max-w-[850px] text-[32px] md:text-[52px] font-bold tracking-tight text-black leading-[1.1] mb-2 text-center">
              Transform Your eCom Store Into a
            </h2>
            <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
                <span className="text-[32px] md:text-[52px] font-bold tracking-tight text-black">Subscription</span>
                <div className="relative w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-[#95BF47] to-[#5BB13C] rounded-2xl shadow-[0_12px_24px_rgba(149,191,71,0.25)] flex items-center justify-center rotate-[-12deg]">
                    <Rocket className="w-5 h-5 md:w-7 md:h-7 text-white fill-white/20" />
                </div>
                <span className="text-[32px] md:text-[52px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#95BF47] to-[#5BB13C]">Powerhouse</span>
            </div>
          </div>
          <p className="max-w-[540px] text-base md:text-lg text-gray-500 font-medium leading-[1.6] mt-10 text-center">
            Stop patching apps together, Shopfio handles subscriptions, payments, and growth in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Subscriptions */}
          <FeatureCard 
            title="Create & Manage Subscriptions" 
            description="Turn one-time buyers into subscribers without lifting a finger. We don't just, 'manage subscriptions' we build you a growth engine."
          >
             <div className="relative mt-auto mb-2 flex flex-col items-center w-full gap-3">
                {subscribers.map((item, i) => (
                    <div key={i} className={cn(
                        "w-full flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.03)] transition-all duration-700 group-hover:-translate-y-2",
                        i === 1 ? "opacity-70 scale-[0.97]" : i === 2 ? "opacity-40 scale-[0.94]" : ""
                    )}>
                        <div className="w-10 h-10 bg-[#F3FDF5] rounded-full flex items-center justify-center shrink-0 border border-green-100">
                           <Image src="/shopify.png" alt="Shopify" width={22} height={22} className="object-contain" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-0.5">
                                <span className="font-bold text-black text-[14px]">Shopify</span>
                                <span className="text-[9px] font-bold text-gray-300 uppercase">{item.time}</span>
                            </div>
                            <p className="text-[12px] font-semibold text-gray-400 tracking-tight">New Subscriber - {item.amount}</p>
                        </div>
                    </div>
                ))}
             </div>
          </FeatureCard>

          {/* Card 2: Checkouts */}
          <FeatureCard 
            title="Custom Checkouts & Upsells" 
            description="Convert more visitors with smart checkouts, built-in upsells, and flexible payments."
          >
             <div className="relative mt-auto flex flex-col bg-[#F9FAFB] rounded-t-[24px] p-7 border-t border-x border-gray-100/50 -mb-10 group-hover:-translate-y-6 transition-transform duration-700 ease-out h-[320px]">
                <div className="flex items-center justify-between mb-6 opacity-40">
                    <div className="flex items-center gap-1.5">
                         <div className="w-3.5 h-3.5 border-2 border-black rounded-[3px]" />
                         <span className="text-[9px] font-bold text-black uppercase tracking-widest">Your cart</span>
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">1 Items</span>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-white mb-5">
                    <div className="flex gap-4 mb-4">
                        <div className="w-20 h-20 bg-[#F3F4F6] rounded-2xl overflow-hidden relative shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full border-[3px] border-white/60" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <p className="text-[10px] font-bold text-gray-300 mb-0.5">Add One More Item For</p>
                            <p className="text-[14px] font-black text-[#95BF47] uppercase tracking-tight">Free Shipping!</p>
                        </div>
                    </div>
                    <button className="w-full bg-[#1C1C1C] text-white text-[10px] font-bold py-3.5 rounded-xl hover:bg-black transition-all">
                        Add To Cart
                    </button>
                </div>
                <div className="space-y-3 opacity-5">
                    <div className="h-2 w-full bg-gray-400 rounded-full" />
                    <div className="h-2 w-2/3 bg-gray-400 rounded-full" />
                </div>
             </div>
          </FeatureCard>

          {/* Card 3: Analytics */}
          <FeatureCard 
            title="Analyze Revenue & Projections" 
            description="See real-time revenue insights and forecasts to make smarter business decisions that help you scale faster."
          >
             <div className="relative mt-8 flex flex-col group-hover:-translate-y-6 transition-transform duration-700 ease-out">
                <div className="mb-0 px-1">
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-2 leading-tight">Revenue Forecasts - 2024</p>
                    <div className="flex items-end gap-2.5 flex-wrap mb-10">
                        <span className="text-4xl font-black text-black tracking-tighter leading-none">$2,445,890</span>
                        <div className="flex items-center gap-1 text-[#95BF47] text-[10px] font-bold pb-1 translate-y-[-1px]">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>+35%</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-end justify-between gap-1.5 h-36 relative border-b border-gray-100 pb-5 px-1">
                   <div className="absolute top-[-10px] right-2 px-2.5 py-1.5 rounded-xl bg-[#20B2FF] text-white text-[9px] font-black shadow-[0_8px_30px_rgba(32,178,255,0.3)] z-20 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                      $720K
                   </div>
                   {chartData.map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                        <div className="w-full relative px-1 mb-3 flex flex-col items-center">
                            <span className="text-[8px] font-bold text-black mb-2 opacity-60">{bar.val}</span>
                            <div 
                                className={cn(
                                    "w-full rounded-lg transition-all duration-300 relative overflow-hidden",
                                    bar.highlight 
                                        ? "bg-[#95BF47]/10 border-2 border-[#95BF47]/30 shadow-[0_0_15px_rgba(149,191,71,0.2)]" 
                                        : "bg-white border border-gray-100"
                                )}
                                style={{ height: bar.height }}
                            >
                                <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,#000_4px,#000_5px)]" />
                            </div>
                        </div>
                        <span className="text-[9px] font-bold text-gray-300 tracking-tighter">{bar.label}</span>
                    </div>
                   ))}
                </div>
             </div>
          </FeatureCard>

        </div>
      </div>
    </section>
  )
}
