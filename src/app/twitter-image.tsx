/**
 * File: src/app/twitter-image.tsx
 * Module: app
 * Purpose: Generate default Twitter card image for social sharing.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-13
 * Notes:
 * - Used as a fallback when a page-specific Twitter image is not provided.
 * - Generated at build time and cached by Next.js.
 */

import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
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
            "linear-gradient(135deg, rgba(201, 138, 44, 1) 0%, rgba(88, 20, 20, 1) 60%, rgba(20, 20, 20, 1) 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 58, fontWeight: 800, letterSpacing: -1 }}>
          Shri Gajanan Maharaj Sansthan
        </div>
        <div style={{ fontSize: 28, marginTop: 14, opacity: 0.95 }}>
          Accommodation booking help • WhatsApp & Call
        </div>
      </div>
    ),
    size
  );
}

