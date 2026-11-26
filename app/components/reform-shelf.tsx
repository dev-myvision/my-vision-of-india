import type { CSSProperties } from 'react';
import { SHELVES, type Shelf, type ShelfPart, type ShelfReform } from '../reform-shelf-data';

// The forty-one reforms as three shelves of cloth-bound volumes: one shelf per book, each part of a book a
// series sharing one binding. Resting on a spine (or tapping it) turns the volume round to show its cover and a
// short entry. Styles: app/reform-shelf.css. Behaviour: public/js/shelf.js, so keep class names in step with both.

const PDF = '/My-Vision-of-India-The-Short-Edition.pdf';
const MARK = { One: 'I', Two: 'II', Three: 'III' } as const;
const CORNERS = ['tl', 'tr', 'bl', 'br'] as const;

/** Custom properties for inline styles. */
const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** Every volume's place on the page, so the shelves can fill one volume after another. */
const ORDER = new Map<ShelfReform, number>();
SHELVES.flatMap((s) => s.parts.flatMap((p) => p.reforms)).forEach((r, i) => ORDER.set(r, i));

/** Set sideways on a spine, a curly apostrophe reads as a comma, so the spine uses a straight one. */
function SpineTitle({ title }: { title: string }) {
  return title.split('’').flatMap((piece, i) => (i ? [<span className="ap" key={i}>&#39;</span>, piece] : [piece]));
}

function Volume({ shelf, part, reform }: { shelf: Shelf; part: ShelfPart; reform: ShelfReform }) {
  const mark = MARK[shelf.ordinal];
  const id = `rs-${mark.toLowerCase()}-${reform.n}`;
  const pages = `${reform.firstPage}–${reform.lastPage}`;
  return (
    <article
      className="vol"
      style={vars({ '--h': `${part.height}px`, '--sw': `${reform.spineWidth}px`, '--i': ORDER.get(reform) ?? 0, '--tint': reform.tint })}
      data-s={part.series}
      data-light={part.light ? '' : undefined}
    >
      <button className="spine" type="button" aria-expanded="false" aria-controls={id} aria-label={`Reform ${reform.n}: ${reform.title}`}>
        <span className="sn">{String(reform.n).padStart(2, '0')}</span>
        <span className="st"><SpineTitle title={reform.title} /></span>
        <span className="sm">{mark}</span>
      </button>
      <div className="leaf">
        <div className="cover" aria-hidden="true">
          <div className="frame">
            {CORNERS.map((c) => <svg className={`cnr ${c}`} key={c}><use href="#rs-cnr" /></svg>)}
            <span className="ser g">My Vision of India</span>
            <span className="ck g">Reform</span>
            <span className="cn g">{reform.n}</span>
            <svg className="orn"><use href="#rs-orn" /></svg>
            <span className="lbl"><span className="ctt g">{reform.title}</span><span className="cs">{reform.subtitle}</span></span>
            <span className="cb g">Book {shelf.ordinal}<i>{shelf.title}</i></span>
          </div>
        </div>
        <div className="note" id={id}>
          <h4>{reform.title}</h4>
          <p className="sub">{reform.subtitle}</p>
          <p className="one">{reform.sentence}</p>
          <dl>
            <div><dt>Book</dt><dd>{shelf.ordinal} · {shelf.title}</dd></div>
            <div><dt>Part</dt><dd>{part.name}</dd></div>
            <div><dt>Reform</dt><dd>{reform.n} of {shelf.parts.reduce((n, p) => n + p.reforms.length, 0)}</dd></div>
            <div><dt>Pages</dt><dd>{pages}</dd></div>
          </dl>
          <a className="read" href={`${PDF}#page=${reform.firstPage}`} target="_blank" rel="noopener">Read pages {pages}</a>
        </div>
      </div>
    </article>
  );
}

export default function ReformShelf() {
  return (
    <section className="rs-sec wd-sec" id="reforms" aria-labelledby="rs-h">
      <p className="wd-t" aria-hidden="true">Forty-one reforms</p>

      {/* The gilt corner piece and the fleuron rule, drawn once and used on every cover. */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <symbol id="rs-cnr" viewBox="0 0 26 26">
          <g fill="none" stroke="currentColor" strokeWidth=".9">
            <path d="M1.5 24.5V9.5Q1.5 1.5 9.5 1.5h15" /><path d="M5.5 24.5V12q0-6.5 6.5-6.5h12.5" />
            <path d="M9.5 15.5q0-6 6-6" />
          </g>
          <path fill="currentColor" d="M12.5 12.5l2.2-2.2 2.2 2.2-2.2 2.2z" />
          <circle cx="20.5" cy="9.5" r="1" fill="currentColor" /><circle cx="9.5" cy="20.5" r="1" fill="currentColor" />
        </symbol>
        <symbol id="rs-orn" viewBox="0 0 72 10">
          <g fill="currentColor">
            <path d="M0 4.6h23.5v.8H0zM48.5 4.6H72v.8H48.5z" /><circle cx="26.5" cy="5" r="1.2" /><circle cx="45.5" cy="5" r="1.2" />
            <path d="M36 .6l4.4 4.4L36 9.4 31.6 5z" />
          </g>
          <path d="M36 2.6L38.4 5 36 7.4 33.6 5z" fill="none" stroke="var(--cloth)" strokeWidth=".7" />
        </symbol>
      </svg>

      <div className="rs">
        <header className="rs-head"><h2 id="rs-h">The Reforms</h2><span>41 reforms · 3 books · 13 parts</span></header>
        <p className="rs-lede">Forty-one reforms from three books, shelved under the parts the book itself uses.</p>
        <p className="rs-help">Hover over a spine, or tap it, to turn the volume round. Each one is a chapter of The Short Edition, with its pages.</p>

        {SHELVES.map((shelf) => {
          const hid = `rs-shelf-${shelf.ordinal.toLowerCase()}`;
          return (
            <section className="shelf" aria-labelledby={hid} key={shelf.ordinal}>
              <div className="shelf-head">
                <span>Book {shelf.ordinal}</span><span>{shelf.count} reforms</span>
                <h3 id={hid}>{shelf.title}</h3>
                <p>{shelf.tagline}</p>
              </div>
              <div className="row-wrap">
                <div className="row">
                  {shelf.parts.map((part) => (
                    <div
                      className="run"
                      key={part.name}
                      style={vars({ '--cloth': part.cloth, '--foil': part.foil, '--foil-hi': part.foilHi, '--foil-lo': part.foilLo, '--c2': part.c2, '--f2': part.f2 })}
                    >
                      <div className="vols">
                        {part.reforms.map((reform) => <Volume shelf={shelf} part={part} reform={reform} key={reform.n} />)}
                      </div>
                      <p className="run-label">{part.name}<span>{part.range}</span></p>
                    </div>
                  ))}
                </div>
              </div>
              {/* On phones the entry for the open volume is shown here, under the shelf. */}
              <div className="detail" aria-live="polite"></div>
            </section>
          );
        })}

        <footer className="rs-foot">
          <span>Page numbers are from <i>My Vision of India: The Short Edition</i>, first edition, 2026.</span>
          <span>16 + 11 + 14 = 41</span>
        </footer>
      </div>
    </section>
  );
}
