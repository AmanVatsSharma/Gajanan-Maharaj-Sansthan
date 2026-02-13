/**
 * File: src/app/opengraph-image.tsx
 * Module: app
 * Purpose: Generate default Open Graph image for social sharing.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-13
 * Notes:
 * - Used as a fallback when a page-specific OG image is not provided.
 * - Generated at build time and cached by Next.js.
 */

import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
          textAlign: "center",
          background:
            "linear-gradient(135deg, rgba(88, 20, 20, 1) 0%, rgba(201, 138, 44, 1) 45%, rgba(88, 20, 20, 1) 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -1 }}>
          Shri Gajanan Maharaj Sansthan
        </div>
        <div style={{ fontSize: 30, marginTop: 14, opacity: 0.95 }}>
          Shegaon • Official Website
        </div>
        <div style={{ fontSize: 22, marginTop: 28, opacity: 0.9 }}>
          Accommodation • Locations • Devotee Information
        </div>
      </div>
    ),
    size
  );
}

