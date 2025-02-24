import React from 'react';
import BookCover from '@/components/bookOverview/BookCover';
import Image from 'next/image';
import hexToRgba from 'hex-to-rgba';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

interface IBorrowedBookCardProps extends Partial<SampleBook> {
	borrowDate: Date;
	dueDate: string;
}
const BorrowedBookCard = ({
	coverColor,
	coverUrl,
	title,
	genre,
	borrowDate,
	dueDate,
}: IBorrowedBookCardProps) => {
	const datesToDue = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / ONE_DAY_MS);
	const daysText = datesToDue > 1 ? 'days' : 'day';
	const coverColorRGBA = hexToRgba(coverColor || '')
		.split('(')[1]
		.split(')')[0]
		.split(',')
		.slice(0, 3);

	const isOverdue = datesToDue <= 0;

	return (
		<li className='relative flex flex-col gap-5 p-5 xl:w-[48%] w-full min-h-[200px] rounded-md gradient-vertical'>
			{isOverdue && (
				<div className='absolute top-[-6px] left-[-6px]'>
					<Image
						src='/icons/warning.svg'
						alt='calendar'
						width={26}
						height={26}
						className='object-contain'
					/>
				</div>
			)}

			<div
				className='w-[214px] mx-auto flex justify-center p-6 rounded-md'
				style={{
					background: `${coverColor}aa`,
					boxShadow: `inset 0 0 20px 32px ${coverColor}`,
				}}>
				<BookCover
					coverColor={coverColor}
					coverImage={coverUrl}
				/>
			</div>
			<div className='flex flex-1 flex-col justify-between gap-5'>
				<div>
					<p className='text-white font-semibold text-xl mb-3'>{title}</p>
					<p className='text-light-100 text-lg italic'>{genre}</p>
				</div>
				<div>
					<div className='flex flex-row gap-2'>
						<Image
							src='/icons/book-2.svg'
							alt='open book'
							width={18}
							height={18}
							className='object-contain'
						/>
						<p className='text-light-100 text-sm'>
							{`Borrowed on ${borrowDate.toDateString().split(' ').slice(1).join(' ')}`}
						</p>
					</div>
					<div className='flex flex-row justify-between pt-2'>
						{isOverdue ? (
							<div className='flex flex-row items-center gap-2'>
								<Image
									src='/icons/warning.svg'
									alt='calendar'
									width={18}
									height={18}
									className='object-contain'
								/>
								<p className='text-[#ff6c6f] text-sm'>Overdue Return</p>
							</div>
						) : (
							<div className='flex flex-row items-center gap-2'>
								<Image
									src='/icons/calendar.svg'
									alt='calendar'
									width={18}
									height={18}
									className='object-contain brightness-0 invert'
								/>
								<p className='text-light-100 text-sm'>{`${datesToDue} ${daysText} left to due`}</p>
							</div>
						)}
						<div
							className='w-[26px] h-[26px] p-[4px] rounded-sm'
							style={{
								background: `${coverColor}aa`,
								boxShadow: `inset 0 0 10px 8px ${coverColor}`,
								color: coverColorRGBA.every((color) => parseInt(color) > 180) ? '#000' : '#fff',
							}}>
							<Receipt />
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};

export default BorrowedBookCard;

const Receipt = () => {
	return (
		<svg
			width='18'
			height='18'
			viewBox='0 0 16 16'
			fill='currentColor'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M12.947 7.83301H10.667C10.3937 7.83301 10.167 7.60634 10.167 7.33301V2.67301C10.167 2.17967 10.3603 1.71967 10.707 1.37301C11.0537 1.02634 11.5137 0.833008 12.007 0.833008H12.0137C12.847 0.839674 13.6336 1.16634 14.2336 1.75967C14.8336 2.36634 15.1603 3.16634 15.1603 3.99967V5.61301C15.167 6.93967 14.2736 7.83301 12.947 7.83301ZM11.167 6.83301H12.947C13.7203 6.83301 14.167 6.38634 14.167 5.61301V3.99967C14.167 3.42634 13.9403 2.87967 13.5337 2.46634C13.127 2.06634 12.587 1.83967 12.0137 1.83301C12.0137 1.83301 12.0137 1.83301 12.007 1.83301C11.787 1.83301 11.5737 1.91967 11.4137 2.07967C11.2537 2.23967 11.167 2.44634 11.167 2.67301V6.83301Z'
				fill='currentColor'
			/>
			<path
				d='M5.99984 15.553C5.6865 15.553 5.39318 15.433 5.17318 15.2063L4.06649 14.093C4.00649 14.033 3.91318 14.0263 3.84652 14.0797L2.7065 14.933C2.35317 15.1997 1.88649 15.2463 1.48649 15.0463C1.08649 14.8463 0.839844 14.4463 0.839844 13.9997V3.99967C0.839844 1.98634 1.99318 0.833008 4.00651 0.833008H12.0065C12.2798 0.833008 12.5065 1.05967 12.5065 1.33301C12.5065 1.60634 12.2798 1.83301 12.0065 1.83301C11.5465 1.83301 11.1732 2.20634 11.1732 2.66634V13.9997C11.1732 14.4463 10.9265 14.8463 10.5265 15.0463C10.1332 15.2463 9.65985 15.1997 9.30652 14.933L8.1665 14.0797C8.09984 14.0263 8.0065 14.0397 7.95317 14.093L6.83317 15.213C6.6065 15.433 6.31317 15.553 5.99984 15.553ZM3.93982 13.0463C4.24649 13.0463 4.54649 13.1597 4.77315 13.393L5.87984 14.5063C5.91984 14.5463 5.97317 14.553 5.99984 14.553C6.0265 14.553 6.07983 14.5463 6.11983 14.5063L7.23983 13.3863C7.65316 12.973 8.30652 12.933 8.76652 13.2863L9.89982 14.133C9.97315 14.1863 10.0398 14.1663 10.0732 14.1463C10.1065 14.1263 10.1665 14.0863 10.1665 13.9997V2.66634C10.1665 2.36634 10.2398 2.07967 10.3665 1.83301H3.99984C2.51984 1.83301 1.83317 2.51967 1.83317 3.99967V13.9997C1.83317 14.093 1.89318 14.133 1.92651 14.153C1.96651 14.173 2.03319 14.1863 2.09985 14.133L3.23983 13.2797C3.44649 13.1263 3.69315 13.0463 3.93982 13.0463Z'
				fill='currentColor'
			/>
			<path
				d='M8 6.5H4C3.72667 6.5 3.5 6.27333 3.5 6C3.5 5.72667 3.72667 5.5 4 5.5H8C8.27333 5.5 8.5 5.72667 8.5 6C8.5 6.27333 8.27333 6.5 8 6.5Z'
				fill='currentColor'
			/>
			<path
				d='M7.5 9.16699H4.5C4.22667 9.16699 4 8.94033 4 8.66699C4 8.39366 4.22667 8.16699 4.5 8.16699H7.5C7.77333 8.16699 8 8.39366 8 8.66699C8 8.94033 7.77333 9.16699 7.5 9.16699Z'
				fill='currentColor'
			/>
		</svg>
	);
};
