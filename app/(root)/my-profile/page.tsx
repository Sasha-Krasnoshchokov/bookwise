import UserProfile from '@/components/USerProfile';
import { auth } from '@/authjs';
import { db } from '@/database/drizzle';
import { books, borrowRecords, users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import BorrowedBookCard from '@/components/popularBooks/BorrowedBookCard';

const MyProfile = async () => {
	const session = await auth();

	if (!session?.user?.id) redirect('/sign-in');

	const [currentUser] = await db
		.select()
		.from(users)
		.where(eq(users.id, session?.user?.id))
		.limit(1);

	const borrowedBooks = await db
		.select()
		.from(borrowRecords)
		.where(eq(borrowRecords.userId, session?.user?.id));

	const listPromises = borrowedBooks.map(async (book) => {
		const [currentBook] = await db.select().from(books).where(eq(books.id, book.bookId)).limit(1);
		return {
			...currentBook,
			borrowDate: book.borrowDate,
			dueDate: book.dueDate,
			returnDate: book.returnDate,
			status: book.status,
		};
	});
	const list = await Promise.all(listPromises);

	return (
		<div className='flex w-full gap-16 justify-between flex-wrap'>
			<UserProfile user={currentUser} />
			<div className='flex flex-1 flex-col gap-6'>
				<p className='user-profile-card-text_primary'>Borrowed Books</p>

				<ul className='flex flex-row flex-wrap justify-between gap-4'>
					{!list.length && (
						<p className='text-light-200 font-bebas-neue text-xl'>No borrowed books yet</p>
					)}
					{list.map((book) => (
						<BorrowedBookCard
							key={book.id}
							coverColor={book.coverColor}
							coverUrl={book.coverUrl}
							title={book.title}
							genre={book.genre}
							borrowDate={book.borrowDate}
							dueDate={book.dueDate}
							status={book.status}
							returnDate={book.returnDate}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default MyProfile;
