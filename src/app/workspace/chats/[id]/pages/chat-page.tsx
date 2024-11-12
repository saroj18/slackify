"use client";

import React, { Fragment, useState } from "react";
import { Send } from "lucide-react";
import dynamic from "next/dynamic";
import MessagePage from "../../../channel/[id]/_components/message-page";
import Navbar from "../_components/nav";

const TextEditor = dynamic(
  () => import("../../../channel/[id]/_components/text-editor"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function ChatPage() {
  const [state, setState] = useState("Message");
  return (
    <div className="flex flex-col w-full">
      <Navbar state={state} setState={setState} />
      <MessagePage />
      <div className=" relative  ">
        <TextEditor />
        <Send className="absolute cursor-pointer left-[96%] top-[80%]" />
      </div>
    </div>
  );
}
