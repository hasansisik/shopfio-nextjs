"use client"

import Image from "next/image"
import Link from "next/link"
import { MessageCircle, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
      { name: "Özellikler", href: "#features" },
      { name: "Nasıl Çalışır?", href: "#onboarding" },
      { name: "Başarı Hikayeleri", href: "#case-studies" },
      { name: "Ücretlendirme", href: "#pricing" },
      { name: "SSS", href: "#faq" },
      { name: "Gizlilik Politikası", href: "/privacy" },
  ]

  return (
    <footer className="w-full pt-24 pb-10 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 flex flex-col items-center text-center relative z-10">
        
        {/* Central Focal Point: Shopify Partner Badge */}
        <div className="mb-10 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all hover:shadow-md hover:scale-[1.02] duration-300 cursor-default">
            <div className="flex items-center justify-center bg-[#95bf47]/10 w-8 h-8 rounded-lg overflow-hidden p-1.5">
                <Image src="/shopify.png" alt="Shopify" width={20} height={20} className="object-contain" />
            </div>
            <span className="text-sm font-bold tracking-tight text-gray-700">Resmi Shopify Partneri</span>
        </div>

        {/* Central Logo */}
        <Link href="/" className="mb-10 opacity-90 hover:opacity-100 transition-opacity">
          <Image 
            src="/logo.png" 
            alt="shopfio logo" 
            width={160} 
            height={60}
            className="h-10 w-auto object-contain"
          />
        </Link>
        
        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 mb-16 px-4">
            {links.map((link) => (
                <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-[14px] font-medium text-gray-500 hover:text-black transition-colors"
                >
                    {link.name}
                </Link>
            ))}
        </nav>

        {/* Contact CTA */}
        <div className="flex flex-col items-center gap-4 mb-16">
            <a 
                href="https://wa.me/08502551389" 
                target="_blank" 
                className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-[14px] shadow-lg shadow-green-500/10 transition-all hover:scale-105 active:scale-95"
            >
                <MessageCircle className="w-5 h-5 fill-white/10" />
                WhatsApp Destek Hattı
            </a>
            <p className="text-[12px] text-gray-400 tracking-widest mt-2 font-bold">7/24 Aktif</p>
        </div>

        {/* Payment Methods / Infrastructure */}
        <div className="mb-12 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500">
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400">Güvenli Ödeme Altyapısı</span>
            <Image 
                src="/logo_band_colored@2x.png" 
                alt="Iyzico Payment Infrastructure" 
                width={300} 
                height={40} 
                className="h-8 w-auto object-contain"
            />
        </div>

        {/* Address Bar */}
        <div className="w-full mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-2">
          {[
            {
              country: "Türkiye",
              address: "Mimarsinan Mah. Ceren Sok. No:6",
              city: "Çekmeköy / İstanbul",
              phone: "0850 255 13 89",
            },
            {
              country: "United States",
              address: "350 Fifth Avenue, Suite 4100",
              city: "New York, NY 10118",
              phone: "0850 255 13 89",
            },
          ].map((office) => (
            <div
              key={office.country}
              className="flex items-start gap-4 p-6 rounded-3xl  text-left  transition-all"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#95BF47]/10 flex items-center justify-center shrink-0 text-lg">
                📍
              </div>
              <div>
                <p className="text-[10px] font-black text-[#95BF47] uppercase tracking-widest mb-1">{office.country}</p>
                <p className="text-sm font-bold text-gray-900 leading-snug">{office.address}</p>
                <p className="text-sm font-bold text-gray-900 leading-snug">{office.city}</p>
                <p className="text-[12px] font-medium text-gray-400 mt-2">{office.phone}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="w-full pt-10 border-t border-gray-100/50 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Copyright */}
            <p className="text-[13px] font-medium text-gray-500 md:w-1/3 md:text-left">
                © {currentYear} Shopfio Inc.
            </p>

            {/* Gegify Attribution - Center aligned White Badge */}
            <div className="flex items-center justify-center md:w-1/3">
                <Link 
                    href="https://gegify.com" 
                    target="_blank" 
                    className="group flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-black/10 shadow-sm transition-all hover:shadow-md hover:scale-[1.02] active:scale-95 select-none"
                >
                    <Image 
                        src="https://gegify.com/assets/images/logo-black.png" 
                        alt="Gegify" 
                        width={120} 
                        height={36} 
                        className="h-7 w-auto object-contain grayscale opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="h-3 w-[1px] bg-black/10 mx-0.5" />
                    <span className="text-[11px] font-medium text-gray-400 group-hover:text-gray-600 transition-colors whitespace-nowrap pt-0.5">
                        Bir Gegify Sitesidir
                    </span>
                </Link>
            </div>
            
            {/* Legal Links - Right aligned */}
            <div className="flex items-center md:justify-end gap-6 text-[13px] font-medium text-gray-500 md:w-1/3">
                <Link href="/terms" className="hover:text-black transition-colors">Kullanım Şartları</Link>
                <Link href="/privacy" className="hover:text-black transition-colors">Gizlilik Politikası</Link>
                <Link href="/refund" className="hover:text-black transition-colors">Çerez Politikası</Link>
            </div>
        </div>
      </div>

      {/* Massive Background Watermark Logo - Exactly as per reference */}
      <div className="absolute bottom-[-100px] left-1/2 translate-x-[-50%] w-full max-w-[1400px] pointer-events-none opacity-[0.03] select-none">
          <Image 
            src="/logo.png" 
            alt="watermark logo" 
            width={1400} 
            height={600}
            className="w-full h-auto grayscale filter blur-[1px]"
          />
      </div>
    </footer>
  )
}
