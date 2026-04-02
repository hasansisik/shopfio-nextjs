"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { GalleryVerticalEnd, MailCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { verifyEmail, againEmail } from "@/redux/actions/userActions"

export default function DogrulamaPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const { loading, error, message } = useAppSelector((state) => state.user)
  
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [showCodeInput, setShowCodeInput] = useState(false)

  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
      setShowCodeInput(true)
    }
  }, [searchParams])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !verificationCode) {
      return
    }

    const result = await dispatch(verifyEmail({ 
      email, 
      verificationCode: Number(verificationCode) 
    }))
    
    if (verifyEmail.fulfilled.match(result)) {
      setTimeout(() => {
        router.push("/giris")
      }, 2000)
    }
  }

  const handleResend = async () => {
    if (!email) return
    await dispatch(againEmail(email))
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <FieldGroup>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="bg-primary/10 text-primary flex size-16 items-center justify-center rounded-full">
                  <MailCheck className="size-8" />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold">E-postanızı Doğrulayın</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    E-posta adresinize gönderdiğimiz doğrulama kodunu girin
                  </p>
                </div>
              </div>
              {error && typeof error === 'string' && (
                <FieldError>{error}</FieldError>
              )}
              {message && (
                <FieldDescription className="text-green-600 dark:text-green-400 text-center">
                  {message}
                </FieldDescription>
              )}
              {showCodeInput ? (
                <form onSubmit={handleVerify} className="flex flex-col gap-4">
                  {!email && (
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
                      />
                    </Field>
                  )}
                  <Field>
                    <FieldLabel htmlFor="code">Doğrulama Kodu</FieldLabel>
                    <Input 
                      id="code" 
                      type="text" 
                      placeholder="4 haneli kod" 
                      required 
                      maxLength={4}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                      disabled={loading}
                    />
                    <FieldDescription>
                      E-postanıza gönderilen 4 haneli kodu girin
                    </FieldDescription>
                  </Field>
                  <Field>
                    <Button type="submit" className="w-full" disabled={loading || !verificationCode || verificationCode.length !== 4}>
                      {loading ? "Doğrulanıyor..." : "Doğrula"}
                    </Button>
                  </Field>
                </form>
              ) : (
                <>
                  <Field>
                    <FieldDescription className="text-center">
                      E-postanızı kontrol edin ve doğrulama kodunu girin. 
                      Eğer e-postayı görmediyseniz spam klasörünü kontrol edin.
                    </FieldDescription>
                  </Field>
                  <Field>
                    <Button 
                      type="button" 
                      className="w-full" 
                      onClick={handleResend}
                      disabled={loading || !email}
                    >
                      {loading ? "Gönderiliyor..." : "Doğrulama E-postasını Tekrar Gönder"}
                    </Button>
                  </Field>
                </>
              )}
              <Field>
                <FieldDescription className="text-center">
                  <Link href="/giris" className="underline underline-offset-4">
                    ← Giriş sayfasına dön
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/authbg.png"
          alt="Auth Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

