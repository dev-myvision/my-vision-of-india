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

// One sheet of paper on the desk: the title runs its full width, the particulars sit
// small on the left, and the form takes the right.
export default function Contact() {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'Contact', path: '/contact' }]} />

      <section className="cf" aria-labelledby="cf-title">
        <div className="cf-sheet">
          <h1 id="cf-title" className="cf-title">Write to us</h1>

          <div className="cf-body">
            <aside className="cf-side">
              <p>My Vision of India<br />Correspondence</p>
              <p>
                Questions, corrections,<br />better ideas, invitations<br />to discuss the book
              </p>
              <p>Every letter is read<br />Answers come by email</p>
              <p>Or write directly<br /><Email /></p>
              <p className="cf-script">If it is wrong, correct it</p>
            </aside>

            <div className="cf-main">
              <ContactForm />
              <p className="cf-note">
                We keep your name, email and message only to read and answer it. See our{' '}
                <a href="/privacy-policy">privacy policy</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
