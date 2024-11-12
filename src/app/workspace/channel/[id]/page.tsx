"use client";

import React, { useState } from "react";
import Navbar from "./_components/nav";
import ChatPage from "./pages/chat-page";
import CanvasPreview from "../../../_components/canvas-editor/canvas-preview-page";
import CanvasEditor from "@/app/_components/canvas-editor/advanced-editor";
import WhiteBoard from "@/app/_components/whiteboard/whiteboard";

export default function page() {
  const [state, setState] = useState("Message");
  const [content, setContent] = useState<string>("");
  return (
    <div className="p-5 w-full h-screen flex flex-col">
      <Navbar setState={setState} state={state} />
      {state == "Message" && <ChatPage />}
      {state == "Canvas" && (
        // <Canvas
        //   localStorageKey="channelCanvas"
        //   content={content as string}
        //   setContent={setContent}
        // />
        <CanvasEditor
          htmlLocalStorageKey="html-content-channel"
          markdownLocalStorageKey="markdown-channel"
          novelLocalStorageKey="novel-content-channel"
          setContent={setContent}
        />
      )}
      {state == "Canvas Preview" && (
        <CanvasPreview content={content as string} />
      )}
      {state == "WhiteBoard" && <WhiteBoard />}
    </div>
  );
}
