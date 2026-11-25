import BookPage, { bookMetadata } from '../../components/book-page';

export const metadata = bookMetadata('governing-india');

export default function Page() {
  return <BookPage slug="governing-india" />;
}
