/**
 * File: src/app/icon.tsx
 * Module: app
 * Purpose: Generate the app icon (used by browsers and search engines).
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-13
 * Notes:
 * - This is a generated icon (PNG) via Next.js metadata file conventions.
 * - Browsers may still request `/favicon.ico`; we handle that separately via a redirect route.
 */

import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: "linear-gradient(135deg, #5b1c1c 0%, #c98a2c 100%)",
          color: "#ffffff",
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: -0.5,
        }}
      >
        SG
      </div>
    ),
    size
  );
}

