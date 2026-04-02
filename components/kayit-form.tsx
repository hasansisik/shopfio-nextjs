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
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { register } from "@/redux/actions/userActions"

export function KayitForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.user)
  
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      return
    }

    const [firstName, ...lastNameParts] = name.split(" ")
    const lastName = lastNameParts.join(" ") || surname

    const result = await dispatch(register({ 
      name: firstName, 
      surname: lastName || firstName,
      email, 
      password 
    }))
    
    if (register.fulfilled.match(result)) {
      router.push(`/dogrulama?email=${encodeURIComponent(email)}`)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <FieldGroup>
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
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Şifre</FieldLabel>
          <Input 
            id="password" 
            type="password" 
            placeholder="Şifreniz" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">Şifre Tekrar</FieldLabel>
          <Input 
            id="confirmPassword" 
            type="password" 
            placeholder="Şifrenizi tekrar girin" 
            required 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
          {password && confirmPassword && password !== confirmPassword && (
            <FieldError>Şifreler eşleşmiyor</FieldError>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={loading || (password !== confirmPassword && confirmPassword !== "")}>
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
      </FieldGroup>
    </form>
  )
}

