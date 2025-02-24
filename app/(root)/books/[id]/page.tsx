import BookOverview from '@/components/bookOverview/BookOverview';
import BookList from '@/components/popularBooks/BookList';
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import config from '@/lib/config';
import { eq, not } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react';

const BookProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
	const bookId = (await params).id;

	const [currentBook] = await db.select().from(books).where(eq(books.id, bookId)).limit(1);

	if (!currentBook) redirect('/404');

	const genres = currentBook.genre.split('/');

	const similarBooks = await db
		.select()
		.from(books)
		.where(not(eq(books.id, currentBook.id)))
		.limit(10);

	const filteredByGenres = similarBooks.filter((book) => {
		const bookGenres = book.genre.split('/');
		return genres.some((genre) => bookGenres.includes(genre));
	});

	return (
		<>
			<BookOverview {...currentBook} />
			<div className='book-details'>
				<div className='flex-[1.5]'>
					<section className='flex flex-col gap-7'>
						<video
							src={`${config.env.imagekit.urlEndpoint}/${currentBook.videoUrl}`}
							controls
							className='rounded-md shadow-video shadow-slate-300'
						/>
					</section>
					<section className='mt-10 flex flex-col gap-7'>
						<h3>Summary</h3>
						<div className='space-y-5 text-xl text-light-100'>
							{currentBook.summary.split('\n').map((text, i) => (
								<p key={i}>{text}</p>
							))}
						</div>
					</section>
				</div>
				<div className='flex flex-1 flex-col gap-7 text-xl text-light-100'>
					{filteredByGenres.length > 0 ? (
						<BookList
							title='Similar books'
							books={filteredByGenres}
						/>
					) : (
						<p>No similar books found</p>
					)}
				</div>
			</div>
		</>
	);
};

export default BookProfile;
