"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, MessageSquare, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const faqData = [
  {
    question: "Shopfio nasıl çalışır?",
    answer: "Sistemimize kayıt olup hizmet paketinizi seçtikten sonra Shopify mağazanızı güvenli bir şekilde panelimize bağlarsınız. Uzman ekibimiz, tüm teknik yapılandırmayı ve Shopify Payments başvurularını sizin adınıza yönetir. Kurulum tamamlanıp test edildikten sonra mağazanızı global satışa hazır şekilde teslim ederiz."
  },
  {
    question: "Başvuru süreci ne kadar sürer?",
    answer: "Gerekli bilgiler tarafımıza ulaştıktan sonra teknik yapılandırma genellikle 24 saat içerisinde tamamlanır. Resmi onay süreçleri Shopify’ın değerlendirme süresine bağlı olarak değişiklik gösterebilir, ancak biz en hızlı sonuç alacağınız şekilde optimizasyon sağlıyoruz."
  },
  {
    question: "Hangi belgeler gereklidir?",
    answer: "Genel olarak shopify'ın talep ettiği kimlik doğrulama (TC Kimlik Kartı, Pasaport vb.) belgeleri gereklidir. Kayıt olduktan sonra, seçtiğiniz pakete göre gereken evrak listesi panelinizde sizinle paylaşılır. İşlemeniz tamamlandıktan sonra sistemden otamatik olarak silinir."
  },
  {
    question: "Shopify Payments açılmazsa ne olur?",
    answer: "Süreç boyunca uzman ekibimiz tüm kriterlerin karşılandığından emin olur. Olası bir ret durumunda, eksikleri giderip süreci sizin için takip etmeye devam ediyoruz. Amacımız, her kullanıcımızın sorunsuz bir ödeme yöntemiyle satışa başlamasıdır."
  },
  {
    question: "Teknik bilgiye ihtiyacım var mı?",
    answer: "Hayır. Shopfio'nun amacı tüm teknik karmaşayı sizin üzerinizden almaktır. Sizin yapmanız gereken tek şey kayıt olmak ve mağazanızı bağlamaktır; geri kalan tüm kurulum ve entegrasyon işlemlerini biz hallediyoruz."
  },
  {
    question: "Hangi ülkelerden ödeme kabul edebilirim?",
    answer: "Başta Türkiye olmak üzere Visa ve MasterCard destekleyen tüm ülkelerden ödeme kabul edebilirsiniz."
  },
  {
    question: "Ödeme alabilmek için mutlaka şirketim olmalı mı?",
    answer: "Hayır. Shopfio'nun amacı tüm teknik karmaşayı sizin üzerinizden almaktır. Sizin yapmanız gereken tek şey kayıt olmak ve mağazanızı bağlamaktır; geri kalan tüm kurulum ve entegrasyon işlemlerini biz hallediyoruz."
  },
  {
    question: "Zaten açık olan bir mağazam var, Shopfio'yu kullanabilir miyim?",
    answer: "Tabii ki. Yeni bir mağaza açıyor olmanız veya mevcut bir mağazanızın olması fark etmez. Mevcut mağazanızdaki ödeme yöntemlerini Shopify Payments ile profesyonelce modernize etmek için sistemimize entegre olabilirsiniz.",
  },
  {
    question: "Shopify Payments ödemelerim nereye gönderilecek?",
    answer: "Ödemeleriniz, Shopify Payments üzerinden Payoneer,Paysera,Zen veya Wise hesabınıza 3-5 iş günü içerisinde aktarılır."
  },
  {
    question: "Vergi ödemem gerekiyor mu?",
    answer: "Shopify Payments kazançlarınız global ödeme sistemleri (Payoneer, Wise, Zen vb.) üzerinden güvenle yerel hesaplarınıza aktarılmaktadır. Shopfio, ödeme altyapısının teknik kurulumundan sorumludur; bu süreçten doğan vergi mükellefiyetleri ve beyan işlemleri kişisel veya kurumsal tercihleriniz doğrultusunda sizin yönetiminizdedir. Transfer sonrası süreçteki vergilendirme ve beyan yükümlülükleri tamamen kullanıcılarımızın sorumluluğunda olup, mali müşavirinizden destek almanız tavsiye edilir."
  }

]

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative w-full py-24 overflow-hidden">
      <div className="max-w-[900px] mx-auto px-6">
        
        {/* Header Area - Consistent with other sections */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md duration-300">
            <div className="flex items-center justify-center bg-[#95bf47]/10 w-6 h-6 rounded-md p-1">
                <Image src="/shopify.png" alt="Shopify" width={16} height={16} className="object-contain" />
            </div>
            <span className="text-[12px] font-bold tracking-tight text-gray-600">SSS</span>
          </div>

          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 flex-wrap">
            <h2 className="text-[32px] md:text-[52px] font-bold tracking-tight text-black leading-tight text-center">
              Sıkça
            </h2>
            <div className="relative w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-[#95BF47] to-[#5BB13C] rounded-2xl shadow-[0_12px_24px_rgba(149,191,71,0.2)] flex items-center justify-center rotate-[6deg]">
               <MessageSquare className="w-5 h-5 md:w-7 md:h-7 text-white fill-white/20" />
            </div>
            <h2 className="text-[32px] md:text-[52px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#95BF47] to-[#5BB13C]">
                Sorulan Sorular
            </h2>
          </div>
          
          <p className="max-w-[480px] text-base md:text-lg text-gray-500 font-medium leading-relaxed mt-6">
            Bir görüşme ayarlayın veya diletiginiz zaman bize ulaşın, yardımcı olmaktan mutluluk duyarız.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="flex flex-col gap-3">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={cn(
                "group rounded-[24px] border transition-all duration-300",
                activeIndex === index 
                  ? "bg-white border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)]" 
                  : "bg-[#F9FCF5]/30 border-transparent hover:border-gray-100 hover:bg-white"
              )}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left transition-all"
              >
                <span className={cn(
                    "text-base md:text-lg font-bold tracking-tight transition-colors duration-300",
                    activeIndex === index ? "text-black" : "text-gray-700"
                )}>
                  {item.question}
                </span>
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-500",
                  activeIndex === index 
                    ? "bg-[#95BF47] text-white rotate-90" 
                    : "bg-[#95BF47]/10 text-[#5BB13C] group-hover:bg-[#95BF47]/20"
                )}>
                  {activeIndex === index ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-6 md:px-8 pb-8">
                        <div className="h-[1px] w-full bg-gray-50 mb-6" />
                        <p className="text-[14px] md:text-[15px] font-medium text-gray-500 leading-relaxed max-w-[760px]">
                            {item.answer}
                        </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
