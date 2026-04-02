"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, MessageSquare, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const faqData = [
  {
    question: "Shopfio işletmemle nasıl çalışır?",
    answer: "Shopfio, e-ticaret siteniz için gelirleri artıran yenilikçi Abonelik Modellerini; kurulum maliyeti, ek iş yükü ve işlem riski olmadan hayata geçirir. Kurulum, ödeme işleme, faturalandırma ve destek süreçlerini biz yönetiyoruz—üstelik tüm bunlar PCI DSS Seviye 1 uyumluluğuyla gerçekleşiyor. Bizi ekibinizin bir parçası gibi düşünün; Ortalama Sipariş Değeri (AOV) ve Müşteri Yaşam Boyu Değerini (CLTV) artırmaya odaklanıyoruz."
  },
  {
    question: "Ödeme altyapım kapanırsa aboneliklerime ne olur?",
    answer: "İş sürekliliğiniz bizim önceliğimizdir. Shopfio, çoklu işlemci (multi-processor) yönlendirme sistemi kullanır. Eğer bir işlemci devre dışı kalırsa, işlemlerinizi otomatik olarak yedek işlemcileriniz üzerinden yönlendiririz, böylece abonelik gelirleriniz asla kesintiye uğramaz."
  },
  {
    question: "Shopfio ile ödeme altyapısı başvurusu yapabilir miyim?",
    answer: "Kesinlikle. Önde gelen yüksek riskli ve düşük riskli ticari hesap sağlayıcılarıyla doğrudan ortaklıklarımız var. Shopify mağazanız için en iyi oranları ve en kararlı işlem ortamını elde etmenizi sağlamak için tüm başvuru süreci boyunca size destek oluyoruz."
  },
  {
    question: "Hangi ödeme altyapıları destekleniyor?",
    answer: "Stripe, Authorize.net, NMI, PayPal ve özel yüksek riskli ticari hesaplar dahil olmak üzere çok çeşitli küresel işlemcileri destekliyoruz. Sistemimiz her işlemciyle çalışacak şekilde tasarlanmıştır, bu da size iş ihtiyaçlarınıza en uygun sağlayıcıları seçme esnekliği sunar."
  },
  {
    question: "Hangi dikey pazar/niş alanlar destekleniyor?",
    answer: "Shopify e-ticaretinde uzmanlaşmış olsak da; Sağlık & Güzellik, Takviye Edici Gıdalar, SaaS, Dijital Ürünler ve Abonelik Kutuları dahil olmak üzere birçok alanı destekliyoruz. Shopify üzerinde tekrarlayan gelir modeliniz varsa, Shopfio tam size göre inşa edilmiştir."
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
            <span className="text-[12px] font-bold tracking-tight text-gray-600 uppercase">SSS</span>
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
