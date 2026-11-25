import BookPage, { bookMetadata } from '../../components/book-page';

export const metadata = bookMetadata('a-safe-and-caring-nation');

export default function Page() {
  return <BookPage slug="a-safe-and-caring-nation" />;
}
