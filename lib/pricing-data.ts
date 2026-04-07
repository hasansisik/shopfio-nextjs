import { ShoppingBag, CreditCard, RefreshCw, Share2, Globe, Sparkles, ShieldCheck, Headphones, Zap, TrendingUp, Maximize } from "lucide-react"

export const plans = [
    { name: "Başlangıç", price: "4.999", description: "Yolculuğuna yeni başlayan satıcılar için mükemmel.", id: "basic" },
    { name: "Profesyonel", price: "9.999", description: "Düzenli cirosu olan büyüyen işletmeler için en iyisi.", highlight: true, id: "pro" },
    { name: "Full Paket", price: "13.999", description: "Kurumsal ölçeklendirme için ihtiyacınız olan her şey.", id: "enterprise" },
]

export const comparisonFeatures = [
    { name: "Shopify Payments Kurulumu", icon: CreditCard, small: true, medium: true, full: true },


    { name: "Shopify Mağaza Kurulumu", icon: ShoppingBag, small: false, medium: true, full: true },
    { name: "Payoneer/Paysera Entegrasyonu", icon: ShoppingBag, small: false, medium: true, full: true },
    { name: "Chargeback (İtiraz) Danışmanlığı", icon: ShoppingBag, small: false, medium: true, full: true },
    { name: "Global Dil Seçeneği", icon: ShoppingBag, small: false, medium: false, full: true },
    { name: "Global Mağaza Tasarımı", icon: ShoppingBag, small: false, medium: false, full: true },
    { name: "Mağaza İçi Kargo Ayarları", icon: ShoppingBag, small: false, medium: false, full: true },
    
    { name: "7/24 Destek", icon: ShoppingBag, small: true, medium: true, full: true },

]
