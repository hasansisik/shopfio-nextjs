

import { KayitForm } from "@/components/kayit-form"

export default function KayitOlPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <img src="/logo.png" alt="shopfio Logo" className="h-8" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <KayitForm />
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

