"use client";

import CanvasPreview from "@/app/_components/canvas-editor/canvas-preview-page";
import { PUSHER_CLIENT } from "@/utils/pusher";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { JSONContent } from "novel";
import React, { useEffect, useState } from "react";

export default function LiveCanvasPreviewPage() {
  const [content, setContent] = useState<null | JSONContent>(null);
  const { id } = useParams();
  const { data } = useSession();
  const params = useSearchParams();
  const userId = params.get("id");

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

  return <CanvasPreview content={content as JSONContent} />;
}
