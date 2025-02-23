import React from 'react';
import BookCard from './BookCard';

interface PopularBooksProps {
	books: SampleBook[];
	title: string;
	containerClassName: string;
}

// const isLoanedBook = false;

const BookList = ({ title, books, containerClassName }: PopularBooksProps) => {
	if (books.length === 0) {
		return null;
	}

	return (
		<section className={containerClassName}>
			<h2 className='font-bebas-neue text-4xl text-light-100'>{title}</h2>

			<ul className='book-list'>
				{books.map((book) => (
					<BookCard
						key={book.id}
						{...book}
					/>
				))}
			</ul>
		</section>
	);
};

export default BookList;
