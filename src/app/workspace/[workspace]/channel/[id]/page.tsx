"use client";

import React, { useEffect, useState } from "react";
import CanvasPreview from "../../../../_components/canvas-editor/canvas-preview-page";
import CanvasEditor from "@/app/_components/canvas-editor/advanced-editor";
import WhiteBoard from "@/app/_components/whiteboard/whiteboard";
import { useParams } from "next/navigation";
import Navbar from "./_components/nav";
import ChatPage from "./pages/chat-page";
import CanvasPage from "./pages/canvas-page";
import CanvasPreviewPage from "./pages/canvas-preview-page";
import WhiteBoardPage from "./pages/whiteboard-page";

export default function page() {
  const [state, setState] = useState("Message");
  

  return (
    <div className="p-5 w-full h-screen flex flex-col">
      <Navbar setState={setState} state={state} />
      {state == "Message" && <ChatPage />}
      {state == "Canvas" && <CanvasPage />}
      {state == "Canvas Preview" && <CanvasPreviewPage />}
      {state == "WhiteBoard" && <WhiteBoardPage/>}
    </div>
  );
}
