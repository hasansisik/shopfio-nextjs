import { ShoppingBag, CreditCard, RefreshCw, Share2, Globe, Sparkles, ShieldCheck, Headphones, Zap, TrendingUp, Maximize } from "lucide-react"

export const plans = [
    { name: "Başlangıç", price: "4.999", description: "Yolculuğuna yeni başlayan satıcılar için mükemmel.", id: "basic" },
    { name: "Profesyonel", price: "9.999", description: "Düzenli cirosu olan büyüyen işletmeler için en iyisi.", highlight: true, id: "pro" },
    { name: "Full Paket", price: "13.999", description: "Kurumsal ölçeklendirme için ihtiyacınız olan her şey.", id: "enterprise" },
]

export const comparisonFeatures = [
    { name: "Özelleştirilebilir Ödeme Sayfası", icon: ShoppingBag, small: true, medium: true, full: true },
    { name: "Otomatik VIP Portalları", icon: CreditCard, small: true, medium: true, full: true },
    { name: "Chargeback (İtiraz) Yönetimi", icon: RefreshCw, small: false, medium: true, full: true },
    { name: "MID Yönetimi ve Yönlendirme", icon: Share2, small: false, medium: true, full: true },
    { name: "Çoklu Para Birimi Desteği", icon: Globe, small: true, medium: true, full: true },
    { name: "Akıllı Kayıp Kurtarma AI", icon: Sparkles, small: false, medium: true, full: true },
    { name: "Dolandırıcılık Önleme", icon: ShieldCheck, small: false, medium: true, full: true },
    { name: "7/24 Özel Teknik Destek", icon: Headphones, small: false, medium: false, full: true },
    { name: "24 Saatte Satışa Başlayın", icon: Zap, small: false, medium: false, full: true },
    { name: "Yüksek Ödeme Onay Oranları", icon: TrendingUp, small: false, medium: true, full: true },
    { name: "Ölçeklenebilir Mimari", icon: Maximize, small: false, medium: true, full: true },
]
