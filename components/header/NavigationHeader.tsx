'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

const NavigationHeader = () => {
	const patheName = usePathname();
	return (
		<Link
			href='/library'
			className={cn(
				'text-base cursor-pointer capitalize',
				patheName === '/library' ? 'text-light-100' : 'text-light-200'
			)}>
			Library
		</Link>
	);
};

export default NavigationHeader;
