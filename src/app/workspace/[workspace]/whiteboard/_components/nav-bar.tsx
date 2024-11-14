import React from "react";
import { NavList } from "../constant/constant";

type NavType = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ setState, state }: NavType) {
  return (
    <div className=" h-28 shadow-md p-4 mb-5">
      <h1 className="font-bold text-2xl">John Board</h1>
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
