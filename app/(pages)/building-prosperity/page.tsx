import BookPage, { bookMetadata } from '../../components/book-page';

export const metadata = bookMetadata('building-prosperity');

export default function Page() {
  return <BookPage slug="building-prosperity" />;
}
