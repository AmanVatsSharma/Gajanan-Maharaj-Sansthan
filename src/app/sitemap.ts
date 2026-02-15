/**
 * File: src/app/sitemap.ts
 * Module: app
 * Purpose: Generate sitemap entries for static pages, locations, blog posts, tags, and categories.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-15
 * Notes:
 * - Uses post-level lastModified timestamps for fresher crawl signals.
 * - Includes taxonomy archive URLs to improve discovery of content clusters.
 */
import type { MetadataRoute } from "next";

import { sansthanLocations } from "@/data/sansthan-data";
import {
  getAllCategories,
  getAllTags,
  getBlogPosts,
  toTaxonomySlug,
} from "@/lib/blog";
import { getSiteUrl } from "@/lib/seo/site-url";

function getLatestBlogDate(
  posts: Array<{ date: string; lastModified?: string }>
): Date | null {
  if (posts.length === 0) {
    return null;
  }

  const timestamps = posts.map((post) =>
    new Date(post.lastModified || post.date).getTime()
  );
  return new Date(Math.max(...timestamps));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const [blogPosts, tags, categories] = await Promise.all([
    getBlogPosts(),
    getAllTags(),
    getAllCategories(),
  ]);
  const latestBlogDate = getLatestBlogDate(blogPosts) ?? now;

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
      lastModified: latestBlogDate,
      changeFrequency: "weekly",
      priority: 0.85,
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
    lastModified: new Date(post.lastModified || post.date),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => {
    const tagPosts = blogPosts.filter((post) =>
      (post.tags ?? []).some((postTag) => toTaxonomySlug(postTag) === tag)
    );

    return {
      url: `${siteUrl}/blog/tag/${tag}`,
      lastModified: getLatestBlogDate(tagPosts) ?? latestBlogDate,
      changeFrequency: "weekly" as const,
      priority: 0.65,
    };
  });

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => {
    const categoryPosts = blogPosts.filter((post) =>
      post.category ? toTaxonomySlug(post.category) === category : false
    );

    return {
      url: `${siteUrl}/blog/category/${category}`,
      lastModified: getLatestBlogDate(categoryPosts) ?? latestBlogDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...locationRoutes, ...blogRoutes, ...tagRoutes, ...categoryRoutes];
}

