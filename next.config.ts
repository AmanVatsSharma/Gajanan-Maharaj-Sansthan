/**
 * File: next.config.ts
 * Module: root
 * Purpose: Next.js configuration optimized for SEO and Core Web Vitals
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-15
 * Notes:
 * - Image optimization enabled for better LCP scores
 * - Compression enabled for faster page loads
 * - Static page generation where possible
 * - Canonical redirect hygiene for legacy paths and feed aliases
 */
import type { NextConfig } from "next";

function getCanonicalHost(): string | null {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!rawUrl) {
    return null;
  }

  try {
    const parsedUrl = new URL(rawUrl);
    return parsedUrl.host.replace(/^www\./, "");
  } catch {
    return null;
  }
}

const canonicalHost = getCanonicalHost();

const nextConfig: NextConfig = {
  // Enable image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // Add remote patterns if using external image sources
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'example.com',
    //   },
    // ],
  },

  // Enable compression
  compress: true,

  // Power efficient build
  poweredByHeader: false,

  // Generate ETags for better caching
  generateEtags: true,

  // Optimize for static export where possible
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,

  // Strict mode for better React practices
  reactStrictMode: true,

  // Explicitly keep canonical no-trailing-slash URL style
  trailingSlash: false,

  async redirects() {
    const redirects = [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/feed",
        destination: "/feed.xml",
        permanent: true,
      },
    ];

    if (canonicalHost) {
      redirects.push({
        source: "/:path*",
        has: [{ type: "host", value: `www.${canonicalHost}` }],
        destination: `https://${canonicalHost}/:path*`,
        permanent: true,
      });
    }

    return redirects;
  },

  // Experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
