import type { NextConfig } from "next";

// Content Security Policy (CSP) tailored for Next.js, Framer Motion, Three.js, Mapbox, and Vercel Analytics
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://api.mapbox.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.mapbox.com;
  img-src 'self' blob: data: https://*.mapbox.com https://api.mapbox.com;
  font-src 'self' data: https://fonts.gstatic.com;
  connect-src 'self' https://*.mapbox.com https://api.mapbox.com https://events.mapbox.com https://vitals.vercel-insights.com https://va.vercel-scripts.com;
  worker-src 'self' blob:;
  child-src 'self' blob:;
  frame-ancestors 'none';
  form-action 'self';
  base-uri 'self';
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig: NextConfig = {
  /* Image Optimization Config - Restrictive and secure */
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: false,
    // Removed wildcard "**" to prevent SSRF and Image Optimizer DoS (GHSA-9g9p-9gw9-jx7f)
    remotePatterns: [],
  },

  /* Experimental Features */
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },

  /* Comprehensive Production Security Headers */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY", // Prevents clickjacking
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Prevents MIME sniffing
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
        ],
      },
    ];
  },
  poweredByHeader: false, // Disables the X-Powered-By: Next.js header
};

export default nextConfig;
