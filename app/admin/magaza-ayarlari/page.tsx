"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { adminGetSettings, adminUpdateSettings } from "@/redux/actions/adminActions"
import { 
  ShoppingBag, 
  Save, 
  Loader2, 
  Megaphone,
  Plus,
  Trash2
} from "lucide-react"
import { toast } from "sonner"

export default function StoreSettingsPage() {
  const dispatch = useAppDispatch()
  const { settings, loading } = useAppSelector((state) => state.admin)
  const [storeConfig, setStoreConfig] = useState<any>({
    minimumApplicationFee: 50,
    defaultProcessingTime: "48 Saat",
    announcementLabel: "Kampanyalar",
    announcement: { text: "", link: "", isActive: false },
    campaigns: []
  })
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    dispatch(adminGetSettings())
  }, [dispatch])

  useEffect(() => {
    if (settings?.storeConfig) {
      setStoreConfig(settings.storeConfig)
    }
  }, [settings])

  const handleSave = async () => {
    setIsUpdating(true)
    const result = await dispatch(adminUpdateSettings({ storeConfig }))
    if (adminUpdateSettings.fulfilled.match(result)) {
      toast.success("Mağaza ayarları güncellendi")
    } else {
      toast.error("Hata: " + result.payload)
    }
    setIsUpdating(false)
  }

  const addCampaign = () => {
    setStoreConfig({
      ...storeConfig,
      campaigns: [...(storeConfig.campaigns || []), { text: "", link: "" }]
    })
  }

  const removeCampaign = (index: number) => {
    const updated = [...storeConfig.campaigns]
    updated.splice(index, 1)
    setStoreConfig({ ...storeConfig, campaigns: updated })
  }

  const updateCampaign = (index: number, field: string, value: string) => {
    const updated = [...storeConfig.campaigns]
    updated[index] = { ...updated[index], [field]: value }
    setStoreConfig({ ...storeConfig, campaigns: updated })
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10 font-medium">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-[#95BF47]" />
            Mağaza Ayarları
          </h1>
          <p className="text-sm text-gray-500 mt-1">Platform genelindeki kurulum ve operasyonel ayarları yapılandırın.</p>
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

      <div className="space-y-8">
        {/* Campaigns Management - Full Width */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8">
           <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-[#95BF47]/10 flex items-center justify-center text-[#95BF47]">
                    <Megaphone className="w-5 h-5" />
                 </div>
                 <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Anons Çubuğu & Kampanyalar</h3>
              </div>
              <button 
                onClick={addCampaign}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-3 h-3" />
                YENİ KAMPANYA EKLE
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">ÇUBUK BAŞLIĞI (SOL KISIM)</label>
                 <input 
                   type="text" 
                   value={storeConfig.announcementLabel}
                   onChange={(e) => setStoreConfig({...storeConfig, announcementLabel: e.target.value})}
                   placeholder="Örn: Kampanyalar"
                   className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-black focus:outline-none focus:ring-2 focus:ring-[#95BF47]/20 transition-all"
                 />
              </div>
              <div className="md:col-span-2 space-y-4">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">ROTASYONDAKİ KAMPANYALAR</label>
                 <div className="space-y-3">
                    {storeConfig.campaigns?.length === 0 && (
                      <p className="text-sm text-gray-400 italic py-4">Henüz kampanya eklenmemiş.</p>
                    )}
                    {storeConfig.campaigns?.map((campaign: any, index: number) => (
                      <div key={index} className="flex gap-3 group relative bg-gray-50/50 p-4 rounded-2xl border border-gray-100 items-start">
                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input 
                              type="text" 
                              value={campaign.text}
                              onChange={(e) => updateCampaign(index, 'text', e.target.value)}
                              placeholder="Kampanya metni..."
                              className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-sm font-bold focus:outline-none"
                            />
                            <input 
                              type="text" 
                              value={campaign.link}
                              onChange={(e) => updateCampaign(index, 'link', e.target.value)}
                              placeholder="Bağlantı URL (Opsiyonel)"
                              className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-medium text-blue-600 focus:outline-none"
                            />
                         </div>
                         <button 
                           onClick={() => removeCampaign(index)}
                           className="text-gray-300 hover:text-red-500 transition-colors p-2"
                         >
                            <Trash2 className="w-4 h-4" />
                         </button>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
