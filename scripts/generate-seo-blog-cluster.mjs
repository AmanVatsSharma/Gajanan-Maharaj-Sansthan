/**
 * File: scripts/generate-seo-blog-cluster.mjs
 * Module: scripts
 * Purpose: Generate large-scale SEO markdown cluster content for Sansthan locations.
 * Notes:
 * - Creates 100 deterministic markdown blog posts with rich frontmatter.
 * - Every generated post includes required internal links:
 *   - /locations/*
 *   - /booking or /contact
 *   - /blog/*
 * - Designed for repeatable runs without duplicate slugs.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {
  CLUSTER_CONFIG_FINGERPRINT,
  EXPECTED_GENERATED_TOTAL,
  LOCATION_CLUSTER_TARGETS,
  NON_LOCATION_CLUSTER_TARGETS,
} from "./seo-cluster-config.mjs";

const BLOG_ROOT = path.resolve(
  process.env.SEO_BLOG_GENERATOR_ROOT || path.join(process.cwd(), "content/blog")
);
const GENERATOR_MANIFEST_PATH = path.join(
  BLOG_ROOT,
  "_ops/generated-seo-cluster-manifest.json"
);
const AUTHOR_NAME = "Sansthan";
const BASE_DATE = new Date("2026-02-15T00:00:00Z");

const CORE_RELATED_SLUGS = [
  "shegaon-travel-guide",
  "shegaon-accommodation-guide",
  "nearby-places-from-shegaon",
  "omkareshwar-darshan-timings",
  "welcome-to-sansthan",
];

const CORE_RELATED_LINK_LABELS = {
  "shegaon-travel-guide": "Complete Travel Guide to Shegaon",
  "shegaon-accommodation-guide": "Shegaon Accommodation Guide",
  "nearby-places-from-shegaon": "Nearby Places from Shegaon",
  "omkareshwar-darshan-timings": "Omkareshwar Darshan Timings Guide",
  "welcome-to-sansthan": "Welcome to Sansthan",
  "pandharpur-and-shegaon-family-yatra-plan": "Pandharpur and Shegaon Family Yatra Plan",
  "jyotirlinga-and-sansthan-combined-itinerary": "Jyotirlinga and Sansthan Combined Itinerary",
  "trimbakeshwar-nashik-shegaon-route": "Trimbakeshwar Nashik Shegaon Route",
  "shegaon-bhakta-niwas-vs-anand-vihar": "Shegaon Bhakta Niwas vs Anand Vihar",
  "phone-and-whatsapp-booking-best-practices": "Phone and WhatsApp Booking Best Practices",
  "shegaon-bhakta-niwas-booking-process": "Shegaon Bhakta Niwas Booking Process",
  "sansthan-contact-numbers-all-locations": "Sansthan Contact Numbers All Locations",
};

/**
 * Cross-cluster pillar slugs for robust interlinking. Each location cluster links to 2-3 pillars from other clusters.
 */
const CROSS_CLUSTER_PILLAR_MAP = {
  shegaon: ["omkareshwar-darshan-timings", "pandharpur-and-shegaon-family-yatra-plan", "jyotirlinga-and-sansthan-combined-itinerary"],
  omkareshwar: ["shegaon-travel-guide", "jyotirlinga-and-sansthan-combined-itinerary", "shegaon-to-omkareshwar-route-guide"],
  pandharpur: ["shegaon-travel-guide", "pandharpur-and-shegaon-family-yatra-plan", "shegaon-accommodation-guide"],
  trimbakeshwar: ["trimbakeshwar-nashik-shegaon-route", "jyotirlinga-and-sansthan-combined-itinerary", "shegaon-travel-guide"],
};

/** Plan 3: Tertiary pillar slugs for guides/spiritual/events - location posts also link to these */
const TERTIARY_PILLAR_SLUGS = [
  "phone-and-whatsapp-booking-best-practices",
  "shegaon-bhakta-niwas-booking-process",
  "sansthan-contact-numbers-all-locations",
];

const LOCATION_CONFIGS = [
  {
    key: "shegaon",
    city: "Shegaon",
    count: LOCATION_CLUSTER_TARGETS.shegaon,
    directory: "locations/shegaon",
    image: "/images/shegaon-temple.svg",
    locationPage: "/locations/shegaon-bhakt-niwas",
    locationIds: ["shegaon-bhakt-niwas", "shegaon-anand-vihar", "shegaon-visawa"],
    keywordSeed: [
      "shri gajanan maharaj sansthan shegaon",
      "shri gajanan maharaj sanstan shegaon",
      "shree gajanan maharaj sansthan shegaon",
      "sri gajanan maharaj sansthan shegaon",
      "shegaon temple accommodation",
      "shegaon darshan planning",
      "sheogaon temple",
      "bhakta niwas shegaon",
      "bhakt niwas shegaon",
    ],
  },
  {
    key: "omkareshwar",
    city: "Omkareshwar",
    count: LOCATION_CLUSTER_TARGETS.omkareshwar,
    directory: "locations/omkareshwar",
    image: "/images/omkareshwar.svg",
    locationPage: "/locations/omkareshwar",
    locationIds: ["omkareshwar"],
    keywordSeed: [
      "shri gajanan maharaj sansthan omkareshwar",
      "shri gajanan maharaj sanstan omkareshwar",
      "shree gajanan maharaj sansthan omkareshwar",
      "sri gajanan maharaj sansthan omkareshwar",
      "omkareshwar temple accommodation",
      "omkareshwar darshan timings",
    ],
  },
  {
    key: "pandharpur",
    city: "Pandharpur",
    count: LOCATION_CLUSTER_TARGETS.pandharpur,
    directory: "locations/pandharpur",
    image: "/images/pandharpur.svg",
    locationPage: "/locations/pandharpur-math",
    locationIds: ["pandharpur-math"],
    keywordSeed: [
      "shri gajanan maharaj sansthan pandharpur",
      "shri gajanan maharaj sanstan pandharpur",
      "shree gajanan maharaj sansthan pandharpur",
      "sri gajanan maharaj sansthan pandharpur",
      "pandharpur temple stay",
      "pandharpur accommodation guide",
    ],
  },
  {
    key: "trimbakeshwar",
    city: "Trimbakeshwar",
    count: LOCATION_CLUSTER_TARGETS.trimbakeshwar,
    directory: "locations/trimbakeshwar",
    image: "/images/trimbakeshwar.svg",
    locationPage: "/locations/trimbakeshwar",
    locationIds: ["trimbakeshwar"],
    keywordSeed: [
      "shri gajanan maharaj sansthan trimbakeshwar",
      "shri gajanan maharaj sanstan trimbakeshwar",
      "shree gajanan maharaj sansthan trimbakeshwar",
      "sri gajanan maharaj sansthan trimbakeshwar",
      "trimbakeshwar accommodation",
      "triambakeshwar accommodation",
      "trimbakeshwar darshan planning",
    ],
  },
];

