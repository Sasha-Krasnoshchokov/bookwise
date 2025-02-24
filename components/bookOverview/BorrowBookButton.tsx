'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { borrowBook } from '@/lib/actions/borrowBook';

import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const BorrowBookButton = ({
	bookId,
	userId,
	isEligible,
}: {
	bookId: string;
	userId: string;
	isEligible: boolean;
}) => {
	const router = useRouter();
	const [isBorrowing, setIsBorrowing] = useState(false);

	const handleBorrow = async () => {
		if (!isEligible) {
			toast({
				title: 'Error',
				description: 'You are not eligible to borrow this book',
				variant: 'destructive',
			});
			return;
		}

		try {
			setIsBorrowing(true);
			const resp = await borrowBook({ bookId, userId });
			if (resp.success) {
				toast({
					title: 'Success',
					description: resp.message,
					variant: 'success',
				});
				router.push('/my-profile');
			} else {
				toast({
					title: 'Error',
					description: resp.message,
					variant: 'destructive',
				});
				if (resp.message === 'Book is already borrowed') {
					router.push('/my-profile');
				}
			}
		} catch (error) {
			console.error(error);
			toast({
				title: 'Error',
				description: 'An error occurred while borrowing the book',
				variant: 'destructive',
			});
		} finally {
			setIsBorrowing(false);
		}
	};

	return (
		<Button
			disabled={isBorrowing}
			className='book-overview_btn'
			onClick={handleBorrow}>
			<Image
				src='/icons/book.svg'
				alt='book'
				width={20}
				height={20}
			/>
			<p className='font-bebas-neue text-xl text-dark-100'>
				{isBorrowing ? 'Borrowing ...' : 'Borrow'}
			</p>
		</Button>
	);
};

export default BorrowBookButton;
