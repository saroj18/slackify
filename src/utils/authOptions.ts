import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { ApiError } from "@/helper/ApiError";
import { prisma } from "@/utils/prismaDb";
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
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID as string,
      clientSecret: env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        const findUser = await prisma.user.findFirst({
          where: {
            email: user.email as string,
          },
        });
        if (!findUser) {
          const createUser = await prisma.user.create({
            data: {
              email: token.email as string,
              name: token.name as string,
              password: `LoginBy${account.provider}`,
              username: token.name as string,
            },
          });

          if (!createUser) {
            throw new ApiError("User not created");
          }
          token.userId = createUser.id;
          token.email = createUser.email;
          token.name = createUser.name;
        } else {
          token.userId = findUser.id;
          token.email = findUser.email;
          token.name = findUser.name;
        }
      } else {
        const findUserData = await prisma.user.findFirst({
          where: {
            email: token.email as string,
          },
        });
        if (!findUserData) {
          throw new ApiError("User not found");
        }
        token.userId = findUserData.id;
        token.email = findUserData.email;
        token.name = findUserData.name;
      }
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
