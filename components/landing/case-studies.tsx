"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, FileText, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const caseStudies = [
  {
    name: "Mohammed Z.",
    role: "8 Haneli Marka Sahibi",
    thumbnail: "/mohammed_thumb.png",
    quote: "Shopfio ödeme sayfası, gelirimizi beklentilerimizin çok ötesine taşıdı.",
    emoji: "📈",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    name: "Saamir M.",
    role: "8 Haneli Marka Sahibi & Youtuber",
    thumbnail: "/saamir_thumb.png",
    quote: "Shopfio ekibi sayesinde artık çok daha fazla kazanıyoruz.",
    emoji: "💵",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    name: "Lauren S.",
    role: "7 Haneli Marka Sahibi",
    thumbnail: "/lauren_thumb.png",
    quote: "Shopfio her şeyi düzenli, optimize edilmiş ve sonuç odaklı tutuyor.",
    emoji: "⚡",
    youtubeId: "dQw4w9WgXcQ"
  }
]

export function CaseStudies() {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null)

  return (
    <section id="case-studies" className="relative w-full py-24 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="mb-8 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md hover:scale-[1.02] duration-300 cursor-default">
            <div className="flex items-center justify-center bg-[#95bf47]/10 w-6 h-6 rounded-md p-1">
                <Image src="/shopify.png" alt="Shopify" width={16} height={16} className="object-contain" />
            </div>
            <span className="text-[12px] font-bold tracking-tight text-gray-600">Başarı Hikayeleri</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
              <h2 className="text-[32px] md:text-[52px] font-bold tracking-tight text-black leading-[1.1]">
                Gerçek
              </h2>
              <div className="relative w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-[#95BF47] to-[#5BB13C] rounded-2xl shadow-[0_12px_24px_rgba(149,191,71,0.2)] flex items-center justify-center rotate-[6deg]">
                 <FileText className="w-5 h-5 md:w-7 md:h-7 text-white fill-white/20" />
              </div>
              <h2 className="text-[32px] md:text-[52px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#95BF47] to-[#5BB13C]">
                Sonuçlar
              </h2>
            </div>
          </div>
          
          <p className="max-w-[600px] text-base md:text-lg text-gray-500 font-medium leading-[1.6] mt-8 text-center">
            8 haneli cirolara ulaşan markaların, Shopfio kullanarak büyümelerini nasıl hızlandırdıklarını ve müşteri sadakatini nasıl artırdıklarını keşfedin.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((study, i) => (
            <div key={i} className="flex flex-col group">
              {/* Card Container */}
              <div 
                className="bg-white rounded-[24px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)]"
                onClick={() => setActiveVideoIndex(i)}
              >
                
                {/* Top Bar */}
                <div className="p-5 flex items-center justify-between border-b border-gray-50 bg-white">
                  <div className="flex flex-col">
                    <span className="text-[15px] font-extrabold text-gray-900 tracking-tight">{study.name}</span>
                    <span className="text-[11px] font-medium text-gray-400 tracking-wider ">{study.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src="/shopify-logo.avif" alt="Shopify" width={80} height={24} className="object-contain opacity-80" />
                  </div>
                </div>

                {/* Video Area */}
                <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden cursor-pointer">
                   {activeVideoIndex === i ? (
                     <iframe
                       src={`https://www.youtube.com/embed/${study.youtubeId}?autoplay=1`}
                       className="absolute inset-0 w-full h-full z-30"
                       allow="autoplay; encrypted-media"
                       allowFullScreen
                     />
                   ) : (
                     <>
                        <div className="absolute inset-0 z-0">
                           <Image 
                             src={study.thumbnail} 
                             alt={study.name} 
                             fill 
                             className="object-cover transition-transform duration-700 group-hover:scale-110"
                           />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60 transition-opacity group-hover:opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="w-16 h-12 bg-[#95BF47] rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(149,191,71,0.4)] transition-all group-hover:scale-110 group-hover:shadow-[0_15px_40px_rgba(149,191,71,0.5)] duration-500">
                                <Play className="w-5 h-5 text-white fill-white ml-1" />
                            </div>
                        </div>
                     </>
                   )}
                </div>
              </div>

              {/* Quote Area */}
              <div className="mt-5 px-1 text-center md:text-left">
                <span className="text-[15px] font-medium text-gray-800 leading-snug">
                  {study.emoji} "{study.quote}"
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Request Demo Button Area */}
        <div className="flex justify-center pt-8">
            <button className="group relative flex items-center gap-4 bg-gradient-to-r from-[#95BF47] to-[#5BB13C] text-white px-10 py-5 rounded-3xl font-bold text-lg shadow-[0_15px_35px_rgba(149,191,71,0.2)] hover:shadow-[0_20px_45px_rgba(149,191,71,0.3)] transition-all hover:scale-105 active:scale-95 duration-300">
                <span>Ücretsiz Ön Görüşme</span>
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-[#95BF47] transition-transform group-hover:translate-x-1">
                    <span className="text-xl leading-none">→</span>
                </div>
            </button>
        </div>
      </div>
    </section>
  )
}
