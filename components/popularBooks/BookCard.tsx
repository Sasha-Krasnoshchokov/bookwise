import Link from 'next/link';
import React from 'react';
import BookCover from '../bookOverview/BookCover';
import Image from 'next/image';

const BookCard = ({ id, coverColor, coverUrl, title, genre, totalCopies }: SampleBook) => {
	const isLoanedBook = !!totalCopies;
	return (
		<li className='flex flex-col w-60'>
			<Link
				href={`/books/${id}`}
				className='flex flex-col rounded-sm hover:shadow-md hover:shadow-slate-300 transition-all duration-300 p-2'>
				<BookCover
					coverColor={coverColor}
					coverImage={coverUrl}
				/>

				<div className={`mt-4`}>
					<p className='book-title'>{title}</p>
					<p className='book-genre'>{genre}</p>
				</div>

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
					</div>
				)}
			</Link>
		</li>
	);
};

export default BookCard;
