import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const AdminBooks = () => {
	return (
		<section className='w-full rounded-2xl bg-white p-7'>
			<div className='flex flex-wrap items-center justify-between gap-2'>
				<h2 className='text-xl font-semibold'>All Books</h2>

				<Button
					className='bg-primary-admin opacity-90 hover:bg-primary-admin hover:opacity-100 duration-300 transition-all'
					asChild>
					<Link
						href='/admin/books/new'
						className='text-white'>
						+ Create a New Book
					</Link>
				</Button>
			</div>

			<div className='my-7 w-full overflow-hidden'>Table</div>
		</section>
	);
};

export default AdminBooks;
