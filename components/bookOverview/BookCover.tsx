'use client';
import { cn } from '@/lib/utils';

import React from 'react';
import BookCoverSvg from './BookCoverSvg';
import { IKImage } from 'imagekitio-next';
import config from '@/lib/config';

const variantStyles: Record<BookCoverVariant, string> = {
	extraSmall: 'book-cover_extra_small',
	medium: 'book-cover_medium',
	regular: 'book-cover_regular',
	small: 'book-cover_small',
	wide: 'book-cover_wide',
};

interface CoverBookProps {
	variant?: BookCoverVariant;
	className?: string;
	coverColor?: string;
	coverImage?: string;
}

const BookCover = ({
	variant = 'regular',
	className = '',
	coverColor = '#012B48',
	coverImage = 'https://placehold.co/400x600.png',
}: CoverBookProps) => {
	return (
		<div className={cn('relative transition-all duration-300', variantStyles[variant], className)}>
			<BookCoverSvg coverColor={coverColor} />
			<div
				className='absolute z-10'
				style={{ left: '14%', width: '85%', height: '87%' }}>
				<IKImage
					path={coverImage}
					urlEndpoint={config.env.imagekit.urlEndpoint}
					alt='Book Cover'
					fill
					className='rounded-sm object-fill'
					sizes='(max-width: 768px) auto, 33vw'
					loading='eager'
				/>
			</div>
		</div>
	);
};

export default BookCover;
