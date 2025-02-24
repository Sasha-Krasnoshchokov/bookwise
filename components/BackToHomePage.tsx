'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

const BackToHomePage = () => {
	return (
		<div className='flex flex-1 justify-end lg:mt-28 mt-12'>
			<Button
				variant='secondary'
				onClick={() => redirect('/')}>
				Back to Home Page
			</Button>
		</div>
	);
};

export default BackToHomePage;
