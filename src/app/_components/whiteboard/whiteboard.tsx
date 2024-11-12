"use client";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

export default function WhiteBoard() {
  return (
    <div className="tldraw__editor max-h-[635px] h-full">
      <Tldraw persistenceKey="example" />
    </div>
  );
}
