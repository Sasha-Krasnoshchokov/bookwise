'use server';

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async ({ bookId, userId } : IBorrowBookParams) => {
  try {
    const [borrowedBook] = await db
      .select()
      .from(borrowRecords)
      .where(eq(borrowRecords.bookId, bookId))
      .limit(1);

    if (borrowedBook) {
      return {
        success: false,
        message: 'Book is already borrowed'
      };
    }
    const [book] = await db.select().from(books).where(eq(books.id, bookId)).limit(1);

    if (!book || book.availableCopies === 0) {
      return {
        success: false,
        message: 'Book is not available for borrowing'
      };
    }

    const dueDate = dayjs().add(7, 'day').toDate().toDateString();

    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: 'BORROWED',
      returnDate: dueDate
    });

    await db.update(books).set({ availableCopies: book.availableCopies - 1 }).where(eq(books.id, bookId));
    return {
      success: true,
      message: 'Borrowed successfully',
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An error occurred while borrowing the book'
    };
  }
};
