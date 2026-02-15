/**
 * File: src/app/blog/page/[page]/page.tsx
 * Module: app/blog/page/[page]
 * Purpose: Static paginated blog listing pages for large content inventories.
 * Notes:
 * - Improves blog UX and crawl path for 100+ markdown posts.
 * - Uses the same listing layout as `/blog` for consistent internal linking.
 */

import { notFound } from "next/navigation";
import { BlogListingLayout } from "@/features/blog/components/BlogListingLayout";
import {
  BLOG_POSTS_PER_PAGE,
  getBlogPosts,
  getCategorySummaries,
  getTagSummaries,
} from "@/lib/blog";
import { generatePageMetadata } from "@/lib/seo/metadata";
import {
  BRAND_VARIANTS,
  LOCATION_INTENT_KEYWORDS,
  getUniqueKeywords,
} from "@/lib/seo/constants";

interface PageProps {
  params: Promise<{ page: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / BLOG_POSTS_PER_PAGE));

  return Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter((page) => page > 1)
    .map((page) => ({ page: page.toString() }));
}

export async function generateMetadata({ params }: PageProps) {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    return generatePageMetadata({
      title: "Blog",
      description: "Blog page index.",
      path: "/blog",
      noIndex: true,
    });
  }

  return generatePageMetadata({
    title: `Blog - Page ${pageNumber}`,
    description: `Browse page ${pageNumber} of Shri Gajanan Maharaj Sansthan blog guides, location updates, and pilgrimage planning articles.`,
    keywords: getUniqueKeywords([
      ...BRAND_VARIANTS,
      ...Object.values(LOCATION_INTENT_KEYWORDS).flat(),
      `sansthan blog page ${pageNumber}`,
    ]),
    path: `/blog/page/${pageNumber}`,
  });
}

export default async function BlogPaginatedPage({ params }: PageProps) {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    notFound();
  }

  const [posts, tagSummaries, categorySummaries] = await Promise.all([
    getBlogPosts(),
    getTagSummaries(),
    getCategorySummaries(),
  ]);

  const totalPages = Math.max(1, Math.ceil(posts.length / BLOG_POSTS_PER_PAGE));
  if (pageNumber > totalPages) {
    notFound();
  }

  const startIndex = (pageNumber - 1) * BLOG_POSTS_PER_PAGE;
  const pagePosts = posts.slice(startIndex, startIndex + BLOG_POSTS_PER_PAGE);

  return (
    <BlogListingLayout
      posts={pagePosts}
      categorySummaries={categorySummaries}
      tagSummaries={tagSummaries}
      currentPage={pageNumber}
      totalPages={totalPages}
      pagePath={`/blog/page/${pageNumber}`}
      title={`Latest Updates - Page ${pageNumber}`}
      description="Continue reading location guides, accommodation help, and devotional planning resources."
    />
  );
}