const LOCATION_TOPIC_VARIANTS = [
  { suffix: "darshan-timing-guide", title: "Darshan Timing Guide", intent: "darshan" },
  { suffix: "weekend-planning-guide", title: "Weekend Planning Guide", intent: "travel-guide" },
  { suffix: "family-accommodation-checklist", title: "Family Accommodation Checklist", intent: "accommodation" },
  { suffix: "best-time-to-visit", title: "Best Time to Visit", intent: "seasonal-guide" },
  { suffix: "route-and-transport-options", title: "Route and Transport Options", intent: "transport" },
  { suffix: "one-day-itinerary", title: "One Day Itinerary", intent: "itinerary" },
  { suffix: "two-day-itinerary", title: "Two Day Itinerary", intent: "itinerary" },
  { suffix: "devotee-faqs", title: "Devotee FAQs", intent: "faq" },
  { suffix: "first-time-visitor-guide", title: "First Time Visitor Guide", intent: "beginner-guide" },
  { suffix: "senior-citizen-travel-tips", title: "Senior Citizen Travel Tips", intent: "family-travel" },
  { suffix: "group-yatra-planning", title: "Group Yatra Planning", intent: "group-travel" },
  { suffix: "accommodation-near-temple", title: "Accommodation Near Temple", intent: "accommodation" },
  { suffix: "morning-darshan-planning", title: "Morning Darshan Planning", intent: "darshan" },
  { suffix: "festival-season-guide", title: "Festival Season Guide", intent: "festival-planning" },
  { suffix: "budget-pilgrimage-guide", title: "Budget Pilgrimage Guide", intent: "budget-guide" },
  { suffix: "family-safety-and-comfort-tips", title: "Family Safety and Comfort Tips", intent: "family-travel" },
  { suffix: "prayer-and-darshan-etiquette", title: "Prayer and Darshan Etiquette", intent: "devotional" },
  { suffix: "packing-checklist", title: "Packing Checklist", intent: "travel-tips" },
  { suffix: "rainy-season-visit-guide", title: "Rainy Season Visit Guide", intent: "seasonal-guide" },
  { suffix: "summer-visit-guide", title: "Summer Visit Guide", intent: "seasonal-guide" },
  { suffix: "winter-visit-guide", title: "Winter Visit Guide", intent: "seasonal-guide" },
  { suffix: "temple-area-food-and-facilities", title: "Temple Area Food and Facilities", intent: "facilities" },
  { suffix: "local-travel-checklist", title: "Local Travel Checklist", intent: "travel-tips" },
  { suffix: "darshan-queue-time-optimization", title: "Darshan Queue Time Optimization", intent: "darshan" },
  { suffix: "photo-and-memory-planning", title: "Photo and Memory Planning", intent: "family-travel" },
  { suffix: "festival-crowd-management-guide", title: "Festival Crowd Management Guide", intent: "festival-planning" },
  { suffix: "evening-darshan-planning", title: "Evening Darshan Planning", intent: "darshan" },
  { suffix: "temple-circuit-extension-guide", title: "Temple Circuit Extension Guide", intent: "pilgrimage-circuit" },
  { suffix: "kids-friendly-yatra-guide", title: "Kids Friendly Yatra Guide", intent: "family-travel" },
  { suffix: "contact-and-support-guide", title: "Contact and Support Guide", intent: "contact" },
  // Bhakta Niwas and Sheogaon focus (Shegaon cluster)
  { suffix: "bhakta-niwas-accommodation-guide", title: "Bhakta Niwas Accommodation Guide", intent: "accommodation" },
  { suffix: "bhakta-niwas-booking-process", title: "Bhakta Niwas Booking Process", intent: "booking" },
  { suffix: "bhakta-niwas-vs-anand-vihar", title: "Bhakta Niwas vs Anand Vihar", intent: "accommodation" },
  { suffix: "bhakta-niwas-sheogaon-contact", title: "Bhakta Niwas Sheogaon Contact", intent: "contact" },
  { suffix: "bhakta-niwas-facilities-and-amenities", title: "Bhakta Niwas Facilities and Amenities", intent: "facilities" },
  { suffix: "sheogaon-temple-darshan-guide", title: "Sheogaon Temple Darshan Guide", intent: "darshan" },
  { suffix: "sheogaon-accommodation-guide", title: "Sheogaon Accommodation Guide", intent: "accommodation" },
  { suffix: "sheogaon-travel-tips", title: "Sheogaon Travel Tips", intent: "travel-guide" },
  // Triambakeshwar variant and Omkareshwar Bhakt Niwas
  { suffix: "triambakeshwar-jyotirlinga-stay", title: "Triambakeshwar Jyotirlinga Stay", intent: "accommodation" },
  { suffix: "triambakeshwar-darshan-tips", title: "Triambakeshwar Darshan Tips", intent: "darshan" },
  { suffix: "omkareshwar-bhakt-niwas-guide", title: "Omkareshwar Bhakt Niwas Guide", intent: "accommodation" },
  { suffix: "omkareshwar-temple-stay-tips", title: "Omkareshwar Temple Stay Tips", intent: "accommodation" },
  { suffix: "jyotirlinga-yatra-planning", title: "Jyotirlinga Yatra Planning", intent: "pilgrimage-circuit" },
  { suffix: "nashik-trimbakeshwar-combo-guide", title: "Nashik Trimbakeshwar Combo Guide", intent: "travel-guide" },
  { suffix: "pandharpur-wari-planning", title: "Pandharpur Wari Planning", intent: "festival-planning" },
  { suffix: "vitthal-darshan-timing-guide", title: "Vitthal Darshan Timing Guide", intent: "darshan" },
  { suffix: "math-stay-booking-tips", title: "Math Stay Booking Tips", intent: "booking" },
  { suffix: "seasonal-pilgrimage-calendar", title: "Seasonal Pilgrimage Calendar", intent: "seasonal-guide" },
  { suffix: "devotee-id-and-document-guide", title: "Devotee ID and Document Guide", intent: "travel-tips" },
  { suffix: "temple-stay-rules-and-etiquette", title: "Temple Stay Rules and Etiquette", intent: "devotional" },
  { suffix: "emergency-contact-and-support", title: "Emergency Contact and Support", intent: "contact" },
  { suffix: "multi-generation-family-yatra", title: "Multi-Generation Family Yatra", intent: "family-travel" },
  { suffix: "off-peak-visit-benefits", title: "Off-Peak Visit Benefits", intent: "seasonal-guide" },
  { suffix: "canteen-and-mahaprasad-guide", title: "Canteen and Mahaprasad Guide", intent: "facilities" },
  { suffix: "parking-and-local-transport", title: "Parking and Local Transport", intent: "transport" },
  { suffix: "how-to-book-bhakta-niwas", title: "How to Book Bhakta Niwas", intent: "booking" },
  { suffix: "sheogaon-bhakta-niwas-facilities", title: "Sheogaon Bhakta Niwas Facilities", intent: "facilities" },
  // Plan 2: Additional variants for 72+ location posts
  { suffix: "solo-traveler-guide", title: "Solo Traveler Guide", intent: "travel-guide" },
  { suffix: "wheelchair-accessibility", title: "Wheelchair Accessibility", intent: "facilities" },
  { suffix: "medical-facilities-nearby", title: "Medical Facilities Nearby", intent: "facilities" },
  { suffix: "local-markets-and-shopping", title: "Local Markets and Shopping", intent: "travel-tips" },
  { suffix: "three-day-itinerary", title: "Three Day Itinerary", intent: "itinerary" },
  { suffix: "week-long-stay-planning", title: "Week Long Stay Planning", intent: "accommodation" },
  { suffix: "early-morning-darshan-tips", title: "Early Morning Darshan Tips", intent: "darshan" },
  { suffix: "monsoon-visit-guide", title: "Monsoon Visit Guide", intent: "seasonal-guide" },
  { suffix: "holiday-rush-planning", title: "Holiday Rush Planning", intent: "festival-planning" },
  { suffix: "first-aid-and-safety", title: "First Aid and Safety", intent: "family-travel" },
  { suffix: "photography-tips-for-devotees", title: "Photography Tips for Devotees", intent: "family-travel" },
  { suffix: "prasad-and-offerings-guide", title: "Prasad and Offerings Guide", intent: "devotional" },
  { suffix: "nearby-attractions-day-trip", title: "Nearby Attractions Day Trip", intent: "travel-guide" },
  { suffix: "evening-aarti-timing-guide", title: "Evening Aarti Timing Guide", intent: "darshan" },
  { suffix: "temple-complex-map-and-directions", title: "Temple Complex Map and Directions", intent: "transport" },
  // Plan 3: 28 more for 100 Shegaon posts
  { suffix: "buldhana-district-guide", title: "Buldhana District Guide", intent: "travel-guide" },
  { suffix: "akola-to-shegaon-route", title: "Akola to Shegaon Route", intent: "transport" },
  { suffix: "jalgaon-pilgrimage-route", title: "Jalgaon Pilgrimage Route", intent: "transport" },
  { suffix: "maharashtra-temple-circuit", title: "Maharashtra Temple Circuit", intent: "pilgrimage-circuit" },
  { suffix: "anand-sagar-visit-guide", title: "Anand Sagar Visit Guide", intent: "travel-guide" },
  { suffix: "visawa-accommodation-tips", title: "Visawa Accommodation Tips", intent: "accommodation" },
  { suffix: "vidarbha-pilgrimage-planning", title: "Vidarbha Pilgrimage Planning", intent: "travel-guide" },
  { suffix: "amravati-to-shegaon-route", title: "Amravati to Shegaon Route", intent: "transport" },
  { suffix: "four-day-itinerary", title: "Four Day Itinerary", intent: "itinerary" },
  { suffix: "five-day-extended-stay", title: "Five Day Extended Stay", intent: "accommodation" },
  { suffix: "late-evening-darshan-tips", title: "Late Evening Darshan Tips", intent: "darshan" },
  { suffix: "spring-visit-guide", title: "Spring Visit Guide", intent: "seasonal-guide" },
  { suffix: "post-monsoon-visit-guide", title: "Post Monsoon Visit Guide", intent: "seasonal-guide" },
  { suffix: "new-year-darshan-planning", title: "New Year Darshan Planning", intent: "festival-planning" },
  { suffix: "travel-insurance-for-pilgrimage", title: "Travel Insurance for Pilgrimage", intent: "travel-tips" },
  { suffix: "mobile-photography-tips", title: "Mobile Photography Tips", intent: "family-travel" },
  { suffix: "flower-offering-guide", title: "Flower Offering Guide", intent: "devotional" },
  { suffix: "weekend-getaway-from-mumbai", title: "Weekend Getaway from Mumbai", intent: "travel-guide" },
  { suffix: "nagpur-to-shegaon-route", title: "Nagpur to Shegaon Route", intent: "transport" },
  { suffix: "pune-to-shegaon-route", title: "Pune to Shegaon Route", intent: "transport" },
  { suffix: "anand-vihar-vs-visawa", title: "Anand Vihar vs Visawa", intent: "accommodation" },
  { suffix: "buldhana-temple-stays", title: "Buldhana Temple Stays", intent: "accommodation" },
  { suffix: "local-bus-and-auto-guide", title: "Local Bus and Auto Guide", intent: "transport" },
  { suffix: "temple-museum-and-heritage", title: "Temple Museum and Heritage", intent: "travel-guide" },
  { suffix: "group-darshan-booking", title: "Group Darshan Booking", intent: "booking" },
  { suffix: "corporate-yatra-planning", title: "Corporate Yatra Planning", intent: "group-travel" },
  { suffix: "lunar-eclipse-darshan-tips", title: "Lunar Eclipse Darshan Tips", intent: "darshan" },
  { suffix: "solar-eclipse-visit-guide", title: "Solar Eclipse Visit Guide", intent: "seasonal-guide" },
];

