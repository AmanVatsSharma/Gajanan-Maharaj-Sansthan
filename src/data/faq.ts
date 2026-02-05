/**
 * File: src/data/faq.ts
 * Module: data
 * Purpose: FAQ content for booking and temple visit questions
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Booking-focused questions for better SEO
 * - Used with FAQ schema markup
 * - Addresses common devotee queries
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "booking" | "facilities" | "rules" | "visit";
}

export const bookingFAQs: FAQItem[] = [
  {
    id: "how-to-book",
    question: "How do I book accommodation at Shri Gajanan Maharaj Sansthan?",
    answer:
      "To book accommodation, fill out the booking request form on our website. After submission, you can send the request via WhatsApp to our booking helpline or call directly. Final confirmation is provided by the Sansthan office based on availability and booking rules.",
    category: "booking",
  },
  {
    id: "booking-advance",
    question: "How far in advance can I book accommodation?",
    answer:
      "Accommodation booking is typically accepted up to 30 days in advance. However, during special occasions and festivals, advance booking periods may vary. We recommend contacting the office directly for major festivals.",
    category: "booking",
  },
  {
    id: "family-only",
    question: "Can unmarried couples or groups of friends book rooms?",
    answer:
      "No, accommodation is strictly for families only. Rooms are allocated only to married couples with valid proof of marriage. Unmarried couples and groups of friends may be directed to dormitory facilities. Valid government ID is mandatory for all guests.",
    category: "rules",
  },
  {
    id: "minimum-occupancy",
    question: "What is the minimum number of people required to book a room?",
    answer:
      "A minimum of 3 family members is usually required to book a private room. This ensures optimal utilization of our limited accommodation resources for families visiting for darshan.",
    category: "booking",
  },
  {
    id: "accommodation-cost",
    question: "What is the cost of accommodation?",
    answer:
      "Accommodation at Shri Gajanan Maharaj Sansthan is provided on a donation basis. There is no fixed charge, and devotees can contribute as per their capacity. The Sansthan operates on the principle of serving all devotees equally.",
    category: "facilities",
  },
  {
    id: "check-in-duration",
    question: "How long can I stay at the Bhakta Niwas?",
    answer:
      "Accommodation is typically allotted for 24 hours from the time of check-in. Extensions may be considered based on availability, but you should inform the office staff if you need to stay longer.",
    category: "rules",
  },
  {
    id: "facilities-available",
    question: "What facilities are provided in the accommodation?",
    answer:
      "Facilities vary by location but generally include: hot water (morning hours), Mahaprasad canteen, free bus service to temple, parking, and basic room amenities. Some locations offer AC rooms, dormitories, and deluxe options. Check individual location pages for specific details.",
    category: "facilities",
  },
  {
    id: "id-proof-required",
    question: "What documents do I need to bring for check-in?",
    answer:
      "Valid government-issued ID proof is mandatory for all guests. This includes Aadhar Card, Voter ID, Passport, or Driving License. Married couples may be asked to provide proof of marriage (marriage certificate or relevant documents).",
    category: "rules",
  },
  {
    id: "multiple-locations",
    question: "Can I book accommodation at multiple locations?",
    answer:
      "Yes, Shri Gajanan Maharaj Sansthan manages accommodation at multiple holy places including Shegaon, Pandharpur, Trimbakeshwar, and Omkareshwar. You can book at any location based on your pilgrimage plans, subject to availability.",
    category: "booking",
  },
  {
    id: "cancellation-policy",
    question: "What is the cancellation policy?",
    answer:
      "If you need to cancel your booking, please inform the Sansthan office as soon as possible via phone or WhatsApp. This helps us allocate the accommodation to other devotees waiting for rooms. There are no cancellation charges.",
    category: "booking",
  },
  {
    id: "food-available",
    question: "Is food available at the accommodation?",
    answer:
      "Yes, most locations have Mahaprasad canteen or Bhojan Kaksha where simple, satvik meals are provided to devotees. The timing and availability may vary by location. Some locations also offer prasad distribution.",
    category: "facilities",
  },
  {
    id: "temple-timings",
    question: "What are the temple darshan timings?",
    answer:
      "The main temple in Shegaon is open for darshan throughout the day from early morning till late evening. Specific timings may vary for aarti and special ceremonies. Free bus service is often provided from accommodation to the main temple.",
    category: "visit",
  },
];

/**
 * Get FAQs by category
 */
export function getFAQsByCategory(
  category: FAQItem["category"]
): FAQItem[] {
  return bookingFAQs.filter((faq) => faq.category === category);
}

/**
 * Get all booking-related FAQs
 */
export function getBookingFAQs(): FAQItem[] {
  return getFAQsByCategory("booking");
}
