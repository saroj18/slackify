import React, { useEffect } from "react";
import MessageCard from "./message-card";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function MessagePage({ messageList }: { messageList: any }) {
  console.log(messageList);
  const { data } = useSession();
  const { id, workspace } = useParams();
  const chatPageRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatPageRef.current?.scrollTo({
      top: chatPageRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messageList]);
  console.log(data?.user.id);

  return (
    <div
      ref={chatPageRef}
      className="flex flex-col flex-grow space-y-3 h-[calc(100vh-10rem)] overflow-y-scroll p-5 w-full"
    >
      {messageList?.length > 0 &&
        messageList.map(
          (item: any, index: any) =>
            item?.workspaceId == workspace &&
            (item?.channelId == id ||
              item?.senderId == data?.user.id ||
              item?.receiverId == data?.user.id) && (
              <MessageCard
                senderName={item?.sender?.name || item?.senderName}
                message={item.message}
                align={item.senderId == data?.user.id ? "right" : "left"}
                key={index}
                time={item?.createdAt}
              />
            )
        )}
    </div>
  );
}