const CROSS_LOCATION_GUIDE_VARIANTS = [
  "multi-location-pilgrimage-planning-guide",
  "shegaon-to-omkareshwar-route-guide",
  "shegaon-to-pandharpur-route-guide",
  "shegaon-to-trimbakeshwar-route-guide",
  "omkareshwar-to-trimbakeshwar-pilgrimage-checklist",
  "pandharpur-and-shegaon-family-yatra-plan",
  "jyotirlinga-and-sansthan-combined-itinerary",
  "temple-accommodation-comparison-guide",
  "week-long-devotional-circuit-planner",
  "pilgrimage-budget-planning-for-families",
  "festival-season-multi-city-travel-guide",
  "devotee-document-checklist-for-all-locations",
  "phone-and-whatsapp-booking-best-practices",
  "sansthan-location-selection-guide",
  "month-wise-pilgrimage-planning-calendar",
  "bhakta-niwas-across-locations-comparison",
  "sheogaon-and-omkareshwar-combined-yatra",
  "triambakeshwar-pandharpur-route-planning",
  "gajanan-maharaj-sansthan-booking-guide",
  "family-pilgrimage-with-children-tips",
  "senior-devotee-multi-city-itinerary",
  "best-accommodation-for-large-groups",
  "darshan-and-stay-priority-planning",
  "rainy-season-multi-location-travel",
  "festival-rush-booking-strategies",
  "shegaon-pandharpur-omkareshwar-circuit",
  "trimbakeshwar-nashik-shegaon-route",
  "devotee-testimonials-and-tips",
  "sansthan-contact-numbers-all-locations",
  "last-minute-booking-options-guide",
  "extended-stay-planning-for-devotees",
  // Plan 2: Additional guides for 46 total
  "shegaon-omkareshwar-3-day-itinerary",
  "pandharpur-wari-accommodation-tips",
  "trimbakeshwar-to-shegaon-route-guide",
  "omkareshwar-pandharpur-combined-yatra",
  "family-with-infants-pilgrimage-tips",
  "solo-female-devotee-safety-guide",
  "wheelchair-accessible-locations-guide",
  "monsoon-season-multi-city-travel",
  "festival-dates-and-booking-windows",
  "id-proof-and-document-checklist",
  "what-to-carry-pilgrimage-essentials",
  "return-journey-planning-tips",
  "group-booking-coordination-guide",
  "senior-citizen-special-needs-guide",
  "kids-activities-during-yatra",
  // Plan 3: 12 more for 58 total
  "maharashtra-pilgrimage-circuit",
  "buldhana-temple-stays",
  "akola-jalgaon-shegaon-route-guide",
  "vidarbha-temple-stay-network",
  "mumbai-to-shegaon-weekend-guide",
  "pune-shegaon-pandharpur-circuit",
  "hyderabad-to-omkareshwar-route",
  "indore-omkareshwar-shegaon-yatra",
  "all-12-jyotirlinga-planning",
  "mahaprasad-and-food-guide",
  "temple-volunteer-seva-guide",
  "pilgrimage-photo-documentation",
];

