/**
 * File: scripts/verify-rss-feed.mjs
 * Module: scripts
 * Purpose: Validate generated RSS feed output and coverage.
 * Notes:
 * - Executes compiled feed route handler after build.
 * - Ensures feed item count matches markdown post inventory.
 * - Checks key RSS markers for discoverability.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_ROOT = path.join(process.cwd(), "content/blog");
const FEED_ROUTE_MODULE_PATH = path.join(
  process.cwd(),
  ".next/server/app/feed.xml/route.js"
);
const SITE_ORIGIN = "https://www.shrigajananmaharajsanstan.com";

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

function getBlogPostCount() {
  const markdownFiles = getMarkdownFiles(BLOG_ROOT);
  let count = 0;

  for (const filePath of markdownFiles) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    if (typeof data.slug === "string" && data.slug.trim()) {
      count += 1;
    }
  }

  return count;
}

function countOccurrences(text, token) {
  if (!text) return 0;
  return text.split(token).length - 1;
}

async function getFeedXml() {
  if (!fs.existsSync(FEED_ROUTE_MODULE_PATH)) {
    console.error("rss-verify-error", {
      timestamp: Date.now(),
      message: "Compiled feed route module not found. Run npm run build first.",
      path: FEED_ROUTE_MODULE_PATH,
    });
    process.exit(1);
  }

  const importedModule = await import(FEED_ROUTE_MODULE_PATH);
  const resolvedModule =
    importedModule?.routeModule || importedModule?.default?.routeModule;
  const getHandler = resolvedModule?.userland?.GET;
  if (typeof getHandler !== "function") {
    console.error("rss-verify-error", {
      timestamp: Date.now(),
      message: "Could not resolve feed GET handler from route module.",
    });
    process.exit(1);
  }

  const response = await getHandler();
  if (!response || typeof response.text !== "function") {
    console.error("rss-verify-error", {
      timestamp: Date.now(),
      message: "Feed GET handler returned unexpected response object.",
    });
    process.exit(1);
  }

  const xml = await response.text();
  return { xml, status: response.status };
}

async function main() {
  console.info("rss-verify-start", {
    timestamp: Date.now(),
    blogRoot: BLOG_ROOT,
    routeModulePath: FEED_ROUTE_MODULE_PATH,
  });

  const expectedPostCount = getBlogPostCount();
  const { xml, status } = await getFeedXml();
  const itemCount = countOccurrences(xml, "<item>");
  const failures = [];

  if (status !== 200) {
    failures.push(`Expected HTTP status 200 from feed handler, received ${status}`);
  }

  if (!xml.includes("<rss version=\"2.0\"")) {
    failures.push("Missing RSS root element with version 2.0.");
  }

  if (!xml.includes("<channel>")) {
    failures.push("Missing channel element in RSS feed.");
  }

  if (!xml.includes(`${SITE_ORIGIN}/feed.xml`)) {
    failures.push(`Missing self-referencing atom link to ${SITE_ORIGIN}/feed.xml`);
  }

  if (itemCount !== expectedPostCount) {
    failures.push(
      `Feed item count mismatch. Expected ${expectedPostCount} items, found ${itemCount}.`
    );
  }

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error("rss-verify-failure", {
        timestamp: Date.now(),
        reason: failure,
      });
    }

    console.error("rss-verify-summary", {
      timestamp: Date.now(),
      status: "failed",
      expectedPostCount,
      itemCount,
      failureCount: failures.length,
    });
    process.exit(1);
  }

  console.info("rss-verify-summary", {
    timestamp: Date.now(),
    status: "passed",
    expectedPostCount,
    itemCount,
  });
}

try {
  await main();
} catch (error) {
  console.error("rss-verify-failure", {
    timestamp: Date.now(),
    reason: error instanceof Error ? error.message : String(error),
    check: "unhandled-runtime-error",
  });
  process.exit(1);
}
