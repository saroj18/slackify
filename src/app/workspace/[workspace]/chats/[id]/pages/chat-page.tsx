"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Send } from "lucide-react";
import dynamic from "next/dynamic";
import MessagePage from "../../../channel/[id]/_components/message-page";
import { PUSHER_CLIENT } from "@/utils/pusher";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

const TextEditor = dynamic(
  () => import("../../../channel/[id]/_components/text-editor"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function ChatPage() {
  const [value, setValue] = useState("");
  const [messageList, setMessageList] = useState<any>([]);
  const { id,workspace } = useParams();
  const { data } = useSession();

  useEffect(() => {
    const chats = PUSHER_CLIENT.subscribe(`chat-${data?.user.id}`);
    chats.bind("message", function (data: any) {
      console.log("data>>>>", data);
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
        const res = await fetch(
          `/api/message/personal?workspaceId=${workspace}`
        );
        const data = await res.json();
        setMessageList(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, []);

  const personalMessageHandler = async () => {
    console.log("personal");
    try {
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
      console.log(respData);

      setMessageList((prv: any) => [...(prv || []), respData.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full max-h-[630px]">
      <MessagePage messageList={messageList} />
      <div className=" relative  ">
        <p>chat page</p>
        <TextEditor setValue={setValue} value={value} />
        <Send
          onClick={personalMessageHandler}
          className="absolute cursor-pointer left-[96%] top-[80%]"
        />
      </div>
    </div>
  );
}
