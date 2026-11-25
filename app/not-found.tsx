import type { Metadata } from 'next';
import { BOOKS } from './books';
import { SiteFooter, SiteHeader } from './components/chrome';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page is not on file. Find the three books of My Vision of India from here.',
  // Next.js marks 404 responses noindex by itself.
};

// Shown for any address the site does not have, with a 404 status.
export default function NotFound() {
  return (
    <div className="pg">
      <SiteHeader />
      <main id="main" className="pg-main">
        <section className="pg-sec" style={{ paddingTop: 110, paddingBottom: 140 }}>
          <div className="pg-lost">
            <p className="code">Error 404</p>
            <h1>Not on file</h1>
            <p>There is no page at this address. It may have moved, or the link may have a typing mistake. These are on file:</p>
            <ul>
              <li><a href="/">The home page</a></li>
              {BOOKS.map((b) => (
                <li key={b.slug}><a href={`/${b.slug}`}>Book {b.ordinal}: {b.title}</a></li>
              ))}
              <li><a href="/contact">Write to us</a></li>
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
