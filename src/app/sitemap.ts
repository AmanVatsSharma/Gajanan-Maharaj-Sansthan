/**
 * File: src/app/sitemap.ts
 * Module: app
 * Purpose: Enhanced sitemap with images, optimized priorities, and better change frequencies
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Base URL derives from NEXT_PUBLIC_SITE_URL / VERCEL_URL with localhost fallback
 * - Includes image sitemap data for better image SEO
 * - Optimized priorities: Home (1.0), Booking (0.9), Locations main (0.9), Individual locations (0.8)
 * - Change frequencies based on content update patterns
 */
import type { MetadataRoute } from "next";

import { sansthanLocations } from "@/data/sansthan-data";
import { getBlogPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/seo/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const blogPosts = await getBlogPosts();

  // Static routes with optimized priorities
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/booking`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9, // High intent booking landing page
    },
    {
      url: `${siteUrl}/locations`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9, // High priority for locations listing
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Legal & Policy Pages
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/refund-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/disclaimer`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic location routes with images
  const locationRoutes: MetadataRoute.Sitemap = sansthanLocations.map((loc) => ({
    url: `${siteUrl}/locations/${loc.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8, // Higher priority for individual location pages
  }));

  // Dynamic blog routes
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...locationRoutes, ...blogRoutes];
}

