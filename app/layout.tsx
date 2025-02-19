import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import './globals.css';

import localFonts from 'next/font/local';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { auth } from '@/authjs';

const ibmPlexSans = localFonts({
	src: [
		{ path: '/fonts/IBMPlexSans-Regular.ttf', weight: '400', style: 'normal' },
		{ path: '/fonts/IBMPlexSans-Medium.ttf', weight: '500', style: 'normal' },
		{ path: '/fonts/IBMPlexSans-SemiBold.ttf', weight: '700', style: 'normal' },
		{ path: '/fonts/IBMPlexSans-Bold.ttf', weight: '700', style: 'normal' },
	],
});

const bebasNeue = localFonts({
	src: [{ path: '/fonts/BebasNeue-Regular.ttf', weight: '400', style: 'normal' }],
	variable: '--bebas-neue',
});

export const metadata: Metadata = {
	title: 'BookWise',
	description: 'BookWise is a book borrowing university library management solution.',
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
	const session = await auth();
	return (
		<html lang='en'>
			<SessionProvider session={session}>
				<body className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}>
					{children}

					<Toaster />
				</body>
			</SessionProvider>
		</html>
	);
};

export default RootLayout;
