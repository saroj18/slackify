import { getServerSession } from "next-auth";
import React from "react";
import { SignUpForm } from "../_components/signup-page";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const user = await getServerSession();
  console.log(user);
  if (user) {
    redirect("/");
  }
  return <SignUpForm />;
}
