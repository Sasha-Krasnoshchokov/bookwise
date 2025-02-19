import NextAuth, { User } from "next-auth"
import {compare} from "bcryptjs"

import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from "./database/drizzle"
import { users } from "./database/schema"
import { eq } from "drizzle-orm"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt'},
  providers: [
    CredentialsProvider({
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) null
        
        const currentUser = await db.select().from(users).where(eq(users.email, credentials.email.toString())).limit(1); 

        if (currentUser.length === 0) return null;

        const isPasswordValid = await compare(credentials.password.toString(), currentUser[0].password);
        if (!isPasswordValid) return null;

        return {
          id: currentUser[0].id.toString(),
          name: currentUser[0].fullName,
          email: currentUser[0].email,
          role: currentUser[0].role
        } as User
      }
    }),
  ],
  pages: {
    signIn: 'sign-in'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
})