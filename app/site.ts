// One place for the facts every page shares.

// The site's public address, used by canonical tags, sitemap.xml, robots.txt, the share
// images and the structured data. In order of preference:
//   1. SITE_URL, set in Vercel's Environment Variables once the domain is bought;
//   2. the project's production address that Vercel provides (e.g. my-vision-of-india.vercel.app),
//      so the site is correct before a domain exists;
//   3. localhost, for `npm run dev` and `npm run build` on your own computer.
const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = (
  process.env.SITE_URL || (vercelProduction ? `https://${vercelProduction}` : 'http://localhost:3000')
).replace(/\/$/, '');

// Only the production deployment should be in search results. Vercel's preview deployments
// (one per branch or pull request) are kept out of them.
export const INDEXABLE = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production';

export const SITE_NAME = 'My Vision of India';
export const BOOK_TITLE = 'My Vision of India: The Short Edition';
export const AUTHOR = 'Joshua Paul Voola';

export const SITE_DESCRIPTION =
  'Three books on governing India, building prosperity and a safe, caring nation, in one volume you can read in a few evenings. Free to download.';

// The public address readers can write to (privacy requests, the contact page).
// Empty until it is chosen: the pages then show a highlighted placeholder. Fill it in before launch.
export const CONTACT_EMAIL = '';

// The web app address of the Apps Script in google-sheet-script.gs. The contact form's
// server route sends to it; public/js/chapters.js keeps its own copy for the download form.
export const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbw4MWiv1bAAyNkTi6Ru_7VmuK9AiQtU6g6uQ_fZbOo6GvbOm5CgHaBcadtEgjozsnI6/exec';

export const absoluteUrl = (path: string) => SITE_URL + (path === '/' ? '' : path);

// Every public page. sitemap.xml is built from this list, so add a page here when you add one to app/.
// `updated` is the date its content last changed (YYYY-MM-DD).
export type SitePage = { path: string; updated: string; images?: string[] };

export const PAGES: SitePage[] = [
  { path: '/', updated: '2026-11-25', images: ['/images/cover-front-m.webp', '/images/cover-back.webp', '/images/book-open.webp'] },
  { path: '/governing-india', updated: '2026-11-25' },
  { path: '/building-prosperity', updated: '2026-11-25' },
  { path: '/a-safe-and-caring-nation', updated: '2026-11-25' },
  { path: '/contact', updated: '2026-11-25' },
  { path: '/privacy-policy', updated: '2026-11-25' },
];
