'use client';

import { adminSideBarLinks } from '@/constants';
import { cn, getInitials } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Session } from 'next-auth';

const AdminSidebar = ({ session }: { session: Session | null }) => {
	const pathName = usePathname();
	return (
		<aside className='admin-sidebar'>
			<div>
				<div className='logo'>
					<Image
						src='/icons/admin/logo.svg'
						alt='logo'
						height={37}
						width={37}
					/>
					<h1>BookWise</h1>
				</div>
				<div className='mt-10 flex flex-col gap-5'>
					{adminSideBarLinks.map((item) => {
						const isSelected =
							(item.route !== '/admin' && pathName.includes(item.route) && item.route.length > 1) ||
							pathName === item.route;
						return (
							<Link
								href={item.route}
								key={item.route}>
								<div className={cn('link', isSelected && 'bg-primary-admin shadow-sm')}>
									<div className='relative size-5'>
										<Image
											src={item.img}
											alt='icon'
											fill
											className={`${isSelected ? 'brightness-0 invert' : ''} object-contain`}
										/>
									</div>
									<p className={`${isSelected ? 'text-white' : 'text-dark'}`}>{item.text}</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
			<div className='user'>
				<Avatar>
					<AvatarFallback className='text-xs bg-light-100 font-semibold'>
						{getInitials(session?.user?.name ?? '')}
					</AvatarFallback>
				</Avatar>
				<div className='flex flex-col max-md:hidden max-w-[120px] overflow-hidden'>
					<p className='text-sm font-semibold text-dark-200'>{session?.user?.name}</p>
					<p className='text-xs text-light-500 text-nowrap text-ellipsis overflow-hidden'>
						{session?.user?.email}
					</p>
				</div>
			</div>
		</aside>
	);
};

export default AdminSidebar;
