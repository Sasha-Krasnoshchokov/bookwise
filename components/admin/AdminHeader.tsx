import { Session } from 'next-auth';
import React from 'react';

const AdminHeader = ({ session }: { session: Session | null }) => {
	return (
		<header className='admin-header'>
			<div>
				<h2 className='text-dark-400 font-semibold text-2xl'>{session?.user?.name}</h2>
				<p className='text-base text-slate-500'>Monitor all of your users and books here</p>
			</div>
			<div className='flex items-center'>
				<p>Search</p>
			</div>
		</header>
	);
};

export default AdminHeader;
