# Legal Module

This module contains the legal policy pages for the Gajanan Maharaj Sansthan website.

## Components

- **Privacy Policy**: `src/app/(legal)/privacy-policy/page.tsx`
- **Terms & Conditions**: `src/app/(legal)/terms-conditions/page.tsx`
- **Refund Policy**: `src/app/(legal)/refund-policy/page.tsx`
- **Disclaimer**: `src/app/(legal)/disclaimer/page.tsx`
- **Layout**: `src/app/(legal)/layout.tsx` - Provides a consistent, centered prose layout for all legal pages.

## Content Management

The content for these pages is hardcoded as JSX within the page components for performance and simplicity, as these policies are relatively static.

## Metadata

Each page uses `generatePageMetadata` from `@/lib/seo/metadata` to ensure proper SEO tags (title, description, canonical URL, etc.).

## Updates

- **Last Updated**: February 2026
- **Contact Email**: contact@gajananmaharaj.org
