import { signOut } from '@/authjs';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

const LogoutDialog = ({ triggerType = 'default' }: { triggerType?: 'default' | 'icon' }) => {
	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					{triggerType === 'icon' ? (
						<Button
							variant='ghost'
							className='flex p-0 hover:bg-transparent hover:scale-95'>
							<Image
								title='Logout'
								src='/icons/logout-icon.svg'
								alt='logout'
								width={24}
								height={24}
							/>
						</Button>
					) : (
						<Button>Logout</Button>
					)}
				</DialogTrigger>
				<DialogContent className='sm:max-w-md gap-10'>
					<DialogHeader>
						<DialogTitle>Are you shure you want to log out?</DialogTitle>
						<DialogDescription>
							{/* Anyone who has this link will be able to view this. */}
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button className='bg-transparent hover:bg-accent'>Cancel</Button>
						</DialogClose>
						<form
							action={async () => {
								'use server';
								await signOut();
							}}
							className='flex justify-end'>
							<Button>Logout</Button>
						</form>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default LogoutDialog;
