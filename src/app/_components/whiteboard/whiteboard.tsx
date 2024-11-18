"use client";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useSyncDemo } from "@tldraw/sync";
import { useParams } from "next/navigation";

export default function WhiteBoard() {
  const { id } = useParams();
  const store = useSyncDemo({ roomId: `channel-${id}` });
  return (
    <div className="tldraw__editor max-h-[635px] h-full">
      <Tldraw store={store} />
    </div>
  );
}
