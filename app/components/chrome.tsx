// The header, breadcrumbs and footer that every inner page shares.
// Links between pages are plain <a> tags: each page is a full load, so the home page's
// scripts always start fresh.

import { BOOKS } from '../books';
import { AUTHOR, SITE_NAME, absoluteUrl } from '../site';

export function SiteHeader() {
  return (
    <header className="pg-head">
      <a className="pg-brand" href="/">{SITE_NAME}</a>
      <nav className="pg-nav" aria-label="Site">
        <ul>
          {BOOKS.map((b) => (
            <li key={b.slug}><a href={`/${b.slug}`}>{b.title}</a></li>
          ))}
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <a className="pg-get" href="/#make-it-yours">Get the book</a>
    </header>
  );
}

export type Crumb = { name: string; path: string };

/** The trail from the home page to this one, shown on the page and given to search engines. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const all = [{ name: 'Home', path: '/' }, ...trail];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
  };
  return (
    <nav className="pg-crumbs" aria-label="Breadcrumb">
      <ol>
        {all.map((c, i) => (
          <li key={c.path}>
            {i < all.length - 1 ? <a href={c.path}>{c.name}</a> : <span aria-current="page">{c.name}</span>}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="pg-foot">
      <div className="pg-foot-card">
        <div className="pg-foot-top">
          <a className="pg-foot-word" href="/">{SITE_NAME}</a>
          <nav aria-labelledby="pf-books">
            <h2 id="pf-books">The books</h2>
            <ul>
              {BOOKS.map((b) => (
                <li key={b.slug}><a href={`/${b.slug}`}>{b.title}</a></li>
              ))}
              <li><a href="/#make-it-yours">Download the book</a></li>
            </ul>
          </nav>
          <nav aria-labelledby="pf-site">
            <h2 id="pf-site">The site</h2>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/privacy-policy">Privacy policy</a></li>
            </ul>
          </nav>
        </div>
        <div className="pg-foot-bar">
          <p>&copy; 2026 {SITE_NAME}. All rights reserved.</p>
          <p>First edition 2026. By {AUTHOR}.</p>
        </div>
        <p className="pg-foot-fine">
          Short passages may be quoted freely for discussion, teaching and public debate, with acknowledgement of the book.
          The proposals in this book are suggestions, not existing law. Nothing in this book is legal advice. This book is
          non-partisan. It does not support or oppose any political party, leader or government.
        </p>
      </div>
    </footer>
  );
}
