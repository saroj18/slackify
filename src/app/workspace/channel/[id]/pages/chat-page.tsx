import React, { Fragment } from "react";
import { Send } from "lucide-react";
import dynamic from "next/dynamic";
import MessagePage from "../_components/message-page";

const TextEditor = dynamic(() => import("../_components/text-editor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function ChatPage() {
  return (
    <Fragment>
      <MessagePage />
      <div className=" relative  ">
        <TextEditor />
        <Send className="absolute cursor-pointer left-[96%] top-[80%]" />
      </div>
    </Fragment>
  );
}
