"use client"

import Image from "next/image"
import { Rocket, TrendingUp, ShoppingCart } from "lucide-react"
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
    <section className="relative w-full pt-0 pb-12  overflow-hidden">
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
            <div className="relative mt-8 flex flex-col items-center w-full gap-3">
              {subscribers.map((item, i) => (
                <div key={i} className={cn(
                  "w-full flex items-center gap-3 bg-white/95 p-3.5 rounded-[22px] border border-gray-100/50 shadow-[0_12px_30px_rgba(0,0,0,0.03)] transition-all duration-500 hover:scale-[1.02]",
                  i === 1 ? "opacity-90 mt-[-5px]" : i === 2 ? "opacity-70 mt-[-5px]" : ""
                )}>
                  <div className="w-10 h-10 bg-[#F6F6F6] rounded-full flex items-center justify-center shrink-0">
                    <Image src="/shopify.png" alt="Shopify" width={22} height={22} className="object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-gray-900 text-[14px]">Shopify</span>
                      <span className="text-[9px] font-medium text-gray-400 capitalize">{item.time}</span>
                    </div>
                    <p className="text-[12px] font-medium text-gray-500 tracking-tight">New Subscriber - {item.amount}</p>
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
            <div className="relative mt-8 flex flex-col bg-[#F3F4F6] rounded-t-[20px] p-6  border-2 -mb-10 group-hover:-translate-y-4 transition-transform duration-700 ease-out h-[360px] overflow-hidden shadow-2xl">
              {/* Cart Top Bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-3.5 h-3.5 text-gray-900" />
                  <span className="text-[13px] font-medium text-gray-900">Your cart</span>
                </div>
                <span className="text-[10px] font-medium text-gray-400">1 items</span>
              </div>

              {/* Upsell Card - Exactly as per reference image */}
              <div className="bg-white p-4 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white mb-5">
                <div className="flex gap-4 mb-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden relative shrink-0">
                    <Image
                      src="/upsell-product.png"
                      alt="Product"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-0.5">
                    <p className="text-[11px] font-medium text-gray-600">Add One More Item For</p>
                    <p className="text-[14px] font-bold text-[#95BF47] tracking-tight">Free Shipping!</p>
                  </div>
                </div>
                <button className="w-full bg-[#1A1A1A] text-white text-[11px] font-bold py-3 rounded-[10px] hover:bg-black transition-all">
                  Add To Cart
                </button>
              </div>

              {/* Background Shadow Items with dashed borders */}
              <div className="space-y-4 opacity-10 pointer-events-none">
                <div className="flex gap-4 p-3 rounded-xl border border-dashed border-gray-400">
                  <div className="w-12 h-12 bg-gray-400 rounded-lg" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-2 w-full bg-gray-400 rounded-full" />
                    <div className="h-2 w-1/2 bg-gray-400 rounded-full" />
                  </div>
                </div>
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
                <p className="text-[11px] font-medium text-gray-400 mb-2 leading-tight">Revenue Forecasts - 2024</p>
                <div className="flex flex-col mb-10">
                  <span className="text-4xl font-bold text-black tracking-tighter leading-none mb-1">$2,445,890</span>
                  <div className="flex items-center gap-1 text-[#95BF47] text-[11px] font-bold">
                    <span>+35% from last year</span>
                  </div>
                </div>
              </div>

              {/* Chart Mockup with fixed height wrapper to allow percentage bars to work */}
              <div className="flex items-end justify-between gap-1.5 h-48 relative border-b border-gray-100 pb-8 px-1">
                {chartData.map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                    <div className="w-full relative px-0.5 flex flex-col items-center h-[140px] justify-end">
                      {/* Value Pill above bars */}
                      <div className={cn(
                        "px-2 py-1 rounded-md text-[9px] font-bold mb-2 shadow-sm whitespace-nowrap",
                        bar.highlight
                          ? "bg-[#95BF47] text-white"
                          : "bg-[#222] text-gray-200"
                      )}>
                        {bar.val}
                      </div>

                      <div
                        className={cn(
                          "w-full rounded-md transition-all duration-700 relative overflow-hidden",
                          bar.highlight
                            ? "bg-white border-2 border-[#95BF47]/30"
                            : "bg-white border border-gray-100"
                        )}
                        style={{ height: bar.height }}
                      >
                        {/* Diagonal hatching pattern */}
                        <div className="absolute inset-0 opacity-[0.08] bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#000_5px,#000_6px)]" />
                        {bar.highlight && <div className="absolute inset-0 bg-gradient-to-t from-[#95BF47]/5 to-transparent shadow-[inset_0_0_20px_rgba(149,191,71,0.05)]" />}
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-gray-400 tracking-tighter mt-4">{bar.label}</span>
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
