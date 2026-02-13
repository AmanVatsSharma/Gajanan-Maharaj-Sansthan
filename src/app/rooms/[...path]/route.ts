/**
 * File: src/app/rooms/[...path]/route.ts
 * Module: app/rooms
 * Purpose: Serve generated placeholder images for `/rooms/*` when real assets are missing.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-13
 * Notes:
 * - Prevents 404s for room image URLs referenced in `src/data/rooms.ts`.
 * - Replace these placeholders by adding real files under `public/rooms/`.
 */

import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = { width: 1200, height: 630 };

function safeLabel(raw: string): string {
  const normalized = raw.replace(/[-_]/g, " ").trim();
  return normalized.length > 80 ? `${normalized.slice(0, 80)}…` : normalized;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const label = safeLabel(path.join("/"));

  const res = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 64,
          background:
            "linear-gradient(135deg, rgba(250, 250, 250, 1) 0%, rgba(236, 253, 245, 1) 100%)",
          color: "#5b1c1c",
          textAlign: "center",
          border: "8px solid rgba(16, 185, 129, 0.25)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 800 }}>
          Room image placeholder
        </div>
        <div style={{ fontSize: 22, marginTop: 16, opacity: 0.85 }}>
          {label}
        </div>
        <div style={{ fontSize: 18, marginTop: 22, opacity: 0.7 }}>
          Add real images under public/rooms/
        </div>
      </div>
    ),
    size
  );

  res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return res;
}

