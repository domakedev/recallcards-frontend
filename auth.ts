import NextAuth from "next-auth";
import type DefaultUser from "next-auth";

import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "./config/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register", // If set, new users will be directed here on first sign in
    error: "/auth/login", // Error code passed in query string as ?error=
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      type: "credentials",
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { type: "password", label: "Password" },
      },
      async authorize(credentials) {
        let user = null;

        // logic to verify if user exists
        user = await getUserFromDb(
          credentials.email as any,
          credentials?.password as any
        );

        console.log("🚀 ~ authorize ~ user:", user);
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          // throw new Error("No user found");
          return null;
        }

        // return user object with the their profile data
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.data = user;
      }

      return token;
    },

    session({ session, token, user }) {
      console.log("🚀 ~ session ~ token.data:", token.data)
      const {password,  ...res } = token.data as any;
      session.user = res as any;
      // session.user = token.data as any;
      // session.user.roles = user.roles;
      return session;
    },
  },
});

const getUserFromDb = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password ?? "");
    if (!passwordMatch) {
      // throw new Error("User not pass 1.");
      return null;
    }
    const newUser = {
      id: String(user.id),
      email: user.email,
      roles: user.roles,
      image: user.image,
    };
    return newUser;
  } else {
    throw new Error("User not found 2.");
  }
};
