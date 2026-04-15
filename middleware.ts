import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value
  const { pathname } = request.nextUrl

  // Protected routes: /panel and /admin
  if (!token && (pathname.startsWith('/panel') || pathname.startsWith('/admin'))) {
    const loginUrl = new URL('/giris', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Optional: Redirect away from auth pages if already logged in
  if (token && (pathname === '/giris' || pathname === '/kayit')) {
    return NextResponse.redirect(new URL('/panel', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/panel/:path*',
    '/admin/:path*',
    '/giris',
    '/kayit'
  ],
}
