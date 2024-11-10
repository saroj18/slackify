import React from "react";
import { LogInForm } from "../_components/login-page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const user = await getServerSession();
  console.log(user);
  if (user) {
    redirect("/");
  }
  return <LogInForm />;
}
