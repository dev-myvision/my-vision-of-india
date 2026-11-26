// The home page markup, ported from my-vision-of-india-v3.html.
// The scripts in public/js/ drive it after hydration, so keep class names and ids in step with them.

import ReformShelf from './components/reform-shelf';

export default function HomeMarkup() {
  return (
    <>

      <header className="site-header">
        <div className="main-header">
          <div className="brand">My Vision of India</div>
          <nav className="header-nav" aria-label="Sections">
            <a href="#slide-1" className="nav-link" data-stop="0">Vision</a>
            <span className="nav-dot"></span>
            <a href="#slide-2" className="nav-link" data-stop="1">Governing</a>
            <span className="nav-dot"></span>
            <a href="#slide-3" className="nav-link" data-stop="2">Prosperity</a>
            <span className="nav-dot"></span>
            <a href="#slide-4" className="nav-link" data-stop="3">Caring</a>
            <span className="nav-dot"></span>
            <a href="#books" className="nav-link" data-section="books">Books</a>
          </nav>
          <div className="header-actions">
            <button type="button" className="contact-btn" data-open-order>Get the book <span className="btn-circle"></span></button>
          </div>
        </div>
      </header>

      <div className="cinematic-container">

        <div className="slide" id="slide-1">
          <p className="slide-kicker">Three books, one volume</p>
          <h1 className="slide-title">My Vision <br />of India</h1>
          <div className="desc-row">
            <p className="slide-desc col-1">By Joshua Paul Voola. Forty-one reforms from three books of more than two thousand pages, in one shorter volume you can read in a few evenings.</p>
            <p className="slide-desc col-2">One question is asked of every reform in it. Would this make India work better for its people?</p>
          </div>
        </div>

        <div className="slide" id="slide-2">
          <p className="slide-kicker">Book One</p>
          <h2 className="slide-title">Governing <br />India</h2>
          <p className="slide-desc">Democracy, law and clean institutions. It follows power on its whole journey: how it is given, how it is used, how it is checked and how it is answered for.</p>
        </div>

        <div className="slide" id="slide-3">
          <p className="slide-kicker">Book Two</p>
          <h2 className="slide-title">Building <br />Prosperity</h2>
          <p className="slide-desc">Commerce, trade and money, held to the same test as every other page: would this make India work better for its people?</p>
        </div>

        <div className="slide" id="slide-4">
          <p className="slide-kicker">Book Three</p>
          <h2 className="slide-title">A Safe and <br />Caring Nation</h2>
          <p className="slide-desc">People and public services. This book is non-partisan. It does not support or oppose any political party, leader or government.</p>
        </div>
      </div>


      <div className="grid-horizontal-line"></div>
      <div className="grid-lines">
        <div className="grid-line"><div className="grid-dot top"></div><div className="grid-dot bottom"></div></div>
        <div className="grid-line"><div className="grid-dot top"></div><div className="grid-dot bottom"></div></div>
        <div className="grid-line"><div className="grid-dot top"></div><div className="grid-dot bottom"></div></div>
        <div className="grid-line"><div className="grid-dot top"></div><div className="grid-dot bottom"></div></div>
        <div className="grid-line story-progress-container">
          <div className="grid-dot top"></div>
          <div className="grid-dot bottom"></div>
          <div className="story-dashes">
            <button type="button" className="story-dash" data-label="My Vision of India" aria-label="Go to slide 1: My Vision of India"><span className="story-dash-fill" id="dash-fill-1"></span></button>
            <button type="button" className="story-dash" data-label="Book One" aria-label="Go to slide 2: Governing India"><span className="story-dash-fill" id="dash-fill-2"></span></button>
            <button type="button" className="story-dash" data-label="Book Two" aria-label="Go to slide 3: Building Prosperity"><span className="story-dash-fill" id="dash-fill-3"></span></button>
            <button type="button" className="story-dash" data-label="Book Three" aria-label="Go to slide 4: A Safe and Caring Nation"><span className="story-dash-fill" id="dash-fill-4"></span></button>
          </div>
        </div>
      </div>

      <p className="scroll-cue" aria-hidden="true">Scroll</p>

      <div className="grain" aria-hidden="true"></div>

      <canvas id="webgl"></canvas>

      <div className="stage-track" aria-hidden="true"></div>
      <div className="chapters-fade" aria-hidden="true"></div>

      <div className="k-progress" aria-hidden="true"></div>

      <main className="chapters ba">

        <nav className="ix" aria-label="Sections on this page">
          <p className="ix-now" aria-hidden="true"></p>
          <ol>
            <li><a href="#author" data-jump><span className="visually-hidden">The author</span></a></li>
            <li><a href="#record" data-jump><span className="visually-hidden">The record</span></a></li>
            <li><a href="#books" data-jump><span className="visually-hidden">The journal</span></a></li>
            <li><a href="#clock" data-jump><span className="visually-hidden">The clock</span></a></li>
            <li><a href="#words" data-jump><span className="visually-hidden">Corrected</span></a></li>
            <li><a href="#already" data-jump><span className="visually-hidden">Already begun</span></a></li>
            <li><a href="#same" data-jump><span className="visually-hidden">What stays the same</span></a></li>
            <li><a href="#reforms" data-jump><span className="visually-hidden">The reforms</span></a></li>
            <li><a href="#make-it-yours" data-jump><span className="visually-hidden">The book</span></a></li>
          </ol>
        </nav>

        {/* The author: the back flap of the dust jacket, a grainy portrait printed on it, and his letter laid beside it.
            The letter is his own words, taken from "Why I wrote Book One/Two/Three" in the book. */}
        <section className="au-sec wd-sec" id="author" aria-labelledby="au-h">
          <p className="wd-t" aria-hidden="true">The author</p>
          <div className="au-desk">
            <div className="au-flap">
              <figure className="au-photo">
                <img src="/images/author.webp" srcSet="/images/author-376.webp 376w, /images/author.webp 752w" sizes="(max-width: 760px) 64vw, 284px" width="752" height="940" alt="Portrait of Joshua Paul Voola in a dark suit, smiling" loading="lazy" decoding="async" />
              </figure>
              <p className="au-name">Joshua Paul Voola</p>
              <p className="au-role">a citizen of India</p>
              <p className="au-books">Author of <i>My Vision of India</i>, in three books: Governing India, Building Prosperity, and A Safe and Caring Nation.</p>
            </div>
            <article className="au-sheet">
              <h2 className="au-h" id="au-h">Why I wrote it</h2>
              <ol className="au-why">
                <li>
                  <p>Like millions of Indians, I have stood at a counter waiting for a certificate that should have come in a week. I have seen honest officers moved overnight and dishonest ones protected.</p>
                  <a href="/governing-india#why">Book one: Governing India</a>
                </li>
                <li>
                  <p>I saw farmers throw away harvests for want of a cold store, young people hold certificates but no job, and families unable to prove they own the land they have farmed for generations.</p>
                  <a href="/building-prosperity#why">Book two: Building Prosperity</a>
                </li>
                <li>
                  <p>Most citizens never meet a Minister. They meet the teacher who does or does not come, the hospital that is or is not open at night, the pension that does or does not arrive.</p>
                  <a href="/a-safe-and-caring-nation#why">Book three: A Safe and Caring Nation</a>
                </li>
              </ol>
              <p className="au-close">Most of these failures do not happen because Indians are bad people. They happen because our systems let responsibility disappear.</p>
              <p className="au-sig">Joshua Paul Voola</p>
            </article>
          </div>
        </section>

        {/* The thesis: an archive folder (reference 1) */}
        <section className="ar-sec wd-sec" id="record" aria-labelledby="ba-thesis">
          <p className="wd-t" aria-hidden="true">The record</p>
          <div className="ar-folder">
            <div className="ar-back" aria-hidden="true"></div>
            <div className="ar-tab"><span>Record (01)</span></div>
            <div className="ar-body">
              <div className="ar-collage">
                <div className="ar-letter" tabIndex={0} role="button" aria-label="Draw out the author’s note to read it" aria-expanded="false">
                  <p>I love this country, and I believe it can be governed better.</p>
                  <p>Not by changing who is in power, but by changing how power is used, recorded and answered for.</p>
                  <p className="ar-sig">Joshua Paul Voola</p>
                </div>
                <figure className="ar-photo"><img src="/images/register.webp" width="600" height="800" alt="An official's hand writes an entry in a thick office register, beside a rubber stamp and tied files." loading="lazy" decoding="async" /></figure>
                <img className="pclip" src="/images/paper-clip.webp" width="332" height="406" alt="" aria-hidden="true" loading="lazy" decoding="async" />
              </div>
              <div className="ar-copy">
                <h2 className="ar-h" id="ba-thesis">Same people. Same land.<br />A different record.</h2>
                <p className="ar-p">“The family’s land did not change, and neither did its honesty. What changed was the record, and a State that stood behind its own word.”</p>
                <p className="ar-tags"><span>before and after</span><span>#the-record</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* The open book */}
        <section className="ba-sec ba-bookwrap sc-sec wd-sec" id="books" aria-labelledby="ba-open">
          <p className="wd-t" aria-hidden="true">The journal</p>
          <div className="sc-head">
            <h2 className="wd-script" id="ba-open">Turn the page</h2>
            <p className="wd-type">on nine everyday things, India today and after the book</p>
          </div>

          <div className="ba-stage">

            <div className="ba-book" id="ba-book" tabIndex={0} aria-roledescription="journal" aria-label="A journal: India today on the left page, after the book on the right. Tap a page or use the arrow keys to turn it.">
              {/* one photograph for each page of the open spread, changed as the page turns */}
              <figure className="sc-pola sc-slot sc-slot-l" aria-hidden="true"><img alt="" loading="lazy" decoding="async" /><figcaption></figcaption></figure>
              <figure className="sc-pola sc-slot sc-slot-r" aria-hidden="true"><img alt="" loading="lazy" decoding="async" /><figcaption></figcaption></figure>
              <div className="sc-library" hidden>
                <img data-photo="pothole" src="/images/photo-pothole.webp" alt="A pothole full of rainwater on a village street at dusk" loading="lazy" decoding="async" />
                <img data-photo="pothole-repair" src="/images/photo-pothole-repair.webp" alt="A road worker measures a freshly filled pothole beside a traffic cone" loading="lazy" decoding="async" />
                <img data-photo="vote" src="/images/photo-vote.webp" alt="A voter holds up a finger marked with ink outside a polling station" loading="lazy" decoding="async" />
                <img data-photo="harvest" src="/images/photo-harvest.webp" alt="A trader weighs tomatoes on a scale at a wholesale market" loading="lazy" decoding="async" />
                <img data-photo="market" src="/images/photo-market.webp" alt="A farmer and a buyer agree a sale over a crate of tomatoes at a market" loading="lazy" decoding="async" />
                <img data-photo="board" src="/images/photo-board.webp" alt="A public information board with a QR code beside a newly laid road" loading="lazy" decoding="async" />
                <img data-photo="classroom" src="/images/photo-classroom.webp" alt="Children in school uniform reading on mats in a village classroom" loading="lazy" decoding="async" />
                <img data-photo="veranda" src="/images/photo-veranda.webp" alt="An older man reads a book on the veranda of his house" loading="lazy" decoding="async" />
                <img data-photo="vote-today" src="/images/photo-vote-today.webp" alt="A hand passes an envelope through a doorway at night" loading="lazy" decoding="async" />
                <img data-photo="land-today" src="/images/photo-land-today.webp" alt="A steel trunk full of old land papers and deeds" loading="lazy" decoding="async" />
                <img data-photo="rupee-today" src="/images/photo-rupee-today.webp" alt="An unfinished bridge that stops in the middle of a river" loading="lazy" decoding="async" />
                <img data-photo="classroom-today" src="/images/photo-classroom-today.webp" alt="A crowded classroom of children watching a teacher at the blackboard" loading="lazy" decoding="async" />
                <img data-photo="tap-after" src="/images/photo-tap-after.webp" alt="Clear water running from a public tap into a glass bottle" loading="lazy" decoding="async" />
                <img data-photo="land-after" src="/images/photo-land-after.webp" alt="A white-topped boundary stone at the edge of a green rice field" loading="lazy" decoding="async" />
                <img data-photo="oldage-today" src="/images/photo-oldage-today.webp" alt="An older woman sits alone on a cot in a bare room" loading="lazy" decoding="async" />
                <img data-photo="tap-today" src="/images/photo-tap-today.webp" alt="A glass of cloudy water with sediment at the bottom" loading="lazy" decoding="async" />
                <img data-photo="counter-today" src="/images/photo-counter-today.webp" alt="A long queue of people holding papers outside a government office counter" loading="lazy" decoding="async" />
                <img data-photo="counter-after" src="/images/photo-counter-after.webp" alt="An empty government office counter with a bench and a clock on the wall" loading="lazy" decoding="async" />
              </div>
              <p className="sc-note" aria-hidden="true">tap the page<br />to turn it</p>
              <div className="ba-pages">
                <div className="ba-tabs" role="group" aria-label="Jump to a book">
                  <button type="button" data-tab="1">Governing</button>
                  <button type="button" data-tab="2">Prosperity</button>
                  <button type="button" data-tab="3">Caring</button>
                </div>
                <article className="ba-sheet is-left" id="ba-L" aria-label="India today"></article>
                <article className="ba-sheet is-right" id="ba-R" aria-label="After the book"></article>
                <div className="ba-wire" aria-hidden="true"></div>
                <div className="ba-leaf" aria-hidden="true"></div>
                <button type="button" className="ba-corner ba-corner-l" data-dir="-1" aria-label="Turn back a page"></button>
                <button type="button" className="ba-corner ba-corner-r" data-dir="1" aria-label="Turn to the next page"></button>
              </div>
            </div>
            <p className="visually-hidden" aria-live="polite" id="ba-live"></p>

            <div className="ba-turn">
              <button type="button" className="ba-arrow" data-dir="-1">Previous</button>
              <p className="ba-count" aria-hidden="true"><b id="ba-n">1</b> / 9</p>
              <button type="button" className="ba-arrow" data-dir="1">Next</button>
            </div>
            <p className="ba-small">Figures as stated in the book, October 2026. Proposals are the author’s suggestions, not existing law.</p>
            <p className="sc-by" aria-hidden="true">by Joshua Paul Voola</p>
          </div>
        </section>

        {/* India on the clock: one ring-bound page on leather (reference 2) */}
        <section className="nb-sec wd-sec" id="clock" aria-labelledby="ba-clock">
          <p className="wd-t" aria-hidden="true">The clock</p>
          <div className="nb-board">
          <div className="nb-page">
            <div className="nb-rings" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
            <div className="nb-inner">
              <h2 className="nb-title" id="ba-clock">India on the clock<br />Today, most of public life has no date</h2>
              <ul className="ba-clocks nb-grid" id="ba-clocks"></ul>
              <p className="nb-script" aria-hidden="true">On the clock</p>
              <p className="nb-tag">“A service with a legal date is a right. A service without one is a favour.”</p>
            </div>
          </div>
          </div>
        </section>

        {/* Words India will stop hearing: a typed sheet under vellum (Neutre) */}
        <section className="nv-sec wd-sec" id="words" aria-labelledby="ba-words">
          <p className="wd-t" aria-hidden="true">Corrected</p>
          <div className="nv-stack">
            <div className="nv-under" aria-hidden="true"></div>
            <div className="nv-vellum nv-v1" aria-hidden="true"></div>
            <div className="nv-sheet">
              <p className="nv-kicker">My Vision of India<br /><i>Words India will stop hearing</i></p>
              <figure className="nv-photo" aria-hidden="true"><img src="/images/office-files.webp" alt="Stacks of tied files and papers on desks in a government office" loading="lazy" decoding="async" /></figure>
              <h2 className="visually-hidden" id="ba-words">Words India will stop hearing</h2>
              <ol className="nv-list">
                <li><s>“Under process.”</s><span>A legal date, a named officer, and a price for being late.</span></li>
                <li><s>“Pending at higher level.”</s><span>If the date is missed, the appeal opens by itself.</span></li>
                <li><s>“Not ours.”</s><span>A complaint sent to the wrong office must be transferred, never closed as “not ours”.</span></li>
                <li><s>“Meet someone.”</s><span>You never need to “meet someone”. Services run online, and on the clock.</span></li>
                <li><s>“The government is useless.”</s><span>“‘The government is useless’ is a feeling, not a complaint.”</span></li>
              </ol>
              <p className="nv-foot">“If it is wrong, correct it.”</p>
            </div>
            <div className="nv-vellum nv-v2" aria-hidden="true"></div>
          </div>
        </section>

        {/* Already begun: two-ended detail headers on black stock (wedding) */}
        <section className="wd-sec wd-details" id="already" aria-labelledby="ba-already">
          <div className="wd-dhead">
            <span>India has</span><span>the hard part</span>
            <h2 className="wd-script" id="ba-already">Already begun</h2>
          </div>
          <div className="wd-list">
            <div className="wd-row"><p className="wd-pair"><span>Land records</span><span>99.8%</span></p><p>Of village land records are already computerised, and over 37 crore land parcels already have a unique number. What is left: make the record conclusive, and guarantee it.</p></div>
            <div className="wd-row"><p className="wd-pair"><span>Failed payments</span><span>₹100 a day</span></p><p>Is already paid by banks, unasked, when a failed payment is not reversed. What is left: do the same for every public service.</p></div>
            <div className="wd-row"><p className="wd-pair"><span>Taps</span><span>Crores of homes</span></p><p>“India has put a tap inside crores of rural homes in a few years, a real achievement.” What is left: test every tap, in public.</p></div>
            <div className="wd-row"><p className="wd-pair"><span>Schools</span><span>Almost every child</span></p><p>“India has got almost every child through the school gate, but not yet to the basics.” What is left: every child reading, writing and counting by Class 3.</p></div>
            <div className="wd-row"><p className="wd-pair"><span>Payments</span><span>Most advanced</span></p><p>“India has built the most advanced public payment system in the world.” What is left: use it for “the promise one citizen makes to another”.</p></div>
          </div>
        </section>

        {/* What stays the same: tags on a ribbon (reference 5) */}
        <section className="lc-sec wd-sec" id="same" aria-labelledby="ba-same">
          <p className="wd-t" aria-hidden="true">What stays the same</p>
          <div className="lc-wrap">
            <div className="lc-col lc-tl">
              <h2 className="lc-h" id="ba-same">The State’s<br />power</h2>
              <p>“None of these reforms gives the State more power. They ask that the power it already has be used in the open, recorded and answered for.”</p>
              <p className="lc-dash" aria-hidden="true"></p>
              <p>In the open.<br />Recorded.<br />Answered for.</p>
            </div>
            <div className="lc-col lc-tr">
              <h3 className="lc-h">Your right<br />to protest</h3>
              <p>“The right to protest is never touched; only the government’s duty to answer is added.”</p>
            </div>
            <p className="lc-script lc-s1" aria-hidden="true">Not everything is meant to change</p>
            <div className="lc-center" aria-hidden="true">
              <figure className="lc-tag lc-t1"><img src="/images/gram-sabha.webp" alt="A village meeting under a banyan tree, with people seated on the ground" loading="lazy" decoding="async" /></figure>
              <figure className="lc-tag lc-t2"><img src="/images/office-bench.webp" alt="An older man waits on a bench outside an office doorway" loading="lazy" decoding="async" /></figure>
              <figure className="lc-tag lc-t3"><img src="/images/water-tap.webp" alt="Brass and steel water pots lined up under a public tap" loading="lazy" decoding="async" /></figure>
            </div>
            <p className="lc-script lc-s2" aria-hidden="true">Some things stay, by design</p>
            <div className="lc-col lc-bl">
              <h3 className="lc-h">Who is bound</h3>
              <p>“Every rule in it binds the ruling side and the opposition alike.”</p>
              <p className="lc-dash" aria-hidden="true"></p>
              <p>Take it.<br />Improve it.<br />Make it yours.</p>
            </div>
            <div className="lc-col lc-br">
              <h3 className="lc-h">Your water</h3>
              <p>“No family loses its basic water for drinking and cooking because it cannot pay.”</p>
            </div>
          </div>
        </section>

        {/* The forty-one reforms: three shelves of cloth-bound volumes that turn round on hover */}
        <ReformShelf />

        {/* The book: back cover, spine and front cover laid flat, then the order line */}
        <section className="bk-sec wd-sec" id="make-it-yours" aria-labelledby="bk-h">
          <p className="wd-t" aria-hidden="true">The book</p>
          <h2 className="visually-hidden" id="bk-h">My Vision of India</h2>
          <div className="bk-flat">
            <img className="bk-back" src="/images/cover-back-900.webp" srcSet="/images/cover-back-480.webp 480w, /images/cover-back-900.webp 900w, /images/cover-back.webp 1400w" sizes="(max-width: 760px) 42vw, 432px" width="1400" height="2136" alt="Back cover: Would this make India work better for its people? In every office, from the panchayat to Parliament, three things must be true." loading="lazy" decoding="async" />
            <div className="bk-spine" aria-hidden="true"><span>My Vision of India</span><em>Joshua Paul Voola</em></div>
            <img className="bk-front" src="/images/cover-front-900.webp" srcSet="/images/cover-front-480.webp 480w, /images/cover-front-900.webp 900w, /images/cover-front-m.webp 1400w" sizes="(max-width: 760px) 42vw, 432px" width="1400" height="2136" alt="Front cover of My Vision of India by Joshua Paul Voola" loading="lazy" decoding="async" />
          </div>
          <div className="bk-after">
            <div className="rf-folder">
              <div className="rf-back" aria-hidden="true"><span>First edition 2026</span></div>
              <div className="rf-tabs" aria-hidden="true">
                <span><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0 12 6 18 2 14 8 20 10 14 12 18 18 12 14 10 20 8 14 2 18 6 12 0 10 6 8 2 2 8 6Z" fill="currentColor" /></svg><em>Governing India</em></span>
                <span><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0 12 6 18 2 14 8 20 10 14 12 18 18 12 14 10 20 8 14 2 18 6 12 0 10 6 8 2 2 8 6Z" fill="currentColor" /></svg><em>Building Prosperity</em></span>
                <span><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0 12 6 18 2 14 8 20 10 14 12 18 18 12 14 10 20 8 14 2 18 6 12 0 10 6 8 2 2 8 6Z" fill="currentColor" /></svg><em>A Safe and Caring Nation</em></span>
              </div>
              <div className="rf-front">
                <p className="rf-ed">Edition 01:<br />My Vision of India</p>
                <h2 className="rf-h" id="ba-close">three books,<br />one<br />volume</h2>
                <figure className="rf-pola"><img className="pclip" src="/images/paper-clip.webp" width="332" height="406" alt="" aria-hidden="true" loading="lazy" decoding="async" /><img src="/images/book-open.webp" width="655" height="800" alt="The book lying open on a wooden table beside a glass of tea and reading glasses" loading="lazy" decoding="async" /><figcaption>My Vision of India</figcaption></figure>
                <div className="rf-table">
                  <p><a href="/governing-india">Book one: Governing India</a>, 16 reforms</p>
                  <p><a href="/building-prosperity">Book two: Building Prosperity</a>, 11 reforms</p>
                  <p><a href="/a-safe-and-caring-nation">Book three: A Safe and Caring Nation</a>, 14 reforms</p>
                  <p>Read it in a few evenings</p>
                </div>
              </div>
            </div>

            <div className="bk-order">
              <p className="wd-type">My Vision of India. First edition, 2026.</p>
              <p className="wd-script wd-sm" aria-hidden="true">Your copy</p>
              <p className="wd-type">all three books, to your device</p>
              <button type="button" className="wd-here" data-open-order>Here</button>
            </div>
          </div>
          <p className="bk-close">“None of it needs a miracle. It needs a clear standard, a named owner, an honest public record and a citizen who knows what to ask for.”</p>
        </section>

        <footer className="v-foot ft" id="contact">
          <div className="ft-card">
            <div className="ft-top">
              <a className="ft-brand" href="#slide-1" data-stop="0" aria-label="My Vision of India, back to the top">
                <span className="ft-word">My Vision of India</span>
              </a>
              <nav className="ft-col" aria-labelledby="ft-read"><h3 id="ft-read">Read</h3><ul>
                <li><a href="#record" data-jump>The record</a></li>
                <li><a href="#books" data-jump>The journal</a></li>
                <li><a href="#clock" data-jump>The clock</a></li>
                <li><a href="#words" data-jump>Corrected</a></li>
                <li><a href="#already" data-jump>Already begun</a></li>
                <li><a href="#same" data-jump>What stays the same</a></li>
                <li><a href="#reforms" data-jump>The reforms</a></li>
              </ul></nav>
              <nav className="ft-col" aria-labelledby="ft-books"><h3 id="ft-books">The books</h3><ul>
                <li><a href="/governing-india">Governing India</a></li>
                <li><a href="/building-prosperity">Building Prosperity</a></li>
                <li><a href="/a-safe-and-caring-nation">A Safe and Caring Nation</a></li>
                <li><button type="button" data-open-order>Download the book</button></li>
              </ul></nav>
              <nav className="ft-col" aria-labelledby="ft-site"><h3 id="ft-site">The site</h3><ul>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/privacy-policy">Privacy policy</a></li>
              </ul></nav>
              <a className="ft-up" href="#slide-1" data-stop="0"><span className="visually-hidden">Back to the top</span><b aria-hidden="true">↑</b></a>
            </div>
            <div className="ft-bar">
              <p>&copy; 2026 My Vision of India. All rights reserved.</p>
              <p className="ft-ed">First edition 2026</p>
            </div>
            <p className="ft-fine">Short passages may be quoted freely for discussion, teaching and public debate, with acknowledgement of the book. The proposals in this book are suggestions, not existing law. Nothing in this book is legal advice. This book is non-partisan. It does not support or oppose any political party, leader or government. The photographs on this website are illustrations created with artificial-intelligence tools; the people shown in them are not real persons.</p>
          </div>
        </footer>
      </main>

      <dialog className="order" id="order" aria-labelledby="order-title">
        <button type="button" className="order-close" data-close-order aria-label="Close">
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <div className="order-inner">
          <aside className="order-art" aria-hidden="true">
            <div className="oa-cover"></div>
            <div className="oa-text">
              <p className="oa-kicker">Three books, one volume</p>
              <p className="oa-title">My Vision of India</p>
              <p className="oa-author">Joshua Paul Voola</p>
            </div>
          </aside>

          <div className="order-body">
            <div className="order-head">
              <h2 className="stack order-title" id="order-title" data-lines="Download|the book" data-stagger="90" data-dur="800">Download the book</h2>
              <p className="order-intro">Tell us who you are, and <em>My Vision of India</em> downloads to your device straight away.</p>
            </div>

            <form className="order-form" noValidate>
              <fieldset className="o-group" style={{ '--i': '0' } as React.CSSProperties}>
                <legend className="o-legend">Your details</legend>
                <div className="fields">
                  <div className="field wide">
                    <label className="field-box" htmlFor="o-name"><span className="field-label">Full name</span>
                      <input id="o-name" name="name" autoComplete="name" required aria-describedby="e-name" /></label>
                    <p className="field-error" id="e-name" hidden></p>
                  </div>
                  <div className="field">
                    <label className="field-box" htmlFor="o-email"><span className="field-label">Email</span>
                      <input id="o-email" name="email" type="email" autoComplete="email" spellCheck="false" placeholder="name@example.com" required aria-describedby="e-email" /></label>
                    <p className="field-error" id="e-email" hidden></p>
                  </div>
                  <div className="field">
                    <label className="field-box" htmlFor="o-phone"><span className="field-label">Mobile number</span>
                      <span className="field-row"><span className="field-prefix" aria-hidden="true">+91</span><input id="o-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" required aria-describedby="e-phone" /></span></label>
                    <p className="field-error" id="e-phone" hidden></p>
                  </div>
                </div>
              </fieldset>

              <div className="o-file" aria-hidden="true">
                <span className="o-file-name">My Vision of India</span>
                <span className="o-file-meta">PDF<i>·</i>325 pages<i>·</i>26 MB</span>
              </div>

              <p className="o-privacy">We keep your name, email and number only as a record of who has the book. See our <a href="/privacy-policy" target="_blank">privacy policy</a>.</p>

              <input type="checkbox" name="botcheck" className="visually-hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="order-actions">
                <p className="order-status" role="status"></p>
                <div className="actions-row">
                  <p className="order-note">All three books in one volume, to read on any device.</p>
                  <button type="submit" className="pill solid order-submit" disabled><span data-submit-label>Download the book</span> <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                </div>
              </div>
            </form>

            <div className="order-done" hidden>
              <div className="done-check"><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg></div>
              <h3 className="done-title" tabIndex={-1}>Thank you, <span data-done-name></span>.</h3>
              <p className="done-text" data-done-text></p>
              <div className="done-actions">
                <a className="pill solid" data-book-link href="/My-Vision-of-India.pdf" target="_blank" rel="noopener" download="My Vision of India.pdf">Download again</a>
                <button type="button" className="done-close" data-close-order>Close</button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
