import { Breadcrumbs } from '../../components/chrome';
import ContactForm from '../../components/contact-form';
import Email from '../../components/email';
import { pageMetadata } from '../../seo';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Write to us about My Vision of India: a question, a correction, a reform you would improve, or an invitation to discuss the book.',
  path: '/contact',
});

export default function Contact() {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'Contact', path: '/contact' }]} />

      <header className="pg-title">
        <p className="pg-t">Correspondence</p>
        <h1>Write to us</h1>
        <p className="pg-tag">If it is wrong, correct it</p>
        <p className="pg-lede">
          A question about a reform, a correction, a better idea, or an invitation to discuss the book: every letter is read.
        </p>
      </header>

      <section className="pg-sec" aria-label="The letter">
        <div className="pg-doc">
          <div className="pg-sheet pg-letter">
            <ContactForm />
            <p className="pg-note">
              We keep your name, email and message only to read and answer it. See our{' '}
              <a href="/privacy-policy">privacy policy</a>. You can also write to <Email />.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
