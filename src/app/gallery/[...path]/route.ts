/**
 * File: src/app/gallery/[...path]/route.ts
 * Module: app/gallery
 * Purpose: Serve generated placeholder images for `/gallery/*` when real assets are missing.
 * Author: Cursor AI
 * Last-updated: 2026-02-17
 * Notes:
 * - Prevents 404s for hero/gallery image URLs referenced across the UI.
 * - Replace these placeholders by adding real files under `public/gallery/`.
 */

import React from "react";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = { width: 1200, height: 630 };

function safeLabel(raw: string): string {
  const normalized = raw.replace(/[-_]/g, " ").trim();
  return normalized.length > 90 ? `${normalized.slice(0, 90)}…` : normalized;
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
          "linear-gradient(135deg, rgba(67, 20, 7, 1) 0%, rgba(139, 69, 19, 1) 45%, rgba(245, 158, 11, 0.95) 100%)",
        color: "#ffffff",
        textAlign: "center",
        border: "10px solid rgba(255, 255, 255, 0.2)",
        boxSizing: "border-box",
      },
    },
    React.createElement(
      "div",
      { style: { fontSize: 50, fontWeight: 800, lineHeight: 1.1 } },
      "Shri Gajanan Maharaj Sansthan"
    ),
    React.createElement(
      "div",
      { style: { fontSize: 26, marginTop: 18, opacity: 0.95 } },
      "Gallery placeholder image"
    ),
    React.createElement(
      "div",
      { style: { fontSize: 20, marginTop: 20, opacity: 0.85 } },
      label || "gallery image"
    ),
    React.createElement(
      "div",
      { style: { fontSize: 18, marginTop: 22, opacity: 0.75 } },
      "Add real assets under public/gallery/"
    )
  );

  const response = new ImageResponse(element, size);
  response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return response;
}
