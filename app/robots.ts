import type { MetadataRoute } from 'next';
import { INDEXABLE, SITE_URL } from './site';

// Served as /robots.txt. Every page may be crawled. The book's PDF is kept out of
// search results by an X-Robots-Tag header (next.config.ts), not by blocking it here,
// because a blocked URL can still be listed if crawlers cannot see the noindex.
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) return { rules: { userAgent: '*', disallow: '/' } };   // a Vercel preview
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
