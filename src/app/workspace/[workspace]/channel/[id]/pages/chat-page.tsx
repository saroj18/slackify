"use client";

import React, { Fragment, Suspense, useEffect, useState } from "react";
import { Send } from "lucide-react";
import dynamic from "next/dynamic";
import MessagePage from "../_components/message-page";
import { useParams } from "next/navigation";
import { PUSHER_CLIENT } from "@/utils/pusher";

const TextEditor = dynamic(() => import("../_components/text-editor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function ChatPage() {
  const [value, setValue] = useState("");
  const [messageList, setMessageList] = useState<any>([]);
  const { workspace, id } = useParams();

  const messageSendHandler = async () => {
    try {
      const resp = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: value,
          type: "messageOnPublicChannel",
          workspaceId: workspace,
          channelId: id,
        }),
      });
      const data = await resp.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const channelMessage = PUSHER_CLIENT.subscribe(`channel-${id}`);
    channelMessage.bind("new-message", (data: any) => {
      console.log(data);
      setMessageList((prev: any) => [...(prev || []), data]);
    });

    return () => {
      channelMessage.unbind("new-message");
      PUSHER_CLIENT.unsubscribe(`channel-${id}`);
    };
  }, [id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(`/api/message/${id}`);
        const data = await res.json();
        setMessageList(data.data);
        console.log(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getMessages();
  }, []);

  return (
    <Fragment>
      <MessagePage messageList={messageList} />
      <div className=" relative  ">
        <p>channel</p>
        <Suspense fallback={<p>Loading...</p>}>
          <TextEditor setValue={setValue} value={value} />
        </Suspense>
        <Send
          onClick={messageSendHandler}
          className="absolute z-10 cursor-pointer left-[96%] top-[80%]"
        />
      </div>
    </Fragment>
  );
}
