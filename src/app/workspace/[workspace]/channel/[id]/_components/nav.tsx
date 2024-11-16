import React, { useEffect, useState } from "react";
import { NavList } from "../constant/constant";
import { useParams } from "next/navigation";

type NavType = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ setState, state }: NavType) {
  const { id } = useParams();
  const [channel, setChannel] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getChannel = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/channel/${id}`);
        const data = await res.json();
        setChannel(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getChannel();
  }, [id]);

  return (
    <div className=" h-24 shadow-md p-2 mb-5">
      <h1 className="font-bold text-2xl flex items-center">
        # {loading ? <p>loading...</p> : channel?.name}
      </h1>
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
