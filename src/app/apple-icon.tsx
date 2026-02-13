/**
 * File: src/app/apple-icon.tsx
 * Module: app
 * Purpose: Generate Apple touch icon for iOS home screens.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-13
 * Notes:
 * - Generated at build time and cached by Next.js.
 */

import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          background: "linear-gradient(135deg, #5b1c1c 0%, #c98a2c 100%)",
          color: "#ffffff",
          fontSize: 72,
          fontWeight: 900,
          letterSpacing: -2,
        }}
      >
        SG
      </div>
    ),
    size
  );
}

