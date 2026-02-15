/**
 * File: src/app/blog/page.tsx
 * Module: app/blog
 * Purpose: Blog listing page with taxonomy links and collection schema.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-15
 * Notes:
 * - Adds ItemList structured data for stronger listing-page SEO.
 * - Surfaces tag/category landing pages for internal linking.
 */

import { BlogListingLayout } from "@/features/blog/components/BlogListingLayout";
import {
  BLOG_POSTS_PER_PAGE,
  getBlogPosts,
  getCategorySummaries,
  getTagSummaries,
} from "@/lib/blog";
import {
  BRAND_VARIANTS,
  LOCATION_INTENT_KEYWORDS,
  getUniqueKeywords,
} from "@/lib/seo/constants";
import { generatePageMetadata } from "@/lib/seo/metadata";

const blogPageTitle = "Latest Updates";
const blogPageDescription =
  "Stay connected with the latest news, events, travel guides, and spiritual insights from Shri Gajanan Maharaj Sansthan.";

export const metadata = generatePageMetadata({
  title: "Blog",
  description: blogPageDescription,
  keywords: getUniqueKeywords([
    ...BRAND_VARIANTS,
    ...Object.values(LOCATION_INTENT_KEYWORDS).flat(),
    "shri gajanan maharaj sansthan blog",
    "shegaon pilgrimage guide",
    "omkareshwar pilgrimage guide",
    "pandharpur yatra guide",
    "trimbakeshwar darshan guide",
  ]),
  path: "/blog",
});

export default async function BlogPage() {
  const [posts, tagSummaries, categorySummaries] = await Promise.all([
    getBlogPosts(),
    getTagSummaries(),
    getCategorySummaries(),
  ]);
  const totalPages = Math.max(1, Math.ceil(posts.length / BLOG_POSTS_PER_PAGE));
  const firstPagePosts = posts.slice(0, BLOG_POSTS_PER_PAGE);

  return (
    <BlogListingLayout
      posts={firstPagePosts}
      categorySummaries={categorySummaries}
      tagSummaries={tagSummaries}
      currentPage={1}
      totalPages={totalPages}
      pagePath="/blog"
      title={blogPageTitle}
      description={blogPageDescription}
    />
  );
}
