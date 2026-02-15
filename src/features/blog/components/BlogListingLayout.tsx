/**
 * File: src/features/blog/components/BlogListingLayout.tsx
 * Module: features/blog
 * Purpose: Shared listing layout for blog archive and paginated pages.
 * Notes:
 * - Centralizes taxonomy chips + collection schema + pagination controls.
 * - Keeps /blog and /blog/page/[page] rendering consistent for SEO and UX.
 */

import Link from "next/link";
import { BlogCard } from "@/features/blog/components/BlogCard";
import { BlogPost, TaxonomySummary } from "@/lib/blog";
import { getCollectionPageSchema } from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";

interface BlogListingLayoutProps {
  posts: BlogPost[];
  categorySummaries: TaxonomySummary[];
  tagSummaries: TaxonomySummary[];
  currentPage: number;
  totalPages: number;
  pagePath: string;
  title: string;
  description: string;
}

function getPageHref(page: number): string {
  return page === 1 ? "/blog" : `/blog/page/${page}`;
}

export function BlogListingLayout({
  posts,
  categorySummaries,
  tagSummaries,
  currentPage,
  totalPages,
  pagePath,
  title,
  description,
}: BlogListingLayoutProps) {
  const collectionSchema = getCollectionPageSchema({
    path: pagePath,
    title: "Shri Gajanan Maharaj Sansthan Blog",
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
    <main className="container py-12 space-y-10">
      <StructuredData data={collectionSchema} />

      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold font-heading">{title}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">{description}</p>
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
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              aria-label="Blog pagination"
              className="flex flex-wrap items-center justify-center gap-2"
            >
              {currentPage > 1 && (
                <Link
                  href={getPageHref(currentPage - 1)}
                  className="rounded-md border px-3 py-2 text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  Previous
                </Link>
              )}

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <Link
                  key={page}
                  href={getPageHref(page)}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                    page === currentPage
                      ? "border-primary text-primary"
                      : "hover:border-primary hover:text-primary"
                  }`}
                >
                  {page}
                </Link>
              ))}

              {currentPage < totalPages && (
                <Link
                  href={getPageHref(currentPage + 1)}
                  className="rounded-md border px-3 py-2 text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  Next
                </Link>
              )}
            </nav>
          )}
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
