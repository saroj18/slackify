"use client";

import React, { useState } from "react";
import CanvasEditor from "@/app/_components/canvas-editor/advanced-editor";
import Navbar from "./nav-bar";
import SideBar from "./side-bar";

export default function CanvasPage() {
  const [content, setContent] = useState("");
  const [state, setState] = useState("Canvas");
  return (
    <div className="flex w-full">
      <SideBar />
      <div className="w-full p-3">
        <Navbar state={state} setState={setState} />
        <CanvasEditor
          setContent={setContent}
          htmlLocalStorageKey="html-content-canvas"
          markdownLocalStorageKey="markdown-canvas"
          novelLocalStorageKey="novel-content-canvas"
        />
      </div>
    </div>
  );
}
