/**
 * @file page.tsx
 * @module app/blog/[slug]
 * @description Single blog post page
 * @author Aman Sharma / Novologic / Cursor AI
 * @created 2026-02-13
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, User } from "lucide-react";
import {
  getBlogPost,
  getBlogPosts,
  getRelatedPosts,
  toTaxonomySlug,
} from "@/lib/blog";
import { BlogContent } from "@/features/blog/components/BlogContent";
import { BlogCard } from "@/features/blog/components/BlogCard";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { getArticleSchema, getHowToSchema } from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { sansthanLocations } from "@/data/sansthan-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {};
  }

  return generatePageMetadata({
    title: post.title,
    description: post.description,
    keywords: post.keywords || post.tags,
    image: post.image,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post, 5);
  const relatedLocations = (post.locationIds ?? [])
    .map((locationId) => sansthanLocations.find((location) => location.id === locationId))
    .filter((location): location is (typeof sansthanLocations)[number] => Boolean(location));

  const articleSchema = getArticleSchema({
    title: post.title,
    date: post.date,
    dateModified: post.lastModified,
    slug: post.slug,
    description: post.description,
    author: post.author,
    image: post.image,
    keywords: post.keywords,
    tags: post.tags,
    category: post.category,
  });

  const isGuide = post.category === "guides";
  const howToSteps = isGuide
    ? [
        "Plan your travel dates and darshan priority",
        "Contact Sansthan office for accommodation",
        "Prepare valid ID documents for all travelers",
        "Review our guides for route and timing details",
        "Visit the temple and complete your pilgrimage",
      ]
    : [];

  return (
    <main className="container py-12">
      <StructuredData data={articleSchema} />
      {isGuide && howToSteps.length > 0 && (
        <StructuredData
          data={getHowToSchema(
            post.title,
            post.description || "",
            howToSteps,
            `/blog/${post.slug}`
          )}
        />
      )}
      
      <div className="max-w-4xl mx-auto space-y-8">
        <Breadcrumbs 
          items={[
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ]} 
        />
        
        <header className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-heading leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime}</span>
              </div>
              {post.author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {post.category && (
              <Link href={`/blog/category/${toTaxonomySlug(post.category)}`}>
                <Badge variant="outline">{post.category}</Badge>
              </Link>
            )}

            {post.tags?.map((tag) => (
              <Link key={tag} href={`/blog/tag/${toTaxonomySlug(tag)}`}>
                <Badge variant="secondary">{tag}</Badge>
              </Link>
            ))}
          </div>
        </header>

        <div className="border-t my-8" />

        <article>
          <BlogContent content={post.content} />
        </article>

        {relatedLocations.length > 0 && (
          <section className="space-y-4 border-t pt-8">
            <h2 className="text-2xl font-bold font-heading">Related Sansthan Locations</h2>
            <p className="text-muted-foreground">
              Planning a visit? Explore accommodation and contact details for these locations.
            </p>
            <div className="flex flex-wrap gap-3">
              {relatedLocations.map((location) => (
                <Link
                  key={location.id}
                  href={`/locations/${location.id}`}
                  className="rounded-md border px-3 py-2 text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  {location.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="space-y-4 border-t pt-8">
            <h2 className="text-2xl font-bold font-heading">Related Articles</h2>
            <p className="text-muted-foreground">
              Continue reading guides and updates connected to this topic.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        )}

        {post.category && (
          <section className="space-y-2 border-t pt-8">
            <h2 className="text-lg font-semibold font-heading">Browse by Category</h2>
            <p className="text-muted-foreground text-sm">
              Explore more in{" "}
              <Link
                href={`/blog/category/${toTaxonomySlug(post.category)}`}
                className="font-medium text-brand-maroon hover:text-brand-saffron hover:underline"
              >
                {post.category}
              </Link>
              .
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
