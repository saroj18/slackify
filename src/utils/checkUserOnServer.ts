import { AuthOptions, getServerSession, Session } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./authOptions";
import { redirect } from "next/dist/server/api-utils";
import { ApiError } from "@/helper/ApiError";

export interface UserType extends Session {
    id: string;
    name: string;
    email: string;
    picture: string;
}

export const getUser = async <T>(): Promise<T> => {
  const user = (await getServerSession(authOptions)) as UserType;
  console.log("user>>", user);
  if (!user) {
    throw new ApiError("you must be login", 401);
  }
  return user.user as T;
};
