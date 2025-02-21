import BookForm from '@/components/admin/forms/BookForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const NewBooks = () => {
	return (
		<>
			<Button
				asChild
				className='back-btn'>
				<Link href='/admin/books/'>Go Back</Link>
			</Button>
			<section className='md:mx-auto md:w-[50vw]'>
				<BookForm />
			</section>
		</>
	);
};

export default NewBooks;
