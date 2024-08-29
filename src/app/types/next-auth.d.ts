// next-auth.d.ts
import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      // Existing properties
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // or any specific type if needed
    };
  }
}
