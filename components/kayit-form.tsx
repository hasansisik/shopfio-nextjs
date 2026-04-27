"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { register, clearError } from "@/redux/actions/userActions"
import { useEffect } from "react"

export function KayitForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.user)
  
  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/panel")
    }
  }, [isAuthenticated, router])

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [countryCode, setCountryCode] = useState("+90")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      return
    }

    const [firstName, ...lastNameParts] = name.split(" ")
    const lastName = lastNameParts.join(" ") || surname

    const cleanedPhone = phone.replace(/^0+/, '')
    const fullPhone = `${countryCode}${cleanedPhone}`
    
    const result = await dispatch(register({ 
      name, 
      email, 
      phone: fullPhone,
      password 
    }))
    
    if (register.fulfilled.match(result)) {
      router.push(`/dogrulama?phone=${encodeURIComponent(fullPhone)}`)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <FieldGroup className="gap-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Hesap Oluştur</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Yeni bir hesap oluşturmak için bilgilerinizi girin
          </p>
        </div>
        {error && typeof error === 'string' && (
          <FieldError>{error}</FieldError>
        )}
        <Field>
          <FieldLabel htmlFor="name">Ad Soyad</FieldLabel>
          <Input 
            id="name" 
            type="text" 
            placeholder="Adınız Soyadınız" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="rounded-full"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">E-posta</FieldLabel>
          <Input 
            id="email" 
            type="email" 
            placeholder="ornek@email.com" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="rounded-full"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">Telefon Numarası</FieldLabel>
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={loading}
                className="rounded-full border border-input bg-white pl-3 pr-8 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:opacity-50 appearance-none cursor-pointer h-9"
              >
                <option value="+90">🇹🇷 +90</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+49">🇩🇪 +49</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+39">🇮🇹 +39</option>
                <option value="+994">🇦🇿 +994</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground pointer-events-none" />
            </div>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="5XX XXX XX XX" 
              required 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
              className="rounded-full flex-1"
            />
          </div>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Şifre</FieldLabel>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Şifreniz" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="rounded-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">Şifre Tekrar</FieldLabel>
          <div className="relative">
            <Input 
              id="confirmPassword" 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Şifrenizi tekrar girin" 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              className="rounded-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {password && confirmPassword && password !== confirmPassword && (
            <FieldError>Şifreler eşleşmiyor</FieldError>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={loading || (password !== confirmPassword && confirmPassword !== "")} className="rounded-full">
            {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Zaten hesabınız var mı?{" "}
            <Link href="/giris" className="underline underline-offset-4">
              Giriş yap
            </Link>
          </FieldDescription>
        </Field>
        <Field className="mt-4">
          <FieldDescription className="text-center text-xs text-muted-foreground">
            Kaydolarak Hizmet Koşullarımızı ve Gizlilik Politikamızı kabul etmiş olursunuz. Ayrıca Gurmehub'dan ipuçları ve ürün güncellemeleri dahil hesapla ilgili e-postalar almayı da kabul edersiniz.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}

