/**
 * File: scripts/verify-seo-build.mjs
 * Module: scripts
 * Purpose: Validate critical SEO signals in prerendered build HTML.
 * Notes:
 * - This script checks canonical/meta/schema presence for key routes.
 * - Intended to be run after `npm run build`.
 */

import fs from "node:fs";
import path from "node:path";

const APP_SERVER_DIR = path.join(process.cwd(), ".next/server/app");

const REQUIRED_ROUTES = [
  {
    id: "home",
    filePath: "index.html",
    checks: ["canonical", "keywords", "ogTitle", "jsonLd"],
  },
  {
    id: "booking",
    filePath: "booking.html",
    checks: ["canonical", "keywords", "jsonLd"],
  },
  {
    id: "locations-index",
    filePath: "locations.html",
    checks: ["canonical", "keywords"],
  },
  {
    id: "location-shegaon-bhakt-niwas",
    filePath: "locations/shegaon-bhakt-niwas.html",
    checks: ["canonical", "keywords", "jsonLd"],
  },
  {
    id: "blog-index",
    filePath: "blog.html",
    checks: ["canonical", "keywords", "jsonLd"],
  },
  {
    id: "blog-post-shegaon-travel-guide",
    filePath: "blog/shegaon-travel-guide.html",
    checks: ["canonical", "keywords", "ogTitle", "jsonLd"],
  },
  {
    id: "blog-category-locations",
    filePath: "blog/category/locations.html",
    checks: ["canonical", "keywords", "jsonLd"],
  },
  {
    id: "blog-tag-shegaon",
    filePath: "blog/tag/shegaon.html",
    checks: ["canonical", "keywords", "jsonLd"],
  },
  {
    id: "contact",
    filePath: "contact.html",
    checks: ["canonical", "keywords"],
  },
];

function getRouteFileAbsolutePath(routeFilePath) {
  return path.join(APP_SERVER_DIR, routeFilePath);
}

function hasCanonicalTag(html) {
  const hasAbsoluteCanonical =
    /<link[^>]+rel="canonical"[^>]+href="https:\/\/www\.shrigajananmaharajsanstan\.com(?:\/[^"]*)?"/.test(
      html
    );
  const hasRootRelativeCanonical = /<link[^>]+rel="canonical"[^>]+href="\/"/.test(
    html
  );

  return hasAbsoluteCanonical || hasRootRelativeCanonical;
}

function hasKeywordsMeta(html) {
  return /<meta[^>]+name="keywords"[^>]+content="[^"]{10,}"/.test(html);
}

function hasOgTitle(html) {
  return /<meta[^>]+property="og:title"[^>]+content="[^"]+"/.test(html);
}

function hasJsonLd(html) {
  return /<script[^>]+type="application\/ld\+json"/.test(html);
}

function runCheck(html, checkName) {
  switch (checkName) {
    case "canonical":
      return hasCanonicalTag(html);
    case "keywords":
      return hasKeywordsMeta(html);
    case "ogTitle":
      return hasOgTitle(html);
    case "jsonLd":
      return hasJsonLd(html);
    default:
      return false;
  }
}

function main() {
  console.info("seo-build-verify-start", {
    timestamp: Date.now(),
    appServerDir: APP_SERVER_DIR,
    routeCount: REQUIRED_ROUTES.length,
  });

  if (!fs.existsSync(APP_SERVER_DIR)) {
    console.error("seo-build-verify-error", {
      timestamp: Date.now(),
      message: "Build output directory not found. Run `npm run build` first.",
    });
    process.exit(1);
  }

  const failures = [];

  for (const route of REQUIRED_ROUTES) {
    const absoluteFilePath = getRouteFileAbsolutePath(route.filePath);
    if (!fs.existsSync(absoluteFilePath)) {
      failures.push({
        routeId: route.id,
        filePath: route.filePath,
        check: "file-exists",
        reason: "Expected prerendered HTML file is missing.",
      });
      continue;
    }

    const html = fs.readFileSync(absoluteFilePath, "utf-8");
    for (const check of route.checks) {
      const passed = runCheck(html, check);
      if (!passed) {
        failures.push({
          routeId: route.id,
          filePath: route.filePath,
          check,
          reason: `Missing required SEO signal: ${check}`,
        });
      }
    }
  }

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error("seo-build-verify-failure", {
        timestamp: Date.now(),
        ...failure,
      });
    }

    console.error("seo-build-verify-summary", {
      timestamp: Date.now(),
      status: "failed",
      failureCount: failures.length,
    });
    process.exit(1);
  }

  console.info("seo-build-verify-summary", {
    timestamp: Date.now(),
    status: "passed",
    checkedRoutes: REQUIRED_ROUTES.length,
  });
}

main();
