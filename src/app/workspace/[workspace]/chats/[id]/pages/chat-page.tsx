"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Send } from "lucide-react";
import dynamic from "next/dynamic";
import MessagePage from "../../../channel/[id]/_components/message-page";
import Navbar from "../_components/nav";
import { PUSHER_CLIENT } from "@/utils/pusher";
import { useParams } from "next/navigation";

const TextEditor = dynamic(
  () => import("../../../channel/[id]/_components/text-editor"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function ChatPage() {
  const [state, setState] = useState("Message");
  const [value, setValue] = useState("");
  const { id } = useParams();

  useEffect(() => {
    PUSHER_CLIENT.subscribe(`chat-${id}`);
  }, []);
  return (
    <div className="flex flex-col w-full">
      <Navbar state={state} setState={setState} />
      <MessagePage />
      <div className=" relative  ">
        <TextEditor setValue={setValue} value={value} />
        <Send className="absolute cursor-pointer left-[96%] top-[80%]" />
      </div>
    </div>
  );
}
