/**
 * File: src/app/blog/category/[category]/page.tsx
 * Module: app/blog/category
 * Purpose: SEO landing page for blog posts filtered by category.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-15
 * Notes:
 * - Creates crawlable category archive pages for topical authority.
 * - Adds CollectionPage schema for category listings.
 */

import { notFound } from "next/navigation";
import { BlogCard } from "@/features/blog/components/BlogCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  formatTaxonomyLabel,
  getAllCategories,
  getPostsByCategory,
} from "@/lib/blog";
import { BRAND_VARIANTS, getUniqueKeywords } from "@/lib/seo/constants";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { getCollectionPageSchema } from "@/lib/seo/structured-data";

interface PageProps {
  params: Promise<{ category: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const posts = await getPostsByCategory(category);
  const categoryLabel = formatTaxonomyLabel(category);

  return generatePageMetadata({
    title: `${categoryLabel} Guides`,
    description: `Browse ${categoryLabel.toLowerCase()} guides and updates from Shri Gajanan Maharaj Sansthan.`,
    path: `/blog/category/${category}`,
    noIndex: posts.length === 0,
    keywords: getUniqueKeywords([
      ...BRAND_VARIANTS,
      `gajanan maharaj ${categoryLabel.toLowerCase()}`,
      `${categoryLabel.toLowerCase()} travel guide`,
      "sansthan category pages",
    ]),
  });
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const posts = await getPostsByCategory(category);

  if (posts.length === 0) {
    notFound();
  }

  const categoryLabel = formatTaxonomyLabel(category);
  const description = `Posts from the ${categoryLabel} category.`;
  const collectionSchema = getCollectionPageSchema({
    path: `/blog/category/${category}`,
    title: `${categoryLabel} Guides`,
    description,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      date: post.date,
      image: post.image,
      urlPath: `/blog/${post.slug}`,
    })),
  });

  return (
    <main className="container py-12 space-y-8">
      <StructuredData data={collectionSchema} />

      <Breadcrumbs
        items={[
          { name: "Blog", url: "/blog" },
          { name: categoryLabel, url: `/blog/category/${category}` },
        ]}
      />

      <div className="space-y-3">
        <h1 className="text-4xl font-bold font-heading">{categoryLabel} Guides</h1>
        <p className="text-muted-foreground text-lg">
          Location and pilgrimage knowledge organized for devotees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
