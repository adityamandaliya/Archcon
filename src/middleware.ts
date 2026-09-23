import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extract visitor details for security logging
  const ip =
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const path = request.nextUrl.pathname;
  const method = request.method;
  const geoCity = request.headers.get("x-vercel-ip-city") || "unknown";
  const geoCountry = request.headers.get("x-vercel-ip-country") || "unknown";

  // Log only distinct page visits (exclude internal Next.js assets/images)
  if (
    !path.startsWith("/_next") &&
    !path.startsWith("/favicon.ico") &&
    !path.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|avif)$/)
  ) {
    console.log(
      `[SECURITY AUDIT] ${new Date().toISOString()} | IP: ${ip} | LOC: ${geoCity}, ${geoCountry} | ${method} ${path} | UA: ${userAgent}`
    );
  }

  const response = NextResponse.next();

  // Additional defense-in-depth security headers at Edge
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes have dedicated handlers)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
