export const INITIAL_CHATS = [
  {
    id: 1,
    name: "Deniz Yılmaz",
    role: "Geliştirme Uzmanı",
    avatar: "/avatars/deniz.jpg",
    lastMessage: "Kurulum süreci hakkında her türlü sorunuz için teknik destek...",
    time: "14:20",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Selin Ak",
    role: "Tasarım Uzmanı",
    avatar: "/avatars/selin.jpg",
    lastMessage: "Marka renkleriniz Shopify altyapısına başarıyla uyarlandı.",
    time: "Dün",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Can Demir",
    role: "Entegrasyon Ekibi",
    avatar: "/avatars/can.jpg",
    lastMessage: "Ödeme altyapısı onay süreci başlatıldı.",
    time: "Salı",
    unread: 0,
    online: true,
  }
]

export const INITIAL_MESSAGES = [
  { id: 1, chatId: 1, text: "Merhaba Hasan Bey, mağaza kurulumunuzun tasarım aşamasına geçtik.", time: "10:30", sender: "expert" },
  { id: 2, chatId: 1, text: "Harika! Logo ve renk paletini incelediniz mi?", time: "10:35", sender: "me", status: "read" },
  { id: 3, chatId: 1, text: "Evet, marka varlıklarınızı inceledik. Modern bir görünüm için bazı ufak dokunuşlar yaptık.", time: "10:40", sender: "expert" },
  { id: 4, chatId: 1, text: "Örnek tasarımı gün içerisinde size ileteceğiz.", time: "10:41", sender: "expert" },
  { id: 5, chatId: 1, text: "Bekliyorum, teşekkürler.", time: "10:45", sender: "me", status: "read" },
  { id: 6, chatId: 1, text: "Herhangi bir sorunuz olursa buradan yazabilirsiniz.", time: "11:00", sender: "expert" },
]
