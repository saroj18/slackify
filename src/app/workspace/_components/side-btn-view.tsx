import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import WorkSpaceSwitcher from "./workspace-switcher";

export default function SideBtnView() {
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

        <Avatar className=" cursor-pointer">
          <AvatarImage
            className="rounded-md border-2"
            src="https://icon-library.com/images/home-icon-transparent/home-icon-transparent-20.jpg"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col">
        <Popover>
          <PopoverTrigger>
            <Avatar className=" cursor-pointer">
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
