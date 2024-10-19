import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const allowedOrigins = ['http://127.0.0.1:5000'];

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true', // Allow credentials
};

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    if (isAllowedOrigin) {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          ...corsOptions, // Include all CORS options for preflight
        },
      });
    } else {
      return new NextResponse(null, {
        status: 403, // Forbidden if the origin is not allowed
        headers: {
          'Access-Control-Allow-Origin': 'null',
        },
      });
    }
  }

  // Check for session token to reroute logged-in users
  const token = request.cookies.get('session_token')?.value;

  // Redirect to dashboard if user is logged in and trying to access the login page
  if (token && request.nextUrl.pathname === '/login') {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Handle simple requests (non-preflight)
  const response = NextResponse.next();

  // Set CORS headers for non-preflight requests if the origin is allowed
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true'); // Only set this once
  }

  // Set other CORS headers
  Object.entries(corsOptions).forEach(([key, value]) => {
    if (key !== 'Access-Control-Allow-Credentials') { // Prevent duplication
      response.headers.set(key, value);
    }
  });

  return response;
}

export const config = {
  matcher: ['/api/:path*', '/login'], // Apply middleware to API and login routes
};
