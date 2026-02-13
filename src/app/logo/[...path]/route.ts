/**
 * File: src/app/logo/[...path]/route.ts
 * Module: app/logo
 * Purpose: Serve generated placeholder logos for `/logo/*` when real assets are missing.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-13
 * Notes:
 * - Prevents broken logo images in Navbar and structured data.
 * - Replace these placeholders by adding real files under `public/logo/`.
 */

import React from "react";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = { width: 512, height: 512 };

function safeLabel(raw: string): string {
  const normalized = raw.replace(/[-_]/g, " ").trim();
  return normalized.length > 40 ? `${normalized.slice(0, 40)}…` : normalized;
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
        background:
          "linear-gradient(135deg, rgba(88, 20, 20, 1) 0%, rgba(201, 138, 44, 1) 100%)",
        color: "#ffffff",
        textAlign: "center",
        borderRadius: 64,
      },
    },
    React.createElement(
      "div",
      { style: { fontSize: 96, fontWeight: 900, letterSpacing: -4 } },
      "SG"
    ),
    React.createElement(
      "div",
      { style: { fontSize: 22, marginTop: 10, opacity: 0.9 } },
      label || "logo"
    )
  );

  const res = new ImageResponse(element, size);

  res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return res;
}

