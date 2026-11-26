import type { Metadata, Viewport } from 'next';
import { Cinzel, Cormorant_Garamond, Courier_Prime, EB_Garamond, Mrs_Saint_Delafield, Pinyon_Script } from 'next/font/google';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './site';
import './globals.css';
// The inner pages' styles. Every rule sits under .pg, so the home page is untouched; loading it here
// (rather than from the 404 page) stops Next.js preloading it on every page without using it.
import './pages.css';

// The six families the design uses, served from this site instead of Google's servers.
// The stylesheets reach them through these CSS variables.
const cinzel = Cinzel({ subsets: ['latin'], variable: '--ff-cinzel', display: 'swap' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'], weight: ['300', '500', '600'], style: ['normal', 'italic'], variable: '--ff-cormorant', display: 'swap',
});
const ebGaramond = EB_Garamond({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--ff-ebgaramond', display: 'swap', preload: false });
const courier = Courier_Prime({
  subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'], variable: '--ff-courier', display: 'swap', preload: false,
});
const pinyon = Pinyon_Script({ subsets: ['latin'], weight: '400', variable: '--ff-pinyon', display: 'swap', preload: false });
const delafield = Mrs_Saint_Delafield({ subsets: ['latin'], weight: '400', variable: '--ff-delafield', display: 'swap', preload: false });

const fontVars = [cinzel, cormorant, ebGaramond, courier, pinyon, delafield].map((f) => f.variable).join(' ');

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'My Vision of India', template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  // Google Search Console: paste the code from its "HTML tag" method into GOOGLE_SITE_VERIFICATION.
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-IN" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
