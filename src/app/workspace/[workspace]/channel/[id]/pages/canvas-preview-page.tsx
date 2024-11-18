import CanvasPreview from "@/app/_components/canvas-editor/canvas-preview-page";
import { PUSHER_CLIENT } from "@/utils/pusher";
import { useParams } from "next/navigation";
import { JSONContent } from "novel";
import React, { useEffect, useState } from "react";

export default function CanvasPreviewPage() {
  const [content, setContent] = useState<null | JSONContent>(null);
  const { id } = useParams();

  useEffect(() => {
    const canvasInfo = PUSHER_CLIENT.subscribe(`channel-canvas-${id}`);

    canvasInfo.bind("sent-canvas", (content: any) => {
      console.log("new>>t", content);
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
      const resp = await fetch("/api/canvas/" + id);
      const data = await resp.json();
      setContent(data.data?.content);
    };
    getContentFromServer();

    const getContent = localStorage.getItem(`canvas-channel-${id}`);
    setContent(JSON.parse(getContent as string));

    return () => {
      PUSHER_CLIENT.unsubscribe(`channel-canvas-${id}`);
      canvasInfo.unbind("sent-canvas");
    };
  }, []);

  useEffect(() => {
    if (content) {
      window.localStorage.setItem(
        `canvas-channel-${id}`,
        JSON.stringify(content)
      );
    }
  }, [content]);

  return <CanvasPreview content={content as JSONContent} />;
}
