import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

// const authenticatedRoutes = [
//   'checkout',
//   'checkout/address',
// ]


export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // console.log({auth});
      // const isLoggedIn = !!auth?.user;
      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      return true;
    },
    jwt({token, user}) {
      // console.log('token:', token);
      // console.log('user:', user);
      if (user) {
        token.data = user
      }
      // console.log('token, user:', token, user);
      return token
    },
    session({session, token, user}) {
      // console.log('session, token, user:', session, token, user);
      session.user = token.data as any;
      // session.user = token.data as any;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // buscar correo
        const user = await prisma.user.findFirst({
          where: {
            email: email.toLowerCase(),
          }
        })
        if (!user) return null;
        // comparar contraseña
        if ( !bcryptjs.compareSync(password, user.password) ) return null

        // regresar el usuario
        const { password: _, ...rest } = user;
        // console.log({ rest});

        return rest
      },
    }),
  ]
}satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers  } = NextAuth({...authConfig});