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
import { login, clearError } from "@/redux/actions/userActions"
import { useEffect } from "react"

export function LoginForm({
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
      window.location.href = "/panel"
    }
  }, [isAuthenticated])

  const [identifier, setIdentifier] = useState("")
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [countryCode, setCountryCode] = useState("+90")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let finalIdentifier = identifier
    if (loginMethod === "phone") {
      const cleanedIdentifier = identifier.replace(/^0+/, '')
      finalIdentifier = `${countryCode}${cleanedIdentifier}`
    }

    const result = await dispatch(login({ identifier: finalIdentifier, password } as any))
    
    if (login.fulfilled.match(result)) {
      window.location.href = "/panel"
    } else if (result.payload && typeof result.payload === 'object' && 'requiresVerification' in result.payload) {
      const payload = result.payload as any;
      const param = payload.phone ? `phone=${encodeURIComponent(payload.phone)}` : `email=${encodeURIComponent(payload.email)}`;
      window.location.href = `/dogrulama?${param}`
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <FieldGroup className="gap-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Giriş Yap</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Hesabınıza giriş yapmak için bilgilerinizi girin
          </p>
        </div>
        {error && typeof error === 'string' && error !== "Giriş Yapılmamış" && (
          <FieldError>{error}</FieldError>
        )}
        <div className="flex bg-muted/50 p-1 rounded-full w-full border border-input/20">
          <button
            type="button"
            onClick={() => {
              setLoginMethod("email")
              setIdentifier("")
            }}
            className={cn(
              "flex-1 py-1.5 text-sm rounded-full transition-all duration-200",
              loginMethod === "email" ? "bg-white shadow-sm font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            E-posta
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginMethod("phone")
              setIdentifier("")
            }}
            className={cn(
              "flex-1 py-1.5 text-sm rounded-full transition-all duration-200",
              loginMethod === "phone" ? "bg-white shadow-sm font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Telefon
          </button>
        </div>
        <Field>
          <FieldLabel htmlFor="identifier">
            {loginMethod === "email" ? "E-posta Adresi" : "Telefon Numarası"}
          </FieldLabel>
          <div className="flex gap-2">
            {loginMethod === "phone" && (
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
            )}
            <Input 
              id="identifier" 
              type={loginMethod === "email" ? "email" : "tel"} 
              placeholder={loginMethod === "email" ? "ornek@email.com" : "5XX XXX XX XX"} 
              required 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              disabled={loading}
              className="rounded-full flex-1"
            />
          </div>
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Şifre</FieldLabel>
            <Link
              href="/sifremiunuttum"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Şifremi unuttum?
            </Link>
          </div>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"} 
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
          <Button type="submit" disabled={loading} className="rounded-full">
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Hesabınız yok mu?{" "}
            <Link href="/kayitol" className="underline underline-offset-4">
              Kayıt ol
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
