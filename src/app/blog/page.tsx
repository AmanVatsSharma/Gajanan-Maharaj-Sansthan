/**
 * @file page.tsx
 * @module app/blog
 * @description Blog listing page
 * @author Aman Sharma / Novologic / Cursor AI
 * @created 2026-02-13
 */

import { generatePageMetadata } from "@/lib/seo/metadata";
import { getBlogPosts } from "@/lib/blog";
import { BlogCard } from "@/features/blog/components/BlogCard";

export const metadata = generatePageMetadata({
  title: "Blog",
  description: "Latest news, updates, and spiritual articles from Gajanan Maharaj Sansthan.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="container py-12 space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold font-heading">Latest Updates</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Stay connected with the latest news, events, and spiritual insights from the Sansthan.
        </p>
      </div>
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts found.</p>
        </div>
      )}
    </main>
  );
}
