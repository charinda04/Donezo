import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth/')
    
    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (token && isAuthPage) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    
    // If user is not authenticated and not on auth pages, redirect to login
    if (!token && !isAuthPage) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAuthPage = req.nextUrl.pathname.startsWith('/auth/')
        
        // Allow access to auth pages without token
        if (isAuthPage) {
          return true
        }
        
        // For all other pages, check if user has token
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}