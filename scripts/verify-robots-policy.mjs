/**
 * File: scripts/verify-robots-policy.mjs
 * Module: scripts
 * Purpose: Validate generated robots.txt policy and directives.
 * Notes:
 * - Ensures canonical Host + Sitemap directives are present.
 * - Verifies core crawler allow/disallow directives expected by this project.
 */

import fs from "node:fs";
import path from "node:path";

const ROBOTS_BODY_PATH = path.join(process.cwd(), ".next/server/app/robots.txt.body");
const EXPECTED_HOST = "Host: https://www.shrigajananmaharajsanstan.com";
const EXPECTED_SITEMAP =
  "Sitemap: https://www.shrigajananmaharajsanstan.com/sitemap.xml";
const REQUIRED_LINES = [
  "User-Agent: *",
  "Allow: /",
  "Disallow: /api/",
  "Disallow: /admin/",
  "User-Agent: Googlebot-Image",
  "Allow: /images/",
  "Allow: /gallery/",
  EXPECTED_HOST,
  EXPECTED_SITEMAP,
];

function normalize(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function main() {
  console.info("robots-verify-start", {
    timestamp: Date.now(),
    robotsPath: ROBOTS_BODY_PATH,
  });

  if (!fs.existsSync(ROBOTS_BODY_PATH)) {
    console.error("robots-verify-error", {
      timestamp: Date.now(),
      message: "robots.txt build artifact not found. Run npm run build first.",
      path: ROBOTS_BODY_PATH,
    });
    process.exit(1);
  }

  const content = fs.readFileSync(ROBOTS_BODY_PATH, "utf-8");
  const lines = normalize(content);
  const lineSet = new Set(lines);
  const failures = [];

  for (const requiredLine of REQUIRED_LINES) {
    if (!lineSet.has(requiredLine)) {
      failures.push(`Missing required robots directive: "${requiredLine}"`);
    }
  }

  const hostLines = lines.filter((line) => line.startsWith("Host: "));
  if (hostLines.length !== 1) {
    failures.push(`Expected exactly one Host directive but found ${hostLines.length}.`);
  }

  const sitemapLines = lines.filter((line) => line.startsWith("Sitemap: "));
  if (sitemapLines.length !== 1) {
    failures.push(
      `Expected exactly one Sitemap directive but found ${sitemapLines.length}.`
    );
  }

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error("robots-verify-failure", {
        timestamp: Date.now(),
        reason: failure,
      });
    }

    console.error("robots-verify-summary", {
      timestamp: Date.now(),
      status: "failed",
      failureCount: failures.length,
    });
    process.exit(1);
  }

  console.info("robots-verify-summary", {
    timestamp: Date.now(),
    status: "passed",
    directiveCount: lines.length,
  });
}

main();
