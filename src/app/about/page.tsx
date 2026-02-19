/**
 * File: src/app/about/page.tsx
 * Module: app
 * Purpose: About page with Sansthan history, mission, and values
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-18
 * Notes:
 * - Entity-building SEO page
 * - Includes organization information for search engines
 * - Plan 3: "Explore Our Guides" section for blog interlinking
 */
import Link from "next/link";
import { sansthanHistory } from "@/data/sansthan-data";
import { getPostsBySlugs } from "@/lib/blog";
import { BlogCard } from "@/features/blog/components/BlogCard";
import { BRAND_VARIANTS, getUniqueKeywords } from "@/lib/seo/constants";
import { generatePageMetadata } from "@/lib/seo/metadata";

const ABOUT_EXPLORE_GUIDE_SLUGS = [
  "shegaon-travel-guide",
  "welcome-to-sansthan",
  "shegaon-accommodation-guide",
  "legacy-of-shri-gajanan-maharaj",
  "phone-and-whatsapp-booking-best-practices",
];

export const metadata = generatePageMetadata({
  title: "About Shri Gajanan Maharaj Sansthan | History & Mission",
  description: "Learn about Shri Gajanan Maharaj Sansthan, established in 1908. Discover our history, mission, values, and commitment to serving devotees with discipline, cleanliness, and devotion.",
  keywords: getUniqueKeywords([
    ...BRAND_VARIANTS,
    "gajanan maharaj sansthan",
    "shegaon temple history",
    "gajanan maharaj trust",
    "sansthan mission",
    "hindu temple organization",
  ]),
  path: "/about",
});

export default async function AboutPage() {
  const explorePosts = await getPostsBySlugs(ABOUT_EXPLORE_GUIDE_SLUGS);

  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold font-heading text-brand-maroon mb-6 text-center">About Sansthan</h1>
      
      <div className="prose prose-lg mx-auto text-muted-foreground">
        <p className="lead text-xl text-center mb-8 font-medium text-foreground">
          &quot;{sansthanHistory.motto}&quot;
        </p>
        
        <div className="bg-muted/30 p-8 rounded-xl border mb-8">
          <h2 className="text-2xl font-bold font-heading text-brand-maroon mb-4">Our History</h2>
          <p>
            {sansthanHistory.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
             <h3 className="text-xl font-bold font-heading text-brand-maroon mb-2">Mission</h3>
             <p>
               To provide spiritual solace and service to humanity through the teachings of Shri Gajanan Maharaj.
               We strive to maintain the highest standards of cleanliness, discipline, and devotion.
             </p>
          </div>
          <div>
             <h3 className="text-xl font-bold font-heading text-brand-maroon mb-2">Values</h3>
             <ul className="list-disc pl-5 space-y-1">
               <li>Seva (Service)</li>
               <li>Discipline</li>
               <li>Cleanliness</li>
               <li>Equality</li>
               <li>Devotion</li>
             </ul>
          </div>
        </div>

        {explorePosts.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold font-heading text-brand-maroon mb-4">Explore Our Guides</h2>
            <p className="text-muted-foreground mb-6">
              Plan your pilgrimage with our guides on Sansthan history, travel, accommodation, and devotional practices.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {explorePosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-medium text-brand-saffron hover:text-brand-maroon transition-colors"
              >
                View all guides
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
