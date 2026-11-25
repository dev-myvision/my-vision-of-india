import type { Metadata } from 'next';
import { SITE_NAME } from './site';

type PageSeo = {
  /** Shown in the browser tab and search results; the layout adds " | My Vision of India". */
  title: string;
  /** The <meta name="description">: one or two plain sentences, about 150 characters. */
  description: string;
  /** The page's own path, e.g. "/contact". Becomes the canonical URL. */
  path: string;
  /** Set for pages that should stay out of search results. */
  noindex?: boolean;
  /** Use the title as it is, without the site name after it (the home page). */
  absolute?: boolean;
};

// Title, description, canonical link and the Open Graph / X card text for one page.
// The share image itself comes from the opengraph-image file nearest the page.
export function pageMetadata({ title, description, path, noindex, absolute }: PageSeo): Metadata {
  const full = absolute ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_IN',
      url: path,
      title: full,
      description,
    },
    twitter: { card: 'summary_large_image', title: full, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
