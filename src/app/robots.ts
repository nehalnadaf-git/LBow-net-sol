import type { MetadataRoute } from 'next';

// robots.ts — lbownetworksolutions.com
// host directive signals the canonical domain (non-www) to crawlers.
// Disallow rules protect crawl budget from internal/API paths.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',        // Next.js API routes — not indexable content
          '/_next/',      // Next.js build chunks
          '/static/',     // Any static internal assets
        ],
      },
    ],
    sitemap: 'https://lbownetworksolutions.com/sitemap.xml',
    host:    'https://lbownetworksolutions.com',
  };
}
