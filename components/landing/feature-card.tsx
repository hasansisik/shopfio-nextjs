"use client"

import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  children: React.ReactNode
  className?: string
}

export function FeatureCard({ title, description, children, className }: FeatureCardProps) {
  return (
    <div className={cn(
      "group relative flex flex-col bg-white/10 backdrop-blur-sm rounded-[15px] p-6 md:p-7 border border-2 border-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-700 overflow-hidden",
      className
    )}>
      <div className="mb-1">
        <h3 className="text-xl md:text-[22px] font-medium text-black mb-2 tracking-tight">{title}</h3>
        <p className="text-[14px] text-gray-400 font-regular leading-relaxed">{description}</p>
      </div>
      {children}
    </div>
  )
}
