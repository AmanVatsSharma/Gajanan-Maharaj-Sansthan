/**
 * File: scripts/verify-seo-command-chain.mjs
 * Module: scripts
 * Purpose: Validate SEO gate command composition and execution order in package.json.
 * Notes:
 * - Prevents accidental removal/reordering of critical verification steps.
 * - Keeps `seo:check` and `seo:check:strict` aligned with expected guardrails.
 */

import fs from "node:fs";
import path from "node:path";

const PACKAGE_JSON_PATH = path.join(process.cwd(), "package.json");

const EXPECTED_SEO_CHECK_CHAIN = [
  "npm run lint",
  "npm run verify:seo-chain",
  "npm run verify:generator",
  "npm run verify:docs-sync",
  "npm run build",
  "npm run verify:canonical",
  "npm run verify:robots",
  "npm run verify:locations",
  "npm run verify:taxonomy",
  "npm run verify:sitemap",
  "npm run verify:pagination",
  "npm run verify:rss",
  "npm run verify:seo-build",
  "npm run validate:blog",
];

const EXPECTED_SEO_STRICT_CHAIN = [
  "npm run lint",
  "npm run verify:seo-chain",
  "npm run verify:generator",
  "npm run verify:docs-sync",
  "npm run build",
  "npm run verify:canonical",
  "npm run verify:robots",
  "npm run verify:locations",
  "npm run verify:taxonomy",
  "npm run verify:sitemap",
  "npm run verify:pagination",
  "npm run verify:rss",
  "npm run verify:seo-build",
  "npm run validate:blog:strict",
];

function splitChain(command) {
  return command
    .split("&&")
    .map((step) => step.trim())
    .filter(Boolean);
}

function diffChains(actual, expected) {
  const issues = [];
  const maxLen = Math.max(actual.length, expected.length);

  for (let index = 0; index < maxLen; index += 1) {
    if (actual[index] !== expected[index]) {
      issues.push({
        position: index + 1,
        expected: expected[index] || "(none)",
        actual: actual[index] || "(none)",
      });
    }
  }

  return issues;
}

function extractNpmRunScriptName(step) {
  const match = step.match(/^npm run ([a-z0-9:-]+)$/i);
  return match?.[1] || "";
}

function main() {
  console.info("seo-command-chain-verify-start", {
    timestamp: Date.now(),
    packageJsonPath: PACKAGE_JSON_PATH,
  });

  if (!fs.existsSync(PACKAGE_JSON_PATH)) {
    console.error("seo-command-chain-verify-failure", {
      timestamp: Date.now(),
      check: "package-json-exists",
      reason: "package.json not found in workspace root.",
    });
    process.exit(1);
  }

  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf-8"));
  const scripts = packageJson?.scripts || {};

  const seoCheck = scripts["seo:check"];
  const seoCheckStrict = scripts["seo:check:strict"];
  const verifySeoChain = scripts["verify:seo-chain"];
  const failures = [];

  if (typeof verifySeoChain !== "string") {
    failures.push({
      check: "verify-seo-chain-script",
      reason: 'Missing "verify:seo-chain" npm script.',
    });
  }

  if (typeof seoCheck !== "string") {
    failures.push({
      check: "seo-check-script",
      reason: 'Missing "seo:check" npm script.',
    });
  }

  if (typeof seoCheckStrict !== "string") {
    failures.push({
      check: "seo-check-strict-script",
      reason: 'Missing "seo:check:strict" npm script.',
    });
  }

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error("seo-command-chain-verify-failure", {
        timestamp: Date.now(),
        ...failure,
      });
    }
    console.error("seo-command-chain-verify-summary", {
      timestamp: Date.now(),
      status: "failed",
      failureCount: failures.length,
    });
    process.exit(1);
  }

  const seoCheckChain = splitChain(seoCheck);
  const seoCheckStrictChain = splitChain(seoCheckStrict);

  const seoCheckDiffs = diffChains(seoCheckChain, EXPECTED_SEO_CHECK_CHAIN);
  const seoStrictDiffs = diffChains(seoCheckStrictChain, EXPECTED_SEO_STRICT_CHAIN);
  const referencedScriptNames = new Set(
    [...seoCheckChain, ...seoCheckStrictChain]
      .map((step) => extractNpmRunScriptName(step))
      .filter(Boolean)
      .filter((name) => !["seo:check", "seo:check:strict"].includes(name))
  );

  if (seoCheckDiffs.length > 0) {
    failures.push({
      check: "seo-check-chain-order",
      reason: "seo:check command chain does not match expected order.",
      differences: seoCheckDiffs,
    });
  }

  if (seoStrictDiffs.length > 0) {
    failures.push({
      check: "seo-check-strict-chain-order",
      reason: "seo:check:strict command chain does not match expected order.",
      differences: seoStrictDiffs,
    });
  }

  for (const scriptName of referencedScriptNames) {
    if (typeof scripts[scriptName] !== "string") {
      failures.push({
        check: "referenced-script-exists",
        reason: `Command chain references missing npm script "${scriptName}".`,
      });
    }
  }

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error("seo-command-chain-verify-failure", {
        timestamp: Date.now(),
        ...failure,
      });
    }

    console.error("seo-command-chain-verify-summary", {
      timestamp: Date.now(),
      status: "failed",
      failureCount: failures.length,
    });
    process.exit(1);
  }

  console.info("seo-command-chain-verify-summary", {
    timestamp: Date.now(),
    status: "passed",
    seoCheckStepCount: seoCheckChain.length,
    seoCheckStrictStepCount: seoCheckStrictChain.length,
    referencedScriptCount: referencedScriptNames.size,
  });
}

try {
  main();
} catch (error) {
  console.error("seo-command-chain-verify-failure", {
    timestamp: Date.now(),
    check: "unhandled-runtime-error",
    reason: error instanceof Error ? error.message : String(error),
  });
  process.exit(1);
}
