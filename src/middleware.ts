import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extract visitor details for security logging
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const path = request.nextUrl.pathname;
  const method = request.method;
  const geoCity = request.headers.get("x-vercel-ip-city") || "unknown";
  const geoCountry = request.headers.get("x-vercel-ip-country") || "unknown";

  // Log only distinct page visits (exclude static files/images to reduce noise)
  if (
    !path.startsWith("/_next") &&
    !path.startsWith("/favicon.ico") &&
    !path.match(/\.(jpg|jpeg|png|gif|svg|ico)$/)
  ) {
    console.log(
      `[SECURITY AUDIT] VISIT: ${new Date().toISOString()} | IP: ${ip} | LOC: ${geoCity}, ${geoCountry} | PATH: ${method} ${path} | UA: ${userAgent}`
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
