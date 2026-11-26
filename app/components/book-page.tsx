import { BOOKS, bookBySlug } from '../books';
import { pageMetadata } from '../seo';
import { AUTHOR } from '../site';
import { Breadcrumbs } from './chrome';

export function bookMetadata(slug: string) {
  const book = bookBySlug(slug)!;
  return pageMetadata({
    title: `Book ${book.ordinal}: ${book.title}`,
    description: book.description,
    path: `/${book.slug}`,
  });
}

export default function BookPage({ slug }: { slug: string }) {
  const book = bookBySlug(slug)!;
  const others = BOOKS.filter((b) => b.slug !== slug);
  const count = book.groups.reduce((n, g) => n + g.reforms.length, 0);

  return (
    <>
      <Breadcrumbs trail={[{ name: `Book ${book.ordinal}: ${book.title}`, path: `/${book.slug}` }]} />

      <header className="pg-title">
        <p className="pg-t">Book {book.ordinal}</p>
        <h1>{book.title}</h1>
        <p className="pg-tag">{book.tagline}</p>
        <p className="pg-lede">
          {count} reforms from <i>My Vision of India</i>, the shorter volume of three books by {AUTHOR}.
        </p>
      </header>

      <section className="pg-sec" aria-labelledby="why">
        <p className="pg-t" aria-hidden="true">The letter</p>
        <div className="pg-folder">
          <div className="pg-folder-tab" aria-hidden="true"><span>Book {book.ordinal} (0{BOOKS.indexOf(book) + 1})</span></div>
          <article className="pg-sheet">
            <h2 id="why">Why I wrote Book {book.ordinal}</h2>
            <p className="pg-epi">{book.epigraph}</p>
            {book.why.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            <blockquote className="pg-quote"><p>“{book.quote}”</p></blockquote>
            <p className="pg-sign">{AUTHOR}</p>
          </article>
        </div>
      </section>

      <section className="pg-sec" aria-labelledby="reforms">
        <p className="pg-t" aria-hidden="true">The contents</p>
        <h2 className="pg-script" id="reforms">The {book.countWord} reforms</h2>
        <div className="pg-index" style={{ marginTop: 64 }}>
          {book.groups.map((g) => (
            <section className="pg-group" key={g.name} aria-label={`${g.name}, ${g.range}`}>
              <div className="pg-group-head">
                <h3>{g.name}</h3>
                <span>{g.range}</span>
              </div>
              <p>{g.text}</p>
              <ol className="pg-reforms">
                {g.reforms.map((r) => (
                  <li key={r.n}>
                    <span className="n" aria-hidden="true">{String(r.n).padStart(2, '0')}</span>
                    <div className="r">
                      <h4><span className="visually-hidden">Reform {r.n}: </span>{r.title}</h4>
                      <p>{r.line}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </section>

      <section className="pg-sec" aria-labelledby="after">
        <div className="pg-after">
          <h2 className="pg-t" id="after">{book.afterword.heading}</h2>
          {book.afterword.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
      </section>

      <section className="pg-sec" aria-labelledby="onward">
        <h2 className="pg-t" id="onward">The other books</h2>
        <div className="pg-onward">
          {others.map((b) => (
            <a className="pg-card" key={b.slug} href={`/${b.slug}`}>
              <p className="k">Book {b.ordinal}</p>
              <p className="t">{b.title}</p>
              <p className="s">{b.tagline}</p>
            </a>
          ))}
        </div>
        <div className="pg-book">
          <p className="pg-type">All three books in one volume</p>
          <p className="pg-script" aria-hidden="true">Your copy</p>
          <a className="pg-here" href="/#make-it-yours">Get the book</a>
        </div>
      </section>
    </>
  );
}
