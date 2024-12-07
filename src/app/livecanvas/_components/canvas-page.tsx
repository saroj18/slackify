"use client";

import CanvasPreview from "@/app/_components/canvas-editor/canvas-preview-page";
import CallPage from "@/app/livewhiteboard/_components/call-page";
import { Button } from "@/components/ui/button";
import { PUSHER_CLIENT } from "@/utils/pusher";
import { EyeIcon, EyeOff } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { JSONContent } from "novel";
import React, { useEffect, useState } from "react";

export default function LiveCanvasPreviewPage() {
  const [content, setContent] = useState<null | JSONContent>(null);
  const { data } = useSession();
  const params = useSearchParams();
  const userId = params.get("id");
  const [visible, setVisible] = useState(true);
  const [callState, setCallState] = useState(false);

  useEffect(() => {
    const canvasInfo = PUSHER_CLIENT.subscribe(`public-canvas-${userId}`);

    canvasInfo.bind("sent-canvas", (content: any) => {
      if (content.initialContent) {
        setContent(content.initialContent);
      } else {
        setContent((prv) => {
          const previousData = { ...prv };

          content?.newChanges?.forEach((item: any) => {
            previousData.content &&
              (previousData.content[item.index] = item?.newData || {
                type: "paragraph",
              });
          });

          return previousData;
        });
      }
    });

    const getContentFromServer = async () => {
      const resp = await fetch(`/api/live/canvas?userId=${userId}`);
      const data = await resp.json();
      setContent(data.data?.content);
    };
    getContentFromServer();

    return () => {
      PUSHER_CLIENT.unsubscribe(`public-canvas-${data?.user.id}`);
      canvasInfo.unbind("sent-canvas");
    };
  }, []);

  return (
    <div>
      <div className="flex items-center gap-x-3">
        <Button
          disabled={callState}
          onClick={() => setCallState(true)}
          className="m-2"
        >
          Enable Call
        </Button>
        {callState &&
          (visible ? (
            <EyeOff
              className="cursor-pointer"
              onClick={() => setVisible(false)}
            />
          ) : (
            <EyeIcon
              className="cursor-pointer"
              onClick={() => setVisible(true)}
            />
          ))}
      </div>
      <CanvasPreview content={content as JSONContent} />
      {callState && (
        <CallPage
          className="absolute left-0 top-0"
          setCallState={setCallState}
          visible={visible}
        />
      )}
    </div>
  );
}
