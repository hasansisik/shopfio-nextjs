export const supportData = [
  {
    id: "T-1092",
    subject: "Tema Özelleştirme Hakkında",
    status: "Cevaplandı",
    createdDate: "12 Nisan 2024",
    category: "Teknik Destek",
    priority: "Normal",
    assignedExpert: {
      name: "Deniz Yılmaz",
      role: "Mağaza Mimarı",
      avatar: "DY"
    },
    messages: [
      {
        id: 1,
        sender: "user",
        name: "Hasan",
        time: "12 Nisan, 14:20",
        message: "Merhaba, Profesyonel paket içerisindeki temada ana sayfa banner alanını tam genişlik yapamadım. Yardımcı olabilir misiniz?",
        attachments: []
      },
      {
        id: 2,
        sender: "expert",
        name: "Deniz Yılmaz",
        time: "12 Nisan, 15:45",
        message: "Merhaba Hasan Bey, isteğiniz üzerine temanızdaki 'Header & Banner' ayarlarını güncelledim. Şu an ana sayfa banner alanınız tam genişlik (full-width) olarak ayarlandı. Panelinize girip kontrol edebilir misiniz?",
        attachments: [
          { name: "guncelleme_onizleme.png", size: "1.2 MB" }
        ]
      },
      {
        id: 3,
        sender: "user",
        name: "Hasan",
        time: "2 saat önce",
        message: "Çok teşekkürler Deniz Bey, şimdi baktım tam istediğim gibi olmuş. Bir de logo boyutunu biraz büyütebilir miyiz?",
        attachments: []
      }
    ]
  },
  {
    id: "T-1085",
    subject: "Alan Adı Yönlendirme",
    status: "Tamamlandı",
    createdDate: "05 Nisan 2024",
    category: "Hesap İşlemleri",
    priority: "Yüksek",
    assignedExpert: {
      name: "Mert Demir",
      role: "Sistem Uzmanı",
      avatar: "MD"
    },
    messages: [
      {
        id: 1,
        sender: "user",
        name: "Hasan",
        time: "05 Nisan, 10:00",
        message: "GoDaddy üzerinden aldığım alan adını Shopify'a nasıl yönlendirebilirim?",
        attachments: []
      },
      {
        id: 2,
        sender: "expert",
        name: "Mert Demir",
        time: "05 Nisan, 10:30",
        message: "DNS ayarlarınızı güncelledim. A kaydı ve CNAME yönlendirmeleri tamamlandı. 24 saat içinde aktif olacaktır.",
        attachments: []
      }
    ]
  }
]
