"use client";

import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <Dialog>
        <DialogTrigger asChild>
          <p className="flex cursor-pointer items-center gap-x-1">
            <Plus strokeWidth={1} className="size-5 text-gray-600" />
            Create Channel
          </p>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create a Channel.</DialogTitle>
            <DialogDescription>This is your channel name.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" placeholder="Ex:demo channel.." />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Collapsible>
        <CollapsibleTrigger
          onClick={() => clickHandler("chat")}
          className="flex items-center "
        >
          {!isOpen.chat ? <ChevronRight /> : <ChevronDown />}
          <p className="font-semibold text-lg">Direct Chat</p>
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
