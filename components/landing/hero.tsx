"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingCart, User } from "lucide-react"
import { HeroAnimation } from "./hero-animation"


export function Hero() {
  return (
    <section className="relative w-full pt-48 pb-12 overflow-hidden flex flex-col items-center text-center ">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#95BF47]/10 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[#F4F9F1] to-transparent"></div>
      </div>

      {/* Built For Shopify Badge */}
      <div className="mb-10 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md hover:scale-[1.02] duration-300">
        <div className="flex items-center justify-center bg-[#95bf47]/10 w-8 h-8 rounded-lg overflow-hidden p-1.5">
          <Image src="/shopify.png" alt="Shopify" width={20} height={20} className="object-contain" />
        </div>
        <span className="text-sm font-bold tracking-tight text-gray-700">Built For Shopify</span>
      </div>

      {/* Heading */}
      <h1 className="max-w-5xl text-6xl md:text-8xl font-bold tracking-tighter text-black mb-8 leading-[1]">
        Turn Your Shoppers <br />
        <span className="flex items-center justify-center gap-4 flex-wrap mt-2">
          Into{" "}
          <span className="relative inline-flex items-center">
            <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-[#95BF47] rounded-2xl shadow-xl shadow-green-500/10 mr-4 transform rotate-[-2deg]">
              <div className="relative">
                <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-white rounded-full flex items-center justify-center overflow-hidden">
                   <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full mt-4"></div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full border-2 border-[#95BF47] flex items-center justify-center">
                   <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#95BF47] rounded-full"></div>
                </div>
              </div>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#95BF47] to-[#5BB13C]">
              Subscribers
            </span>
          </span>
        </span>
      </h1>

      {/* Subheading */}
      <p className="max-w-xl text-xl text-gray-500 font-medium mb-12 leading-relaxed px-4">
        From setup to scale: everything you need to grow <br className="hidden md:block" /> 
        subscriptions on autopilot.
      </p>

      {/* Hero CTA */}
      <Link
        href="/get-started"
        className="group relative inline-flex items-center gap-3 px-10 py-4.5 rounded-full text-white font-bold text-lg transition-all active:scale-95 shadow-[0_15px_35px_rgba(149,191,71,0.3)] hover:shadow-[0_20px_40px_rgba(149,191,71,0.4)] duration-300 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#95BF47] to-[#5BB13C] transition-opacity group-hover:opacity-90"></div>
        <span className="relative z-10 flex items-center gap-2">
          Request a Demo
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>

      {/* Hero Animation Section */}
      <HeroAnimation />
    </section>
  )
}
