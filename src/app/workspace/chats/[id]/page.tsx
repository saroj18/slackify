"use client";

import React, { useState } from "react";
import CanvasPreview from "../../../_components/canvas-editor/canvas-preview-page";
import ChatPage from "../../channel/[id]/pages/chat-page";
import Navbar from "./_components/nav";
import CanvasEditor from "@/app/_components/canvas-editor/advanced-editor";

export default function page() {
  const [state, setState] = useState("Message");
  const [content, setContent] = useState<string>("");
  return (
    <div className="p-5 w-full h-screen flex flex-col">
      <Navbar state={state} setState={setState} />
      {state == "Message" && <ChatPage />}
      {/* {state == "Canvas" && (
        <Canvas localStorageKey="chatsCanvas" setContent={setContent} content={content} />
      )} */}
      {state == "Canvas" && (
        <CanvasEditor
          htmlLocalStorageKey="html-content-chat"
          markdownLocalStorageKey="markdown-chat"
          novelLocalStorageKey="novel-content-chat"
          setContent={setContent}
        />
      )}
      {state == "Canvas Preview" && (
        <CanvasPreview content={content as string} />
      )}
    </div>
  );
}
