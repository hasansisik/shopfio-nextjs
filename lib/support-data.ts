export const INITIAL_TICKETS = [
  {
    id: "T-1092",
    subject: "Tema Özelleştirme Hakkında",
    category: "Teknik Destek",
    status: "Cevaplandı",
    date: "2 gün önce",
    priority: "Normal",
    createdAt: "22 Mart 2024, 14:30",
    lastUpdate: "2 saat önce",
    member: {
      name: "Elif Uzun",
      role: "Müşteri Temsilcisi",
      initials: "EU"
    },
    messages: [
      {
        id: 1,
        sender: "me",
        text: "Merhaba, mevcut temamdaki ana sayfa banner alanını biraz daha genişletmek istiyorum. CSS üzerinden mi müdahale etmeliyim yoksa panelde bir ayarı var mı?",
        time: "22 Mart, 14:30"
      },
      {
        id: 2,
        sender: "expert",
        expertName: "Elif Uzun",
        text: "Merhaba Hasan Bey, ana sayfa banner genişliği kullandığınız 'shopfio Prime' temasında Tema Ayarları > Ana Sayfa > Banner Bölümü altından ayarlanabilmektedir. Eğer tam genişlik istiyorsanız 'Wide Mode' seçeneğini aktif edebilirsiniz.",
        time: "22 Mart, 16:45"
      },
      {
        id: 3,
        sender: "me",
        text: "Bilgi için teşekkürler, wide mode seçeneğini buldum. Peki yan boşlukları tamamen sıfırlamak mümkün mü?",
        time: "22 Mart, 17:00"
      },
      {
        id: 4,
        sender: "expert",
        expertName: "Elif Uzun",
        text: "Rica ederim. Yan boşlukları sıfırlamak için özel bir CSS kodu eklememiz gerekebilir. İsterseniz ekibimiz bu değişikliği sizin adınıza yapabilir, onaylıyor musunuz?",
        time: "Bugün, 11:20"
      }
    ]
  },
  {
    id: "T-1085",
    subject: "Alan Adı Yönlendirme",
    category: "Alan Adı & DNS",
    status: "Tamamlandı",
    date: "1 hafta önce",
    priority: "Düşük",
    createdAt: "15 Mart 2024, 09:10",
    lastUpdate: "4 gün önce",
    member: {
      name: "Can Demir",
      role: "Sistem Uzmanı",
      initials: "CD"
    },
    messages: [
      {
        id: 1,
        sender: "me",
        text: "Domainimi Shopify'a nasıl yönlendirebilirim? A kaydı ve CNAME ayarları nelerdir?",
        time: "15 Mart, 09:10"
      }
    ]
  }
]
