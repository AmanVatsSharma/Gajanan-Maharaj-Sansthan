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
  hostRedirectEnabled: boolean;
}

const CANONICAL_DOMAIN_APEX = "shrigajananmaharajsanstan.com";
const DEFAULT_CANONICAL_ORIGIN = `https://www.${CANONICAL_DOMAIN_APEX}`;
const APP_HOST_REDIRECT_ENABLED =
  process.env.SEO_ENABLE_APP_HOST_REDIRECTS === "true";

/**
 * Emit structured SEO configuration diagnostics.
 * Keep payloads non-sensitive for safe CI/CD logs.
 */
function logSeoConfig(
  level: "info" | "warn",
  message: string,
  data?: Record<string, unknown>
) {
  const payload = {
    timestamp: Date.now(),
    message,
    ...(data ? { data } : {}),
  };

  if (level === "warn") {
    console.warn("seo-config-warning", payload);
    return;
  }

  console.info("seo-config-info", payload);
}

/**
 * Normalize canonical hostname to avoid split-host SEO drift.
 * We enforce www host for this project domain unless local/dev.
 */
function normalizeCanonicalHostname(hostname: string): string {
  if (hostname === CANONICAL_DOMAIN_APEX) {
    logSeoConfig("warn", "Apex canonical host detected; normalized to www host.", {
      detectedHost: hostname,
      normalizedHost: `www.${CANONICAL_DOMAIN_APEX}`,
    });
    return `www.${CANONICAL_DOMAIN_APEX}`;
  }

  return hostname;
}

/**
 * Parse and sanitize NEXT_PUBLIC_SITE_URL into canonical origin.
 * Handles invalid env values defensively with actionable diagnostics.
 */
function getCanonicalOriginFromEnv(rawUrl: string): string | null {
  const trimmedUrl = rawUrl.trim();
  const withProtocol =
    trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")
      ? trimmedUrl
      : `https://${trimmedUrl}`;

  try {
    const parsedUrl = new URL(withProtocol);
    parsedUrl.hostname = normalizeCanonicalHostname(parsedUrl.hostname);
    parsedUrl.pathname = "/";
    parsedUrl.search = "";
    parsedUrl.hash = "";

    return parsedUrl.origin;
  } catch {
    logSeoConfig("warn", "Invalid NEXT_PUBLIC_SITE_URL. Falling back to default canonical origin.", {
      rawUrl,
      fallbackOrigin: DEFAULT_CANONICAL_ORIGIN,
    });
    return null;
  }
}

function getCanonicalHostConfig(): CanonicalHostConfig | null {
  const canonicalOrigin =
    (process.env.NEXT_PUBLIC_SITE_URL
      ? getCanonicalOriginFromEnv(process.env.NEXT_PUBLIC_SITE_URL)
      : null) ?? DEFAULT_CANONICAL_ORIGIN;

  const parsedCanonicalUrl = new URL(canonicalOrigin);
  const canonicalHost = parsedCanonicalUrl.host;
  const isLocalHost =
    canonicalHost.includes("localhost") || canonicalHost.startsWith("127.0.0.1");

  if (isLocalHost) {
    logSeoConfig(
      "info",
      "Local canonical host detected. App-level host redirect disabled.",
      { canonicalOrigin, canonicalHost }
    );
    return {
      canonicalOrigin,
      canonicalHost,
      redirectFromHost: null,
      hostRedirectEnabled: false,
    };
  }

  const redirectFromHost = canonicalHost.startsWith("www.")
    ? canonicalHost.replace(/^www\./, "")
    : `www.${canonicalHost}`;

  if (!APP_HOST_REDIRECT_ENABLED) {
    logSeoConfig(
      "info",
      "App-level canonical host redirect is disabled. Set SEO_ENABLE_APP_HOST_REDIRECTS=true only when platform host redirects are aligned.",
      {
        canonicalOrigin,
        canonicalHost,
      }
    );
  } else {
    logSeoConfig("info", "App-level canonical host redirect is enabled.", {
      canonicalOrigin,
      canonicalHost,
      redirectFromHost:
        redirectFromHost === canonicalHost ? null : redirectFromHost,
    });
  }

  return {
    canonicalOrigin,
    canonicalHost,
    redirectFromHost:
      APP_HOST_REDIRECT_ENABLED && redirectFromHost !== canonicalHost
        ? redirectFromHost
        : null,
    hostRedirectEnabled: APP_HOST_REDIRECT_ENABLED,
  };
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
