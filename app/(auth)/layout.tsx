import { auth } from '@/authjs';
import Logo from '@/components/Logo';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

const AuthLayout = async ({ children }: { children: ReactNode }) => {
	const session = await auth();

	if (session) redirect('/');

	return (
		<main className='auth-container'>
			<section className='auth-form'>
				<div className='auth-box'>
					<Logo
						logoSize={37}
						isVisible
					/>

					<div>{children}</div>
				</div>
			</section>

			<section className='auth-illustration'>
				<Image
					src='/images/auth-illustration.png'
					alt='Auth Illustration'
					className='size-full object-cover'
					width={1000}
					height={1000}
				/>
			</section>
		</main>
	);
};

export default AuthLayout;
