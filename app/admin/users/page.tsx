"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { getAllUsers, deleteUser } from "@/redux/actions/userActions"
import { 
  Users as UsersIcon, 
  Search, 
  MoreVertical, 
  Shield, 
  User as UserIcon,
  Trash2,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Square,
  CheckSquare,
  Loader2
} from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { server } from "@/config"

export default function UsersPage() {
  const dispatch = useAppDispatch()
  const { allUsers, usersLoading, userStats } = useAppSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bulkMessage, setBulkMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    dispatch(getAllUsers({}))
  }, [dispatch])

  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) {
      const result = await dispatch(deleteUser(id))
      if (deleteUser.fulfilled.match(result)) {
        toast.success("Kullanıcı silindi")
      } else {
        toast.error("Hata: " + result.payload)
      }
    }
  }

  const filteredUsers = allUsers.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.phone?.includes(searchTerm)
  )

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map(u => u._id))
    }
  }

  const toggleSelectUser = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(uid => uid !== id))
    } else {
      setSelectedUsers([...selectedUsers, id])
    }
  }

  const handleSendBulkMessage = async () => {
    if (!bulkMessage.trim()) return toast.error("Lütfen bir mesaj yazın")
    setIsSending(true)
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch(`${server}/admin/whatsapp-bulk`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userIds: selectedUsers,
          message: bulkMessage
        })
      })
      const result = await response.json()
      if (response.ok) {
        toast.success(`${result.success} kullanıcıya mesaj gönderildi. ${result.failed} başarısız.`)
        setIsModalOpen(false)
        setBulkMessage("")
        setSelectedUsers([])
      } else {
        toast.error("Mesaj gönderilemedi")
      }
    } catch (err) {
      toast.error("Bir hata oluştu")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <UsersIcon className="w-8 h-8 text-[#95BF47]" />
            Kullanıcı Yönetimi
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Sistemdeki tüm kayıtlı kullanıcıları yönetin.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {selectedUsers.length > 0 && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-black transition-all shadow-lg shadow-green-500/20"
            >
              <MessageSquare className="w-4 h-4" />
              WHATSAPP GÖNDER ({selectedUsers.length})
            </button>
          )}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Kullanıcı ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#95BF47]/20 transition-all w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Toplam", value: userStats?.total || 0, color: "bg-blue-500" },
          { label: "Admin", value: userStats?.admin || 0, color: "bg-purple-500" },
          { label: "Doğrulanmış", value: allUsers.filter(u => u.isVerified).length, color: "bg-green-500" },
          { label: "Aktif", value: userStats?.active || 0, color: "bg-[#95BF47]" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 w-10">
                  <button onClick={toggleSelectAll} className="text-gray-400 hover:text-[#95BF47] transition-colors">
                    {selectedUsers.length === filteredUsers.length && filteredUsers.length > 0 ? (
                      <CheckSquare className="w-5 h-5 text-[#95BF47]" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Kullanıcı</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Rol</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Durum</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium">
              {usersLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="w-8 h-8 border-4 border-[#95BF47]/20 border-t-[#95BF47] rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                   <td colSpan={4} className="px-6 py-20 text-center text-gray-400 italic">
                    Gösterilecek kullanıcı bulunamadı.
                  </td>
                </tr>
              ) : filteredUsers.map((u) => (
                <tr key={u._id} className={cn(
                  "hover:bg-gray-50/50 transition-colors",
                  selectedUsers.includes(u._id) && "bg-green-50/30"
                )}>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleSelectUser(u._id)} className="text-gray-400 hover:text-[#95BF47] transition-colors">
                      {selectedUsers.includes(u._id) ? (
                        <CheckSquare className="w-5 h-5 text-[#95BF47]" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
                        {u.profile?.picture ? (
                          <Image src={u.profile.picture} alt="" width={40} height={40} className="w-full h-full object-cover" />
                        ) : (
                          <UserIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{u.name}</p>
                        <div className="flex flex-col">
                          <p className="text-xs text-gray-500">{u.email}</p>
                          {u.phone && <p className="text-xs text-gray-400">{u.phone}</p>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {u.role === 'admin' ? <Shield className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                      {u.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       {u.isVerified ? (
                         <CheckCircle2 className="w-4 h-4 text-green-500" />
                       ) : (
                         <XCircle className="w-4 h-4 text-gray-300" />
                       )}
                       <span className={`text-xs ${u.isVerified ? 'text-green-600' : 'text-gray-400'}`}>
                         {u.isVerified ? 'Doğrulanmış' : 'Doğrulanmamış'}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDeleteUser(u._id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* WhatsApp Bulk Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Toplu Mesaj Gönder</h2>
                    <p className="text-xs text-gray-500 font-medium">{selectedUsers.length} kişi seçildi</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">MESAJ İÇERİĞİ</label>
                <textarea 
                  value={bulkMessage}
                  onChange={(e) => setBulkMessage(e.target.value)}
                  placeholder="Mesajınızı buraya yazın..."
                  rows={6}
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  İPTAL
                </button>
                <button 
                  onClick={handleSendBulkMessage}
                  disabled={isSending || !bulkMessage.trim()}
                  className="flex-1 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-green-500 hover:bg-green-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                >
                  {isSending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>GÖNDERMEYİ BAŞLAT</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
