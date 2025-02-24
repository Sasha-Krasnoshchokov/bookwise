import Link from 'next/link';
import React from 'react';
import BookCover from '../bookOverview/BookCover';
import Image from 'next/image';
import { Button } from '../ui/button';

const BookCard = ({ id, coverColor, coverUrl, title, genre, totalCopies }: SampleBook) => {
	const isLoanedBook = !!totalCopies;
	return (
		<li className='flex flex-col w-60'>
			<Link
				href={`/books/${id}`}
				className='flex flex-col rounded-sm hover:shadow-md hover:shadow-slate-300 transition-all'>
				<BookCover
					coverColor={coverColor}
					coverImage={coverUrl}
				/>

				<div className={`mt-4`}>
					<p className='book-title'>{title}</p>
					<p className='book-genre'>{genre}</p>
				</div>
			</Link>

			{isLoanedBook && (
				<div className='mt-3 flex flex-col'>
					<div className='book-loaned'>
						<Image
							src='/icons/calendar.svg'
							alt='calendar'
							width={18}
							height={18}
							className='object-contain'
						/>
						<p className='text-light-100 max-xs:text-xs'>11 days left to return</p>
					</div>

					<Button className='book-btn text-dark-100 text-lg'>Download receipt</Button>
				</div>
			)}
		</li>
	);
};

export default BookCard;
