
import { integer, text, date, pgTable, uuid, pgEnum, timestamp, varchar } from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED']);
export const ROLE_ENUM = pgEnum('role', ['USER', 'ADMIN']);
export const BORROW_STATUS_ENUM = pgEnum('borrow_status', ['BORROWED', 'RETURNED']);

export const users = pgTable("users", {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: text('email').notNull().unique(),
  universityId: integer('university_id').notNull().unique(),
  universityCard: text('university_card').notNull().default('-'),
  password: text('password').notNull(),
  status: STATUS_ENUM('status').default('APPROVED'),
  role: ROLE_ENUM('role').default('USER'),
  lastActivityDate: date('last_activity_date').notNull().defaultNow(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
  }).notNull().defaultNow(),
});

export const books = pgTable("books", {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  coverColor: varchar('cover_color', { length: 7 }).notNull(),
  genre: text('genre').notNull(),
  coverUrl: text('cover_url').notNull(),
  videoUrl: text('video_url').notNull(),
  description: text('description').notNull(),
  summary: text('summary').notNull(),
  rating: integer('rating').notNull(),
  totalCopies: integer('total_copies').notNull().default(1),
  availableCopies: integer('available_copies').notNull().default(0),
  createdAt: timestamp('created_at', {
    withTimezone: true,
  }).notNull().defaultNow(),
});

export const borrowRecords = pgTable("borrow_records", {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  bookId: uuid('book_id').references(() => books.id).notNull(),
  borrowDate: timestamp('borrow_date', {
    withTimezone: true,
  }).notNull().defaultNow(),
  dueDate: date('due_date').notNull(),
  returnDate: date('return_date').notNull(),
  status: BORROW_STATUS_ENUM('status').default('BORROWED').notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
  }).notNull().defaultNow(),
});
