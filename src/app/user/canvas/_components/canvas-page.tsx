"use client";

import CanvasEditor from "@/app/_components/canvas-editor/advanced-editor";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import env from "@/utils/env";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { Channel } from "pusher-js";
import React, { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useCall } from "../../_components/Provider";
import { Clipboard, EyeIcon, EyeOff, PhoneCall } from "lucide-react";

export default function CanvasPage() {
  const [content, setContent] = useState<string>("");
  const [newChanges, setNewChanges] = useState<any[]>([]);
  const [initialContent, setInitialContent] = useState<any>();
  const { id, workspace } = useParams();
  const pusherRef = useRef<null | Channel>(null);
  const { toast } = useToast();
  const { data } = useSession();
  const { callState, setCallState, visible, setVisible } = useCall();

  // useEffect(() => {
  //   async function sendCanvasContent() {
  //     const resp = await fetch("/api/publiccanvas/initialcanvas", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         userId: id,
  //       }),
  //     });
  //     await resp.json();
  //   }

  //   sendCanvasContent();
  // }, []);

  useEffect(() => {
    const sendCanvasData = async () => {
      try {
        const resp = await fetch("/api/live/canvas", {
          method: "POST",
          body: JSON.stringify({
            newChanges,
            createdBy: data?.user.id,
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
    const resp = await fetch("/api/live/" + data?.user.id, {
      method: "POST",
      body: JSON.stringify({
        initialContent,
      }),
    });
    const respData = await resp.json();
  }, 5000);

  useEffect(() => {
    if (initialContent) {
      sendCanvasOnServer();
    }
  }, [initialContent]);

  const shareHandler = () => {
    // const url = `${env.NEXT_PUBLIC_API_URL}/api/publiccanvas/initialcanvas/?id=${data?.user.id}`;
    const url = `${env.NEXT_PUBLIC_API_URL}/livecanvas/?id=${data?.user.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied",
        description: "Link copied to clipboard",
      });
    }
  };

  return (
    <div className="p-8 w-full">
      <div className="flex gap-x-2 items-center">
        <Clipboard
          strokeWidth={1.5}
          onClick={shareHandler}
          className="absolute cursor-pointer left-[6%] top-2 z-30 opacity-50 "
        />
        {!callState && (
          <PhoneCall
            strokeWidth={1.5}
            onClick={() => setCallState(true)}
            className="absolute cursor-pointer left-[9%] top-2 z-30 opacity-50 "
          />
        )}

        {callState &&
          (visible ? (
            <EyeOff
              className="cursor-pointer absolute left-[9%] top-2 z-30 opacity-50"
              onClick={() => setVisible(false)}
            />
          ) : (
            <EyeIcon
              className="cursor-pointer absolute left-[9%] top-2 z-30 opacity-50"
              onClick={() => setVisible(true)}
            />
          ))}
      </div>
      <CanvasEditor
        novelLocalStorageKey={`novel-canvas-channel-${id}`}
        setNewChanges={setNewChanges}
        setInitialContent={setInitialContent}
        initialContent={initialContent}
      />
    </div>
  );
}
