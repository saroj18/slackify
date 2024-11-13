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
import { useRouter } from "next/navigation";

export default function SideBtnView() {
  const router = useRouter();
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

        <IconAvatar onClick={() => router.push("/workspace")} title="Home">
          <HomeIcon strokeWidth={1} className="w-8 h-8 text-gray-600" />
        </IconAvatar>

        <IconAvatar
          onClick={() => router.push("/workspace/canvas")}
          title="Canvas"
        >
          <Image strokeWidth={1} className="w-8 h-8  text-gray-600" />
        </IconAvatar>

        <IconAvatar
          onClick={() => router.push("/workspace/whiteboard")}
          title="Board"
        >
          <PenIcon strokeWidth={1} className="w-8 h-8 text-gray-600" />
        </IconAvatar>
      </div>

      <div className="flex flex-col">
        <Popover>
          <PopoverTrigger>
            <IconAvatar title="Add">
              <Plus strokeWidth={1} className="w-8 h-8 text-gray-600" />
            </IconAvatar>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 border-0">
            <WorkSpaceSwitcher />
          </PopoverContent>
        </Popover>

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
      </div>
    </div>
  );
}
