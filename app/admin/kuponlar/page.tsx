"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Plus, 
  Trash2, 
  Tag, 
  Calendar, 
  Percent, 
  Banknote, 
  Users, 
  Check, 
  X,
  Search,
  Package
} from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { 
  adminGetCoupons, 
  adminCreateCoupon, 
  adminDeleteCoupon,
  CreateCouponPayload 
} from "@/redux/actions/couponActions"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function CouponsPage() {
  const dispatch = useAppDispatch()
  const { coupons, loading, error } = useAppSelector((state) => state.coupon)
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  
  const [newCoupon, setNewCoupon] = useState<Partial<CreateCouponPayload>>({
    code: "",
    discountType: "percentage",
    discountValue: 0,
    usageLimit: null,
    expiresAt: null,
    applicablePackages: []
  })

  useEffect(() => {
    dispatch(adminGetCoupons())
  }, [dispatch])

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCoupon.code || !newCoupon.discountValue) {
      toast.error("Lütfen tüm alanları doldurun")
      return
    }

    try {
      await dispatch(adminCreateCoupon(newCoupon as CreateCouponPayload)).unwrap()
      toast.success("Kupon başarıyla oluşturuldu")
      setIsModalOpen(false)
      setNewCoupon({
        code: "",
        discountType: "percentage",
        discountValue: 0,
        usageLimit: null,
        expiresAt: null,
        applicablePackages: []
      })
    } catch (err: any) {
      toast.error(err || "Kupon oluşturulamadı")
    }
  }

  const handleDeleteCoupon = async (id: string) => {
    if (window.confirm("Bu kuponu silmek istediğinizden emin misiniz?")) {
      try {
        await dispatch(adminDeleteCoupon(id)).unwrap()
        toast.success("Kupon silindi")
      } catch (err) {
        toast.error("Kupon silinemedi")
      }
    }
  }

  const filteredCoupons = coupons.filter(c => 
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Kupon Yönetimi</h1>
          <p className="text-gray-500 font-medium">İndirim kodlarını oluşturun, takip edin ve yönetin.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#95BF47] transition-colors" />
            <input 
              type="text" 
              placeholder="Kupon kodu ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl w-full md:w-64 focus:ring-2 focus:ring-[#95BF47]/20 focus:border-[#95BF47] outline-none transition-all font-medium text-sm"
            />
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#95BF47] hover:bg-black text-white px-6 h-12 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-[#95BF47]/20 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Yeni Kupon Oluştur
          </Button>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-bottom border-gray-100">
                <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">KOD</th>
                <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">TÜR / DEĞER</th>
                <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">KULLANIM</th>
                <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">SON TARİH</th>
                <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">DURUM</th>
                <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">İŞLEMLER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-[#95BF47] border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm font-medium text-gray-400">Kuponlar yükleniyor...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredCoupons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-gray-500 font-medium">
                    Kupon bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredCoupons.map((coupon) => (
                  <tr key={coupon._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 group-hover:bg-[#95BF47] group-hover:text-white transition-colors">
                          <Tag className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-gray-900 tracking-tight">{coupon.code}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {coupon.discountType === 'percentage' ? (
                          <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold leading-none flex items-center gap-1">
                            <Percent className="w-3 h-3" />
                            %{coupon.discountValue} İndirim
                          </div>
                        ) : (
                          <div className="px-3 py-1 bg-[#95BF47]/10 text-[#95BF47] rounded-lg text-xs font-bold leading-none flex items-center gap-1">
                            <Banknote className="w-3 h-3" />
                            ₺{coupon.discountValue} İndirim
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                          <Users className="w-4 h-4 text-gray-400" />
                          {coupon.usedCount} / {coupon.usageLimit || '∞'}
                        </div>
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#95BF47] transition-all duration-500"
                            style={{ width: `${coupon.usageLimit ? (coupon.usedCount / coupon.usageLimit) * 100 : 10}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString('tr-TR') : 'Sınırsız'}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {coupon.isActive ? (
                        <div className="flex items-center gap-2 text-[#95BF47] font-bold text-xs uppercase tracking-wider">
                          <div className="w-2 h-2 rounded-full bg-[#95BF47]" />
                          AKTİF
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-wider">
                          <div className="w-2 h-2 rounded-full bg-gray-400" />
                          PASİF
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => handleDeleteCoupon(coupon._id)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden"
          >
            <div className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-[#95BF47]/10 rounded-2xl flex items-center justify-center">
                  <Tag className="w-7 h-7 text-[#95BF47]" />
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-300 hover:text-gray-900 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Yeni İndirim Kuponu</h3>
                <p className="text-sm font-medium text-gray-500">Kullanıcılara özel indirimler tanımlayın.</p>
              </div>

              <form onSubmit={handleCreateCoupon} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Kupon Kodu</label>
                    <input 
                      type="text"
                      placeholder="Örn: YAZ20"
                      value={newCoupon.code}
                      onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                      className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-5 text-sm font-bold focus:bg-white focus:border-[#95BF47] outline-none transition-all uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">İndirim Türü</label>
                      <select 
                        value={newCoupon.discountType}
                        onChange={(e) => setNewCoupon({...newCoupon, discountType: e.target.value as any})}
                        className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-5 text-sm font-bold focus:bg-white focus:border-[#95BF47] outline-none transition-all"
                      >
                        <option value="percentage">Yüzde (%)</option>
                        <option value="fixed">Sabit Tutar (₺)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">İndirim Değeri</label>
                      <input 
                        type="number"
                        placeholder="Örn: 20"
                        value={newCoupon.discountValue}
                        onChange={(e) => setNewCoupon({...newCoupon, discountValue: parseInt(e.target.value)})}
                        className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-5 text-sm font-bold focus:bg-white focus:border-[#95BF47] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Kullanım Sınırı</label>
                      <input 
                        type="number"
                        placeholder="Sınırsız için boş bırakın"
                        value={newCoupon.usageLimit || ""}
                        onChange={(e) => setNewCoupon({...newCoupon, usageLimit: e.target.value ? parseInt(e.target.value) : null})}
                        className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-5 text-sm font-bold focus:bg-white focus:border-[#95BF47] outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Son Tarih</label>
                      <input 
                        type="date"
                        value={newCoupon.expiresAt || ""}
                        onChange={(e) => setNewCoupon({...newCoupon, expiresAt: e.target.value})}
                        className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-5 text-sm font-bold focus:bg-white focus:border-[#95BF47] outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 h-14 rounded-2xl bg-gray-50 text-gray-500 hover:bg-gray-100 font-bold text-sm"
                  >
                    Vazgeç
                  </Button>
                  <Button 
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-14 rounded-2xl bg-[#95BF47] text-white hover:bg-black font-bold text-sm shadow-xl shadow-[#95BF47]/20 transition-all active:scale-95"
                  >
                    {loading ? "Oluşturuluyor..." : "Kuponu Oluştur"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
