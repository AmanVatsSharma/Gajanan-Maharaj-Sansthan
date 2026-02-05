/**
 * File: next.config.ts
 * Module: root
 * Purpose: Next.js configuration optimized for SEO and Core Web Vitals
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Image optimization enabled for better LCP scores
 * - Compression enabled for faster page loads
 * - Static page generation where possible
 * - Remote image patterns for external CDNs (if needed in future)
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // Add remote patterns if using external image sources
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'example.com',
    //   },
    // ],
  },

  // Enable compression
  compress: true,

  // Optimize production builds
  swcMinify: true,

  // Power efficient build
  poweredByHeader: false,

  // Generate ETags for better caching
  generateEtags: true,

  // Optimize for static export where possible
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,

  // Strict mode for better React practices
  reactStrictMode: true,

  // Experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
