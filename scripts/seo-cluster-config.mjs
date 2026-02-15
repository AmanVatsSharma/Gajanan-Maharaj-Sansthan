/**
 * File: scripts/seo-cluster-config.mjs
 * Module: scripts
 * Purpose: Shared SEO content-cluster distribution constants for generation and validation.
 * Notes:
 * - Keeps generator targets and validator minimums aligned in one place.
 * - Update this file first when changing cluster sizing strategy.
 */

export const LOCATION_CLUSTER_TARGETS = {
  shegaon: 30,
  omkareshwar: 20,
  pandharpur: 15,
  trimbakeshwar: 15,
};

export const NON_LOCATION_CLUSTER_TARGETS = {
  guides: 15,
  spiritual: 5,
  events: 5,
};

export const LOCATION_CLUSTER_KEYS = Object.keys(LOCATION_CLUSTER_TARGETS);

export const EXPECTED_GENERATED_TOTAL =
  Object.values(LOCATION_CLUSTER_TARGETS).reduce((sum, value) => sum + value, 0) +
  Object.values(NON_LOCATION_CLUSTER_TARGETS).reduce((sum, value) => sum + value, 0);
