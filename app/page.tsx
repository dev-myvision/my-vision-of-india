import Script from 'next/script';
import { preloadModule } from 'react-dom';
import HomeMarkup from './home-markup';
import { BOOKS } from './books';
import { pageMetadata } from './seo';
import { AUTHOR, BOOK_TITLE, SITE_URL, absoluteUrl } from './site';
import StageScript from './stage-script';
import './home.css';

export const metadata = pageMetadata({
  title: 'My Vision of India: The Short Edition by Joshua Paul Voola',
  description:
    'Three books on governing India, building prosperity and a safe, caring nation, in one volume you can read in a few evenings. Free to download.',
  path: '/',
  absolute: true,
});

// Tells search engines what the site is about: the book, its author and its three parts.
const bookJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: BOOK_TITLE,
  author: { '@type': 'Person', name: AUTHOR },
  // Absolute addresses: SITE_URL is the Vercel production address (or SITE_URL once the domain is set).
  url: absoluteUrl('/'),
  image: `${SITE_URL}/images/cover-front-900.webp`,
  inLanguage: 'en-IN',
  bookFormat: 'https://schema.org/EBook',
  numberOfPages: 325,
  datePublished: '2026',
  bookEdition: 'The Short Edition, first edition',
  isAccessibleForFree: true,
  hasPart: BOOKS.map((b) => ({ '@type': 'Book', name: `Book ${b.ordinal}: ${b.title}`, url: absoluteUrl(`/${b.slug}`) })),
};

export default function Home() {
  // Fetch the 3D stage and three.js while the page is still parsing.
  preloadModule('/js/stage.js');
  preloadModule('/vendor/three/three.module.js');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }} />
      <HomeMarkup />
      {/* The page is rendered on the server; these bring it to life once React has hydrated it. */}
      <StageScript />
      <Script src="/js/chapters.js" strategy="afterInteractive" />
      <Script src="/js/spreads.js" strategy="afterInteractive" />
    </>
  );
}
