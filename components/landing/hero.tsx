"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingCart, User } from "lucide-react"
import { HeroAnimation } from "./hero-animation"


import heroData from "@/constants/hero-data.json"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Hero() {
  const [index, setIndex] = useState(0)
  const rotatingWords = heroData.rotatingWords

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [rotatingWords.length])

  return (
    <section className="relative w-full pt-32 pb-12 overflow-hidden flex flex-col items-center text-center ">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#95BF47]/10 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[oklch(0.985_0.01_145)] to-transparent"></div>
      </div>

      {/* Enhanced Trust Badge */}
      <div className="mb-12 inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all hover:scale-[1.02] duration-300">
        <div className="flex items-center gap-2 pr-4 border-r border-gray-100">
          <div className="flex items-center justify-center bg-[#95BF47]/10 w-5 h-5 rounded-md p-1">
            <Image src="/shopify.png" alt="Shopify" width={14} height={14} className="object-contain" />
          </div>
          <div className="w-4 h-4 bg-[#7AB55C] rounded-sm flex items-center justify-center p-0.5">
            <span className="text-[8px] font-bold text-white">S</span>
          </div>
          <div className="w-4 h-4 bg-[#00B67A] rounded-sm flex items-center justify-center p-0.5">
            <span className="text-[8px] font-bold text-white">★</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-yellow-400 text-sm">★</span>
            ))}
          </div>
          <span className="text-[12px] font-medium text-gray-500 whitespace-nowrap pt-0.5">
            500+ Mağaza Üzerinden <span className="text-gray-900">5 / 5 Puan</span>
          </span>
        </div>
      </div>

      {/* Heading - Aligned with Shopfio Project */}
      <h1 className="max-w-5xl font-bold tracking-tight text-black mb-10 leading-[1.1] md:leading-[1] px-4 flex flex-col items-center">

        <div className="text-[32px] sm:text-[56px] md:text-[52px] flex flex-wrap justify-center items-center gap-x-4">
          <span className="relative inline-grid grid-cols-1 grid-rows-1 justify-items-center h-[1.1em] overflow-hidden align-top italic   tracking-tighter">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={index}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="col-start-1 row-start-1 bg-clip-text text-transparent bg-gradient-to-r from-[#95BF47] to-[#5BB13C] whitespace-nowrap px-2 tracking-tighter"
              >
                {rotatingWords[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
        <div className="text-[36px] sm:text-[56px] md:text-[64px] flex flex-wrap justify-center items-center gap-x-1 ">
          <span className="text-black  ">Hemen</span>
          <Image
            src="/hero/shopify-payments1.png"
            alt="Shopify Payments"
            width={400}
            height={100}
            className="h-12 sm:h-14 md:h-28 w-auto object-contain translate-y-1"
          />
        </div>
        <div className="text-[28px] sm:text-[40px] md:text-[52px] font-bold flex flex-wrap justify-center items-center gap-x-3">
          <span className="text-black font-light">ile </span>
          <span className="text-black "> anında</span>

          <span className="text-black font-light">Ödemeyi Kabul et</span>
        </div>
      </h1>

      {/* Subheading - Aligned with Shopfio Project */}
      <div className="max-w-3xl flex flex-col items-center gap-4 mb-14 px-4 overflow-hidden">
        <p className="text-lg md:text-xl text-gray-400 italic leading-relaxed text-center">
          Siz sadece ürünlerinize odaklanın, Şirket kurulumuyla vakit kaybetmeyin <br className="hidden md:block" />
          Bireysel <span className="underline text-black">Shopify Payments</span> kurulumunuzu biz dakikalar içinde tamamlayalım.
        </p>
      </div>

      {/* Hero CTA & Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <Link
          href="https://wa.me/905323497255"
          target="_blank"
          className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full text-white font-bold text-lg transition-all active:scale-95 shadow-[0_15px_35px_rgba(149,191,71,0.3)] hover:shadow-[0_20px_40px_rgba(149,191,71,0.4)] duration-300 overflow-hidden shrink-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#95BF47] to-[#5BB13C] transition-opacity group-hover:opacity-90"></div>
          <span className="relative z-10 flex items-center gap-2 justify-center ">
            <Image
              src="/wp-icon.png"
              alt="Shopify Payments"
              width={200}
              height={50}
              className="h-8 w-auto object-contain "
            />
            Ücretsiz Ön Görüşme
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
        <Link
          href="/panel"
          className="group inline-flex items-center gap-3 px-10 py-4 rounded-full text-[#95BF47] border-2 border-[#95BF47]/20 font-bold text-lg transition-all hover:border-[#95BF47] hover:bg-[#95BF47]/5 active:scale-95 duration-300 shrink-0"
        >
          Hemen Başla
        </Link>
      </div>

      {/* Trust Banner - Now above the image */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-16 opacity-90 relative z-10 px-4">
        <div className="flex items-center gap-8">
          <Image
            src="/shopify-partners-logo.webp"
            alt="Shopify Partners"
            width={180}
            height={40}
            className="h-8 md:h-10 w-auto object-contain"
          />
          <Image
            src="/shopify-parnetr-icon.webp"
            alt="Shopify Commerce Coach"
            width={60}
            height={60}
            className="h-12 md:h-14 w-auto object-contain"
          />
        </div>

        <div className="hidden md:block w-px h-12 bg-gray-200" />

        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                <img
                  src={`https://i.pravatar.cc/100?u=shopfio-${i}`}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[14px] font-bold text-gray-900 leading-none">100'den Fazla Memnun Müşteri</span>
            <span className="text-[12px] font-medium text-gray-400">Shopify ekosisteminde güvenle büyüyün</span>
          </div>
        </div>
      </div>

      {/* Transparent Floating Hero Product Preview - Now below the trust banner */}
      <div className="relative w-full max-w-6xl mx-auto px-4 mb-24 group">
        <div className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden">
          <Image
            src="/hero.png"
            alt="Product Dashboard"
            fill
            className="object-top object-contain scale-[1.01] transform transition-transform duration-1000 group-hover:scale-[1.03]"
            priority
          />
          {/* Soft Gradient Overlay to blend the bottom edge naturally */}
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.985_0.01_145)] via-[oklch(0.985_0.01_145)]/20 to-transparent pt-[400px]" />
        </div>
      </div>

      {/* Hero Animation Section */}
    </section>
  )
}
