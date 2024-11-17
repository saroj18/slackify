"use client";

import Image from "next/image";
import React from "react";
import logo from "../../../assets/logo.png";
import { Button } from "@/components/ui/button";
import SearchBox from "./search-box";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data } = useSession();
  return (
    <nav className="flex justify-between sticky left-0 top-0 bg-background shadow-md z-10 border-2 border-secondary h-24 items-center py-2 px-4  ">
      <Image src={logo} alt="logo" width={100} height={100} />
      <div className="flex justify-between items-center  w-full max-w-[600px]">
        <Button>Pricing</Button>
        {data?.user ? (
          <>
            <SearchBox />
            <Link href="/createworkspace">
              <Button size={"xl"} className="uppercase">
                Create a new workspace
              </Button>
            </Link>
          </>
        ) : (
          <Link href="/auth/signin">
            <Button size={"xl"} className="uppercase">
              Login
            </Button>
          </Link>
        )}
        {data && (
          <Button
            onClick={() =>
              signOut({
                redirect: false,
                callbackUrl: "/",
              })
            }
            size={"xl"}
            className="uppercase"
          >
            LogOut
          </Button>
        )}
      </div>
    </nav>
  );
}
