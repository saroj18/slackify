import { AuthOptions, getServerSession, Session } from "next-auth";
import { NextResponse } from "next/server";

export interface UserType extends Session {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export const getUser = async <T>(authOptions: AuthOptions): Promise<T> => {
  const user = (await getServerSession(authOptions)) as UserType;
  if (!user) {
    console.log("user not login");
    return NextResponse.redirect("/api/auth/signin") as T;
  }
  return user.user as T;
};
