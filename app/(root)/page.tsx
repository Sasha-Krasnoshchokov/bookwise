import BookList from '@/components/popularBooks/BookList';
import BookOverview from '@/components/bookOverview/BookOverview';

import { auth } from '@/authjs';
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import { desc } from 'drizzle-orm';

const Home = async () => {
	const session = await auth();
	const latestBooks = (await db
		.select()
		.from(books)
		.limit(10)
		.orderBy(desc(books.createdAt))) as SampleBook[];

	return (
		<>
			<BookOverview
				{...latestBooks[0]}
				userId={session?.user?.id as string}
			/>
			<BookList
				title='Latest Books'
				books={latestBooks.slice(1)}
				containerClassName='mt-28'
			/>
		</>
	);
};

export default Home;
