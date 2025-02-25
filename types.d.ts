
interface IBorrowBookParams {
	bookId: string;
	userId: string;
}
interface CreateBook {
	title: string;
	author: string;
	genre: string;
	coverUrl: string;
	videoUrl: string;
	coverColor: string;
	description: string;
	summary: string;
	rating: number;
	totalCopies: number;
}

interface AuthCredentials {
	email: string;
	password: string;
	fullName: string;
	universityId: number;
	universityCard: string;
}

interface 	SampleBook {
	id: string;
	title: string;
	author: string;
	genre: string;
	rating: number;
	totalCopies: number;
	availableCopies: number;
	description: string;
	coverColor: string;
	coverUrl: string;
	videoUrl: string;
	summary: string;
	createdAt: Date | null;
}

interface IUser {
	id: string;
	fullName: string;
	email: string;
	universityId: number;
	universityCard: string;
	password: string;
	status: TUserStatus;
	role: TUserRole;
	lastActivityDate: string;
	createdAt: Date;
}

type BookCoverVariant = 'wide' | 'small' | 'extraSmall' | 'medium' | 'regular';
type TFieldNames = 
| 'rating'
| 'totalCopies'
| 'title'
| 'description'
| 'author'
| 'genre'
| 'coverUrl'
| 'videoUrl'
| 'coverColor'
	| 'summary';

type TUserStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | null;
type TUserRole = 'USER' | 'ADMIN' | null;
type TBookStatus = 'AVAILABLE' | 'BORROWED' | 'RETURNED';
