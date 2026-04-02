"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Onboarding", href: "#onboarding" },
    { name: "Calculator", href: "#calculator" },
    { name: "FAQs", href: "#faqs" },
    { name: "Blog", href: "#blog" },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 px-4 transition-all duration-300 pointer-events-none">
      <header
        className={cn(
          "flex items-center justify-between transition-all duration-500 ease-in-out pointer-events-auto",
          isScrolled
            ? "w-full max-w-[1100px] bg-white/30 backdrop-blur-md rounded-full border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-4 py-3 mt-2"
            : "w-full max-w-7xl bg-transparent px-6 py-6"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <Image 
            src="/logo.png" 
            alt="shopfio logo" 
            width={160} 
            height={60}
            className={cn(
                "w-auto transition-all duration-500",
                isScrolled ? "h-8" : "h-9"
            )}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="/demo"
          className={cn(
            "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
            isScrolled 
              ? "bg-[#1C1C1C] text-white hover:bg-[#333333] shadow-lg shadow-black/10"
              : "bg-[#1C1C1C] text-white hover:bg-[#333333]"
          )}
        >
          Request a Demo
          <ChevronRight className="w-4 h-4" />
        </Link>
      </header>
    </div>
  )
}
