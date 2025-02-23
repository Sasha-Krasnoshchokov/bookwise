
interface CreateBookParams {
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
	id: number;
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
	isLoanedBook?: boolean;
}

type BookCoverVariant = 'wide' | 'small' | 'extraSmall' | 'medium' | 'regular';
