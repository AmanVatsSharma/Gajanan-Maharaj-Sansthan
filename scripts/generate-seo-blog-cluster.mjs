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

const BLOG_ROOT = path.join(process.cwd(), "content/blog");
const AUTHOR_NAME = "Sansthan";
const BASE_DATE = new Date("2026-02-15T00:00:00Z");

const CORE_RELATED_SLUGS = [
  "shegaon-travel-guide",
  "shegaon-accommodation-guide",
  "nearby-places-from-shegaon",
  "omkareshwar-darshan-timings",
  "welcome-to-sansthan",
];

const LOCATION_CONFIGS = [
  {
    key: "shegaon",
    city: "Shegaon",
    count: 25,
    directory: "locations/shegaon",
    image: "/images/shegaon-temple.jpg",
    locationPage: "/locations/shegaon-bhakt-niwas",
    locationIds: ["shegaon-bhakt-niwas", "shegaon-anand-vihar", "shegaon-visawa"],
    keywordSeed: [
      "shri gajanan maharaj sansthan shegaon",
      "shree gajanan maharaj sansthan shegaon",
      "sri gajanan maharaj sansthan shegaon",
      "shegaon temple accommodation",
      "shegaon darshan planning",
    ],
  },
  {
    key: "omkareshwar",
    city: "Omkareshwar",
    count: 20,
    directory: "locations/omkareshwar",
    image: "/images/omkareshwar.jpg",
    locationPage: "/locations/omkareshwar",
    locationIds: ["omkareshwar"],
    keywordSeed: [
      "shri gajanan maharaj sansthan omkareshwar",
      "shree gajanan maharaj sansthan omkareshwar",
      "sri gajanan maharaj sansthan omkareshwar",
      "omkareshwar temple accommodation",
      "omkareshwar darshan timings",
    ],
  },
  {
    key: "pandharpur",
    city: "Pandharpur",
    count: 15,
    directory: "locations/pandharpur",
    image: "/images/pandharpur.jpg",
    locationPage: "/locations/pandharpur-math",
    locationIds: ["pandharpur-math"],
    keywordSeed: [
      "shri gajanan maharaj sansthan pandharpur",
      "shree gajanan maharaj sansthan pandharpur",
      "sri gajanan maharaj sansthan pandharpur",
      "pandharpur temple stay",
      "pandharpur accommodation guide",
    ],
  },
  {
    key: "trimbakeshwar",
    city: "Trimbakeshwar",
    count: 15,
    directory: "locations/trimbakeshwar",
    image: "/images/trimbakeshwar.jpg",
    locationPage: "/locations/trimbakeshwar",
    locationIds: ["trimbakeshwar"],
    keywordSeed: [
      "shri gajanan maharaj sansthan trimbakeshwar",
      "shree gajanan maharaj sansthan trimbakeshwar",
      "sri gajanan maharaj sansthan trimbakeshwar",
      "trimbakeshwar accommodation",
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
];

const SPIRITUAL_POST_VARIANTS = [
  "teachings-of-shri-gajanan-maharaj-for-modern-families",
  "daily-devotional-routine-for-pilgrimage-travelers",
  "importance-of-seva-in-sansthan-tradition",
  "how-devotees-can-prepare-mindfully-for-darshan",
  "spiritual-benefits-of-disciplined-yatra-planning",
];

const EVENT_POST_VARIANTS = [
  "ram-navami-devotee-planning-guide",
  "rishi-panchami-visit-preparation-guide",
  "major-utsav-crowd-planning-checklist",
  "festival-darshan-timing-awareness-guide",
  "community-seva-event-participation-guide",
];

function formatDateByOffset(offset) {
  const value = new Date(BASE_DATE);
  value.setDate(value.getDate() - offset);
  return value.toISOString().slice(0, 10);
}

function ensureDirectory(directoryPath) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

function toTitleCase(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() || ""}${part.slice(1)}`)
    .join(" ");
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
}) {
  return `# ${city} ${topicTitle}

${city} remains one of the most searched pilgrimage destinations by devotees looking for trusted temple guidance, darshan clarity, and Sansthan accommodation support. This guide on **${city} ${topicTitle.toLowerCase()}** is written for families who want a practical and peaceful yatra experience.

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

## Related guides for deeper planning

${relatedBlogLinks
  .map((entry) => `- [${entry.label}](/blog/${entry.slug})`)
  .join("\n")}

## Practical conclusion for ${city} devotees

This ${city} planning resource is built to make your pilgrimage smoother, more spiritual, and better organized. For best outcomes, complete your route planning early, confirm accommodation through official support, and keep your itinerary realistic for all age groups.
`;
}

function buildCrossLocationGuideContent({ title }) {
  return `# ${title}

This guide helps devotees compare multiple locations connected to Shri Gajanan Maharaj Sansthan and related pilgrimage circuits. It is ideal for families planning a structured trip across Shegaon, Omkareshwar, Pandharpur, and Trimbakeshwar.

## Core planning actions

1. Decide the primary darshan priority for your family.
2. Assign travel days with enough rest intervals.
3. Keep accommodation communication centralized.
4. Prepare emergency contacts and health essentials.

## Official pages to use during planning

- [All Sansthan Locations](/locations)
- [Shegaon Bhakt Niwas](/locations/shegaon-bhakt-niwas)
- [Omkareshwar Accommodation](/locations/omkareshwar)
- [Pandharpur Sansthan Location](/locations/pandharpur-math)
- [Trimbakeshwar Sansthan Location](/locations/trimbakeshwar)
- [Booking Request Page](/booking)
- [Contact Sansthan Support](/contact)

## Related reading

- [Shegaon Travel Guide](/blog/shegaon-travel-guide)
- [Shegaon Accommodation Guide](/blog/shegaon-accommodation-guide)
- [Omkareshwar Darshan Timings Guide](/blog/omkareshwar-darshan-timings)
- [Nearby Places from Shegaon](/blog/nearby-places-from-shegaon)

## Final note

For the best pilgrimage experience, keep your plan devotional but practical: focus on darshan flow, family comfort, and official communication clarity at every stage.
`;
}

function buildSpiritualOrEventContent({ title, focusKeyword, category }) {
  const headingLabel =
    category === "events" ? "Festival and event planning insights" : "Spiritual preparation insights";

  return `# ${title}

${focusKeyword} is frequently searched by devotees who want both spiritual clarity and practical planning support. This article provides structured guidance aligned with Sansthan discipline and family-friendly travel needs.

## ${headingLabel}

- Keep darshan planning realistic and time-buffered.
- Align travel expectations with senior citizens and children.
- Confirm accommodation and communication channels in advance.
- Focus on seva, discipline, and mindful conduct throughout the journey.

## Helpful official links

- [Sansthan Locations](/locations)
- [Shegaon Bhakt Niwas Location](/locations/shegaon-bhakt-niwas)
- [Omkareshwar Sansthan Location](/locations/omkareshwar)
- [Accommodation Booking Request](/booking)
- [Contact Sansthan Office](/contact)

## Continue reading

- [Welcome to Sansthan](/blog/welcome-to-sansthan)
- [Shegaon Travel Guide](/blog/shegaon-travel-guide)
- [Shegaon Accommodation Guide](/blog/shegaon-accommodation-guide)
- [Omkareshwar Darshan Timings](/blog/omkareshwar-darshan-timings)

## Devotee takeaway

Use this guidance as a planning companion, and rely on official channels for final operational details, availability, and schedule-sensitive updates.
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
    for (let index = 0; index < config.count; index += 1) {
      const topic = LOCATION_TOPIC_VARIANTS[index];
      const slug = `${config.key}-${topic.suffix}`;
      const title = `${toTitleCase(config.key)} ${topic.title} | Shri Gajanan Maharaj Sansthan`;
      const description = `Detailed ${config.city.toLowerCase()} ${topic.title.toLowerCase()} for devotees searching Shri/Shree/Sri Gajanan Maharaj Sansthan ${config.city}. Includes booking links, travel tips, and internal route guidance.`;
      const date = formatDateByOffset(globalOffset);
      globalOffset += 1;

      const keywords = [
        ...config.keywordSeed,
        `${config.city.toLowerCase()} ${topic.title.toLowerCase()}`,
        `${config.city.toLowerCase()} pilgrimage planning`,
        `${config.city.toLowerCase()} accommodation booking`,
      ];
      const tags = [
        config.key,
        topic.intent,
        "sansthan-seo",
        "pilgrimage-guide",
      ];

      const relatedSlugs = CORE_RELATED_SLUGS.slice(0, 3);
      const relatedBlogLinks = [
        { slug: "shegaon-travel-guide", label: "Complete Travel Guide to Shegaon" },
        { slug: "shegaon-accommodation-guide", label: "Shegaon Accommodation Guide" },
        { slug: "omkareshwar-darshan-timings", label: "Omkareshwar Darshan Timings Guide" },
      ];

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

  for (const [index, variant] of CROSS_LOCATION_GUIDE_VARIANTS.entries()) {
    const slug = variant;
    const title = `${toTitleCase(variant)} | Shri Gajanan Maharaj Sansthan`;
    const description =
      "Cross-location pilgrimage planning guide for devotees searching Shegaon, Omkareshwar, Pandharpur, and Trimbakeshwar accommodation and route support.";
    const date = formatDateByOffset(120 + index);
    const frontmatter = buildFrontmatter({
      title,
      description,
      date,
      slug,
      image: "/images/shegaon-temple.jpg",
      keywords: [
        "shri gajanan maharaj sansthan travel guide",
        "shree gajanan maharaj sansthan pilgrimage",
        "sri gajanan maharaj sansthan route planning",
        "multi location temple accommodation guide",
      ],
      tags: ["guides", "multi-location", "travel-planning", "sansthan-seo"],
      category: "guides",
      locationIds: ["shegaon-bhakt-niwas", "omkareshwar", "pandharpur-math", "trimbakeshwar"],
      relatedSlugs: CORE_RELATED_SLUGS.slice(0, 3),
    });

    const content = buildCrossLocationGuideContent({ title });
    const relativePath = `guides/${slug}.md`;
    writePostFile(relativePath, `${frontmatter}${content}`);
    generated.push(relativePath);
  }

  return generated;
}

function generateSpiritualPosts() {
  const generated = [];

  for (const [index, variant] of SPIRITUAL_POST_VARIANTS.entries()) {
    const slug = variant;
    const title = `${toTitleCase(variant)} | Spiritual Guidance`;
    const description =
      "Spiritual and practical devotional guidance for Sansthan devotees planning darshan and accommodation with discipline.";
    const date = formatDateByOffset(160 + index);
    const frontmatter = buildFrontmatter({
      title,
      description,
      date,
      slug,
      image: "/images/shegaon-temple.jpg",
      keywords: [
        "shri gajanan maharaj teachings",
        "shree gajanan maharaj spiritual guidance",
        "sri gajanan maharaj devotee planning",
        "sansthan devotional discipline",
      ],
      tags: ["spiritual", "teachings", "devotion", "sansthan-seo"],
      category: "spiritual",
      locationIds: ["shegaon-bhakt-niwas"],
      relatedSlugs: CORE_RELATED_SLUGS.slice(0, 3),
    });

    const content = buildSpiritualOrEventContent({
      title,
      focusKeyword: "Shri Gajanan Maharaj spiritual planning",
      category: "spiritual",
    });

    const relativePath = `spiritual/${slug}.md`;
    writePostFile(relativePath, `${frontmatter}${content}`);
    generated.push(relativePath);
  }

  return generated;
}

function generateEventPosts() {
  const generated = [];

  for (const [index, variant] of EVENT_POST_VARIANTS.entries()) {
    const slug = variant;
    const title = `${toTitleCase(variant)} | Devotee Event Guide`;
    const description =
      "Festival/event support guide for devotees searching Sansthan darshan timing and accommodation planning during high-rush periods.";
    const date = formatDateByOffset(180 + index);
    const frontmatter = buildFrontmatter({
      title,
      description,
      date,
      slug,
      image: "/images/shegaon-temple.jpg",
      keywords: [
        "shri gajanan maharaj sansthan festival guide",
        "shree gajanan maharaj sansthan event planning",
        "sri gajanan maharaj darshan festival season",
        "festival accommodation planning shegaon",
      ],
      tags: ["events", "festival", "darshan", "sansthan-seo"],
      category: "events",
      locationIds: ["shegaon-bhakt-niwas"],
      relatedSlugs: CORE_RELATED_SLUGS.slice(0, 3),
    });

    const content = buildSpiritualOrEventContent({
      title,
      focusKeyword: "Sansthan festival darshan planning",
      category: "events",
    });

    const relativePath = `events/${slug}.md`;
    writePostFile(relativePath, `${frontmatter}${content}`);
    generated.push(relativePath);
  }

  return generated;
}

function main() {
  ensureDirectory(BLOG_ROOT);
  console.info("seo-blog-generator-start", {
    timestamp: Date.now(),
    blogRoot: BLOG_ROOT,
  });

  const generatedLocationPosts = generateLocationClusterPosts();
  const generatedGuidePosts = generateCrossLocationGuides();
  const generatedSpiritualPosts = generateSpiritualPosts();
  const generatedEventPosts = generateEventPosts();

  const generatedTotal =
    generatedLocationPosts.length +
    generatedGuidePosts.length +
    generatedSpiritualPosts.length +
    generatedEventPosts.length;

  console.info("seo-blog-generator-complete", {
    timestamp: Date.now(),
    generatedTotal,
    locationPosts: generatedLocationPosts.length,
    guidePosts: generatedGuidePosts.length,
    spiritualPosts: generatedSpiritualPosts.length,
    eventPosts: generatedEventPosts.length,
  });
}

main();
