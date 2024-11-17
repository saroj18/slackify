import React, { useEffect, useState } from "react";
import { NavList } from "../../../channel/[id]/constant/constant";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

type NavType = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ state, setState }: NavType) {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const { data } = useSession();

  useEffect(() => {
    const getUser = async () => {
      try {
        const resp = await fetch("/api/user/" + id);
        const respData = await resp.json();
        console.log(respData);
        setUser(respData.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [id]);
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
        <h1 className="font-bold text-2xl">
          {user ? (user.id == data?.user.id ? "You" : user.name) : "loading.."}
        </h1>
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
