/**
 * File: src/app/images/[...path]/route.ts
 * Module: app/images
 * Purpose: Serve generated placeholder images for `/images/*` when real assets are missing.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-13
 * Notes:
 * - Prevents 404s for image URLs referenced in code (`/images/*.jpg`).
 * - Replace these placeholders by adding real files under `public/images/`.
 */

import React from "react";
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

  const element = React.createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 64,
        background:
          "linear-gradient(135deg, rgba(245, 245, 245, 1) 0%, rgba(255, 244, 230, 1) 100%)",
        color: "#5b1c1c",
        textAlign: "center",
        border: "8px solid rgba(201, 138, 44, 0.35)",
        boxSizing: "border-box",
      },
    },
    React.createElement(
      "div",
      { style: { fontSize: 46, fontWeight: 800 } },
      "Shri Gajanan Maharaj Sansthan"
    ),
    React.createElement(
      "div",
      { style: { fontSize: 26, marginTop: 14, opacity: 0.9 } },
      "Placeholder image"
    ),
    React.createElement(
      "div",
      { style: { fontSize: 22, marginTop: 26, opacity: 0.85 } },
      label
    ),
    React.createElement(
      "div",
      { style: { fontSize: 18, marginTop: 22, opacity: 0.7 } },
      "Add real images under public/images/"
    )
  );

  const res = new ImageResponse(element, size);

  res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return res;
}

