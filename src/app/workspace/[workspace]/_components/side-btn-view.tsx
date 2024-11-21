"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import WorkSpaceSwitcher from "./workspace-switcher";
import { HomeIcon, Image, PenIcon, Plus } from "lucide-react";
import IconAvatar from "./icon-avatar";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import useLocalStorage from "@/hooks/use-local-storage";

export default function SideBtnView() {
  const [sideBtn, setSideBtn] = React.useState("");
  const router = useRouter();
  const { data, status } = useSession();
  const params = window.location.pathname.split("/");
  console.log(params);
  return (
    <div className="flex flex-col justify-between items-center py-3 h-screen  w-full max-w-[70px]">
      <div>
        <Popover>
          <PopoverTrigger>
            <Avatar className=" my-2 cursor-pointer">
              <AvatarImage
                className="rounded-md border-2"
                src="https://github.com/shadcn.png"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 border-0">
            <WorkSpaceSwitcher />
          </PopoverContent>
        </Popover>

        <IconAvatar
          className={params.includes("workspace") ? "bg-blue-200" : ""}
          onClick={() => {
            router.push(
              `/workspace/${localStorage.getItem("currentWorkspace")}`
            ),
              setSideBtn("Home");
          }}
          title="Home"
        >
          <HomeIcon strokeWidth={1} className="w-8 h-8 text-gray-600" />
        </IconAvatar>

        <IconAvatar
          className={params.includes("canvas") ? "bg-blue-200" : ""}
          onClick={() => {
            router.push("/user/canvas"), setSideBtn("Canvas");
          }}
          title="Canvas"
        >
          <Image strokeWidth={1} className="w-8 h-8  text-gray-600" />
        </IconAvatar>

        <IconAvatar
          className={params.includes("whiteboard") ? "bg-blue-200" : ""}
          onClick={() => {
            router.push("/user/whiteboard"), setSideBtn("Board");
          }}
          title="Board"
        >
          <PenIcon strokeWidth={1} className="w-8 h-8 text-gray-600" />
        </IconAvatar>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Avatar className=" my-2 cursor-pointer">
            <AvatarImage
              className="rounded-md border-2"
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>W</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className=" p-4 bg-white rounded-lg shadow-lg">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={data?.user?.image || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>{"U"}</AvatarFallback>
            </Avatar>
            {status == "loading" ? (
              <>
                <Skeleton className="h-[10px] w-full my-2" />
                <Skeleton className="h-[10px] w-full my-2" />
              </>
            ) : (
              <div>
                <h3 className="font-semibold text-gray-800">
                  {data?.user.name}
                </h3>
                <p className="text-sm text-gray-500">{data?.user.email}</p>
              </div>
            )}
          </div>
          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              className="w-full flex items-center justify-center space-x-2"
            >
              <span>Sign out</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
