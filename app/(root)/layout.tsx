import { auth } from '@/authjs';
import Header from '@/components/Header';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { getCurrentDate } from '@/lib/utils';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { after } from 'next/server';
import { ReactNode } from 'react';

const HomeLayout = async ({ children }: { children: ReactNode }) => {
	const session = await auth();

	if (!session) redirect('/sign-in');

	after(async () => {
		if (!session?.user?.id) return;

		const currentDate = getCurrentDate();

		// get the user and see if the last activity date is today
		const user = await db.select().from(users).where(eq(users.id, session?.user?.id)).limit(1);

		if (user[0].lastActivityDate === currentDate) return;

		await db
			.update(users)
			.set({ lastActivityDate: currentDate })
			.where(eq(users.id, session?.user?.id));
	});

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
