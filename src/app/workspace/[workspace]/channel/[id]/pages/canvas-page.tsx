import CanvasEditor from "@/app/_components/canvas-editor/advanced-editor";
import { PUSHER_CLIENT } from "@/utils/pusher";
import { useParams } from "next/navigation";
import { JSONContent } from "novel";
import { Channel } from "pusher-js";
import React, { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function CanvasPage() {
  const [content, setContent] = useState<string>("");
  const [newChanges, setNewChanges] = useState<any[]>([]);
  const [initialContent, setInitialContent] = useState<any>();
  const { id, workspace } = useParams();
  const pusherRef = useRef<null | Channel>(null);

  useEffect(() => {
    async function sendCanvasContent() {
      const resp = await fetch("/api/initialcanvascontent", {
        method: "POST",
        body: JSON.stringify({
          initialContent,
          workspaceId: workspace,
          channelId: id,
        }),
      });
      await resp.json();
    }
    let count = 0;

    sendCanvasContent();
  }, []);

  useEffect(() => {
    const sendCanvasData = async () => {
      try {
        const resp = await fetch("/api/canvas/" + id, {
          method: "POST",
          body: JSON.stringify({
            newChanges,
            workspaceId: workspace,
          }),
        });
        await resp.json();
      } catch (error) {
        console.log(error);
      }
    };
    if (newChanges?.length > 0) {
      sendCanvasData();
    }
  }, [newChanges]);

  const sendCanvasOnServer = useDebouncedCallback(async () => {
    const resp = await fetch("/api/canvas", {
      method: "POST",
      body: JSON.stringify({
        initialContent,
        workspaceId: workspace,
        channelId: id,
      }),
    });
    const respData = await resp.json();
  }, 5000);

  useEffect(() => {
    if (initialContent) {
      sendCanvasOnServer();
    }
  }, [initialContent]);

  return (
    <CanvasEditor
      novelLocalStorageKey={`novel-canvas-channel-${id}`}
      setNewChanges={setNewChanges}
      setInitialContent={setInitialContent}
      initialContent={initialContent}
    />
  );
}
