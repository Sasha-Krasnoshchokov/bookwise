'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
	DefaultValues,
	FieldValues,
	Path,
	SubmitHandler,
	useForm,
	UseFormReturn,
} from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FIELD_NAMES, FIELD_TYPES } from '@/constants';
import ImageUpload from './ImageUpload';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AuthProps<T extends FieldValues> {
	type: 'SIGN_IN' | 'SIGN_UP';
	schema: z.ZodType<T>;
	defaultValues: T;
	onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

const AuthForm = <T extends FieldValues>({
	type,
	schema,
	defaultValues,
	onSubmit,
}: AuthProps<T>) => {
	const form: UseFormReturn<T> = useForm({
		resolver: zodResolver(schema),
		defaultValues: defaultValues as DefaultValues<T>,
	});
	const router = useRouter();

	const isSignIn = type === 'SIGN_IN';
	const [signing, setSigning] = useState(false);

	const handleSubmit: SubmitHandler<T> = async (data) => {
		setSigning(true);
		const result = await onSubmit(data);
		setSigning(false);
		if (result.success) {
			toast({
				title: 'Success',
				description: isSignIn
					? 'You have successfully signed in'
					: 'You have successfully signed up',
				variant: 'success',
			});
			router.push('/');
		} else {
			toast({
				title: `Error ${isSignIn ? 'signing in' : 'signing up'}`,
				description: result.error ?? 'An error occurred',
				variant: 'destructive',
			});
		}
	};

	return (
		<div className='flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold text-white'>
				{isSignIn ? 'Welcome back to BookWise' : 'Create your library account'}
			</h2>
			<p className='text-light-100'>
				{!isSignIn
					? 'Please complete all fields and upload a valid university ID to gain access to the library.'
					: 'Access the vast collection of resources, and stay updated with latest news.'}
			</p>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className='space-y-6 w-full'>
					{Object.keys(defaultValues).map((field) => (
						<FormField
							key={field}
							control={form.control}
							name={field as Path<T>}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='capitalize'>
										{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
									</FormLabel>
									<FormControl>
										{field.name === 'universityCard' ? (
											<ImageUpload onFileChange={field.onChange} />
										) : (
											<Input
												required
												type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
												{...field}
												className='form-input'
											/>
										)}
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}
					<Button
						disabled={signing}
						type='submit'
						className='form-btn'>
						{signing ? 'Signing ...' : isSignIn ? 'Sign In' : 'Sign Up'}
					</Button>
				</form>
			</Form>

			<p className='text-center text-base font-medium'>
				{isSignIn ? 'New to BookWise?' : 'Already have an account?'}
				<Link
					href={isSignIn ? '/sign-up' : '/sign-in'}
					className='text-primary font-bold ml-2'>
					{isSignIn ? 'Create an account' : 'Sign in'}
				</Link>
			</p>
		</div>
	);
};

export default AuthForm;
