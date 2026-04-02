"use client"

import Image from "next/image"
import Link from "next/link"
import { MessageCircle, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
      { name: "Features", href: "#features" },
      { name: "Onboarding", href: "#onboarding" },
      { name: "Calculator", href: "#calculator" },
      { name: "Pricing", href: "#pricing" },
      { name: "Privacy Policy", href: "/privacy" },
  ]

  return (
    <footer className="w-full pt-24 pb-10 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 flex flex-col items-center text-center relative z-10">
        
        {/* Central Focal Point: Shopify Partner Badge */}
        <div className="mb-10 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all hover:shadow-md hover:scale-[1.02] duration-300 cursor-default">
            <div className="flex items-center justify-center bg-[#95bf47]/10 w-8 h-8 rounded-lg overflow-hidden p-1.5">
                <Image src="/shopify.png" alt="Shopify" width={20} height={20} className="object-contain" />
            </div>
            <span className="text-sm font-bold tracking-tight text-gray-700">Official Shopify Partner</span>
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
                    className="text-[14px] font-bold text-gray-500 hover:text-black transition-colors"
                >
                    {link.name}
                </Link>
            ))}
        </nav>

        {/* Contact CTA */}
        <div className="flex flex-col items-center gap-4 mb-24">
            <a 
                href="https://wa.me/your-number" 
                target="_blank" 
                className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-[14px] shadow-lg shadow-green-500/10 transition-all hover:scale-105 active:scale-95"
            >
                <MessageCircle className="w-5 h-5 fill-white/10" />
                WhatsApp Support
            </a>
            <p className="text-[12px] text-gray-400 tracking-widest mt-2">Available 24/7</p>
        </div>

        {/* Bottom Bar - Positioned over background logo */}
        <div className="w-full pt-10 border-t border-gray-100/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[13px] font-bold text-gray-600">
                © {currentYear} Shopfio Inc. Build with precision.
            </p>
            
            <div className="flex items-center gap-8 text-[13px] font-bold text-gray-600">
                <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
                <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
                <Link href="/refund" className="hover:text-black transition-colors">Cookies Policy</Link>
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
