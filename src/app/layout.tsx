/**
 * File: src/app/layout.tsx
 * Module: app
 * Purpose: Root layout with global metadata and shared layout chrome.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - `metadataBase` derives from NEXT_PUBLIC_SITE_URL / VERCEL_URL with localhost fallback.
 */
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const metadataBase = (() => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
})();

const siteTitle = "Shri Gajanan Maharaj Sansthan";
const siteDescription =
  "Official website for Shri Gajanan Maharaj Sansthan, Shegaon. Accommodation booking requests, locations, and devotee information.";
const ogImage = "/images/shegaon-temple.jpg";

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  applicationName: siteTitle,
  keywords: [
    "Shri Gajanan Maharaj",
    "Shegaon",
    "Sansthan",
    "Bhakta Niwas",
    "Accommodation",
    "Darshan",
    "Maharashtra",
    "Pilgrimage",
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    siteName: siteTitle,
    locale: "en_IN",
    url: "/",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${siteTitle} - Official Website`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="grow">
          {children}
        </main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
