'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Control, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { bookSchema } from '@/lib/validation';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/FileUpload';
import ColorPicker from '@/components/admin/ColorPicker';
import { Regex } from 'lucide-react';

const defaultValues: z.infer<typeof bookSchema> = {
	title: '',
	description: '',
	author: '',
	genre: '',
	rating: 1,
	totalCopies: 1,
	coverUrl: '',
	videoUrl: '',
	coverColor: '',
	summary: '',
};
interface BookFormProps extends Partial<SampleBook> {
	type?: 'create' | 'update';
}

const BookForm = ({ type, ...book }: BookFormProps) => {
	const form = useForm<z.infer<typeof bookSchema>>({
		resolver: zodResolver(bookSchema),
		defaultValues,
	});

	const handleSubmit = async (data: z.infer<typeof bookSchema>) => {
		console.log({ data });
	};

	const renderFormField = ({
		control,
		fieldName,
		label,
		placeholder,
	}: {
		control: Control<
			{
				title: string;
				description: string;
				author: string;
				genre: string;
				rating: number;
				totalCopies: number;
				coverUrl: string;
				videoUrl: string;
				coverColor: string;
				summary: string;
			},
			any
		>;
		fieldName: any;
		label: string;
		placeholder: string;
	}) => {
		return (
			<FormField
				control={control}
				name={fieldName}
				render={({ field }) => (
					<FormItem className='flex flex-col gap-1'>
						<FormLabel className='text-base font-normal text-dark-500'>{label}</FormLabel>
						<FormControl>
							<Input
								required
								type={fieldName === 'rating' || fieldName === 'totalCopies' ? 'number' : 'text'}
								min={1}
								max={fieldName === 'rating' ? 5 : 10000}
								placeholder={placeholder}
								{...field}
								className='book-form_input'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='space-y-8'>
				{renderFormField({
					control: form.control,
					fieldName: 'title',
					label: 'Book Title',
					placeholder: 'Enter the book title',
				})}
				{renderFormField({
					control: form.control,
					fieldName: 'author',
					label: 'Author',
					placeholder: 'Enter the book author',
				})}
				{renderFormField({
					control: form.control,
					fieldName: 'genre',
					label: 'Genre',
					placeholder: 'Enter the book genre',
				})}
				{renderFormField({
					control: form.control,
					fieldName: 'rating',
					label: 'Rating',
					placeholder: 'Enter the book rating',
				})}
				{renderFormField({
					control: form.control,
					fieldName: 'totalCopies',
					label: 'Total Copies',
					placeholder: 'Enter the book copies',
				})}
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1'>
							<FormLabel className='text-base font-normal text-dark-500'>
								Book Description
							</FormLabel>
							<FormControl>
								<Textarea
									required
									placeholder='Enter the book description'
									rows={8}
									{...field}
									className='book-form_input'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='coverColor'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1'>
							<FormLabel className='text-base font-normal text-dark-500'>
								Book Primary Color
							</FormLabel>
							<FormControl>
								<ColorPicker
									onPickerChange={field.onChange}
									value={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex flex-wrap justify-between max-[880px]:gap-7'>
					<FormField
						control={form.control}
						name='coverUrl'
						render={({ field }) => (
							<FormItem className='flex flex-col gap-1 w-[48%] max-[880px]:w-full'>
								<FormLabel className='text-base font-normal text-dark-500'>Book Image</FormLabel>
								<FormControl>
									<FileUpload
										variant='light'
										placeholder='Select the book image'
										folder='books/images'
										onFileChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='videoUrl'
						render={({ field }) => (
							<FormItem className='flex flex-col gap-1 w-[48%] max-[880px]:w-full'>
								<FormLabel className='text-base font-normal text-dark-500'>Book Trailer</FormLabel>
								<FormControl>
									<FileUpload
										type='video'
										variant='light'
										accept='video/*'
										placeholder='Select the book trailer'
										folder='books/trailers'
										onFileChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='summary'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1'>
							<FormLabel className='text-base font-normal text-dark-500'>Book Summary</FormLabel>
							<FormControl>
								<Textarea
									required
									placeholder='Enter the book summary'
									rows={4}
									{...field}
									className='book-form_input'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='book-form_btn text-white'>
					Add Book to Library
				</Button>
			</form>
		</Form>
	);
};

export default BookForm;
