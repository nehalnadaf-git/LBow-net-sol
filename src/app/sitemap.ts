import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';
import { locations } from '@/lib/locations';
import { brands } from '@/lib/brands';
import { blogPosts } from '@/lib/blogs';

const BASE_URL = 'https://lbownetworksolutions.com';

// ─────────────────────────────────────────────────────────────────────────────
// SITEMAP — lbownetworksolutions.com
// Structure: one flat sitemap covering all routes, ordered by priority.
// Google recommends ≤ 50 000 URLs / 50 MB per sitemap file; we are well within.
// Priority tiers:
//   1.0  Homepage
//   0.9  Primary conversion pages (products index, contact)
//   0.85 Tier-1 location pages (Bangalore industrial zones — highest local intent)
//   0.8  Secondary core pages + individual product pages
//   0.7  Supporting pages (blog index, FAQ, brands, locations index)
//   0.6  Blog posts
//   0.3  Legal pages
// ─────────────────────────────────────────────────────────────────────────────

export default function sitemap(): MetadataRoute.Sitemap {

  // ── 1. Homepage ──────────────────────────────────────────────────────────
  const home: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: '2025-06-01',
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  // ── 2. Primary conversion pages ──────────────────────────────────────────
  const coreConversion: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/products`, lastModified: '2025-06-01', changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/contact`,  lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.9 },
  ];

  // ── 3. Location pages (Tier-1: Bangalore zones = highest local SEO value) ─
  const locationPages: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${BASE_URL}/locations/${l.slug}`,
    lastModified: '2025-06-01',
    changeFrequency: 'monthly' as const,
    // Tier-1 Bangalore industrial zones get 0.85, all others 0.7
    priority: l.tier === 1 ? 0.85 : 0.7,
  }));

  // ── 4. Secondary core pages ───────────────────────────────────────────────
  const coreSupporting: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/about`,     lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`,  lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/locations`, lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.8 },
  ];

  // ── 5. Individual product pages ───────────────────────────────────────────
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: '2025-06-01',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ── 6. Supporting pages ───────────────────────────────────────────────────
  const supporting: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/blog`,   lastModified: '2025-06-01', changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE_URL}/faq`,    lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/brands`, lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.7 },
  ];

  // ── 7. Brand detail pages ─────────────────────────────────────────────────
  const brandPages: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${BASE_URL}/brands/${b.slug}`,
    lastModified: '2025-06-01',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ── 8. Blog posts (use actual publish date for freshness signal) ──────────
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  // ── 9. Legal pages ────────────────────────────────────────────────────────
  const legal: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/privacy-policy`,   lastModified: '2025-01-01', changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: '2025-01-01', changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Return in priority-descending order so crawlers index high-value pages first
  return [
    ...home,
    ...coreConversion,
    ...locationPages.filter((l) => l.priority === 0.85), // Tier-1 locations alongside core
    ...coreSupporting,
    ...productPages,
    ...supporting,
    ...brandPages,
    ...locationPages.filter((l) => l.priority === 0.7),  // Tier-2/3 locations
    ...blogPages,
    ...legal,
  ];
}
