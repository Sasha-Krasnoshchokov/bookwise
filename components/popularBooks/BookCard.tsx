import Link from 'next/link';
import React from 'react';
import BookCover from '../bookOverview/BookCover';
import Image from 'next/image';
import { Button } from '../ui/button';

const BookCard = ({ id, coverColor, coverUrl, title, genre, isLoanedBook = false }: SampleBook) => {
	return (
		<li>
			<Link
				href={`/books/${id}`}
				className='flex flex-col items-center'>
				<BookCover
					coverColor={coverColor}
					coverImage={coverUrl}
				/>

				<div className={`mt-4 ${!isLoanedBook && 'xs:max-w-40 max-w-28'}`}>
					<p className='book-title'>{title}</p>
					<p className='book-genre'>{genre}</p>
				</div>

				{isLoanedBook && (
					<div className='mt-3 w-full'>
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

						<Button className='book-btn'>Download receipt</Button>
					</div>
				)}
			</Link>
		</li>
	);
};

export default BookCard;
