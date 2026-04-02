"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimationItemProps {
  src: string
  alt: string
  initialX: number // 0-100 percentage
  initialY: number // 0-100 percentage
  duration: number
  delay: number
  size: number
}

const MovingItem = ({ src, alt, initialX, initialY, duration, delay, size }: AnimationItemProps) => {
  return (
    <div
      className="absolute animate-hero-flow pointer-events-none"
      style={{
        top: `${initialY}%`,
        left: `${initialX}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        width: `${size}px`,
        height: "auto",
      }}
    >
      <Image 
        src={src} 
        alt={alt} 
        width={size} 
        height={size} 
        className="w-full h-auto drop-shadow-xl" 
      />
    </div>
  )
}

export function HeroAnimation() {
  const items = [
    { id: 1, y: 18, duration: 24, delay: 0, size: 130, b: "/hero/visitors.png", a: "/hero/new-subs.png", dip: 35 },
    { id: 2, y: 38, duration: 22, delay: -4, size: 100, b: "/hero/user-b.png", a: "/hero/user-a.png", dip: 20 },
    { id: 3, y: 58, duration: 28, delay: -2, size: 110, b: "/hero/user-b.png", a: "/hero/user-a2.png", dip: -15 },
    { id: 4, y: 80, duration: 26, delay: -12, size: 240, b: "/hero/one-time.png", a: "/hero/shopify-a.png", dip: -35 },
    { id: 5, y: 28, duration: 20, delay: -15, size: 90, b: "/hero/user-b.png", a: "/hero/user-a3.png", dip: 25 },
    { id: 6, y: 50, duration: 32, delay: -8, size: 140, b: "/hero/visitors.png", a: "/hero/new-subs.png", dip: 10 },
    { id: 7, y: 88, duration: 25, delay: -15, size: 85, b: "/hero/user-b.png", a: "/hero/user-a.png", dip: -45 },
    { id: 8, y: 22, duration: 30, delay: -18, size: 115, b: "/hero/user-b.png", a: "/hero/user-a2.png", dip: 30 },
    { id: 9, y: 46, duration: 23, delay: -10, size: 105, b: "/hero/visitors.png", a: "/hero/new-subs.png", dip: 15 },
    { id: 10, y: 72, duration: 27, delay: -22, size: 120, b: "/hero/user-b.png", a: "/hero/user-a3.png", dip: -25 },
    { id: 11, y: 32, duration: 29, delay: -6, size: 180, b: "/hero/one-time.png", a: "/hero/shopify-a.png", dip: 20 },
    { id: 12, y: 55, duration: 35, delay: -12, size: 95, b: "/hero/user-b.png", a: "/hero/user-a.png", dip: -10 },
  ]

  const MovingItems = ({ type }: { type: 'b' | 'a' }) => (
    <div className="absolute inset-0 w-full h-full">
      {items.map((item) => (
        <div
          key={`${type}-${item.id}`}
          className="absolute animate-hero-flow pointer-events-none"
          style={
            {
              top: `${item.y}%`,
              left: `-35%`,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
              width: `${item.size}px`,
              "--dip": `${item.dip}px`,
            } as any
          }
        >
          <div className="relative scale-[0.65] md:scale-100 group-hover:scale-110 transition-transform duration-700 ease-out">
             <Image 
                src={type === 'b' ? item.b : item.a} 
                alt="asset" 
                width={item.size} 
                height={item.size} 
                className={cn(
                    "w-full h-auto object-contain transition-opacity duration-300",
                    type === 'b' ? "opacity-100 saturate-100" : "drop-shadow-[0_12px_30px_rgba(149,191,71,0.25)] saturate-110"
                )} 
            />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="relative w-full h-[450px] md:h-[620px] mt-2 md:mt-12 select-none group overflow-hidden bg-[#F9F9F9]">
      {/* Background Curved Lines (line.png) - Made white using brightness/invert filters */}
      <div className="absolute inset-0 pointer-events-none opacity-80 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Image 
            src="/hero/line.png" 
            alt="background lines" 
            fill 
            className="object-contain scale-[2.2] md:scale-110 brightness-[2] grayscale invert opacity-20"
            priority
        />
      </div>

      {/* Main Animation Container */}
      <div className="relative mx-auto max-w-full md:max-w-[1400px] h-full [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        
        {/* BEFORE Layer (Left Side) */}
        <div className="absolute inset-0 [clip-path:inset(0_49.9%_0_0)] pointer-events-none z-0">
          <MovingItems type="b" />
        </div>

        {/* AFTER Layer (Right Side) */}
        <div className="absolute inset-0 [clip-path:inset(0_0_0_50.1%)] pointer-events-none z-0">
          <MovingItems type="a" />
        </div>

        {/* Transformation Marker (Central Pill) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[320px] md:h-[540px] w-3 md:w-5 pointer-events-none z-10 flex flex-col justify-between items-center rounded-full overflow-visible">
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#95BF47] via-[#5BB13C] to-[#458C2D] shadow-[0_0_20px_rgba(149,191,71,0.7)]" />
            <div className="absolute inset-0 rounded-full blur-[2px] md:blur-[3px] opacity-60 bg-gradient-to-b from-[#95BF47] via-[#5BB13C] to-[#458C2D]" />
            <div className="absolute -inset-1 rounded-full blur-[6px] md:blur-[10px] opacity-30 bg-[#95BF47]" />
            <div className="w-3 md:w-5 h-3 md:h-5 rounded-full bg-[#95BF47] shadow-[0_0_20px_#95BF47] translate-y-[-1px] md:translate-y-[-2px] z-20" />
            <div className="w-3 md:w-5 h-3 md:h-5 rounded-full bg-[#458C2D] shadow-[0_0_20px_#458C2D] translate-y-[1px] md:translate-y-[2px] z-20" />
        </div>

      </div>
      
      {/* Global Animation Styles */}
      <style jsx global>{`
        @keyframes hero-flow {
          0% { left: -35%; opacity: 0; transform: scale(0.8) translateY(0); }
          15% { opacity: 1; }
          50% { transform: scale(1.05) translateY(calc(var(--dip) * 0.7)); }
          85% { opacity: 1; }
          100% { left: 135%; opacity: 0; transform: scale(0.8) translateY(0); }
        }
        .animate-hero-flow {
          animation: hero-flow linear infinite;
        }
      `}</style>
    </div>
  )
}