const SPIRITUAL_POST_VARIANTS = [
  "teachings-of-shri-gajanan-maharaj-for-modern-families",
  "daily-devotional-routine-for-pilgrimage-travelers",
  "importance-of-seva-in-sansthan-tradition",
  "how-devotees-can-prepare-mindfully-for-darshan",
  "spiritual-benefits-of-disciplined-yatra-planning",
  "gajanan-maharaj-mantra-and-prayer-guide",
  "significance-of-temple-stay-in-devotion",
  "mindful-pilgrimage-preparation-tips",
  "devotional-discipline-for-family-yatra",
  "spiritual-meaning-of-bhakta-niwas",
  "connecting-with-sansthan-tradition",
  // Plan 2: Additional spiritual for 19 total
  "bhakti-and-surrender-in-pilgrimage",
  "importance-of-sankalp-before-yatra",
  "meditation-and-darshan-preparation",
  "family-values-in-sansthan-tradition",
  "gratitude-practices-for-devotees",
  "overcoming-travel-anxiety-spiritually",
  "community-and-sangha-in-pilgrimage",
  "legacy-of-shri-gajanan-maharaj",
  // Plan 3: 5 more for 24 total
  "sankalp-and-vow-during-yatra",
  "prasad-distribution-etiquette",
  "morning-prayer-routine-for-travelers",
  "evening-aarti-participation-guide",
  "pilgrimage-as-spiritual-retreat",
];

const EVENT_POST_VARIANTS = [
  "ram-navami-devotee-planning-guide",
  "rishi-panchami-visit-preparation-guide",
  "major-utsav-crowd-planning-checklist",
  "festival-darshan-timing-awareness-guide",
  "community-seva-event-participation-guide",
  "gudi-padwa-sansthan-visit-guide",
  "diwali-darshan-planning-tips",
  "special-darshan-days-calendar",
  "utsav-accommodation-booking-tips",
  "festival-season-what-to-expect",
  "crowd-management-during-peak-days",
  // Plan 2: Additional events for 21 total
  "ram-navami-special-darshan-guide",
  "gudi-padwa-visit-planning",
  "diwali-darshan-and-accommodation",
  "makar-sankranti-pilgrimage-tips",
  "shivaratri-night-darshan-planning",
  "chaitra-navratri-crowd-guide",
  "guru-purnima-devotee-planning",
  "janmashtami-sansthan-visit",
  "anniversary-utsav-booking-tips",
  "special-darshan-dates-calendar",
  // Plan 3: 3 more for 24 total
  "maha-shivaratri-sansthan-visit",
  "guru-purnima-darshan-planning",
  "sankranti-pilgrimage-tips",
];

function formatDateByOffset(offset) {
  const value = new Date(BASE_DATE);
  value.setDate(value.getDate() - offset);
  return value.toISOString().slice(0, 10);
}

function ensureDirectory(directoryPath) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

function isSafeBlogChildPath(candidatePath) {
  const resolvedRoot = path.resolve(BLOG_ROOT);
  const resolvedPath = path.resolve(candidatePath);
  return resolvedPath === resolvedRoot || resolvedPath.startsWith(`${resolvedRoot}${path.sep}`);
}

/**
 * Read the previous generated-file manifest.
 * Keeps generator deterministic across count changes by cleaning stale files before writing.
 */
