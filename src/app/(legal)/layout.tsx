/**
 * @file layout.tsx
 * @module app/(legal)
 * @description Layout for legal policy pages with prose styling
 * @author BharatERP
 * @created 2026-02-13
 */

import React from "react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8">
      <article className="prose prose-slate lg:prose-lg mx-auto">
        {children}
      </article>
    </div>
  );
}
