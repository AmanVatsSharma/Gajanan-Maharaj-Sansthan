# Blog Content Guide

This directory contains markdown content used to generate `/blog` pages.

## Directory structure

- `content/blog/locations/` - city and place-focused SEO pages (`shegaon`, `omkareshwar`, etc.)
- `content/blog/guides/` - practical planning and booking guides
- `content/blog/spiritual/` - teachings, devotion, and spiritual context
- `content/blog/events/` - festival and event updates
- `content/blog/_templates/` - authoring templates (ignored by the blog loader)

## Required frontmatter

```yaml
---
title: "Page title with main keyword"
description: "Meta description with location and intent"
date: "2026-02-15"
slug: "kebab-case-slug"
image: "/images/shegaon-temple.jpg"
keywords:
  - "primary keyword"
  - "secondary keyword"
author: "Sansthan"
tags:
  - "shegaon"
  - "travel-guide"
category: "locations"
locationIds:
  - "shegaon-bhakt-niwas"
relatedSlugs:
  - "shegaon-accommodation-guide"
---
```

## URL and slug rules

- Keep `slug` unique across all files.
- Use only lowercase letters, numbers, and hyphens.
- Keep URL intent clear: location + purpose (for example `shegaon-travel-guide`).

## Internal linking rules (mandatory)

Every post should include links to:

1. At least one location page (`/locations/<id>`).
2. Booking or contact intent pages (`/booking` or `/contact`).
3. One pillar post and two related cluster posts.

## Keyword placement checklist

- Include primary keyword in title, description, first paragraph, and one heading.
- Include location variants naturally (for example `Shegaon temple`, `Shegaon accommodation`).
- Add FAQ-style sections for long-tail queries.
- Avoid keyword stuffing; keep content natural and devotional.
