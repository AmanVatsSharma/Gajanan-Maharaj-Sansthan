/**
 * File: scripts/verify-generated-cluster-manifest.mjs
 * Module: scripts
 * Purpose: Verify deterministic blog-cluster manifest distribution and integrity.
 * Notes:
 * - Ensures generated clusters match expected location/non-location targets.
 * - Fails with actionable diagnostics when generator output drifts.
 */

import fs from "node:fs";
import path from "node:path";
import {
  EXPECTED_GENERATED_TOTAL,
  LOCATION_CLUSTER_KEYS,
  LOCATION_CLUSTER_TARGETS,
  NON_LOCATION_CLUSTER_TARGETS,
} from "./seo-cluster-config.mjs";

const BLOG_ROOT = path.join(process.cwd(), "content/blog");
const MANIFEST_PATH = path.join(BLOG_ROOT, "_ops/generated-seo-cluster-manifest.json");

function normalizeManifestEntry(entry) {
  return typeof entry === "string" ? entry.trim().replace(/\\/g, "/") : "";
}

function main() {
  console.info("generator-manifest-verify-start", {
    timestamp: Date.now(),
    manifestPath: MANIFEST_PATH,
  });

  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error("generator-manifest-verify-failure", {
      timestamp: Date.now(),
      check: "manifest-exists",
      reason: "Missing generated cluster manifest. Run npm run generate:blogs first.",
    });
    process.exit(1);
  }

  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  } catch (error) {
    console.error("generator-manifest-verify-failure", {
      timestamp: Date.now(),
      check: "manifest-parse",
      reason: `Unable to parse manifest JSON: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    process.exit(1);
  }

  const entriesRaw = Array.isArray(parsed?.generatedFiles) ? parsed.generatedFiles : [];
  const entries = [...new Set(entriesRaw.map((entry) => normalizeManifestEntry(entry)).filter(Boolean))];
  const failures = [];

  if (entries.length !== EXPECTED_GENERATED_TOTAL) {
    failures.push({
      check: "generated-total",
      reason: `Manifest entries count ${entries.length} does not match expected ${EXPECTED_GENERATED_TOTAL}.`,
    });
  }

  const manifestCount =
    typeof parsed?.generatedFileCount === "number" ? parsed.generatedFileCount : null;
  if (manifestCount !== null && manifestCount !== entries.length) {
    failures.push({
      check: "manifest-count-match",
      reason: `manifest generatedFileCount ${manifestCount} does not equal entries length ${entries.length}.`,
    });
  }

  const distribution = {
    locations: Object.fromEntries(LOCATION_CLUSTER_KEYS.map((key) => [key, 0])),
    guides: 0,
    spiritual: 0,
    events: 0,
  };

  for (const entry of entries) {
    const absolutePath = path.join(BLOG_ROOT, entry);
    if (!fs.existsSync(absolutePath)) {
      failures.push({
        check: "manifest-file-exists",
        reason: `Manifest entry missing on disk: ${entry}`,
      });
      continue;
    }

    if (entry.startsWith("locations/")) {
      for (const key of LOCATION_CLUSTER_KEYS) {
        if (entry.startsWith(`locations/${key}/`)) {
          distribution.locations[key] += 1;
        }
      }
      continue;
    }

    if (entry.startsWith("guides/")) {
      distribution.guides += 1;
      continue;
    }

    if (entry.startsWith("spiritual/")) {
      distribution.spiritual += 1;
      continue;
    }

    if (entry.startsWith("events/")) {
      distribution.events += 1;
      continue;
    }

    failures.push({
      check: "manifest-namespace",
      reason: `Unexpected manifest namespace for entry: ${entry}`,
    });
  }

  for (const [locationKey, expected] of Object.entries(LOCATION_CLUSTER_TARGETS)) {
    if (distribution.locations[locationKey] !== expected) {
      failures.push({
        check: "location-cluster-target",
        reason: `Location cluster "${locationKey}" count ${distribution.locations[locationKey]} does not match expected ${expected}.`,
      });
    }
  }

  for (const [key, expected] of Object.entries(NON_LOCATION_CLUSTER_TARGETS)) {
    if (distribution[key] !== expected) {
      failures.push({
        check: "non-location-cluster-target",
        reason: `Cluster "${key}" count ${distribution[key]} does not match expected ${expected}.`,
      });
    }
  }

  if (failures.length > 0) {
    for (const failure of failures.slice(0, 20)) {
      console.error("generator-manifest-verify-failure", {
        timestamp: Date.now(),
        ...failure,
      });
    }
    console.error("generator-manifest-verify-summary", {
      timestamp: Date.now(),
      status: "failed",
      failureCount: failures.length,
    });
    process.exit(1);
  }

  console.info("generator-manifest-verify-summary", {
    timestamp: Date.now(),
    status: "passed",
    expectedTotal: EXPECTED_GENERATED_TOTAL,
    observedDistribution: distribution,
  });
}

try {
  main();
} catch (error) {
  console.error("generator-manifest-verify-failure", {
    timestamp: Date.now(),
    check: "unhandled-runtime-error",
    reason: error instanceof Error ? error.message : String(error),
  });
  process.exit(1);
}
