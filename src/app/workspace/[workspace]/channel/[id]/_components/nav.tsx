import React, { useEffect, useState } from "react";
import { NavList } from "../constant/constant";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Captions, CaptionsOff, LoaderIcon, Phone } from "lucide-react";
import { useWorkspaceContext } from "../../../context/workspace-context";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type NavType = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ setState, state }: NavType) {
  const { id } = useParams();
  const [channel, setChannel] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { data } = useSession();
  const {
    visible,
    setVisible,
    setCallState,
    callState,
    callLoading,
    setCallLoading,
  } = useWorkspaceContext();
  console.log(callLoading);

  useEffect(() => {
    const getChannel = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/channel/${id}`);
        const data = await res.json();
        console.log(data.data.workspace.createdBy);
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
      <h1 className="font-bold text-2xl flex gap-x-2 items-center">
        # {"  "}
        {loading ? <Skeleton className="h-[20px] w-[200px]" /> : channel?.name}
      </h1>
      <div className="flex gap-x-5 my-4">
        {loading ? (
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-[20px] w-[100px]" />
            <Skeleton className="h-[20px] w-[100px]" />
            <Skeleton className="h-[20px] w-[100px]" />
            <Skeleton className="h-[20px] w-[100px]" />
          </div>
        ) : (
          NavList.map((item) => {
            return item.name == "Canvas" &&
              channel?.workspace?.createdBy !== data?.user.id ? null : (
              <div
                onClick={() => setState(item.name)}
                key={item.name}
                className={`flex items-center gap-x-1 cursor-pointer ${
                  state == item.name && "text-blue-500"
                } `}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            );
          })
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {!callState && !callLoading && (
                <Phone
                  className="cursor-pointer"
                  onClick={() => {
                    setCallState(true), console.log("clicked");
                    setCallLoading(true);
                  }}
                />
              )}
              {callLoading && <LoaderIcon />}
            </TooltipTrigger>
            <TooltipContent>
              <p>Start Call</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              {callState && !visible && !callLoading && (
                <CaptionsOff
                  onClick={() => {
                    setVisible(!visible);
                  }}
                  xlinkTitle="show screen"
                  className="cursor-pointer"
                />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>Show Call Screen</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              {callState && visible && !loading && (
                <Captions
                  onClick={() => {
                    setVisible(!visible);
                  }}
                  xlinkTitle="hide screen"
                  className="cursor-pointer"
                />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>Hide Call Screen</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
