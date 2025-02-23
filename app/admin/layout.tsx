import { auth } from '@/authjs';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import '@/styles/admin.css';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';

const AdminLayout = async ({ children }: { children: ReactNode }) => {
	const session = await auth();

	if (!session?.user?.id) redirect('/sign-in');

	const isAdmin = await db
		.select({ isAdmin: users.role })
		.from(users)
		.where(eq(users.id, session?.user?.id))
		.limit(1)
		.then((res) => res[0].isAdmin === 'ADMIN');

	if (!isAdmin) redirect('/');

	return (
		<main className='flex flex-row min-h-screen w-full'>
			<AdminSidebar session={session} />

			<div className='admin-container'>
				<AdminHeader session={session} />
				{children}
			</div>
		</main>
	);
};

export default AdminLayout;
