"use client";

import React, { Fragment, useEffect, useState } from "react";
import { LoaderIcon, Send } from "lucide-react";
import dynamic from "next/dynamic";
import MessagePage from "../../../channel/[id]/_components/message-page";
import { PUSHER_CLIENT } from "@/utils/pusher";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

const TextEditor = dynamic(
  () => import("../../../channel/[id]/_components/text-editor"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[150px] w-full" />,
  }
);

export default function ChatPage() {
  const [value, setValue] = useState("");
  const [messageList, setMessageList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [msgState, setMsgState] = useState<any>(false);
  const { id, workspace } = useParams();
  const { data } = useSession();

  useEffect(() => {
    const chats = PUSHER_CLIENT.subscribe(`chat-${data?.user.id}`);
    chats.bind("message", function (data: any) {
      setMessageList((prv: any) => [...(prv || []), data]);
    });

    return () => {
      chats.unbind("message");
      PUSHER_CLIENT.unsubscribe(`chat-${id}`);
    };
  }, [id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/message/personal?workspaceId=${workspace}`
        );
        const data = await res.json();
        setMessageList(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, []);

  const personalMessageHandler = async () => {
    try {
      setValue("");
      setMsgState(true);
      const resp = await fetch("/api/message/personal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: value,
          receiver: id,
          workspaceId: workspace,
        }),
      });
      const respData = await resp.json();
      setMessageList((prv: any) => [...(prv || []), respData.data]);
      setMsgState(false);
    } catch (error) {
      console.log(error);
    } finally {
      setMsgState(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-h-[630px]">
      <MessagePage messageList={messageList} />

      <div className=" relative  ">
        {loading ? (
          <Skeleton className="h-[150px] w-full" />
        ) : (
          <>
            <TextEditor setValue={setValue} value={value} />
            {msgState ? (
              <LoaderIcon className="absolute z-10 cursor-pointer left-[96%] top-[80%]" />
            ) : (
              <Send
                onClick={personalMessageHandler}
                className="absolute z-10 cursor-pointer left-[96%] top-[80%]"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
