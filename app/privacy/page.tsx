import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Shopfio",
  description: "Shopfio platformunun gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, işlendiği ve korunduğu hakkında detaylı bilgi.",
}

export default function PrivacyPage() {
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
            🔒 Kişisel Verilerin Korunması
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Gizlilik Politikası</h1>
          <p className="text-gray-500 font-medium max-w-xl mx-auto">
            Son güncellenme: 15 Nisan 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">

        <Section title="1. Veri Sorumlusu">
          <p>
            Bu Gizlilik Politikası; <strong>Shopfio Teknoloji A.Ş.</strong> (bundan sonra "Shopfio", "biz" veya "şirket" olarak
            anılacaktır) tarafından hazırlanmıştır. Şirketimiz, Mimarsinan Mah. Ceren Sok. No:6, Çekmeköy / İstanbul adresinde
            faaliyet göstermekte olup 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu
            sıfatıyla hareket etmektedir.
          </p>
          <p>
            Shopfio, Shopify üzerinde mağaza kurulum hizmeti, dijital altyapı çözümleri ve ilgili danışmanlık hizmetleri
            sunmaktadır. Platform üzerinden gerçekleştirilen her türlü veri işleme faaliyeti bu politika kapsamındadır.
          </p>
        </Section>

        <Section title="2. Toplanan Kişisel Veriler">
          <p>Shopfio, hizmetlerin sunulabilmesi amacıyla aşağıdaki kişisel verileri toplayabilmektedir:</p>
          <ul>
            <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. kimlik numarası, doğum tarihi.</li>
            <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası, posta adresi.</li>
            <li><strong>Finansal Bilgiler:</strong> IBAN, ödeme yöntemi bilgileri, fatura detayları.</li>
            <li><strong>Hesap Bilgileri:</strong> Shopify e-posta adresi (başvuru sürecinde).</li>
            <li><strong>Kimlik Belgeleri:</strong> Başvuru ve doğrulama sürecinde talep edilen nüfus cüzdanı görseli (ön-arka).</li>
            <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, oturum bilgileri, erişim logları.</li>
            <li><strong>İletişim Geçmişi:</strong> Destek talepleri ve mesaj kayıtları.</li>
          </ul>
        </Section>

        <Section title="3. Verilerin İşlenme Amaçları">
          <p>Toplanan kişisel veriler aşağıdaki amaçlarla işlenmektedir:</p>
          <ul>
            <li>Shopify mağaza kurulum hizmetlerinin planlanması ve yürütülmesi</li>
            <li>Başvuru süreçlerinin takibi ve yönetimi</li>
            <li>Kullanıcı kimliğinin doğrulanması ve hesap güvenliğinin sağlanması</li>
            <li>Ödeme işlemlerinin gerçekleştirilmesi ve finansal kayıtların tutulması</li>
            <li>Teknik destek hizmetlerinin sunulması</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi (vergi, muhasebe vb.)</li>
            <li>Hizmet kalitesini artırmaya yönelik analizler ve raporlamalar</li>
            <li>Pazarlama ve kampanya bildirimlerinin iletilmesi (açık rıza alınması halinde)</li>
          </ul>
        </Section>

        <Section title="4. Hukuki İşleme Dayanakları (KVKK)">
          <p>Kişisel veriler, 6698 sayılı KVKK'nın 5. ve 6. maddeleri kapsamında aşağıdaki hukuki dayanaklara bağlı olarak işlenmektedir:</p>
          <ul>
            <li>Açık rıza (belirli pazarlama faaliyetleri için)</li>
            <li>Sözleşmenin kurulması veya ifası (hizmet sunumu için)</li>
            <li>Hukuki yükümlülüğün yerine getirilmesi (vergi, muhasebe mevzuatı)</li>
            <li>Meşru menfaat (güvenlik, dolandırıcılık önleme)</li>
          </ul>
        </Section>

        <Section title="5. Verilerin Saklanma Süresi">
          <p>
            Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca saklanacaktır. Hizmet sözleşmesinin sona ermesinin ardından
            finansal ve yasal kayıtlar <strong>10 yıl</strong> süreyle, destek ve iletişim kayıtları <strong>3 yıl</strong> süreyle
            muhafaza edilir. Kimlik belgeleri güvenli sistemlerde şifreli olarak tutulur ve yasal saklama süreleri dolduğunda
            geri dönüşümsüz biçimde imha edilir.
          </p>
        </Section>

        <Section title="6. Verilerin Aktarılması">
          <p>Kişisel verileriniz, yalnızca aşağıdaki durumlar ve taraflarla paylaşılabilir:</p>
          <ul>
            <li><strong>Shopify Inc.:</strong> Mağaza kurulumu sürecinin zorunlu bir parçası olarak.</li>
            <li><strong>Ödeme Hizmeti Sağlayıcıları:</strong> iyzico, PayTR gibi lisanslı ödeme altyapıları.</li>
            <li><strong>Bulut Altyapısı (Cloudinary, AWS):</strong> Belge ve görsel depolama için.</li>
            <li><strong>Yasal Merciler:</strong> Mahkeme kararı veya yasal zorunluluk halinde yetkili kuruluşlara.</li>
          </ul>
          <p>Shopfio, verilerinizi reklam amaçlı üçüncü taraflarla <strong>kesinlikle paylaşmamaktadır.</strong></p>
        </Section>

        <Section title="7. Çerezler (Cookies)">
          <p>
            Web sitemiz oturum yönetimi, güvenlik, tercihlerinizin hatırlanması ve anonim analitik veriler için çerezler
            kullanmaktadır. Zorunlu çerezler devre dışı bırakılamaz; tercih ve analitik çerezleri tarayıcı ayarlarınızdan
            yönetebilirsiniz. Detaylı bilgi için Çerez Politikamıza başvurabilirsiniz.
          </p>
        </Section>

        <Section title="8. KVKK Kapsamındaki Haklarınız">
          <p>6698 sayılı KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
          <ul>
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
            <li>İşlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Yurt içi/yurt dışında aktarıldığı üçüncü kişileri bilme</li>
            <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
            <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini talep etme</li>
            <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize sonuç doğurmasına itiraz etme</li>
            <li>Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
          </ul>
          <p>
            Bu haklarınızı kullanmak için <strong>kvkk@shopfio.com</strong> adresine yazılı olarak başvurabilirsiniz.
            Başvurularınız 30 gün içinde yanıtlanacaktır.
          </p>
        </Section>

        <Section title="9. Veri Güvenliği">
          <p>
            Shopfio, kişisel verilerinizi korumak amacıyla endüstri standardı güvenlik önlemleri uygulamaktadır:
            SSL/TLS şifrelemesi, erişim kontrolü, şifreli veritabanı depolama, düzenli güvenlik taramaları ve
            personel gizlilik eğitimleri bunların başında gelmektedir. Bununla birlikte, internet üzerinden hiçbir
            veri iletiminin %100 güvenli olmadığını hatırlatırız.
          </p>
        </Section>

        <Section title="10. Politika Değişiklikleri">
          <p>
            Shopfio, bu Gizlilik Politikası'nı gerektiğinde güncelleme hakkını saklı tutar. Önemli değişiklikler
            platformdaki e-posta veya bildirim sistemi aracılığıyla kullanıcılara iletilir. Güncel politikaya her zaman
            <strong> shopfio.com/privacy</strong> adresinden erişilebilir.
          </p>
        </Section>

        <Section title="11. İletişim">
          <p>Gizlilik politikamıza ilişkin sorularınız için:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <ContactCard label="E-posta" value="kvkk@shopfio.com" />
            <ContactCard label="Adres" value="Mimarsinan Mah. Ceren Sok. No:6, Çekmeköy / İstanbul" />
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
      <div className="text-[15px] text-gray-600 leading-relaxed space-y-3 font-medium [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_strong]:text-gray-900">
        {children}
      </div>
    </section>
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
