"use client";

import React, { useState } from "react";
import CanvasPreview from "../../../../_components/canvas-editor/canvas-preview-page";
import Navbar from "./_components/nav";
import CanvasEditor from "@/app/_components/canvas-editor/advanced-editor";
import WhiteBoard from "@/app/_components/whiteboard/whiteboard";
import ChatPage from "./pages/chat-page";
import { useParams } from "next/navigation";

export default function page() {
  const [state, setState] = useState("Message");
  const [content, setContent] = useState("");
  const [newChanges, setNewChanges] = useState<any[]>([]);
  const [initialContent, setInitialContent] = useState([]);
  const { workspace } = useParams();
  return (
    <div className="p-5 w-full flex flex-col">
      <Navbar state={state} setState={setState} />
      {state == "Message" && <ChatPage />}
      {/* {state == "Canvas" && (
        <Canvas localStorageKey="chatsCanvas" setContent={setContent} content={content} />
      )} */}
      {state == "Canvas" && (
        <CanvasEditor
          setInitialContent={setInitialContent}
          initialContent={initialContent}
          setNewChanges={setNewChanges}
          novelLocalStorageKey="novel-content-chat"
        />
      )}
      {state == "Canvas Preview" && (
        <CanvasPreview content={content as string} />
      )}
      {state == "WhiteBoard" && <WhiteBoard workspace={workspace} />}
    </div>
  );
}
