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
import { Eye, EyeOff } from "lucide-react"
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
      router.push("/panel")
    }
  }, [isAuthenticated, router])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = await dispatch(login({ email, password }))
    
    if (login.fulfilled.match(result)) {
      router.push("/panel")
    } else if (result.payload && typeof result.payload === 'object' && 'requiresVerification' in result.payload) {
      router.push(`/dogrulama?email=${encodeURIComponent(email)}`)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <FieldGroup className="gap-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Giriş Yap</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Hesabınıza giriş yapmak için e-posta ve şifrenizi girin
          </p>
        </div>
        {error && typeof error === 'string' && (
          <FieldError>{error}</FieldError>
        )}
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