function readPreviousManifest() {
  if (!fs.existsSync(GENERATOR_MANIFEST_PATH)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(GENERATOR_MANIFEST_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.generatedFiles)) {
      return [];
    }

    return parsed.generatedFiles.filter((entry) => typeof entry === "string");
  } catch (error) {
    console.warn("seo-blog-generator-warning", {
      timestamp: Date.now(),
      message: "Unable to parse previous generator manifest. Continuing with empty cleanup set.",
      manifestPath: GENERATOR_MANIFEST_PATH,
      error: error instanceof Error ? error.message : String(error),
    });
    return [];
  }
}

function cleanupPreviouslyGeneratedFiles(previousGeneratedFiles) {
  if (previousGeneratedFiles.length === 0) {
    console.info("seo-blog-generator-cleanup", {
      timestamp: Date.now(),
      removedFileCount: 0,
      message: "No prior generated files to clean.",
    });
    return;
  }

  let removedFileCount = 0;
  for (const relativePath of previousGeneratedFiles) {
    const absolutePath = path.join(BLOG_ROOT, relativePath);
    if (!isSafeBlogChildPath(absolutePath)) {
      console.warn("seo-blog-generator-warning", {
        timestamp: Date.now(),
        message: "Skipped cleanup for unsafe path from manifest.",
        relativePath,
      });
      continue;
    }

    if (fs.existsSync(absolutePath)) {
      fs.rmSync(absolutePath);
      removedFileCount += 1;
    }
  }

  console.info("seo-blog-generator-cleanup", {
    timestamp: Date.now(),
    removedFileCount,
    previousManifestCount: previousGeneratedFiles.length,
  });
}

