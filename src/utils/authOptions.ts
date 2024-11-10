import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { ApiError } from "@/helper/ApiError";
import prisma from "@/utils/prismaDb";
import env from "./env";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new ApiError("Invalid credentials");
        }

        const checkUser = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!checkUser) {
          throw new ApiError("User not found");
        }

        const verifyPassword = await bcrypt.compare(
          credentials.password,
          checkUser.password
        );

        if (!verifyPassword) {
          throw new ApiError("Invalid password");
        }

        return checkUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      console.log("token", token);
      return token;
    },
    session({ session, token }) {
      session.user.id = token.userId as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: env.NEXTAUTH_SECRET,
};
