/**
 * File: scripts/verify-seo-docs-sync.mjs
 * Module: scripts
 * Purpose: Ensure key SEO/docs inventory claims match the live content state.
 * Notes:
 * - Guards against stale post-count numbers in rollout docs.
 * - Verifies critical command references remain documented.
 */

import fs from "node:fs";
import path from "node:path";

const BLOG_ROOT = path.join(process.cwd(), "content/blog");
const MANIFEST_PATH = path.join(BLOG_ROOT, "_ops/generated-seo-cluster-manifest.json");

const DOC_PATHS = {
  blogReadme: path.join(BLOG_ROOT, "README.md"),
  setupGuide: path.join(process.cwd(), "docs/SEO_SETUP_GUIDE.md"),
  rolloutReport: path.join(process.cwd(), "docs/SEO_ROLLOUT_VERIFICATION_REPORT.md"),
  technicalSummary: path.join(process.cwd(), "docs/SEO_TECHNICAL_IMPLEMENTATION.md"),
  completionSummary: path.join(process.cwd(), "SEO_IMPLEMENTATION_COMPLETE.md"),
};

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

function readGeneratedCountFromManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    throw new Error(`Manifest not found at ${MANIFEST_PATH}`);
  }

  const parsed = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  if (!Array.isArray(parsed?.generatedFiles)) {
    throw new Error("Manifest missing generatedFiles[] array.");
  }

  return parsed.generatedFiles.length;
}

function assertIncludes(content, snippet, failures, context) {
  if (!content.includes(snippet)) {
    failures.push({
      check: "doc-snippet",
      context,
      reason: `Missing required snippet: "${snippet}"`,
    });
  }
}

function main() {
  const publishablePostCount = getMarkdownFiles(BLOG_ROOT).length;
  const generatedPostCount = readGeneratedCountFromManifest();
  const failures = [];

  console.info("seo-docs-sync-verify-start", {
    timestamp: Date.now(),
    publishablePostCount,
    generatedPostCount,
  });

  const blogReadme = fs.readFileSync(DOC_PATHS.blogReadme, "utf-8");
  const setupGuide = fs.readFileSync(DOC_PATHS.setupGuide, "utf-8");
  const rolloutReport = fs.readFileSync(DOC_PATHS.rolloutReport, "utf-8");
  const technicalSummary = fs.readFileSync(DOC_PATHS.technicalSummary, "utf-8");
  const completionSummary = fs.readFileSync(DOC_PATHS.completionSummary, "utf-8");

  assertIncludes(
    blogReadme,
    `Total publishable posts: **${publishablePostCount}**`,
    failures,
    "content/blog/README.md:post-count"
  );
  assertIncludes(
    blogReadme,
    "npm run verify:generator",
    failures,
    "content/blog/README.md:verify-generator-command"
  );

  assertIncludes(
    setupGuide,
    "npm run verify:generator",
    failures,
    "docs/SEO_SETUP_GUIDE.md:verify-generator-command"
  );

  assertIncludes(
    rolloutReport,
    `Publishable markdown blogs: **${publishablePostCount}**`,
    failures,
    "docs/SEO_ROLLOUT_VERIFICATION_REPORT.md:publishable-count"
  );
  assertIncludes(
    rolloutReport,
    `Generated new blog posts: **${generatedPostCount}**`,
    failures,
    "docs/SEO_ROLLOUT_VERIFICATION_REPORT.md:generated-count"
  );
  assertIncludes(
    rolloutReport,
    "npm run verify:generator",
    failures,
    "docs/SEO_ROLLOUT_VERIFICATION_REPORT.md:verify-generator-command"
  );

  assertIncludes(
    technicalSummary,
    `Blog inventory expanded to ${publishablePostCount} posts (${generatedPostCount} generated cluster posts + existing seed posts)`,
    failures,
    "docs/SEO_TECHNICAL_IMPLEMENTATION.md:inventory-counts"
  );

  assertIncludes(
    completionSummary,
    `added ${generatedPostCount} new markdown blogs (${publishablePostCount} total live posts)`,
    failures,
    "SEO_IMPLEMENTATION_COMPLETE.md:inventory-counts"
  );
  assertIncludes(
    completionSummary,
    "npm run verify:generator",
    failures,
    "SEO_IMPLEMENTATION_COMPLETE.md:verify-generator-command"
  );

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error("seo-docs-sync-verify-failure", {
        timestamp: Date.now(),
        ...failure,
      });
    }

    console.error("seo-docs-sync-verify-summary", {
      timestamp: Date.now(),
      status: "failed",
      failureCount: failures.length,
    });
    process.exit(1);
  }

  console.info("seo-docs-sync-verify-summary", {
    timestamp: Date.now(),
    status: "passed",
    publishablePostCount,
    generatedPostCount,
    checkedDocs: Object.keys(DOC_PATHS).length,
  });
}

try {
  main();
} catch (error) {
  console.error("seo-docs-sync-verify-failure", {
    timestamp: Date.now(),
    check: "unhandled-runtime-error",
    reason: error instanceof Error ? error.message : String(error),
  });
  process.exit(1);
}
