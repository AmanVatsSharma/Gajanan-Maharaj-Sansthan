/**
 * File: src/data/testimonials.ts
 * Module: data
 * Purpose: Devotee testimonials and experiences.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 */

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  date?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "The peace and serenity I experienced at Shegaon is beyond words. The accommodation was clean, staff was helpful, and the spiritual atmosphere touched my heart deeply. Jai Gajanan Maharaj!",
    author: "Smt. Priya Deshmukh",
    location: "Mumbai, Maharashtra",
  },
  {
    id: "2",
    quote: "Our family has been visiting Shegaon for three generations. The Sansthan's dedication to cleanliness, discipline, and devotee service is exemplary. The Mahaprasad distribution and free bus service are great examples of selfless seva.",
    author: "Shri Ramesh Kulkarni",
    location: "Pune, Maharashtra",
  },
  {
    id: "3",
    quote: "Anand Sagar is a divine oasis of tranquility. The beautiful gardens, meditation centers, and peaceful atmosphere provide the perfect setting for spiritual contemplation. A must-visit for every devotee.",
    author: "Smt. Anjali Patil",
    location: "Nagpur, Maharashtra",
  },
  {
    id: "4",
    quote: "The accommodation booking process was smooth, and the rooms at Bhakta Niwas exceeded our expectations. The Sansthan truly lives by the principle of 'Atithi Devo Bhava'. We felt blessed and welcome.",
    author: "Shri Vikram Sharma",
    location: "Delhi",
  },
];
