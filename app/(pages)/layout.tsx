import { SiteFooter, SiteHeader } from '../components/chrome';

// The inner pages (the three books, contact, privacy policy) share this frame.
export default function PagesLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="pg">
      <SiteHeader />
      <main id="main" className="pg-main">{children}</main>
      <SiteFooter />
    </div>
  );
}
