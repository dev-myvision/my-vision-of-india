import type { MetadataRoute } from 'next';
import { PAGES, SITE_URL, absoluteUrl } from './site';

// Served as /sitemap.xml, built from the page list in site.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: page.updated,
    images: page.images?.map((src) => SITE_URL + src),
  }));
}
