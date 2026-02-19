/**
 * File: src/app/blog/tag/[tag]/page.tsx
 * Module: app/blog/tag
 * Purpose: SEO landing page for blog posts filtered by tag.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-15
 * Notes:
 * - Statically generates known tags for better crawlability.
 * - Adds CollectionPage schema for richer tag listing signals.
 */

import { notFound } from "next/navigation";
import { BlogCard } from "@/features/blog/components/BlogCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  formatTaxonomyLabel,
  getAllTags,
  getPostsByTag,
  getPostsBySlugs,
} from "@/lib/blog";
import { BRAND_VARIANTS, getUniqueKeywords } from "@/lib/seo/constants";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { getCollectionPageSchema } from "@/lib/seo/structured-data";

const FEATURED_PILLAR_SLUGS = [
  "gajanan-maharaj-sansthan-complete-guide",
  "bhakta-niwas-complete-booking-guide",
  "how-to-book-bhakta-niwas-online",
  "phone-and-whatsapp-booking-best-practices",
  "shegaon-travel-guide",
];

interface PageProps {
  params: Promise<{ tag: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);
  const tagLabel = formatTaxonomyLabel(tag);

  return generatePageMetadata({
    title: `${tagLabel} Articles`,
    description: `Read ${tagLabel.toLowerCase()} articles, travel guides, and updates from Shri Gajanan Maharaj Sansthan.`,
    path: `/blog/tag/${tag}`,
    noIndex: posts.length === 0,
    keywords: getUniqueKeywords([
      ...BRAND_VARIANTS,
      `gajanan maharaj ${tagLabel.toLowerCase()}`,
      `${tagLabel.toLowerCase()} shegaon`,
      "sansthan blog",
    ]),
  });
}

export default async function BlogTagPage({ params }: PageProps) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);
  const featuredPosts = await getPostsBySlugs(FEATURED_PILLAR_SLUGS);

  if (posts.length === 0) {
    notFound();
  }

  const tagLabel = formatTaxonomyLabel(tag);
  const description = `Posts tagged with ${tagLabel}.`;
  const collectionSchema = getCollectionPageSchema({
    path: `/blog/tag/${tag}`,
    title: `${tagLabel} Articles`,
    description,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      date: post.date,
      image: post.image,
      urlPath: `/blog/${post.slug}`,
      keywords: post.keywords,
      category: post.category,
    })),
  });

  return (
    <main className="container py-12 space-y-8">
      <StructuredData data={collectionSchema} />

      <Breadcrumbs
        items={[
          { name: "Blog", url: "/blog" },
          { name: tagLabel, url: `/blog/tag/${tag}` },
        ]}
      />

      <div className="space-y-3">
        <h1 className="text-4xl font-bold font-heading">{tagLabel}</h1>
        <p className="text-muted-foreground text-lg">
          Explore related updates and guidance from the Sansthan.
        </p>
      </div>

      {featuredPosts.length > 0 ? (
        <section className="rounded-lg border bg-card p-6 space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Featured planning guides</h2>
            <p className="text-muted-foreground">
              Pillar guides curated for faster discovery across tags.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
