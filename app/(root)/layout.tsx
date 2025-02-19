import { auth } from '@/authjs';
import Header from '@/components/Header';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const HomeLayout = async ({ children }: { children: ReactNode }) => {
	const session = await auth();

	if (!session) redirect('/sign-in');

	return (
		<main className='root-container'>
			<div className='mx-auto w-full'>
				<Header session={session} />
				<div className='mt-20 pb-20'>{children}</div>
			</div>
		</main>
	);
};

export default HomeLayout;
