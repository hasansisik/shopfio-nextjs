"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function CTASection() {
  return (
    <section id="cta" className="relative w-full py-24 px-6 overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        <div className="relative w-full bg-gradient-to-br from-[#95BF47] to-[#3D7A2F] rounded-[40px] p-8 md:p-16 lg:p-24 overflow-hidden shadow-[0_40px_80px_rgba(149,191,71,0.2)] border border-white/10">
            
            {/* Design elements */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[60%] h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-40" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left: Content */}
                <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <h2 className="text-[32px] md:text-[52px] font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                        Shopify Mağazanızı <br />
                        <span className="text-[#D9F99D]">Büyütmeye Hazır Mısınız?</span>
                    </h2>
                    
                    <p className="max-w-[480px] text-base md:text-lg text-white/95 font-medium leading-relaxed mb-10">
                        Uygulamaları tek tek yamalamayı bırakın. Shopfio kullanarak müşteri tutma oranlarını %40 artıran 500'den fazla başarılı Shopify iş ortağına katılın.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <button className="group relative flex items-center gap-3 bg-white text-[#3D7A2F] px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                            Hemen Teklif Alın
                            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                        </button>
                        
                        <div className="flex flex-col items-start">
                           <p className="text-white font-bold text-[13px] tracking-wide">
                               Ücretsiz ön görüşme randevusu!
                           </p>
                           <div className="flex items-center gap-1 mt-1">
                                {[1,2,3,4,5].map(s => <div key={s} className="w-3 h-3 bg-white/30 rounded-full animate-pulse" />)}
                           </div>
                        </div>
                    </div>
                </div>

                {/* Right: Visual Success Card (Desktop Only) */}
                <div className="hidden lg:flex lg:col-span-5 h-[320px] items-center justify-center relative">
                    <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] shadow-2xl p-8 rotate-[2deg] hover:rotate-0 transition-transform duration-700 overflow-hidden group">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center p-2.5">
                                <Image src="/shopify.png" alt="Shopify" width={32} height={32} />
                            </div>
                            <div className="px-3 py-1 bg-[#95BF47] text-white text-[11px] font-bold rounded-full">CANLI BÜYÜME</div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-[85%] bg-white rounded-full" />
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <p className="text-white/50 text-[12px] font-bold uppercase tracking-wider">Toplam Gelir</p>
                                    <p className="text-white text-3xl font-black">124.500₺</p>
                                </div>
                                <div className="w-16 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">+42%</span>
                                </div>
                            </div>
                        </div>
                        {/* Decorative graph lines */}
                        <div className="absolute bottom-0 left-0 w-full h-[100px] opacity-20 pointer-events-none">
                            <svg viewBox="0 0 400 100" className="w-full h-full stroke-white fill-transparent stroke-2">
                                <path d="M0,80 Q50,70 100,85 T200,60 T300,75 T400,40" strokeDasharray="5,5" />
                            </svg>
                        </div>
                    </div>
                    {/* Floating accents */}
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#95BF47] rounded-3xl blur-3xl opacity-50" />
                    <div className="absolute top-0 -right-8 w-16 h-16 bg-white rounded-full blur-2xl opacity-20" />
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}
