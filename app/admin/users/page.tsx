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
  XCircle
} from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

export default function UsersPage() {
  const dispatch = useAppDispatch()
  const { allUsers, usersLoading, userStats } = useAppSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState("")

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
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
                <tr key={u._id} className="hover:bg-gray-50/50 transition-colors">
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
                        <p className="text-xs text-gray-500">{u.email}</p>
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
    </div>
  )
}
