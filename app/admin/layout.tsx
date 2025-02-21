import { auth } from '@/authjs';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import '@/styles/admin.css';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

const AdminLayout = async ({ children }: { children: ReactNode }) => {
	const session = await auth();
	if (!session?.user?.id) redirect('/sign-in');

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
