import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo = ({ logoSize = 40, isVisible }: { logoSize?: number; isVisible?: boolean }) => {
	return (
		<Link
			href='/'
			className='flex gap-2'>
			<Image
				src='/icons/logo.svg'
				alt='Logo'
				width={logoSize}
				height={logoSize}
				title='BookWise'
			/>
			<span className={`text-2xl font-semibold text-white ${!isVisible && 'max-sm:invisible'}`}>
				BookWise
			</span>
		</Link>
	);
};

export default Logo;
