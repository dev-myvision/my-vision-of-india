import { CONTACT_EMAIL } from '../site';

/** The site's public email address, or a highlighted placeholder until one is set in site.ts. */
export default function Email() {
  if (!CONTACT_EMAIL) return <span className="pg-fill">[public email address]</span>;
  return <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
}
