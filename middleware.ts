// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // const token = request.cookies.get('auth-token')
  
  // // Check if accessing protected routes
  // if (request.nextUrl.pathname.startsWith('/dashboard') || 
  //     request.nextUrl.pathname.startsWith('/admin') ||
  //     request.nextUrl.pathname.startsWith('/accept-invitation')) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL('/sign-in', request.url))
  //   }
  // }
}