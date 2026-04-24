"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { adminGetSettings, adminUpdateSettings } from "@/redux/actions/adminActions"
import { 
  Settings, 
  CreditCard, 
  Plus, 
  Trash2, 
  Check,
  Save,
  Loader2,
  AlertCircle
} from "lucide-react"
import { toast } from "sonner"

export default function PaymentSettingsPage() {
  const dispatch = useAppDispatch()
  const { settings, loading } = useAppSelector((state) => state.admin)
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [paytrConfig, setPaytrConfig] = useState({
     merchantId: "",
     merchantKey: "",
     merchantSalt: "",
     isActive: true,
     testMode: false
  })
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    dispatch(adminGetSettings())
  }, [dispatch])

  useEffect(() => {
    if (settings) {
      if (settings.paymentMethods) setPaymentMethods(settings.paymentMethods)
      if (settings.paytrConfig) setPaytrConfig(settings.paytrConfig)
    }
  }, [settings])

  const addMethod = () => {
    setPaymentMethods([...paymentMethods, { id: Date.now().toString(), name: "Yeni Banka", iban: "", holderName: "", isActive: true }])
  }

  const removeMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(m => m.id !== id))
  }

  const updateMethod = (id: string, updates: any) => {
    setPaymentMethods(paymentMethods.map(m => m.id === id ? { ...m, ...updates } : m))
  }

  const handleSave = async () => {
    setIsUpdating(true)
    const result = await dispatch(adminUpdateSettings({ paymentMethods, paytrConfig }))
    if (adminUpdateSettings.fulfilled.match(result)) {
      toast.success("Ödeme ayarları güncellendi")
    } else {
      toast.error("Hata: " + result.payload)
    }
    setIsUpdating(false)
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-[#95BF47]" />
            Ödeme Ayarları
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Manuel ödeme yöntemlerini ve banka hesaplarını yönetin.</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isUpdating}
          className="flex items-center gap-2 bg-[#95BF47] hover:bg-[#86ac3f] text-white px-8 py-3 rounded-2xl font-black text-xs transition-all disabled:opacity-50 shadow-lg shadow-[#95BF47]/20"
        >
          {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          AYARLARI KAYDET
        </button>
      </div>

      <div className="space-y-6">
        {paymentMethods.map((method) => (
          <div key={method.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 transition-all hover:border-[#95BF47]/30 group">
             <div className="flex justify-between items-start mb-8">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-[#95BF47]/5 transition-colors">
                     <CreditCard className="w-6 h-6 text-gray-400 group-hover:text-[#95BF47]" />
                  </div>
                  <div>
                     <input 
                        value={method.name} 
                        onChange={(e) => updateMethod(method.id, { name: e.target.value })}
                        className="text-lg font-black text-gray-900 bg-transparent border-none focus:ring-0 p-0 w-full md:w-64"
                        placeholder="Banka Adı"
                     />
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Ödeme Yöntemi</p>
                  </div>
               </div>

               <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">AKTİF</span>
                    <input 
                      type="checkbox" 
                      checked={method.isActive}
                      onChange={(e) => updateMethod(method.id, { isActive: e.target.checked })}
                      className="w-4 h-4 rounded text-[#95BF47] focus:ring-[#95BF47]/20 border-gray-200"
                    />
                  </label>
                  <button 
                    onClick={() => removeMethod(method.id)}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-50">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">ALICI ADI SOYADI</label>
                   <input 
                      type="text" 
                      value={method.holderName}
                      onChange={(e) => updateMethod(method.id, { holderName: e.target.value })}
                      placeholder="Örn: SHOPFIO LDT ŞTİ"
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#95BF47]/20 transition-all placeholder:text-gray-300"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">IBAN NUMARASI</label>
                   <input 
                      type="text" 
                      value={method.iban}
                      onChange={(e) => updateMethod(method.id, { iban: e.target.value })}
                      placeholder="TR00 0000 0000 0000 0000 0000 00"
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-[#95BF47]/20 transition-all placeholder:text-gray-300"
                   />
                </div>
             </div>
          </div>
        ))}

        <button 
          onClick={addMethod}
          className="w-full py-8 border-2 border-dashed border-gray-100 rounded-3xl text-gray-400 font-bold text-sm hover:border-[#95BF47]/50 hover:text-[#95BF47] hover:bg-[#95BF47]/5 transition-all flex flex-col items-center justify-center gap-3"
        >
          <Plus className="w-6 h-6" />
          Yeni Ödeme Yöntemi Ekle
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 group">
         <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-[#95BF47]/5 flex items-center justify-center border border-[#95BF47]/20">
                  <span className="font-bold text-[#95BF47]">TR</span>
               </div>
               <div>
                  <h3 className="text-lg font-black text-gray-900">PayTR Entegrasyonu</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Kredi Kartı Altyapısı</p>
               </div>
            </div>

            <div className="flex items-center gap-6">
               <label className="flex items-center gap-2 cursor-pointer">
                 <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">TEST MODU</span>
                 <input 
                   type="checkbox" 
                   checked={paytrConfig.testMode}
                   onChange={(e) => setPaytrConfig({ ...paytrConfig, testMode: e.target.checked })}
                   className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500/20 border-gray-200"
                 />
               </label>

               <label className="flex items-center gap-2 cursor-pointer">
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">AKTİF</span>
                 <input 
                   type="checkbox" 
                   checked={paytrConfig.isActive}
                   onChange={(e) => setPaytrConfig({ ...paytrConfig, isActive: e.target.checked })}
                   className="w-4 h-4 rounded text-[#95BF47] focus:ring-[#95BF47]/20 border-gray-200"
                 />
               </label>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-50">
            <div className="space-y-2">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mağaza No</label>
               <input 
                  type="text" 
                  value={paytrConfig.merchantId}
                  onChange={(e) => setPaytrConfig({ ...paytrConfig, merchantId: e.target.value })}
                  placeholder="687993"
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#95BF47]/20 transition-all placeholder:text-gray-300"
               />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mağaza Parola</label>
               <input 
                  type="text" 
                  value={paytrConfig.merchantSalt}
                  onChange={(e) => setPaytrConfig({ ...paytrConfig, merchantSalt: e.target.value })}
                  placeholder="YPr4XtfZzFYJ3DP4"
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#95BF47]/20 transition-all placeholder:text-gray-300"
               />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mağaza Gizli Anahtar</label>
               <input 
                  type="text" 
                  value={paytrConfig.merchantKey}
                  onChange={(e) => setPaytrConfig({ ...paytrConfig, merchantKey: e.target.value })}
                  placeholder="GZ31n5f1Yd5p7HHb"
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#95BF47]/20 transition-all placeholder:text-gray-300"
               />
            </div>
         </div>
      </div>

      <div className="bg-amber-50 rounded-3xl p-6 flex gap-4 border border-amber-100 text-amber-900">
         <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
         <div className="space-y-1">
            <h4 className="text-sm font-black tracking-tight">Dikkat: Önemli Bilgilendirme</h4>
            <p className="text-xs font-medium leading-relaxed opacity-80">Burada yaptığınız değişiklikler tüm kullanıcıların ödeme ekranlarında anında aktif olacaktır. IBAN bilgilerinin doğruluğunu kontrol etmeden kaydetmeyin.</p>
         </div>
      </div>
    </div>
  )
}
