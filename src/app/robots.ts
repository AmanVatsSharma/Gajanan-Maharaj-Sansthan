/**
 * File: src/app/robots.ts
 * Module: app
 * Purpose: Enhanced robots.txt with specific rules for crawlers and sitemap reference
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Base URL derives from NEXT_PUBLIC_SITE_URL / VERCEL_URL with localhost fallback
 * - Allows all user agents to crawl the site
 * - Optimized for search engine crawling efficiency
 */
import type { MetadataRoute } from "next";

function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Disallow internal API routes and admin paths if any
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // Special rule for Google Images
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/gallery/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    // Host directive for canonical URL
    host: siteUrl,
  };
}

