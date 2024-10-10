import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = ['http://127.0.0.1:5000']

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true', // Allow credentials (cookies)
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    if (isAllowedOrigin) {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          ...corsOptions,
        },
      })
    } else {
      return new NextResponse(null, {
        status: 403, // Forbidden if the origin is not allowed
        headers: {
          'Access-Control-Allow-Origin': 'null',
        },
      })
    }
  }

  // Check for session token to reroute logged-in users
  const token = request.cookies.get('session_token')?.value

  // Redirect to dashboard if user is logged in and trying to access login page
  if (token && request.nextUrl.pathname === '/login') {
    const dashboardUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  // Handle simple requests (non-preflight)
  const response = NextResponse.next()

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  // Set CORS headers for non-preflight requests
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: ['/api/:path*', '/login'], // Apply middleware to API and login routes
}
