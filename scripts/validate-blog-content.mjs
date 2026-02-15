/**
 * File: scripts/validate-blog-content.mjs
 * Module: scripts
 * Purpose: Validate SEO markdown blog quality before deployment.
 * Notes:
 * - Fast-fails on critical issues (duplicate slugs, invalid frontmatter, missing internal linking).
 * - Emits detailed console diagnostics for easier debugging and editorial fixes.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_ROOT = path.join(process.cwd(), "content/blog");
const KNOWN_LOCATION_IDS = new Set([
  "shegaon-bhakt-niwas",
  "shegaon-anand-vihar",
  "shegaon-visawa",
  "pandharpur-math",
  "trimbakeshwar",
  "omkareshwar",
]);
const VALID_CATEGORIES = new Set(["locations", "guides", "spiritual", "events"]);
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Crawl markdown files recursively.
 * Ignores underscore-prefixed folders/files and README docs.
 */
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

function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

/**
 * Extract markdown internal links like `/blog/...`, `/locations/...`.
 */
function extractInternalLinks(content) {
  const links = [];
  const regex = /\[[^\]]+\]\((\/[^)]+)\)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    links.push(match[1]);
  }

  return links;
}

function validatePost(filePath, slugRegistry) {
  const relativeFilePath = path.relative(BLOG_ROOT, filePath);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const errors = [];
  const warnings = [];

  const title = typeof data.title === "string" ? data.title.trim() : "";
  const description =
    typeof data.description === "string" ? data.description.trim() : "";
  const slug = typeof data.slug === "string" ? data.slug.trim() : "";
  const date = typeof data.date === "string" ? data.date.trim() : "";
  const category = typeof data.category === "string" ? data.category.trim() : "";
  const keywords = toArray(data.keywords);
  const tags = toArray(data.tags);
  const locationIds = toArray(data.locationIds);
  const relatedSlugs = toArray(data.relatedSlugs);
  const internalLinks = extractInternalLinks(content);

  if (!title) errors.push("Missing frontmatter.title");
  if (!description) errors.push("Missing frontmatter.description");
  if (!slug) errors.push("Missing frontmatter.slug");
  if (!date) errors.push("Missing frontmatter.date");
  if (!category) errors.push("Missing frontmatter.category");

  if (slug && !SLUG_PATTERN.test(slug)) {
    errors.push(`Invalid slug format "${slug}" (use lowercase kebab-case only)`);
  }

  if (slug) {
    const existing = slugRegistry.get(slug);
    if (existing) {
      errors.push(`Duplicate slug "${slug}" also used in ${existing}`);
    } else {
      slugRegistry.set(slug, relativeFilePath);
    }
  }

  if (date && Number.isNaN(Date.parse(date))) {
    errors.push(`Invalid date format "${date}"`);
  }

  if (keywords.length < 3) {
    warnings.push("keywords should include at least 3 phrases");
  }

  if (tags.length < 2) {
    warnings.push("tags should include at least 2 entries");
  }

  if (category && !VALID_CATEGORIES.has(category)) {
    warnings.push(`category "${category}" not in recommended set`);
  }

  if (locationIds.length === 0) {
    warnings.push("locationIds missing (recommended for location-intent SEO)");
  }

  for (const locationId of locationIds) {
    if (!KNOWN_LOCATION_IDS.has(locationId)) {
      errors.push(`Unknown locationId "${locationId}"`);
    }
  }

  if (relatedSlugs.length < 2) {
    warnings.push("relatedSlugs should include at least 2 internal post slugs");
  }

  if (content.trim().length < 900) {
    warnings.push("content appears thin (<900 chars). Consider richer details.");
  }

  if (internalLinks.length < 3) {
    errors.push("At least 3 internal links are required");
  }

  const hasLocationLink = internalLinks.some((link) => link.startsWith("/locations/"));
  const hasIntentLink = internalLinks.some(
    (link) => link.startsWith("/booking") || link.startsWith("/contact")
  );
  const hasBlogLink = internalLinks.some((link) => link.startsWith("/blog/"));

  if (!hasLocationLink) {
    errors.push("Missing required link to a /locations/* page");
  }

  if (!hasIntentLink) {
    errors.push("Missing required booking/contact intent link");
  }

  if (!hasBlogLink) {
    errors.push("Missing required internal link to another /blog/* post");
  }

  return {
    relativeFilePath,
    slug,
    category,
    errors,
    warnings,
  };
}

function printResultSummary(results) {
  const totalPosts = results.length;
  const totalWarnings = results.reduce((sum, item) => sum + item.warnings.length, 0);
  const totalErrors = results.reduce((sum, item) => sum + item.errors.length, 0);

  const categoryCounts = results.reduce((acc, item) => {
    const key = item.category || "uncategorized";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  console.info("blog-validation-summary", {
    timestamp: Date.now(),
    totalPosts,
    totalWarnings,
    totalErrors,
    categoryCounts,
  });
}

function main() {
  const markdownFiles = getMarkdownFiles(BLOG_ROOT);
  console.info("blog-validation-start", {
    timestamp: Date.now(),
    blogRoot: BLOG_ROOT,
    markdownFileCount: markdownFiles.length,
  });

  if (markdownFiles.length === 0) {
    console.error("blog-validation-error", {
      timestamp: Date.now(),
      message: "No markdown files found under content/blog",
    });
    process.exit(1);
  }

  const slugRegistry = new Map();
  const results = markdownFiles.map((filePath) => validatePost(filePath, slugRegistry));

  for (const result of results) {
    if (result.warnings.length > 0) {
      console.warn("blog-validation-warning", {
        timestamp: Date.now(),
        file: result.relativeFilePath,
        slug: result.slug,
        warnings: result.warnings,
      });
    }

    if (result.errors.length > 0) {
      console.error("blog-validation-error", {
        timestamp: Date.now(),
        file: result.relativeFilePath,
        slug: result.slug,
        errors: result.errors,
      });
    }
  }

  printResultSummary(results);

  const totalErrors = results.reduce((sum, item) => sum + item.errors.length, 0);
  if (totalErrors > 0) {
    process.exit(1);
  }

  console.info("blog-validation-success", {
    timestamp: Date.now(),
    message: "All blog posts passed critical SEO/content validation checks.",
  });
}

main();
