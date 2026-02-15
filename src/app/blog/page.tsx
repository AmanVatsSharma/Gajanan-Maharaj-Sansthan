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

import Link from "next/link";
import { BlogCard } from "@/features/blog/components/BlogCard";
import {
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
import { getCollectionPageSchema } from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";

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

  const collectionSchema = getCollectionPageSchema({
    path: "/blog",
    title: "Shri Gajanan Maharaj Sansthan Blog",
    description: blogPageDescription,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      date: post.date,
      image: post.image,
      urlPath: `/blog/${post.slug}`,
    })),
  });

  return (
    <main className="container py-12 space-y-10">
      <StructuredData data={collectionSchema} />

      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold font-heading">{blogPageTitle}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">{blogPageDescription}</p>
      </div>

      {categorySummaries.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold font-heading">Browse by Category</h2>
          <div className="flex flex-wrap gap-2">
            {categorySummaries.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="rounded-full border px-3 py-1 text-sm hover:border-primary hover:text-primary transition-colors"
              >
                {category.label} ({category.count})
              </Link>
            ))}
          </div>
        </section>
      )}

      {tagSummaries.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold font-heading">Popular Topics</h2>
          <div className="flex flex-wrap gap-2">
            {tagSummaries.map((tag) => (
              <Link
                key={tag.slug}
                href={`/blog/tag/${tag.slug}`}
                className="rounded-full border px-3 py-1 text-sm hover:border-primary hover:text-primary transition-colors"
              >
                {tag.label} ({tag.count})
              </Link>
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No blog posts found. Add markdown files in content/blog to publish updates.
          </p>
        </div>
      )}
    </main>
  );
}
