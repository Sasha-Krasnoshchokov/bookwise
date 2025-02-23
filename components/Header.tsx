import { getInitials } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import Logo from './Logo';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Session } from 'next-auth';
import LogoutDialog from './header/LogoutDialog';
import NavigationHeader from './header/NavigationHeader';

const Header = ({ session }: { session: Session }) => {
	return (
		<header className='my-10 flex justify-between gap-5'>
			<Logo />
			<ul className='flex flex-row items-center gap-8'>
				<li>
					<NavigationHeader />
				</li>
				<li>
					<Link href='/my-profile'>
						<Avatar>
							<AvatarFallback className='text-xs bg-light-100 font-semibold'>
								{getInitials(session?.user?.name ?? '')}
							</AvatarFallback>
						</Avatar>
					</Link>
				</li>
				<li>
					<LogoutDialog triggerType='icon' />
				</li>
			</ul>
		</header>
	);
};

export default Header;
