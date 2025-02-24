'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

const NavigationHeader = () => {
	const patheName = usePathname();
	return (
		<Link
			href='/'
			className={cn(
				'text-base cursor-pointer capitalize hover:text-light-200 transition-all duration-200',
				patheName === '/' ? 'text-light-200' : 'text-light-100'
			)}>
			Home
		</Link>
	);
};

export default NavigationHeader;
