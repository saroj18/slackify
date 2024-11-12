import React from "react";
import { NavList } from "../../../channel/[id]/constant/constant";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type NavType = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ state, setState }: NavType) {
  return (
    <div className=" h-28 shadow-md p-4 mb-5">
      <div className="flex items-center gap-x-2">
        <Avatar className="cursor-pointer">
          <AvatarImage
            className="rounded-md border-2"
            src="https://github.com/shadcn.png"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="font-bold text-2xl">Saroj Aryal</h1>
      </div>
      <div className="flex gap-x-5 my-4">
        {NavList.map((item) => {
          return (
            <div
              onClick={() => setState(item.name)}
              key={item.name}
              className={`flex items-center gap-x-1 cursor-pointer ${
                state == item.name && "text-blue-500"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
