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

interface CanonicalHostConfig {
  canonicalOrigin: string;
  canonicalHost: string;
  redirectFromHost: string | null;
}

function getCanonicalHostConfig(): CanonicalHostConfig | null {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!rawUrl) {
    return null;
  }

  try {
    const parsedUrl = new URL(rawUrl);
    const canonicalHost = parsedUrl.host;
    const isLocalHost =
      canonicalHost.includes("localhost") || canonicalHost.startsWith("127.0.0.1");

    if (isLocalHost) {
      return null;
    }

    const redirectFromHost = canonicalHost.startsWith("www.")
      ? canonicalHost.replace(/^www\./, "")
      : `www.${canonicalHost}`;

    return {
      canonicalOrigin: `${parsedUrl.protocol}//${canonicalHost}`,
      canonicalHost,
      redirectFromHost:
        redirectFromHost === canonicalHost ? null : redirectFromHost,
    };
  } catch {
    console.warn("seo-config-warning", {
      timestamp: Date.now(),
      message: "Invalid NEXT_PUBLIC_SITE_URL. Canonical redirect not configured.",
      value: rawUrl,
    });
    return null;
  }
}

const canonicalHostConfig = getCanonicalHostConfig();

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
    const redirects: Array<{
      source: string;
      destination: string;
      permanent: boolean;
      has?: Array<{ type: "host"; value: string }>;
    }> = [
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

    if (canonicalHostConfig?.redirectFromHost) {
      redirects.push({
        source: "/:path*",
        has: [{ type: "host", value: canonicalHostConfig.redirectFromHost }],
        destination: `${canonicalHostConfig.canonicalOrigin}/:path*`,
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
