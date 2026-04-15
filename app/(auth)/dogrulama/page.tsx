"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MailCheck } from "lucide-react"

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
import { verifyEmail, againEmail, clearError } from "@/redux/actions/userActions"

function DogrulamaForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const { loading, error, message, isAuthenticated, isVerified } = useAppSelector((state) => state.user)

  useEffect(() => {
    if (isAuthenticated && isVerified) {
      router.push("/panel")
    }
  }, [isAuthenticated, isVerified, router])

  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [showCodeInput, setShowCodeInput] = useState(false)

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

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
                      E-postanıza gönderilen 4 haneli kodu girin
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
                      E-postanızı kontrol edin ve doğrulama kodunu girin.
                      Eğer e-postayı görmediyseniz spam klasörünü kontrol edin.
                    </FieldDescription>
                  </Field>
                  <Field>
                    <Button
                      type="button"
                      className="w-full rounded-full"
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
        <div className="flex justify-center">
          <img src="https://gegify.com/assets/images/logo-black.png" alt="Gegify Logo" className="h-16" />
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

