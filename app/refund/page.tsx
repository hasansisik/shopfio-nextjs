import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "İade ve İptal Politikası | Shopfio",
  description: "Shopfio platformunun iade ve iptal politikası. Hizmet iptali, ücret iadeleri ve koşullar hakkında detaylı bilgi.",
}

export default function RefundPage() {
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
            💳 İade ve İptal Koşulları
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">İade & İptal Politikası</h1>
          <p className="text-gray-500 font-medium max-w-xl mx-auto">
            Son güncellenme: 15 Nisan 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">

        <Section title="1. Genel Bilgilendirme">
          <p>
            Shopfio Teknoloji A.Ş., Shopify üzerinde mağaza kurulum, yapılandırma, entegrasyon ve danışmanlık hizmetleri
            sunmaktadır. Sunulan hizmetler, dijital nitelikte ve büyük ölçüde <strong>emek-yoğun</strong> hizmetler olup
            iade ve iptal koşulları bu gerçek göz önünde bulundurularak tanımlanmıştır.
          </p>
          <p>
            Bu politika; 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği
            çerçevesinde hazırlanmıştır.
          </p>
        </Section>

        <Section title="2. Hizmet Başlamadan Önce İptal">
          <p>
            Ödemeniz tamamlanmamış ya da hizmet süreci henüz başlatılmamışsa başvurunuzu herhangi bir ücret ödemeksizin
            iptal edebilirsiniz.
          </p>
          <p>
            Ödemeniz tamamlanmış ancak Shopfio ekibi tarafından çalışmaya henüz başlanmamışsa, <strong>ödeme tarihinden
            itibaren 48 saat içinde</strong> yapılacak iptal talebi üzerine ödemenizin tamamı iade edilir.
          </p>
          <Callout type="tip">
            İptal talebi için destek@shopfio.com adresine e-posta göndermeniz veya panel üzerindeki destek talebi
            formunu kullanmanız yeterlidir.
          </Callout>
        </Section>

        <Section title="3. Hizmet Başladıktan Sonra İptal">
          <p>
            Shopfio ekibi mağaza kurulumuna başladıktan sonra yapılan iptal taleplerinde aşağıdaki tablo uygulanır:
          </p>
          <table>
            <thead>
              <tr>
                <th>Süreç Aşaması</th>
                <th>İade Oranı</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Çalışma başlamış, %25'e kadar tamamlanmış</td>
                <td>%75 iade</td>
              </tr>
              <tr>
                <td>%26 – %50 arasında tamamlanmış</td>
                <td>%50 iade</td>
              </tr>
              <tr>
                <td>%51 – %75 arasında tamamlanmış</td>
                <td>%25 iade</td>
              </tr>
              <tr>
                <td>%76 ve üzeri tamamlanmış</td>
                <td>İade yapılmaz</td>
              </tr>
            </tbody>
          </table>
          <p>
            İlerleme yüzdesi, Shopfio sistemindeki başvuru detay sayfasında anlık olarak görüntülenmektedir.
            İade miktarı, ödeme yönteminize bağlı olarak <strong>5–10 iş günü</strong> içinde hesabınıza yansır.
          </p>
        </Section>

        <Section title="4. İade Yapılmayan Durumlar">
          <p>Aşağıdaki durumlarda herhangi bir iade gerçekleştirilmez:</p>
          <ul>
            <li>Hizmet <strong>tamamlanmış</strong> ve mağaza teslim edilmiştir.</li>
            <li>Müşteri tarafından sağlanan <strong>hatalı, eksik veya yanıltıcı bilgiler</strong> nedeniyle süreç sekteye uğramıştır.</li>
            <li>
              Müşteri, 14 günlük cayma hakkını kullanmak istediğini beyan etmiş ancak dijital hizmetin ifasına
              açık rıza göstermiştir (Mesafeli Sözleşmeler Yönetmeliği madde 15/ğ).
            </li>
            <li>
              Shopfio'nun makul süre içinde düzeltilmesi için fırsat tanımasına rağmen müşteri tarafından
              <strong> haklı bir itiraz süreci</strong> başlatılmamıştır.
            </li>
            <li>Shopify kaynaklı teknik kısıtlamalar veya Shopify politika değişiklikleri söz konusudur.</li>
          </ul>
        </Section>

        <Section title="5. Cayma Hakkı">
          <p>
            Mesafeli Sözleşmeler Yönetmeliği kapsamında, tüketiciler hizmet sözleşmelerinde <strong>14 günlük
            cayma hakkına</strong> sahiptir. Ancak dijital hizmetlerde, tüketicinin hizmetin ifasına onay vermiş
            olması ve hizmetin kısmen ya da tamamen ifa edilmiş olması durumunda cayma hakkı kullanılamaz.
          </p>
          <p>
            Shopfio, hizmet başlamadan önce bu durumu kullanıcıya açıkça bildirmekte ve onay almaktadır.
          </p>
        </Section>

        <Section title="6. İade Süreci">
          <p>İade talepleriniz için şu adımları izleyiniz:</p>
          <div className="space-y-3">
            <Step number="1" title="Destek Talebi Oluşturun">
              Panel üzerindeki "Destek Talebi" bölümünden veya <strong>destek@shopfio.com</strong> adresinden
              iade talebinizi iletiniz. Sipariş numaranızı ve iade gerekçenizi belirtiniz.
            </Step>
            <Step number="2" title="Değerlendirme">
              Ekibimiz talebinizi <strong>2 iş günü</strong> içinde inceleyerek başvurunuzun
              mevcut aşaması ve iade hak edişini değerlendirir.
            </Step>
            <Step number="3" title="İade Bildirimi">
              Onaylanan iadeler, orijinal ödeme yönteminize bağlı olarak havale/EFT için <strong>3–5 iş günü</strong>,
              kredi kartı için <strong>5–10 iş günü</strong> içinde gerçekleştirilir.
            </Step>
          </div>
        </Section>

        <Section title="7. Teknik Sorunlara Bağlı İadeler">
          <p>
            Shopfio kaynaklı bir teknik hata, sistem arızası veya kalite güvencesini karşılamayan bir teslimat
            söz konusu olduğunda, müşteri herhangi bir aşama kısıtlamasına tabi olmaksızın <strong>tam iade
            talebinde bulunma hakkına</strong> sahiptir.
          </p>
          <p>
            Bu durumda ekibimiz 1 iş günü içinde durumu teyit ederek iade sürecini başlatır.
          </p>
        </Section>

        <Section title="8. Ödeme Yöntemine Göre İade Süreleri">
          <table>
            <thead>
              <tr>
                <th>Ödeme Yöntemi</th>
                <th>Tahmini İade Süresi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Havale / EFT</td>
                <td>3–5 iş günü</td>
              </tr>
              <tr>
                <td>Kredi / Banka Kartı</td>
                <td>5–10 iş günü</td>
              </tr>
              <tr>
                <td>Payoneer</td>
                <td>3–7 iş günü</td>
              </tr>
              <tr>
                <td>Kripto Para (USDT/BTC)</td>
                <td>Değerlendirmeye göre değişir</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm italic text-gray-400">
            * Kripto para iadeleri, piyasa koşullarına bağlı kur dalgalanmalarından etkilenebilir ve
            iade yalnızca eşdeğer USDT değeri üzerinden gerçekleştirilebilir.
          </p>
        </Section>

        <Section title="9. İletişim ve Başvuru">
          <p>İade ve iptal süreçleri ile ilgili tüm sorularınız için:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <ContactCard label="E-posta" value="destek@shopfio.com" />
            <ContactCard label="Ofis Adresi" value="Mimarsinan Mah. Ceren Sok. No:6, Çekmeköy / İstanbul" />
            <ContactCard label="Telefon (TR)" value="+90 (532) 123 45 67" />
            <ContactCard label="Çalışma Saatleri" value="Hafta içi 09:00 – 18:00 (TSİ)" />
          </div>
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
      <div className="text-[15px] text-gray-600 leading-relaxed space-y-3 font-medium [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_strong]:text-gray-900 [&_table]:w-full [&_table]:border-collapse [&_th]:text-left [&_th]:text-[11px] [&_th]:font-black [&_th]:uppercase [&_th]:tracking-widest [&_th]:text-gray-400 [&_th]:pb-3 [&_th]:border-b [&_th]:border-gray-100 [&_td]:py-3 [&_td]:border-b [&_td]:border-gray-50 [&_td]:text-sm [&_td]:font-bold [&_td]:text-gray-800">
        {children}
      </div>
    </section>
  )
}

function Callout({ type, children }: { type: "tip" | "warning"; children: React.ReactNode }) {
  const styles = {
    tip: "bg-[#95BF47]/5 border-[#95BF47]/30 text-[#5a7a2a]",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
  }
  return (
    <div className={`border rounded-2xl p-4 text-sm ${styles[type]}`}>
      {children}
    </div>
  )
}

function Step({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 p-5 bg-gray-50/70 rounded-2xl border border-gray-100">
      <div className="w-8 h-8 rounded-full bg-[#95BF47] text-white flex items-center justify-center text-xs font-black shrink-0">
        {number}
      </div>
      <div>
        <p className="font-black text-gray-900 text-sm">{title}</p>
        <p className="text-sm text-gray-500 mt-1 font-medium">{children}</p>
      </div>
    </div>
  )
}

function ContactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
      <p className="text-[10px] font-black text-[#95BF47] uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
    </div>
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
