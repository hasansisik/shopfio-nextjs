"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox" // Verification: Checkbox doesn't exist, using native input instead.
import {
  User,
  Globe,
  Store,
  Palette,
  Target,
  Code,
  HelpCircle,
  Share2,
  Newspaper,
  Mic,
  BarChart3,
  Rocket,
  Zap,
  Repeat
} from "lucide-react"
import { cn } from "@/lib/utils"

// Helper Card Component for selection steps
function SelectionCard({
  icon: Icon,
  label,
  selected,
  onClick
}: {
  icon: any,
  label: string,
  selected: boolean,
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 gap-3 group",
        selected
          ? "border-[#95BF47] bg-[#95BF47]/5 shadow-[0_0_20px_rgba(149,191,71,0.1)]"
          : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
        selected ? "bg-[#95BF47] text-white" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <span className={cn(
        "font-semibold text-xs transition-colors",
        selected ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900"
      )}>
        {label}
      </span>
    </button>
  )
}

// STEP 1: Personal Info
export function StepPersonal({ data, updateData, onNext }: any) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Shopify Payments Başvuru</h2>
        <p className="text-xs text-gray-500">Hizmetinizi aktif edebilmemiz için lütfen bilgileri eksiksiz doldurun , aksi takdirde başvurunuz reddedilecektir.</p>
      </div>

      <div className="space-y-8 max-w-md mx-auto">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700 font-semibold">Adınız Soyadınız nedir?</Label>
          <Input
            id="name"
            placeholder="Adınız Soyadınız"
            className="rounded-full border-gray-200 focus:border-[#95BF47] focus:ring-[#95BF47] h-12 bg-white"
            value={data.name || ""}
            onChange={(e) => updateData({ name: e.target.value })}
          />
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-start gap-3">
            <input type="checkbox" className="mt-1 accent-[#95BF47] w-6 h-6" defaultChecked />
            <p className="text-xs text-gray-500 leading-snug">
              Girmiş olduğunuz bilgiler ile daha önce Stripe ve Shopify Payments'a başvuru yapmadığınızı onaylıyorsunuz.
            </p>
          </div>
        </div>

        <Button
          onClick={onNext}
          className="w-full h-12 rounded-full bg-black text-white hover:bg-gray-800 font-bold text-sm transition-all transform active:scale-[0.98]"
        >
          Devam Et
        </Button>
      </div>
    </div>
  )
}

// STEP 2: Role Selection
export function StepRole({ data, updateData, onNext, onBack }: any) {

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">


      <div className="space-y-8 max-w-md mx-auto">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700 font-semibold">Doğum Tarihiniz</Label>
          <Input
            id="name"
            placeholder="Adınız Soyadınız"
            className="rounded-full border-gray-200 focus:border-[#95BF47] focus:ring-[#95BF47] h-12 bg-white"
            value={data.name || ""}
            onChange={(e) => updateData({ name: e.target.value })}
          />
        </div>

         <div className="flex justify-center gap-6 text-sm font-medium text-gray-400">
        <button onClick={onBack} className="hover:text-gray-900 transition-colors">Geri</button>
        <button onClick={onNext} className="w-full h-12 rounded-full bg-black text-white hover:bg-gray-800 font-bold text-sm transition-all transform active:scale-[0.98]">Devam et</button>
      </div>
      </div>
    </div>
  )

}

// STEP 3: Source Attribution
export function StepSource({ data, updateData, onNext, onBack }: any) {
  const sources = [
    { id: "social", label: "Sosyal Medya", icon: Share2 },
    { id: "friend", label: "Arkadaş / Tavsiye", icon: User },
    { id: "news", label: "Haberler / Blog", icon: Newspaper },
    { id: "podcast", label: "Podcast", icon: Mic },
    { id: "search", label: "Arama Motoru", icon: Target },
    { id: "other", label: "Diğer", icon: HelpCircle },
  ]

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Bizi nereden duydunuz?</h2>
        <p className="text-xs text-gray-500">Hangi kanalların daha etkili olduğunu merak ediyoruz.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {sources.map((source) => (
          <SelectionCard
            key={source.id}
            icon={source.icon}
            label={source.label}
            selected={data.source === source.id}
            onClick={() => {
              updateData({ source: source.id });
              setTimeout(onNext, 300);
            }}
          />
        ))}
      </div>

      <div className="flex justify-center gap-6 text-sm font-medium text-gray-400">
        <button onClick={onBack} className="hover:text-gray-900 transition-colors">Geri</button>
        <button onClick={onNext} className="hover:text-gray-900 transition-colors">Atla</button>
      </div>
    </div>
  )
}

// STEP 4: Goals
import { toast } from "sonner"

export function StepGoal({ data, updateData, onNext, onBack }: any) {
  const goals = [
    { id: "sales", label: "Satış Artırma", icon: Rocket },
    { id: "subscriptions", label: "Abonelik Yönetimi", icon: Repeat },
    { id: "analytics", label: "Gelişmiş Analiz", icon: BarChart3 },
    { id: "speed", label: "Hızlı Ölçeklenme", icon: Zap },
    { id: "marketing", label: "Akıllı Pazarlama", icon: Target },
    { id: "support", label: "Destek Almak", icon: HelpCircle },
  ]

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Ne yapmak istiyorsunuz?</h2>
        <p className="text-xs text-gray-500">Size en uygun araçları hazırlamamıza yardımcı olun.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {goals.map((goal) => (
          <SelectionCard
            key={goal.id}
            icon={goal.icon}
            label={goal.label}
            selected={data.goal === goal.id}
            onClick={() => updateData({ goal: goal.id })}
          />
        ))}
      </div>

      <div className="max-w-xs mx-auto space-y-6">
        <Button
          onClick={() => {
            if (data.goal) {
              toast.success("Bilgileriniz kaydedildi! Teşekkürler.")
              onNext();
            }
          }}
          disabled={!data.goal}
          className="w-full h-14 rounded-full bg-black text-white hover:bg-gray-800 font-bold text-base disabled:opacity-50"
        >
          Tamamla
        </Button>

        <div className="flex justify-center gap-6 text-sm font-medium text-gray-400 pb-10">
          <button onClick={onBack} className="hover:text-gray-900 transition-colors">Geri</button>
        </div>
      </div>
    </div>
  )
}
