import Link from 'next/link';
import React from 'react';

const TooFast = () => {
	return (
		<div className='root-container flex flex-col items-center justify-center'>
			<h2 className='font-bebas-neue text-5xl font-bold text-light-100 text-center'>
				Whoa, Slow Down There, Speedy!
			</h2>

			<p className='mt-16 text-center text-lg text-light-200 '>
				Looks like you&apos;he been a little too eager.
				<br />
				We&apos;ve put a temporary pause on your excitement.
				<br />
				Chill for a bit, and try again shortly.
			</p>

			<div className='fixed bottom-10 right-10'>
				<Link
					href='/'
					className='text-lg text-light-200 rounded-md border border-light-100 px-4 py-2 hover:bg-accent-foreground'>
					Back to the home page
				</Link>
			</div>
		</div>
	);
};

export default TooFast;
