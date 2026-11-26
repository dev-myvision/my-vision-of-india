import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  async redirects() {
    return [
      // The book PDF was renamed; links shared under the old name still reach it.
      { source: '/My-Vision-of-India-The-Short-Edition.pdf', destination: '/My-Vision-of-India.pdf', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // The book is handed out through the download form, so keep the PDF itself out of search results.
        source: '/My-Vision-of-India.pdf',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        // three.js is pinned to 0.160.0 and never changes at this address.
        source: '/vendor/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // Photos and textures: a day in the browser, then refreshed quietly from Vercel's CDN.
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
