import { AuthOptions, getServerSession, Session } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./authOptions";

export interface UserType extends Session {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export const getUser = async <T>(): Promise<T> => {
  const user = (await getServerSession(authOptions)) as UserType;
  console.log("user", user);
  // if (!user) {
  //   console.log("user not login");
  //   return NextResponse.redirect("auth/signin") as T;

  // }
  return user.user as T;
};
