/**
 * File: src/lib/seo/site-url.ts
 * Module: lib/seo
 * Purpose: Single source of truth for resolving the canonical site URL for SEO.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-13
 * Notes:
 * - Prefers NEXT_PUBLIC_SITE_URL (recommended), then VERCEL_URL.
 * - Uses production domain fallback in prod, localhost fallback in dev.
 * - Normalizes protocol and strips trailing slashes for consistent canonicals.
 */

export const DEFAULT_PRODUCTION_SITE_URL =
  "https://www.shrigajananmaharajsanstan.com";
const CANONICAL_DOMAIN_APEX = "shrigajananmaharajsanstan.com";
let hasLoggedApexHostNormalization = false;
let hasLoggedInvalidSiteUrl = false;

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;

  const withProtocol =
    trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;

  return withProtocol.endsWith("/") ? withProtocol.slice(0, -1) : withProtocol;
}

/**
 * Emit structured SEO config logs for easier runtime diagnostics.
 */
function logSeoSiteUrlWarning(message: string, data?: Record<string, unknown>) {
  console.warn("seo-site-url-warning", {
    timestamp: Date.now(),
    message,
    ...(data ? { data } : {}),
  });
}

/**
 * Enforce stable canonical host style for this project domain.
 * Apex host gets normalized to www to avoid split-host index signals.
 */
function normalizeCanonicalHostname(hostname: string): string {
  if (hostname === CANONICAL_DOMAIN_APEX) {
    if (!hasLoggedApexHostNormalization) {
      hasLoggedApexHostNormalization = true;
      logSeoSiteUrlWarning(
        "Apex host provided in NEXT_PUBLIC_SITE_URL. Normalizing to www canonical host.",
        {
          providedHost: hostname,
          normalizedHost: `www.${CANONICAL_DOMAIN_APEX}`,
        }
      );
    }

    return `www.${CANONICAL_DOMAIN_APEX}`;
  }

  return hostname;
}

/**
 * Resolve and sanitize env-provided site URL to a stable origin.
 */
function getSanitizedSiteUrlFromEnv(rawEnvValue: string): string | null {
  const normalizedRawUrl = normalizeUrl(rawEnvValue);

  try {
    const parsedUrl = new URL(normalizedRawUrl);
    parsedUrl.hostname = normalizeCanonicalHostname(parsedUrl.hostname);
    parsedUrl.pathname = "/";
    parsedUrl.search = "";
    parsedUrl.hash = "";

    return parsedUrl.origin;
  } catch {
    if (!hasLoggedInvalidSiteUrl) {
      hasLoggedInvalidSiteUrl = true;
      logSeoSiteUrlWarning(
        "Invalid NEXT_PUBLIC_SITE_URL/VERCEL_URL value. Falling back to environment-aware defaults.",
        {
          providedValue: rawEnvValue,
          fallbackProductionUrl: DEFAULT_PRODUCTION_SITE_URL,
        }
      );
    }
    return null;
  }
}

/**
 * Resolve canonical site URL for metadata/robots/sitemap/schema.
 */
export function getSiteUrl(): string {
  const fromEnvRaw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  if (fromEnvRaw) {
    const sanitizedFromEnv = getSanitizedSiteUrlFromEnv(fromEnvRaw);
    if (sanitizedFromEnv) {
      return sanitizedFromEnv;
    }
  }

  if (process.env.NODE_ENV === "production") {
    return DEFAULT_PRODUCTION_SITE_URL;
  }

  return "http://localhost:3000";
}

export function getSiteUrlAsUrl(): URL {
  return new URL(getSiteUrl());
}

