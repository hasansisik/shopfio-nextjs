"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, MessageSquare, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const faqData = [
  {
    question: "How does Shopfio work with my business?",
    answer: "Shopfio implements innovative Subscription Models that boost revenue with zero upfront costs, no additional work, and no processing risk. We handle setup, payment processing, billing, and support—all while being PCI DSS Level 1 compliant. Think of us as an extension of your team, focused on increasing AOV (Average Order Value) and CLTV (Customer Lifetime Value)."
  },
  {
    question: "What happens to my subscriptions if my payment processor gets closed or shut down?",
    answer: "Your business continuity is our priority. Shopfio uses a multi-processor routing system. If one processor goes down, we automatically route transactions through your backup processors, ensuring your subscription revenue never stops flowing."
  },
  {
    question: "Can I apply for payment processing with Shopfio?",
    answer: "Absolutely. We have direct partnerships with leading high-risk and low-risk merchant account providers. We assist you throughout the application process to ensure you get the best rates and the most stable processing environment for your Shopify store."
  },
  {
    question: "What payment processors are supported?",
    answer: "We support a wide range of global processors including Stripe, Authorize.net, NMI, PayPal, and specialized high-risk merchant accounts. Our system is designed to be processor-agnostic, giving you the flexibility to use the providers that best fit your business needs."
  },
  {
    question: "What verticals/niches are supported?",
    answer: "While we specialize in Shopify e-commerce, we support a variety of verticals including Health & Beauty, Supplements, SaaS, Digital Goods, and Subscription Boxes. If you have a recurring revenue model on Shopify, Shopfio is built for you."
  }
]

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
    <section id="faqs" className="relative w-full py-24 overflow-hidden">
      <div className="max-w-[900px] mx-auto px-6">
        
        {/* Header Area - Consistent with other sections */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md duration-300">
            <div className="flex items-center justify-center bg-[#95bf47]/10 w-6 h-6 rounded-md p-1">
                <Image src="/shopify.png" alt="Shopify" width={16} height={16} className="object-contain" />
            </div>
            <span className="text-[12px] font-bold tracking-tight text-gray-600 uppercase">FAQs</span>
          </div>

          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 flex-wrap">
            <h2 className="text-[32px] md:text-[52px] font-bold tracking-tight text-black leading-tight text-center">
              Curated
            </h2>
            <div className="relative w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-[#95BF47] to-[#5BB13C] rounded-2xl shadow-[0_12px_24px_rgba(149,191,71,0.2)] flex items-center justify-center rotate-[6deg]">
               <MessageSquare className="w-5 h-5 md:w-7 md:h-7 text-white fill-white/20" />
            </div>
            <h2 className="text-[32px] md:text-[52px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#95BF47] to-[#5BB13C]">
                Questions
            </h2>
          </div>
          
          <p className="max-w-[480px] text-base md:text-lg text-gray-500 font-medium leading-relaxed mt-6">
            Book a call or reach out anytime, we&apos;re here to help.
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
