"use client";

import React, { Fragment, Suspense, useEffect, useState } from "react";
import { LoaderIcon, Send } from "lucide-react";
import dynamic from "next/dynamic";
import MessagePage from "../_components/message-page";
import { useParams } from "next/navigation";
import { PUSHER_CLIENT } from "@/utils/pusher";
import { Skeleton } from "@/components/ui/skeleton";

const TextEditor = dynamic(() => import("../_components/text-editor"), {
  ssr: false,
  loading: () => <Skeleton className="h-[150px] w-full" />,
});

export default function ChatPage() {
  const [value, setValue] = useState("");
  const [messageList, setMessageList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { workspace, id } = useParams();
  const [msgState, setMsgState] = useState<any>(false);

  const messageSendHandler = async () => {
    try {
      setValue("");
      setMsgState(true);
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
      setMsgState(false);
    } catch (error) {
      console.log(error);
    } finally {
      setMsgState(false);
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
        setLoading(res.ok);
        const data = await res.json();
        setMessageList(data.data);
        console.log(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, []);

  return (
    <Fragment>
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
                onClick={messageSendHandler}
                className="absolute z-10 cursor-pointer left-[96%] top-[80%]"
              />
            )}
          </>
        )}
      </div>
    </Fragment>
  );
}
