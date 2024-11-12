"use client";

import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomeSideBar() {
  const [isOpen, setIsOpen] = React.useState({
    channel: false,
    chat: false,
  });
  const router = useRouter();

  const clickHandler = (param: string) => {
    if (param === "channel") {
      setIsOpen({ ...isOpen, channel: !isOpen.channel });
    }
    if (param === "chat") {
      setIsOpen({ ...isOpen, chat: !isOpen.chat });
    }
  };
  return (
    <div className="w-full max-w-xs p-5 border-2 space-y-2">
      <Collapsible>
        <CollapsibleTrigger
          onClick={() => clickHandler("channel")}
          className="flex items-center transition-all duration-100 "
        >
          {!isOpen.channel ? <ChevronRight /> : <ChevronDown />}
          <p className="font-semibold text-lg">Channels</p>
        </CollapsibleTrigger>
        <div className="pl-4">
          <CollapsibleContent
            onClick={() => router.push("/workspace/channel/1")}
            className="font-semibold"
          >
            # First
          </CollapsibleContent>
          <CollapsibleContent># First</CollapsibleContent>
          <CollapsibleContent># First</CollapsibleContent>
        </div>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger
          onClick={() => clickHandler("chat")}
          className="flex items-center "
        >
          {!isOpen.chat ? <ChevronRight /> : <ChevronDown />}
          <p className="font-semibold text-lg">Chat</p>
        </CollapsibleTrigger>
        <div className="pl-4">
          <CollapsibleContent
            className="font-semibold"
            onClick={() => router.push("/workspace/chats/1")}
          >
            # First
          </CollapsibleContent>
          <CollapsibleContent># First</CollapsibleContent>
          <CollapsibleContent># First</CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
}
