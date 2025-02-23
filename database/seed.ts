import dummyBooks from '@/dummyBooks.json';
import ImageKit from 'imagekit';
import { books } from './schema';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

config({ path: '.env.local' });
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const imageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!
})
const uploadToImageKit = async (file: string, fileName: string, folder: string) => {
  try {
    const resp = await imageKit.upload({
      file,
      fileName,
      folder
    });

    return resp.filePath;
  } catch (error) {
    console.error('Error seeding data', error);
  }
}
const seed = async () => {
  try {
    for (const book of dummyBooks) {
      const coverUrl = await uploadToImageKit(book.coverUrl, `${book.title}.jpg`, '/books/images') as string;
      const videoUrl = await uploadToImageKit(book.videoUrl, `${book.title}.mp4`, '/books/trailers') as string;

      await db.insert(books).values({
        ...book,
        id: uuidv4() as string,
        coverUrl,
        videoUrl,
        createdAt: new Date()
      });
    }
  } catch (error) {
    console.error('Error seeding data', error);
    return {
      success: false,
      message: 'An error occurred while creating the book'
    }
  }
};

seed();
