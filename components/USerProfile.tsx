import Image from 'next/image';
import config from '@/lib/config';

const UserProfile = async ({ user }: { user: IUser }) => {
	const isVerified = user.status === 'APPROVED';
	return (
		<div className='user-profile-card'>
			<Image
				src='/icons/user-profile-card-frame.svg'
				alt=''
				className='user-profile-card-frame'
				fill
			/>
			<div className='relative mt-[60px] flex flex-1 w-full lg:gap-8 gap-4 h-[100px]'>
				<div className='absolute top-[-12px] left-[-12px] w-[124px] h-[124px] rounded-full bg-[#333c5c51]' />
				<Image
					src='/icons/user-fill.svg'
					alt='user avatar'
					width={100}
					height={100}
					className='object-contain rounded-full z-10 min-w-[100px] min-h-[100px]'
				/>
				<div className='flex flex-col justify-between gap-2 h-[100px] w-full '>
					<div className='flex items-center gap-1'>
						<VerifiedIcon fill={isVerified ? '#FFE1BD' : '#FF6C6F'} />
						<p
							className={`text-sm`}
							style={{ color: isVerified ? '#D6E0FF' : '#FF6C6F' }}>
							{isVerified ? 'Verified Student' : 'Unverified Student'}
						</p>
					</div>
					<p className='text-2xl font-semibold text-white'>{user.fullName.split(' ')[0]}</p>
					<p className='text-md text-light-100 break-all'>{user.email}</p>
				</div>
			</div>
			<div className='flex flex-col gap-8 w-full'>
				<div className='flex gap-7'></div>
				<div>
					<p className='user-profile-card-text_secondary'>Full Name</p>
					<p className='user-profile-card-text_primary'>{user.fullName}</p>
				</div>
				<div>
					<p className='user-profile-card-text_secondary'>University ID</p>
					<p className='user-profile-card-text_primary'>{user.universityId}</p>
				</div>
			</div>
			<Image
				src={`${config.env.imagekit.urlEndpoint}/${user?.universityCard || ''}`}
				alt='User university card'
				className='rounded-md object-cover'
				width={486}
				height={287}
			/>
		</div>
	);
};

export default UserProfile;

const VerifiedIcon = ({ fill = '#FFE1BD' }: { fill?: string }) => {
	return (
		<svg
			width='16'
			height='16'
			viewBox='0 0 18 18'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M6.16917 2.16584C6.5208 1.76019 6.95561 1.43496 7.44406 1.21223C7.93251 0.989506 8.46317 0.874491 9 0.875002C10.1308 0.875002 11.1442 1.375 11.8308 2.16584C12.3664 2.12759 12.904 2.20507 13.4069 2.39301C13.9099 2.58094 14.3666 2.87493 14.7458 3.255C15.1258 3.63422 15.4197 4.09073 15.6076 4.59355C15.7955 5.09637 15.8731 5.63373 15.835 6.16917C16.2405 6.52088 16.5656 6.95572 16.7881 7.44416C17.0107 7.93261 17.1256 8.46323 17.125 9C17.1255 9.53684 17.0105 10.0675 16.7878 10.5559C16.565 11.0444 16.2398 11.4792 15.8342 11.8308C15.8722 12.3663 15.7947 12.9036 15.6067 13.4065C15.4188 13.9093 15.1249 14.3658 14.745 14.745C14.3658 15.1249 13.9093 15.4188 13.4065 15.6067C12.9036 15.7947 12.3663 15.8722 11.8308 15.8342C11.4792 16.2398 11.0444 16.565 10.5559 16.7878C10.0675 17.0105 9.53684 17.1255 9 17.125C8.46317 17.1255 7.93251 17.0105 7.44406 16.7878C6.95561 16.565 6.5208 16.2398 6.16917 15.8342C5.63365 15.8725 5.09615 15.7952 4.59317 15.6074C4.0902 15.4196 3.63352 15.1258 3.25417 14.7458C2.87414 14.3665 2.58018 13.9099 2.39225 13.4069C2.20432 12.9039 2.12682 12.3664 2.165 11.8308C1.75951 11.4791 1.43444 11.0443 1.21186 10.5558C0.989273 10.0674 0.874389 9.53677 0.875002 9C0.875002 7.86917 1.375 6.85583 2.16584 6.16917C2.12772 5.63372 2.20525 5.09635 2.39319 4.59352C2.58112 4.09069 2.87504 3.63419 3.255 3.255C3.63419 2.87504 4.09069 2.58112 4.59352 2.39318C5.09635 2.20525 5.63373 2.12772 6.16917 2.16584ZM12.0083 7.48834C12.0583 7.42171 12.0945 7.34576 12.1147 7.26496C12.135 7.18415 12.1388 7.10012 12.1261 7.0178C12.1134 6.93547 12.0844 6.85652 12.0407 6.78558C11.9971 6.71464 11.9397 6.65315 11.8719 6.60471C11.8041 6.55627 11.7273 6.52187 11.6461 6.50353C11.5648 6.48518 11.4807 6.48326 11.3987 6.49789C11.3167 6.51251 11.2385 6.54338 11.1686 6.58868C11.0987 6.63398 11.0385 6.69279 10.9917 6.76167L8.295 10.5367L6.94167 9.18334C6.82319 9.07294 6.66649 9.01283 6.50457 9.01569C6.34265 9.01855 6.18816 9.08414 6.07365 9.19865C5.95914 9.31316 5.89355 9.46765 5.89069 9.62957C5.88783 9.79148 5.94794 9.94819 6.05834 10.0667L7.93334 11.9417C7.99749 12.0058 8.07484 12.0552 8.15999 12.0864C8.24515 12.1176 8.33608 12.1299 8.42647 12.1224C8.51686 12.115 8.60455 12.088 8.68344 12.0432C8.76234 11.9985 8.83055 11.9371 8.88334 11.8633L12.0083 7.48834Z'
				fill={fill}
			/>
		</svg>
	);
};