function writeGenerationManifest(generatedFiles) {
  ensureDirectory(path.dirname(GENERATOR_MANIFEST_PATH));
  const normalizedGeneratedFiles = generatedFiles
    .map((entry) => entry.replace(/\\/g, "/"))
    .sort();
  const generatedFileChecksums = Object.fromEntries(
    normalizedGeneratedFiles.map((relativePath) => {
      const absolutePath = path.join(BLOG_ROOT, relativePath);
      const fileContent = fs.readFileSync(absolutePath, "utf-8");
      const checksum = crypto.createHash("sha256").update(fileContent).digest("hex");
      return [relativePath, checksum];
    })
  );

  const payload = {
    manifestVersion: 2,
    configFingerprint: CLUSTER_CONFIG_FINGERPRINT,
    generatedFileCount: normalizedGeneratedFiles.length,
    generatedFiles: normalizedGeneratedFiles,
    generatedFileChecksums,
  };
  fs.writeFileSync(GENERATOR_MANIFEST_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf-8");
}

/**
 * Fail fast if generator config drifts from available topic variants.
 */
function assertGeneratorConfiguration() {
  for (const locationConfig of LOCATION_CONFIGS) {
    if (locationConfig.count > LOCATION_TOPIC_VARIANTS.length) {
      throw new Error(
        `Location "${locationConfig.key}" count (${locationConfig.count}) exceeds topic variants (${LOCATION_TOPIC_VARIANTS.length}).`
      );
    }

    const expectedClusterCount = LOCATION_CLUSTER_TARGETS[locationConfig.key];
    if (locationConfig.count !== expectedClusterCount) {
      throw new Error(
        `Location "${locationConfig.key}" count (${locationConfig.count}) does not match shared cluster target (${expectedClusterCount}).`
      );
    }
  }

  if (CROSS_LOCATION_GUIDE_VARIANTS.length !== NON_LOCATION_CLUSTER_TARGETS.guides) {
    throw new Error(
      `Guide cluster size mismatch. Found ${CROSS_LOCATION_GUIDE_VARIANTS.length}, expected ${NON_LOCATION_CLUSTER_TARGETS.guides}.`
    );
  }

  if (SPIRITUAL_POST_VARIANTS.length !== NON_LOCATION_CLUSTER_TARGETS.spiritual) {
    throw new Error(
      `Spiritual cluster size mismatch. Found ${SPIRITUAL_POST_VARIANTS.length}, expected ${NON_LOCATION_CLUSTER_TARGETS.spiritual}.`
    );
  }

  if (EVENT_POST_VARIANTS.length !== NON_LOCATION_CLUSTER_TARGETS.events) {
    throw new Error(
      `Event cluster size mismatch. Found ${EVENT_POST_VARIANTS.length}, expected ${NON_LOCATION_CLUSTER_TARGETS.events}.`
    );
  }
}

function toTitleCase(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() || ""}${part.slice(1)}`)
    .join(" ");
}

function toSentenceKeyword(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function dedupeSlugs(slugs) {
  return [...new Set(slugs.filter(Boolean))];
}

/**
 * Extended neighbors (index ± 1 and ± 2) for denser cluster graphs. Returns up to 4 slugs.
 */
function getExtendedNeighborSlugs(slugs, index) {
  if (slugs.length <= 1) {
    return [];
  }

  const indices = [
    (index - 2 + slugs.length) % slugs.length,
    (index - 1 + slugs.length) % slugs.length,
    (index + 1) % slugs.length,
    (index + 2) % slugs.length,
  ];
  const neighborSlugs = indices
    .filter((i) => i !== index)
    .map((i) => slugs[i])
    .filter(Boolean);
  return dedupeSlugs(neighborSlugs);
}

function getBlogLinkLabel(slug) {
  return CORE_RELATED_LINK_LABELS[slug] || toTitleCase(slug);
}

function buildFrontmatter({
  title,
  description,
  date,
  slug,
  image,
  keywords,
  tags,
  category,
  locationIds,
  relatedSlugs,
}) {
  const lines = [
    "---",
    `title: "${title}"`,
    `description: "${description}"`,
    `date: "${date}"`,
    `slug: "${slug}"`,
    `image: "${image}"`,
    "keywords:",
    ...keywords.map((keyword) => `  - "${keyword}"`),
    `author: "${AUTHOR_NAME}"`,
    "tags:",
    ...tags.map((tag) => `  - "${tag}"`),
    `category: "${category}"`,
    "locationIds:",
    ...locationIds.map((locationId) => `  - "${locationId}"`),
    "relatedSlugs:",
    ...relatedSlugs.map((relatedSlug) => `  - "${relatedSlug}"`),
    "---",
    "",
  ];

  return lines.join("\n");
}

function buildLocationPostContent({
  city,
  locationPage,
  topicTitle,
  relatedBlogLinks,
  inlineLink1,
  inlineLink2,
  inlineLink3,
  category = "locations",
  primaryTag = "shegaon",
}) {
  const inlineParts = [inlineLink1, inlineLink2, inlineLink3].filter(Boolean);
  const inlineParagraph =
    inlineParts.length > 0
      ? ` For related planning, see our ${inlineParts
          .map((l) => `[${l.label}](/blog/${l.slug})`)
          .join(", ")}.`
      : "";

  return `# ${city} ${topicTitle}

${city} remains one of the most searched pilgrimage destinations by devotees looking for trusted temple guidance, darshan clarity, and Sansthan accommodation support. This guide on **${city} ${topicTitle.toLowerCase()}** is written for families who want a practical and peaceful yatra experience.${inlineParagraph}

## Why this ${city} guide matters for devotees

When devotees search for terms like “Shri Gajanan Maharaj Sansthan ${city}”, “Shree Gajanan Maharaj Sansthan ${city}”, or “${city} temple accommodation”, they usually need clear, reliable, and actionable guidance. This article consolidates travel intent, accommodation intent, and darshan intent in one place.

## Accommodation and booking support

- Explore official location details: [${city} Sansthan Accommodation](${locationPage})
- Start your request flow: [Accommodation Booking Request](/booking)
- Need direct office help? [Contact Sansthan Team](/contact)

## Darshan and visit planning checklist

1. Keep a flexible darshan window to handle day-wise crowd variation.
2. Carry valid ID documents for all family members.
3. Keep one active phone number for booking follow-up.
4. Plan local movement in advance for senior citizens and children.
5. Use official Sansthan communication channels for confirmations.

## Location-specific tips for devotees

Families visiting ${city} often benefit from arriving early to avoid peak queues, especially on weekends and festival days. The temple complex and accommodation areas are well-maintained, with clear signage and helpful staff. Keep a copy of your booking confirmation handy, and carry light snacks and water for children. Senior devotees may prefer morning or late-afternoon darshan when crowds are typically lighter.

## Frequently asked questions

**When is the best time to visit ${city}?** Weekdays generally see fewer crowds than weekends. Early morning darshan offers a peaceful experience. Festival periods require advance booking and extra time for queues.

**What documents do I need for accommodation?** Valid government-issued ID for all adults, and proof of family relationship if traveling with dependents. The office may request additional details during peak season.

**How do I confirm my booking?** After submitting your request via WhatsApp or phone, the office will confirm availability. Keep your phone accessible for follow-up calls or messages.

## Related guides for deeper planning

${relatedBlogLinks
  .map((entry) => `- [${entry.label}](/blog/${entry.slug})`)
  .join("\n")}

## Practical conclusion for ${city} devotees

This ${city} planning resource is built to make your pilgrimage smoother, more spiritual, and better organized. For best outcomes, complete your route planning early, confirm accommodation through official support, and keep your itinerary realistic for all age groups.

---

Browse more in [${category.charAt(0).toUpperCase() + category.slice(1)}](/blog/category/${category}). Tags: [${primaryTag}](/blog/tag/${primaryTag})
`;
}

function buildCrossLocationGuideContent({ title, relatedBlogLinks }) {
  return `# ${title}

This guide helps devotees compare multiple locations connected to Shri Gajanan Maharaj Sansthan and related pilgrimage circuits. It is ideal for families planning a structured trip across Shegaon, Omkareshwar, Pandharpur, and Trimbakeshwar.

## Core planning actions

1. Decide the primary darshan priority for your family.
2. Assign travel days with enough rest intervals.
3. Keep accommodation communication centralized.
4. Prepare emergency contacts and health essentials.

## Cross-location travel tips

When visiting multiple Sansthan locations, allow buffer time between cities for rest and local travel. Shegaon, Omkareshwar, Pandharpur, and Trimbakeshwar each have distinct peak hours and crowd patterns. Book accommodation for each stop in advance through official channels. Carry essential medicines and keep emergency contacts saved. Senior citizens and children may need extra rest days between long journeys.

## Official pages to use during planning

- [All Sansthan Locations](/locations)
- [Shegaon Bhakt Niwas](/locations/shegaon-bhakt-niwas)
- [Omkareshwar Accommodation](/locations/omkareshwar)
- [Pandharpur Sansthan Location](/locations/pandharpur-math)
- [Trimbakeshwar Sansthan Location](/locations/trimbakeshwar)
- [Booking Request Page](/booking)
- [Contact Sansthan Support](/contact)

## Related reading

${relatedBlogLinks
  .map((entry) => `- [${entry.label}](/blog/${entry.slug})`)
  .join("\n")}

## Final note

For the best pilgrimage experience, keep your plan devotional but practical: focus on darshan flow, family comfort, and official communication clarity at every stage.

---

Browse more in [Guides](/blog/category/guides). Tags: [guides](/blog/tag/guides)
`;
}

function buildSpiritualOrEventContent({ title, focusKeyword, category, relatedBlogLinks }) {
  const headingLabel =
    category === "events" ? "Festival and event planning insights" : "Spiritual preparation insights";

  return `# ${title}

${focusKeyword} is frequently searched by devotees who want both spiritual clarity and practical planning support. This article provides structured guidance aligned with Sansthan discipline and family-friendly travel needs.

## ${headingLabel}

- Keep darshan planning realistic and time-buffered.
- Align travel expectations with senior citizens and children.
- Confirm accommodation and communication channels in advance.
- Focus on seva, discipline, and mindful conduct throughout the journey.

## Practical preparation

Devotees often find that a few days of light fasting or simplified meals before travel helps maintain energy and focus during the yatra. Pack modest, comfortable clothing suitable for temple visits and varying weather. Keep a small notebook for reflections and important contact numbers. Arrive at each location with an open heart and flexible schedule, allowing the divine to guide your pace.

## Helpful official links

- [Sansthan Locations](/locations)
- [Shegaon Bhakt Niwas Location](/locations/shegaon-bhakt-niwas)
- [Omkareshwar Sansthan Location](/locations/omkareshwar)
- [Accommodation Booking Request](/booking)
- [Contact Sansthan Office](/contact)

## Continue reading

${relatedBlogLinks
  .map((entry) => `- [${entry.label}](/blog/${entry.slug})`)
  .join("\n")}

## Devotee takeaway

Use this guidance as a planning companion, and rely on official channels for final operational details, availability, and schedule-sensitive updates.

---

Browse more in [${category.charAt(0).toUpperCase() + category.slice(1)}](/blog/category/${category}). Tags: [${category}](/blog/tag/${category})
`;
}

function writePostFile(relativePath, content) {
  const absolutePath = path.join(BLOG_ROOT, relativePath);
  ensureDirectory(path.dirname(absolutePath));
  fs.writeFileSync(absolutePath, content, "utf-8");
}

function generateLocationClusterPosts() {
  const generated = [];
  let globalOffset = 0;

  for (const config of LOCATION_CONFIGS) {
    const topicEntries = LOCATION_TOPIC_VARIANTS.slice(0, config.count).map((topic) => ({
      topic,
      slug: `${config.key}-${topic.suffix}`,
    }));
    const locationClusterSlugs = topicEntries.map((entry) => entry.slug);

    for (const [index, entry] of topicEntries.entries()) {
      const { topic, slug } = entry;
      const title = `${toTitleCase(config.key)} ${topic.title} | Shri Gajanan Maharaj Sansthan`;
      const description = `Detailed ${config.city.toLowerCase()} ${topic.title.toLowerCase()} for devotees searching Shri/Shree/Sri Gajanan Maharaj Sansthan ${config.city}. Includes booking links, travel tips, and internal route guidance.`;
      const date = formatDateByOffset(globalOffset);
      globalOffset += 1;

      const keywords = [
        `${config.city.toLowerCase()} ${toSentenceKeyword(topic.title)} guide`,
        `${config.city.toLowerCase()} ${topic.intent.replace(/-/g, " ")} planning`,
        ...config.keywordSeed,
        `${config.city.toLowerCase()} ${toSentenceKeyword(topic.title)}`,
        `${config.city.toLowerCase()} pilgrimage planning`,
        `${config.city.toLowerCase()} accommodation booking`,
      ];
      const tags = [
        config.key,
        topic.intent,
        "sansthan-seo",
        "pilgrimage-guide",
      ];

      const extendedNeighbors = getExtendedNeighborSlugs(locationClusterSlugs, index);
      const crossClusterPillars = CROSS_CLUSTER_PILLAR_MAP[config.key] || [];
      const tertiaryPillars = TERTIARY_PILLAR_SLUGS.slice(0, 2);
      const relatedSlugs = dedupeSlugs([
        ...extendedNeighbors.slice(0, 4),
        ...CORE_RELATED_SLUGS.slice(0, 2),
        ...crossClusterPillars.slice(0, 3),
        ...tertiaryPillars,
      ]).slice(0, 10);
      const relatedBlogLinks = relatedSlugs.map((relatedSlug) => ({
        slug: relatedSlug,
        label: getBlogLinkLabel(relatedSlug),
      }));

      const inlineLink1 = crossClusterPillars[0]
        ? { slug: crossClusterPillars[0], label: getBlogLinkLabel(crossClusterPillars[0]) }
        : null;
      const inlineLink2 =
        locationClusterSlugs[index + 1] || locationClusterSlugs[index - 1]
          ? {
              slug: locationClusterSlugs[index + 1] || locationClusterSlugs[index - 1],
              label: getBlogLinkLabel(
                locationClusterSlugs[index + 1] || locationClusterSlugs[index - 1]
              ),
            }
          : null;
      const inlineLink3 = tertiaryPillars[0]
        ? { slug: tertiaryPillars[0], label: getBlogLinkLabel(tertiaryPillars[0]) }
        : null;

      const frontmatter = buildFrontmatter({
        title,
        description,
        date,
        slug,
        image: config.image,
        keywords,
        tags,
        category: "locations",
        locationIds: config.locationIds,
        relatedSlugs,
      });

      const content = buildLocationPostContent({
        city: config.city,
        locationPage: config.locationPage,
        topicTitle: topic.title,
        relatedBlogLinks,
        inlineLink1,
        inlineLink2,
        inlineLink3,
        category: "locations",
        primaryTag: config.key,
      });

      const relativePath = `${config.directory}/${slug}.md`;
      writePostFile(relativePath, `${frontmatter}${content}`);
      generated.push(relativePath);
    }
  }

  return generated;
}

function generateCrossLocationGuides() {
  const generated = [];
  const guideSlugs = [...CROSS_LOCATION_GUIDE_VARIANTS];

  for (const [index, variant] of CROSS_LOCATION_GUIDE_VARIANTS.entries()) {
    const slug = variant;
    const title = `${toTitleCase(variant)} | Shri Gajanan Maharaj Sansthan`;
    const description =
      "Cross-location pilgrimage planning guide for devotees searching Shegaon, Omkareshwar, Pandharpur, and Trimbakeshwar accommodation and route support.";
    const date = formatDateByOffset(120 + index);
    const extendedNeighbors = getExtendedNeighborSlugs(guideSlugs, index);
    const crossPillars = ["shegaon-travel-guide", "omkareshwar-darshan-timings"];
    const tertiaryPillars = TERTIARY_PILLAR_SLUGS.slice(0, 2);
    const relatedSlugs = dedupeSlugs([
      ...extendedNeighbors.slice(0, 4),
      ...CORE_RELATED_SLUGS.slice(0, 2),
      ...crossPillars,
      ...tertiaryPillars,
    ]).slice(0, 10);
    const relatedBlogLinks = relatedSlugs.map((relatedSlug) => ({
      slug: relatedSlug,
      label: getBlogLinkLabel(relatedSlug),
    }));

    const frontmatter = buildFrontmatter({
      title,
      description,
      date,
      slug,
      image: "/images/shegaon-temple.svg",
      keywords: [
        `${toSentenceKeyword(variant).replace(/-/g, " ")} pilgrimage guide`,
        "shree gajanan maharaj sansthan pilgrimage",
        "shri gajanan maharaj sanstan pilgrimage",
        "sri gajanan maharaj sansthan route planning",
        "multi location temple accommodation guide",
      ],
      tags: ["guides", "multi-location", "travel-planning", "sansthan-seo"],
      category: "guides",
      locationIds: ["shegaon-bhakt-niwas", "omkareshwar", "pandharpur-math", "trimbakeshwar"],
      relatedSlugs,
    });

    const content = buildCrossLocationGuideContent({ title, relatedBlogLinks });
    const relativePath = `guides/${slug}.md`;
    writePostFile(relativePath, `${frontmatter}${content}`);
    generated.push(relativePath);
  }

  return generated;
}

function generateSpiritualPosts() {
  const generated = [];
  const spiritualSlugs = [...SPIRITUAL_POST_VARIANTS];

  for (const [index, variant] of SPIRITUAL_POST_VARIANTS.entries()) {
    const slug = variant;
    const title = `${toTitleCase(variant)} | Spiritual Guidance`;
    const description =
      "Spiritual and practical devotional guidance for Sansthan devotees planning darshan and accommodation with discipline.";
    const date = formatDateByOffset(160 + index);
    const extendedNeighbors = getExtendedNeighborSlugs(spiritualSlugs, index);
    const crossPillars = ["shegaon-travel-guide", "shegaon-accommodation-guide"];
    const relatedSlugs = dedupeSlugs([
      ...extendedNeighbors.slice(0, 3),
      ...CORE_RELATED_SLUGS.slice(0, 2),
      ...crossPillars,
    ]).slice(0, 7);
    const relatedBlogLinks = relatedSlugs.map((relatedSlug) => ({
      slug: relatedSlug,
      label: getBlogLinkLabel(relatedSlug),
    }));

    const frontmatter = buildFrontmatter({
      title,
      description,
      date,
      slug,
      image: "/images/shegaon-temple.svg",
      keywords: [
        `${toSentenceKeyword(variant).replace(/-/g, " ")}`,
        "shree gajanan maharaj spiritual guidance",
        "shri gajanan maharaj sanstan spiritual guidance",
        "sri gajanan maharaj devotee planning",
        "sansthan devotional discipline",
      ],
      tags: ["spiritual", "teachings", "devotion", "sansthan-seo"],
      category: "spiritual",
      locationIds: ["shegaon-bhakt-niwas"],
      relatedSlugs,
    });

    const content = buildSpiritualOrEventContent({
      title,
      focusKeyword: "Shri Gajanan Maharaj spiritual planning",
      category: "spiritual",
      relatedBlogLinks,
    });

    const relativePath = `spiritual/${slug}.md`;
    writePostFile(relativePath, `${frontmatter}${content}`);
    generated.push(relativePath);
  }

  return generated;
}

function generateEventPosts() {
  const generated = [];
  const eventSlugs = [...EVENT_POST_VARIANTS];

  for (const [index, variant] of EVENT_POST_VARIANTS.entries()) {
    const slug = variant;
    const title = `${toTitleCase(variant)} | Devotee Event Guide`;
    const description =
      "Festival/event support guide for devotees searching Sansthan darshan timing and accommodation planning during high-rush periods.";
    const date = formatDateByOffset(180 + index);
    const extendedNeighbors = getExtendedNeighborSlugs(eventSlugs, index);
    const crossPillars = ["shegaon-travel-guide", "major-utsav-crowd-planning-checklist"];
    const tertiaryPillars = TERTIARY_PILLAR_SLUGS.slice(0, 2);
    const relatedSlugs = dedupeSlugs([
      ...extendedNeighbors.slice(0, 4),
      ...CORE_RELATED_SLUGS.slice(0, 2),
      ...crossPillars,
      ...tertiaryPillars,
    ]).slice(0, 10);
    const relatedBlogLinks = relatedSlugs.map((relatedSlug) => ({
      slug: relatedSlug,
      label: getBlogLinkLabel(relatedSlug),
    }));

    const frontmatter = buildFrontmatter({
      title,
      description,
      date,
      slug,
      image: "/images/shegaon-temple.svg",
      keywords: [
        `${toSentenceKeyword(variant).replace(/-/g, " ")}`,
        "shree gajanan maharaj sansthan event planning",
        "shri gajanan maharaj sanstan event planning",
        "sri gajanan maharaj darshan festival season",
        "festival accommodation planning shegaon",
      ],
      tags: ["events", "festival", "darshan", "sansthan-seo"],
      category: "events",
      locationIds: ["shegaon-bhakt-niwas"],
      relatedSlugs,
    });

    const content = buildSpiritualOrEventContent({
      title,
      focusKeyword: "Sansthan festival darshan planning",
      category: "events",
      relatedBlogLinks,
    });

    const relativePath = `events/${slug}.md`;
    writePostFile(relativePath, `${frontmatter}${content}`);
    generated.push(relativePath);
  }

  return generated;
}

function main() {
  ensureDirectory(BLOG_ROOT);
  assertGeneratorConfiguration();
  console.info("seo-blog-generator-start", {
    timestamp: Date.now(),
    blogRoot: BLOG_ROOT,
    configFingerprint: CLUSTER_CONFIG_FINGERPRINT,
  });

  const previousGeneratedFiles = readPreviousManifest();
  cleanupPreviouslyGeneratedFiles(previousGeneratedFiles);

  const generatedLocationPosts = generateLocationClusterPosts();
  const generatedGuidePosts = generateCrossLocationGuides();
  const generatedSpiritualPosts = generateSpiritualPosts();
  const generatedEventPosts = generateEventPosts();

  const generatedTotal =
    generatedLocationPosts.length +
    generatedGuidePosts.length +
    generatedSpiritualPosts.length +
    generatedEventPosts.length;
  const generatedFiles = [
    ...generatedLocationPosts,
    ...generatedGuidePosts,
    ...generatedSpiritualPosts,
    ...generatedEventPosts,
  ];

  if (generatedTotal !== EXPECTED_GENERATED_TOTAL) {
    throw new Error(
      `Generated post total mismatch. Found ${generatedTotal}, expected ${EXPECTED_GENERATED_TOTAL}.`
    );
  }

  writeGenerationManifest(generatedFiles);

  console.info("seo-blog-generator-complete", {
    timestamp: Date.now(),
    configFingerprint: CLUSTER_CONFIG_FINGERPRINT,
    generatedTotal,
    locationPosts: generatedLocationPosts.length,
    guidePosts: generatedGuidePosts.length,
    spiritualPosts: generatedSpiritualPosts.length,
    eventPosts: generatedEventPosts.length,
  });
}

try {
  main();
} catch (error) {
  console.error("seo-blog-generator-error", {
    timestamp: Date.now(),
    message: "Failed to generate deterministic SEO blog cluster.",
    error: error instanceof Error ? error.message : String(error),
  });
  process.exit(1);
}
