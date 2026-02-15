/**
 * File: scripts/verify-sitemap-coverage.mjs
 * Module: scripts
 * Purpose: Validate sitemap URL coverage against markdown and taxonomy inventory.
 * Notes:
 * - Compares expected URL count to generated sitemap entries.
 * - Verifies presence of all blog slugs, paginated blog pages, tag routes, and category routes.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_ROOT = path.join(process.cwd(), "content/blog");
const SITEMAP_XML_PATH = path.join(process.cwd(), ".next/server/app/sitemap.xml.body");
const SITE_ORIGIN = "https://www.shrigajananmaharajsanstan.com";
const BLOG_POSTS_PER_PAGE = 24;
const STATIC_ROUTE_COUNT = 10;
const LOCATION_ROUTE_COUNT = 6;

function getMarkdownFiles(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    return [];
  }

  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith("_")) {
      continue;
    }

    const normalizedName = entry.name.toLowerCase();
    if (normalizedName === "readme.md") {
      continue;
    }

    const fullPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
      continue;
    }

    if (entry.isFile() && normalizedName.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function toTaxonomySlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function toStringArray(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function getBlogInventory() {
  const markdownFiles = getMarkdownFiles(BLOG_ROOT);
  const posts = [];
  const tags = new Set();
  const categories = new Set();

  for (const filePath of markdownFiles) {
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(content);
    const slug = typeof data.slug === "string" ? data.slug.trim() : "";

    if (!slug) {
      continue;
    }

    posts.push(slug);
    for (const tag of toStringArray(data.tags)) {
      tags.add(toTaxonomySlug(tag));
    }

    if (typeof data.category === "string" && data.category.trim()) {
      categories.add(toTaxonomySlug(data.category));
    }
  }

  return {
    postSlugs: posts,
    tagSlugs: [...tags],
    categorySlugs: [...categories],
  };
}

function getSitemapUrls() {
  if (!fs.existsSync(SITEMAP_XML_PATH)) {
    console.error("sitemap-verify-error", {
      timestamp: Date.now(),
      message: "Sitemap XML body not found. Run npm run build first.",
      path: SITEMAP_XML_PATH,
    });
    process.exit(1);
  }

  const xml = fs.readFileSync(SITEMAP_XML_PATH, "utf-8");
  const urls = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;

  while ((match = locRegex.exec(xml)) !== null) {
    urls.push(match[1].trim());
  }

  return urls;
}

function assertPresence(urlSet, url, failures, check) {
  if (!urlSet.has(url)) {
    failures.push({
      check,
      reason: `Missing sitemap URL: ${url}`,
    });
  }
}

function main() {
  const inventory = getBlogInventory();
  const sitemapUrls = getSitemapUrls();
  const urlSet = new Set(sitemapUrls);
  const failures = [];

  const blogPostCount = inventory.postSlugs.length;
  const paginatedPageCount = Math.max(0, Math.ceil(blogPostCount / BLOG_POSTS_PER_PAGE) - 1);

  const expectedUrlCount =
    STATIC_ROUTE_COUNT +
    LOCATION_ROUTE_COUNT +
    blogPostCount +
    paginatedPageCount +
    inventory.tagSlugs.length +
    inventory.categorySlugs.length;

  console.info("sitemap-verify-start", {
    timestamp: Date.now(),
    sitemapPath: SITEMAP_XML_PATH,
    blogPostCount,
    tagCount: inventory.tagSlugs.length,
    categoryCount: inventory.categorySlugs.length,
    paginatedPageCount,
    expectedUrlCount,
    actualUrlCount: sitemapUrls.length,
  });

  if (sitemapUrls.length !== expectedUrlCount) {
    failures.push({
      check: "url-count",
      reason: `Expected ${expectedUrlCount} URLs but found ${sitemapUrls.length}`,
    });
  }

  for (const slug of inventory.postSlugs) {
    assertPresence(urlSet, `${SITE_ORIGIN}/blog/${slug}`, failures, "blog-post-route");
  }

  for (let page = 2; page <= paginatedPageCount + 1; page += 1) {
    assertPresence(urlSet, `${SITE_ORIGIN}/blog/page/${page}`, failures, "blog-pagination-route");
  }

  for (const tagSlug of inventory.tagSlugs) {
    assertPresence(urlSet, `${SITE_ORIGIN}/blog/tag/${tagSlug}`, failures, "blog-tag-route");
  }

  for (const categorySlug of inventory.categorySlugs) {
    assertPresence(
      urlSet,
      `${SITE_ORIGIN}/blog/category/${categorySlug}`,
      failures,
      "blog-category-route"
    );
  }

  if (failures.length > 0) {
    for (const failure of failures.slice(0, 20)) {
      console.error("sitemap-verify-failure", {
        timestamp: Date.now(),
        ...failure,
      });
    }

    console.error("sitemap-verify-summary", {
      timestamp: Date.now(),
      status: "failed",
      failureCount: failures.length,
    });
    process.exit(1);
  }

  console.info("sitemap-verify-summary", {
    timestamp: Date.now(),
    status: "passed",
    checkedUrls: sitemapUrls.length,
  });
}

try {
  main();
} catch (error) {
  console.error("sitemap-verify-failure", {
    timestamp: Date.now(),
    check: "unhandled-runtime-error",
    reason: error instanceof Error ? error.message : String(error),
  });
  process.exit(1);
}
