import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Kullanım Şartları | Shopfio",
  description: "Shopfio platformu kullanım şartları ve mesafeli satış sözleşmesi genel hükümleri.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f8faf5]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="Shopfio" width={120} height={40} className="h-8 w-auto" />
          </Link>
          <Link href="/" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">
            ← Ana Sayfa
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-[#95BF47]/10 text-[#95BF47] px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            ⚖️ Yasal Bilgilendirme
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Kullanım Şartları</h1>
          <p className="text-gray-500 font-medium max-w-xl mx-auto">
            Son güncellenme: 15 Nisan 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">

        <Section title="1. Taraflar">
          <p>
            İşbu Kullanım Şartları, <strong>Shopfio Teknoloji A.Ş.</strong> (bundan sonra "Shopfio" olarak anılacaktır) ile
            Shopfio platformu üzerinden sunulan hizmetlerden yararlanan gerçek veya tüzel kişi ("Kullanıcı") arasında,
            platformun ve sunulan dijital hizmetlerin kullanım koşullarını düzenlemek amacıyla akdedilmiştir.
          </p>
          <p>
            Platforma üye olan veya hizmet alan her Kullanıcı, işbu sözleşme hükümlerini kabul etmiş sayılır.
          </p>
        </Section>

        <Section title="2. Hizmet Kapsamı">
          <p>
            Shopfio, Shopify altyapısını kullanarak kişiye veya şirkete özel e-ticaret mağazası kurulumu, tasarım yapılandırması,
            entegrasyon ve danışmanlık hizmetleri sunan bir SaaS/Danışmanlık platformudur.
          </p>
          <ul>
            <li>Hizmetlerin detayları seçilen pakete (Başlangıç, Profesyonel, Full Kurulum) göre değişiklik gösterir.</li>
            <li>Shopfio, sunulan hizmetlerin teknik limitlerini Shopify altyapısının izin verdiği ölçüde belirler.</li>
            <li>Hizmetlerin tamamlanma süreleri, aksi belirtilmedikçe iş günü üzerinden hesaplanır.</li>
          </ul>
        </Section>

        <Section title="3. Kullanıcı Yükümlülükleri">
          <p>Kullanıcı, platformu kullanırken aşağıdaki kurallara uymayı taahhüt eder:</p>
          <ul>
            <li>Başvuru sırasında verilen bilgilerin (ad, soyad, e-posta, IBAN vb.) doğru ve güncel olması.</li>
            <li>Hesap güvenliği için şifresini gizli tutmak ve üçüncü kişilerle paylaşmamak.</li>
            <li>Platformu yasalara aykırı, hileli veya Shopfio'nun ticari itibarını zedeleyecek şekilde kullanmamak.</li>
            <li>Mağaza kurulumu için gerekli olan onayları ve belgeleri zamanında iletmek.</li>
            <li>Shopify'ın kendi kullanım şartlarına ve politikalarına ayrıca uymak.</li>
          </ul>
        </Section>

        <Section title="4. Ödeme ve Fiyatlandırma">
          <p>
            Hizmet bedelleri, platform üzerinde güncel olarak sergilenen paket fiyatlarıdır. Shopfio, fiyatlarda dilediği zaman
            değişiklik yapma hakkını saklı tutar. Ancak satın alınan hizmetler, satın alma tarihindeki fiyat üzerinden ifa edilir.
          </p>
          <p>
            Ödemeler; banka havalesi/EFT, kredi kartı veya platform tarafından desteklenen diğer dijital ödeme yöntemleri ile
            peşin olarak tahsil edilir. Hizmet süreci, ödeme onayı alındıktan sonra başlar.
          </p>
        </Section>

        <Section title="5. Fikri Mülkiyet Hakları">
          <p>
            Shopfio platformunun tasarımı, yazılımı, logoları, metinleri ve tüm görsel içeriği Shopfio Teknoloji A.Ş.'ye aittir.
            Kullanıcıya teslim edilen mağaza tasarımı ve yapılandırması üzerinde, hizmet bedeli ödendiği sürece kullanım hakkı
            Kullanıcı'ya aittir; ancak platformun kaynak kodları veya özel altyapı bileşenleri kopyalanamaz veya dağıtılamaz.
          </p>
        </Section>

        <Section title="6. Sorumluluğun Sınırlandırılması">
          <p>
            Shopfio, Shopify.com platformunun teknik aksaklıklarından, politika değişikliklerinden veya Shopify tarafından
            uygulanan mağaza yasaklamalarından sorumlu tutulamaz.
          </p>
          <p>
            Müşterinin mağazasında sattığı ürünlerin yasallığı, gümrük süreçleri, vergi yükümlülükleri ve müşteri ilişkileri
            tamamen Kullanıcı'nın sorumluluğundadır. Shopfio, ticari kar garantisi vermez; sadece teknik altyapı ve kurulum
            desteği sunar.
          </p>
        </Section>

        <Section title="7. Hizmetin Durdurulması ve İptali">
          <p>
            Shopfio; Kullanıcı'nın sözleşme hükümlerini ihlal etmesi, hileli işlemlerde bulunması veya yasalara aykırı faaliyet
            yürütmesi durumunda hizmeti tek taraflı olarak durdurma veya hesabı kapatma hakkına sahiptir.
          </p>
          <p>
            İade ve iptal süreçleri için ayrıca "İade ve İptal Politikası" geçerlidir.
          </p>
        </Section>

        <Section title="8. Mücbir Sebepler">
          <p>
            Doğal afet, savaş, siber saldırı, genel altyapı kesintileri gibi tarafların kontrolü dışındaki durumlarda,
            hizmet aksamalarından dolayı taraflar sorumlu tutulamaz.
          </p>
        </Section>

        <Section title="9. Uyuşmazlıkların Çözümü">
          <p>
            İşbu sözleşmenin uygulanmasından doğacak uyuşmazlıklarda <strong>İstanbul (Anadolu) Mahkemeleri ve İcra Daireleri</strong>
            yetkilidir.
          </p>
        </Section>

        <Section title="10. Yürürlük">
          <p>
            10 maddeden oluşan işbu Kullanım Şartları, Kullanıcı'nın platforma üye olduğu veya hizmet satın aldığı andan
            itibaren geçerlilik kazanır.
          </p>
        </Section>

      </div>

      <Footer />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-4">
      <h2 className="text-lg font-black text-gray-900 border-l-4 border-[#95BF47] pl-4">{title}</h2>
      <div className="text-[15px] text-gray-600 leading-relaxed space-y-3 font-medium [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_strong]:text-gray-900">
        {children}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <div className="border-t border-gray-100 bg-white mt-16">
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400 font-medium">© {new Date().getFullYear()} Shopfio Inc. Tüm hakları saklıdır.</p>
        <div className="flex gap-6 text-sm font-bold text-gray-400">
          <Link href="/privacy" className="hover:text-black transition-colors">Gizlilik Politikası</Link>
          <Link href="/refund" className="hover:text-black transition-colors">İade Politikası</Link>
          <Link href="/terms" className="hover:text-black transition-colors">Kullanım Şartları</Link>
        </div>
      </div>
    </div>
  )
}
