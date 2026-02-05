# Module: locations

**Short:** Locations directory + detail pages for Sansthan accommodations.

**Purpose:** Provide devotees a clear, mobile-friendly directory of Sansthan-managed accommodation locations (facilities, amenities, contacts) with a direct path to the booking request flow.

**Entry points:**
- `src/app/locations/page.tsx`
- `src/app/locations/[id]/page.tsx`

**Files:**
- `components/LocationCard.tsx` — location preview card with “Details” and “Book” CTAs
- `components/AmenityList.tsx` — amenity rendering for detail pages
- `MODULE_DOC.md` — this document

**Data source:**
- `src/data/sansthan-data.ts` — `sansthanLocations` (images, facilities, amenities, contacts)

**Flow diagram:**

```mermaid
flowchart TD
  user[User] --> locationsPage[LocationsPage]
  locationsPage --> card[LocationCard]
  card --> detail[LocationDetailPage]
  detail --> booking[BookingPageWithLocationQuery]
```

**Behaviors:**
- **Mobile-first**: grid collapses to one column; room types table scrolls horizontally on small screens.
- **Performance**: uses Next `Image` for cards and the primary detail image to reduce layout shift.
- **Booking CTA**: routes to `/booking?location=<id>` to preselect the location in the wizard.

**Dependencies:**
- **Data**: `src/data/sansthan-data.ts`
- **UI primitives**: `src/components/ui/*`
- **Libraries**: `next/image`, `lucide-react`

**Env vars:**
- None required.

**Tests:**
- Not yet added.

**Change-log:**
- 2026-02-05: Upgraded location images to Next `Image`, improved mobile table rendering, and aligned CTAs with booking request flow.

