import React from "react";
import MessageCard from "./message-card";

export default function MessagePage() {
  return (
    <div className="flex flex-col flex-grow space-y-3 h-[calc(100vh-10rem)] overflow-y-scroll p-5 w-full">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <MessageCard align={i % 2 == 0 ? "left" : "right"} key={i} />
        ))}
    </div>
  );
}
