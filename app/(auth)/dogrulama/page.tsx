"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Phone, MailCheck } from "lucide-react"

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
import { verifyEmail, verifySMS, againEmail, againSMS, clearError } from "@/redux/actions/userActions"
import { AuthBackgroundSlider } from "@/components/auth-background-slider"

function DogrulamaForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const { loading, error, message, isAuthenticated, isVerified, isPhoneVerified } = useAppSelector((state) => state.user)

  useEffect(() => {
    if (isAuthenticated && isVerified && isPhoneVerified) {
      router.push("/panel")
    }
  }, [isAuthenticated, isVerified, isPhoneVerified, router])

  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [showCodeInput, setShowCodeInput] = useState(false)

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  useEffect(() => {
    const emailParam = searchParams.get("email")
    const phoneParam = searchParams.get("phone")
    if (emailParam) {
      setEmail(emailParam)
      setShowCodeInput(true)
    }
    if (phoneParam) {
      setPhone(phoneParam)
      setShowCodeInput(true)
    }
  }, [searchParams])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if ((!email && !phone) || !verificationCode) {
      return
    }

    const result = phone 
      ? await dispatch(verifySMS({ phone, verificationCode: Number(verificationCode) }))
      : await dispatch(verifyEmail({ email, verificationCode: Number(verificationCode) }))

    if (verifySMS.fulfilled.match(result) || verifyEmail.fulfilled.match(result)) {
      setTimeout(() => {
        router.push("/panel")
      }, 1000)
    }
  }

  const handleResend = async () => {
    if (phone) {
      await dispatch(againSMS(phone))
    } else if (email) {
      await dispatch(againEmail(email))
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <img src="/logo.png" alt="shopfio Logo" className="h-8" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs transition-all duration-300">
            <FieldGroup className="gap-4">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="bg-primary/10 text-primary flex size-16 items-center justify-center rounded-full">
                  {phone ? <Phone className="size-8" /> : <MailCheck className="size-8" />}
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold">
                    {phone ? "Telefonunuzu Doğrulayın" : "E-postanızı Doğrulayın"}
                  </h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    {phone 
                      ? `${phone} numaralı telefonunuza gönderdiğimiz doğrulama kodunu girin`
                      : `${email} adresinize gönderdiğimiz doğrulama kodunu girin`}
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
                  {!email && !phone && (
                    <Field>
                      <FieldLabel htmlFor="email">E-posta veya Telefon</FieldLabel>
                      <Input
                        id="email"
                        type="text"
                        placeholder="ornek@email.com veya 05XX..."
                        required
                        value={email || phone}
                        onChange={(e) => {
                          if (e.target.value.includes('@')) setEmail(e.target.value);
                          else setPhone(e.target.value);
                        }}
                        disabled={loading}
                        className="rounded-full"
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
                      className="rounded-full"
                    />
                    <FieldDescription>
                      {phone 
                        ? "Telefonunuza gönderilen 4 haneli kodu girin"
                        : "E-postanıza gönderilen 4 haneli kodu girin"}
                    </FieldDescription>
                  </Field>
                  <Field>
                    <Button type="submit" className="w-full rounded-full" disabled={loading || !verificationCode || verificationCode.length !== 4}>
                      {loading ? "Doğrulanıyor..." : "Doğrula"}
                    </Button>
                  </Field>
                </form>
              ) : (
                <>
                  <Field>
                    <FieldDescription className="text-center">
                      {phone 
                        ? "Telefonunuzu kontrol edin ve doğrulama kodunu girin."
                        : "E-postanızı kontrol edin ve doğrulama kodunu girin. Eğer e-postayı görmediyseniz spam klasörünü kontrol edin."}
                    </FieldDescription>
                  </Field>
                  <Field>
                    <Button
                      type="button"
                      className="w-full rounded-full"
                      onClick={handleResend}
                      disabled={loading || (!email && !phone)}
                    >
                      {loading ? "Gönderiliyor..." : phone ? "Doğrulama Kodunu Tekrar Gönder" : "Doğrulama E-postasını Tekrar Gönder"}
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
        <div className="flex justify-center">
          <img src="https://gegify.com/assets/images/logo-black.png" alt="Gegify Logo" className="h-16" />
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block border-l">
        <AuthBackgroundSlider />
      </div>
    </div>
  )
}

export default function DogrulamaPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-svh items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    }>
      <DogrulamaForm />
    </Suspense>
  )
}

