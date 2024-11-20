"use client";

import CanvasPreview from "@/app/_components/canvas-editor/canvas-preview-page";
import { PUSHER_CLIENT } from "@/utils/pusher";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { JSONContent } from "novel";
import React, { useEffect, useState } from "react";

export default function CanvasPreviewPage() {
  const [content, setContent] = useState<null | JSONContent>(null);
  const { id, workspace } = useParams();
  const { data: userInfo } = useSession();

  useEffect(() => {
    const canvasInfo = PUSHER_CLIENT.subscribe(
      `chat-canvas-${userInfo?.user.id}`
    );

    canvasInfo.bind("sent-canvas", (content: any) => {
      console.log(content);
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
      const resp = await fetch(
        `/api/canvas/personal/${id}/?workspace=${workspace}?receiver=${userInfo?.user.id}`
      );
      const data = await resp.json();
      setContent(data.data?.content);
    };
    getContentFromServer();

    return () => {
      PUSHER_CLIENT.unsubscribe(`chat-canvas-${userInfo?.user.id}`);
      canvasInfo.unbind("sent-canvas");
    };
  }, []);

  return <CanvasPreview content={content as JSONContent} />;
}
