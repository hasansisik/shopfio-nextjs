import { ShoppingBag } from "lucide-react"

export const applicationsData = [
  { 
    id: "APP-2024-001", 
    service: "Shopify Mağaza Kurulumu", 
    date: "25 Mart 2024", 
    status: "İşlemde", 
    progress: 75,
    type: "Kurulum",
    icon: ShoppingBag,
    color: "bg-[#95BF47]",
    description: "Shopify altyapısı üzerine kurulu, modern ve hızlı bir mağaza kurulum süreci.",
    steps: [
      { 
        name: "Ödeme", 
        date: "25 Mart 2024, 10:30", 
        completed: true,
        desc: "Ödeme işleminiz başarıyla tamamlandı ve siparişiniz sistemimize kaydedildi."
      },
      { 
        name: "Bilgiler", 
        date: "26 Mart 2024, 14:15", 
        completed: true,
        desc: "Gerekli mağaza bilgileri, logo ve marka varlıkları ekibimiz tarafından onaylandı."
      },
      { 
        name: "Kurulum", 
        date: "Devam Ediyor", 
        current: true,
        desc: "Uzman ekibimiz Shopify altyapınız üzerinde tasarım ve fonksiyonel testleri gerçekleştiriyor."
      },
      { 
        name: "Yayına Alma", 
        date: "Bekleniyor", 
        upcoming: true,
        desc: "Tüm kurulumlar bittiğinde mağazanız onayınıza sunulacak ve yayına alınacaktır."
      },
    ],
    details: [
      { label: "Paket Tipi", value: "Profesyonel Paket" },
      { label: "Tahmini Tamamlanma", value: "05 Nisan 2024" },
      { label: "Atanan Uzman", value: "Deniz Yılmaz" },
      { label: "Destek Seviyesi", value: "7/24 Öncelikli" },
    ],
    documents: [
      { name: "Marka Varlıkları (Logo/Renk)", size: "4.2 MB", date: "26 Mart" },
      { name: "Ürün Listesi (.xlsx)", size: "1.1 MB", date: "26 Mart" },
    ]
  },
  { 
    id: "APP-2024-002", 
    service: "Shopify Mağaza Kurulumu", 
    date: "12 Nisan 2024", 
    status: "Onay Bekliyor", 
    progress: 25,
    type: "Kurulum",
    icon: ShoppingBag,
    color: "bg-[#95BF47]",
    description: "Mağaza kurulumu için gerekli bilgiler toplanıyor.",
    steps: [
      { 
        name: "Ödeme", 
        date: "12 Nisan 2024, 09:12", 
        completed: true,
        desc: "Ödeme onaylandı. Bilgi formu doldurmanız bekleniyor."
      },
      { 
        name: "Bilgiler", 
        date: "Bekleniyor", 
        current: true,
        desc: "Lütfen mağaza logonuzu ve ürün listesini 'Dosyalar' sekmesinden yükleyin."
      },
      { 
        name: "Kurulum", 
        date: "Bekleniyor", 
        upcoming: true,
        desc: "Bilgiler tamamlandıktan sonra tasarım aşamasına geçilecektir."
      },
      { 
        name: "Yayına Alma", 
        date: "Bekleniyor", 
        upcoming: true,
        desc: "Son kontroller sonrası mağazanız teslim edilecektir."
      },
    ],
    details: [
      { label: "Paket Tipi", value: "Başlangıç Paketi" },
      { label: "Tahmini Tamamlanma", value: "22 Nisan 2024" },
      { label: "Atanan Uzman", value: "Mert Demir" },
      { label: "Destek Seviyesi", value: "Standart" },
    ],
    documents: []
  },
  { 
    id: "APP-2024-003", 
    service: "Shopify Mağaza Kurulumu", 
    date: "10 Mart 2024", 
    status: "Tamamlanmak Üzere", 
    progress: 95,
    type: "Kurulum",
    icon: ShoppingBag,
    color: "bg-[#95BF47]",
    description: "Mağazanız hazır hale getirildi. Teslimat aşamasına geçildi.",
    steps: [
      { 
        name: "Ödeme", 
        date: "10 Mart 2024", 
        completed: true,
        desc: "Başarıyla tamamlandı."
      },
      { 
        name: "Bilgiler", 
        date: "11 Mart 2024", 
        completed: true,
        desc: "Gerekli tüm veriler işlendi."
      },
      { 
        name: "Kurulum", 
        date: "18 Mart 2024", 
        completed: true,
        desc: "Tüm tasarım ve SEO çalışmaları tamamlandı."
      },
      { 
        name: "Yayına Alma", 
        date: "Devam Ediyor", 
        current: true,
        desc: "Mağaza erişim bilgileriniz oluşturuldu. Lütfen giriş yapıp kontrol edin."
      },
    ],
    details: [
      { label: "Paket Tipi", value: "Gelişmiş Paket" },
      { label: "Tahmini Tamamlanma", value: "Hazır" },
      { label: "Atanan Uzman", value: "Selin Ak" },
      { label: "Destek Seviyesi", value: "7/24 VIP" },
    ],
    documents: [
      { name: "Kullanım Kılavuzu (.pdf)", size: "1.2 MB", date: "20 Mart" },
    ],
    credentials: {
      url: "https://shopfio-demo.myshopify.com/admin",
      email: "hasan@shopfio.com",
      password: "••••••••••••",
      isReady: true
    }
  }
]
