import { Breadcrumbs } from '../../components/chrome';
import Email from '../../components/email';
import { pageMetadata } from '../../seo';
import { AUTHOR, SITE_NAME } from '../../site';

export const metadata = pageMetadata({
  title: 'Privacy policy',
  description:
    'What this site collects when you download the book or write to us, why, where it is kept, and how to see, correct or delete it.',
  path: '/privacy-policy',
});

const UPDATED = '25 November 2026';

export default function PrivacyPolicy() {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'Privacy policy', path: '/privacy-policy' }]} />

      <header className="pg-title">
        <p className="pg-t">On record</p>
        <h1>Privacy policy</h1>
        <p className="pg-tag">What we keep, and why</p>
      </header>

      <section className="pg-sec" aria-label="The policy">
        <div className="pg-doc">
          <article className="pg-sheet">
            <p className="pg-stamp">Last updated {UPDATED}</p>

            <h2 style={{ marginTop: 28 }}>Who we are</h2>
            <p>
              This website, {SITE_NAME}, presents the book <i>My Vision of India</i> by {AUTHOR}. In this
              policy “we” means the people who run the site. You can write to us about anything in this policy at <Email />.
            </p>

            <h2>What we collect, and why</h2>
            <p>We collect only what you type into one of our two forms, and only when you send it.</p>
            <ul>
              <li>
                <b>When you download the book:</b> your full name, email address and mobile number, the date, and the address
                of the page you used. We keep these as a record of who has received the book.
              </li>
              <li>
                <b>When you write to us:</b> your name, email address and message, and the date. We use these to read and
                answer your message.
              </li>
            </ul>
            <p>We do not sell your details, rent them, or use them for advertising.</p>

            <h2>Where it is kept</h2>
            <p>
              Both forms send your details to a Google Sheet that only we can open, through a Google Apps Script. Google stores
              that sheet for us under its own privacy terms. When you write to us, we also receive a copy of your message by
              email.
            </p>

            <h2>What we do not collect</h2>
            <ul>
              <li>We use no cookies, no analytics and no advertising trackers.</li>
              <li>The fonts, images and scripts on this site are served from the site itself, so reading it does not send your visit to anyone else.</li>
              <li>
                Like any website, the company that hosts it keeps short-lived technical logs (such as your IP address and
                browser type) to deliver pages and protect against abuse. We do not use these logs to identify you.
              </li>
            </ul>

            <h2>How long we keep it</h2>
            <p>
              We keep download and message records while this site runs, so that we know who has the book and can answer
              follow-up questions. You can ask us to delete your record at any time, and we will.
            </p>

            <h2>Your rights</h2>
            <p>
              Under India’s Digital Personal Data Protection Act, 2023, you may ask us what details we hold about you, ask us
              to correct or complete them, ask us to delete them, and withdraw your consent. Write to <Email /> and we will
              reply within 30 days. If you are not satisfied with our answer, you may complain to the Data Protection Board of
              India.
            </p>

            <h2>Children</h2>
            <p>If you are under 18, please ask a parent or guardian before you fill in either form.</p>

            <h2>Changes</h2>
            <p>
              If we change what we collect or how we use it, we will update this page and the date at the top before the
              change takes effect.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
