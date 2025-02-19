import BookList from '@/components/popularBooks/BookList';
import { sampleBooks } from '@/constants';

// import SendEmail from './SendEmail';
// import LogoutDialog from '@/components/header/LogoutDialog';

const MyProfile = () => {
	return (
		<>
			<div className='mb-10 flex justify-center text-light-100'>
				{/* <LogoutDialog /> */}
				My profile data
				{/* <SendEmail /> */}
			</div>
			<BookList
				title='Borrowed Books'
				books={sampleBooks}
				containerClassName='mt-28'
			/>
		</>
	);
};

export default MyProfile;
