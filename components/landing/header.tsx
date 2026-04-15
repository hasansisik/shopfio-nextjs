"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useAppSelector } from "@/redux/hook"

export function Header() {
  const { user, isAuthenticated } = useAppSelector((state) => state.user)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Özellikler", href: "#features" },
    { name: "Nasıl Çalışır?", href: "#onboarding" },
    { name: "Başarı Hikayeleri", href: "#case-studies" },
    { name: "Ücretlendirme", href: "#pricing" },
    { name: "SSS", href: "#faq" },
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
        {/* Logo Group */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-1 group">
            <Image 
              src="/logo.png" 
              alt="shopfio logo" 
              width={250} 
              height={100}
              className={cn(
                  "w-auto transition-all duration-500",
                  isScrolled ? "h-14" : "h-16"
              )}
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
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

        {/* Global CTA & Mobile Toggle */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link
            href={isAuthenticated ? "/panel" : "/giris"}
            className={cn(
              "hidden sm:flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",
              isScrolled 
                ? "bg-[#95BF47] text-white hover:bg-[#5BB13C] shadow-lg shadow-[#95BF47]/20"
                : "bg-[#95BF47] text-white hover:bg-[#5BB13C]"
            )}
          >
            {isAuthenticated ? "Panel" : "Giriş"}
            <ChevronRight className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
                "lg:hidden p-2 rounded-full transition-all duration-300",
                "bg-black/5 text-black hover:bg-black/10"
            )}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Sidebar Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] cursor-pointer pointer-events-auto"
              />
              
              {/* Drawer Content */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[280px] bg-white z-[101] shadow-2xl flex flex-col p-8 pointer-events-auto"
              >
                <div className="flex items-center justify-between mb-12">
                   <div className="w-8 h-8 flex items-center justify-center bg-[#95BF47]/10 rounded-lg">
                      <Image src="/logo.png" alt="logo" width={20} height={20} className="object-contain" />
                   </div>
                   <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-100 transition-all"
                   >
                     <X className="w-5 h-5" />
                   </button>
                </div>

                <nav className="flex flex-col gap-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg font-bold text-gray-900 hover:text-[#95BF47] transition-colors"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-auto space-y-4">
                   <Link
                      href={user ? "/panel" : "/giris"}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 bg-[#1C1C1C] text-white py-4 rounded-2xl font-bold text-sm"
                   >
                      {isAuthenticated ? "Panel" : "Giriş"}
                      <ChevronRight className="w-4 h-4" />
                   </Link>
                   <p className="text-[10px] text-gray-400 font-medium tracking-widest text-center">Resmi Shopify Partneri</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </div>
  )
}
