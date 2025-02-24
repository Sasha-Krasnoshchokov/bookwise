import BookList from '@/components/popularBooks/BookList';
// import { sampleBooks } from '@/constants';

// import SendEmail from './SendEmail';
// import LogoutDialog from '@/components/header/LogoutDialog';
// import { auth } from '@/authjs';

const MyProfile = async () => {
	// const session = await auth();
	return (
		<>
			<div className='mb-10 flex justify-center text-light-100'>
				{/* <LogoutDialog /> */}
				My profile data
				{/* <SendEmail /> */}
			</div>
			<BookList
				title='Borrowed Books'
				books={[]}
				containerClassName='mt-28'
			/>
		</>
	);
};

export default MyProfile;
