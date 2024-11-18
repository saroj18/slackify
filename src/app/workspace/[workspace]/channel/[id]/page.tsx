"use client";

import React, { useEffect, useState } from "react";
import CanvasPreview from "../../../../_components/canvas-editor/canvas-preview-page";
import CanvasEditor from "@/app/_components/canvas-editor/advanced-editor";
import WhiteBoard from "@/app/_components/whiteboard/whiteboard";
import { useParams } from "next/navigation";
import Navbar from "./_components/nav";
import ChatPage from "./pages/chat-page";
import { PUSHER_CLIENT } from "@/utils/pusher";
import { JSONContent } from "novel";
import CanvasPage from "./pages/canvas-page";
import CanvasPreviewPage from "./pages/canvas-preview-page";

export default function page() {
  const [state, setState] = useState("Message");
  // const [workspace, setWorkspace] = useState<any>(null);

  useEffect(() => {
    // const getIWorkSpace = async () => {
    //   const res = await fetch("/api/workspace/" + id);
    //   const data = await res.json();
    //   console.log(data);
    //   setWorkspace(data);
    // };
    // getIWorkSpace();
  }, []);

  return (
    <div className="p-5 w-full h-screen flex flex-col">
      <Navbar setState={setState} state={state} />
      {state == "Message" && <ChatPage />}
      {state == "Canvas" && <CanvasPage />}
      {state == "Canvas Preview" && <CanvasPreviewPage />}
      {state == "WhiteBoard" && <WhiteBoard />}
    </div>
  );
}
