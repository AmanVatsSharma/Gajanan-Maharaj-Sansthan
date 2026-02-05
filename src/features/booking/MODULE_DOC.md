# Module: booking

**Short:** Guided accommodation booking request flow (WhatsApp + call).

**Purpose:** Help devotees request accommodation by collecting stay details, validating Sansthan rules, and preparing a pre-filled WhatsApp message (or call action) for the Sansthan office.

**Entry points:**
- `src/app/booking/page.tsx`
- `src/features/booking/components/BookingWizard.tsx`

**Files:**
- `components/BookingWizard.tsx` — 3-step wizard UI, validations, WhatsApp/call CTAs
- `schema.ts` — Zod validation schema for booking request fields
- `MODULE_DOC.md` — this document

**Flow diagram:**

```mermaid
flowchart TD
  user[User] --> bookingPage[BookingPage]
  bookingPage --> wizard[BookingWizard]
  wizard --> step1[Step1_StayDetails]
  step1 --> step2[Step2_RoomType]
  step2 --> step3[Step3_GuestInfo_Rules]
  step3 --> compose[ComposeWhatsAppMessage]
  compose --> wa[WhatsApp_wa_me]
  step3 --> call[Call_Helpline]
  wa --> office[SansthanOffice]
  call --> office
  office --> confirm[ConfirmAvailability]
```

**Behaviors & validations:**
- **Validation**: `zod` schema in `schema.ts` enforces required fields and basic constraints (dates, mobile format, rule acceptance).
- **Privacy**: the form collects ID proof info, but the WhatsApp message only states that the user will carry valid ID proof (no ID number is embedded in the URL/message).
- **No backend**: this module does not confirm or create bookings; it prepares a request for WhatsApp/calls.

**Dependencies:**
- **Data**: `src/data/sansthan-data.ts`, `src/data/contact.ts`
- **UI primitives**: `src/components/ui/*`
- **Libraries**: `react-hook-form`, `zod`, `framer-motion`, `date-fns`

**Env vars:**
- `NEXT_PUBLIC_SITE_URL`: used by global metadata/sitemap generation (recommended for production deployments)

**Tests:**
- Not yet added.

**Change-log:**
- 2026-02-05: Reworked booking flow to WhatsApp/call request workflow; removed fake “booking confirmed” UI.

