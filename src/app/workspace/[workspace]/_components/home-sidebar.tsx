"use client";

import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
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
    channel: true,
    chat: true,
  });
  const [channelName, setChannelName] = useState("");
  const router = useRouter();

  const clickHandler = (param: string) => {
    if (param === "channel") {
      setIsOpen({ ...isOpen, channel: !isOpen.channel });
    }
    if (param === "chat") {
      setIsOpen({ ...isOpen, chat: !isOpen.chat });
    }
  };

  const [workspace, setWorkspace] = useState<any>(null);
  const id = useParams();

  useEffect(() => {
    const getIWorkSpace = async () => {
      const res = await fetch(`/api/workspace/${id.workspace}`);
      const respData = await res.json();
      console.log(respData);
      setWorkspace(respData.data);
      console.log("chalyo");
    };
    getIWorkSpace();
  }, []);

  const channelCreateHandler = async () => {
    console.log(workspace);
    if (!channelName) {
      alert("Please fill the channel name");
      return null;
    }
    console.log(workspace);
    const res = await fetch("/api/channel", {
      method: "POST",
      body: JSON.stringify({
        name: channelName,
        workspaceId: workspace.id,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      setChannelName("");
      setWorkspace({
        ...workspace,
        channels: [...workspace.channels, data.data],
      });
    }
  };

  return (
    <div className="w-full max-w-xs p-5 border-2 space-y-2">
      <Collapsible defaultOpen={true}>
        <CollapsibleTrigger
          onClick={() => clickHandler("channel")}
          className="flex items-center transition-all duration-100 "
        >
          {!isOpen.channel ? <ChevronRight /> : <ChevronDown />}
          <p className="font-semibold text-lg">Channels</p>
        </CollapsibleTrigger>
        <div className="pl-4">
          {workspace?.channels?.map((channel: any) => (
            <CollapsibleContent
              key={channel.id}
              onClick={() =>
                router.push(`/workspace/${workspace.id}/channel/${channel.id}`)
              }
              className="font-mono cursor-pointer"
            >
              # {channel.name}
            </CollapsibleContent>
          ))}
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
              <Input
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                id="link"
                placeholder="Ex:demo channel.."
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                onClick={channelCreateHandler}
                type="button"
                variant="secondary"
              >
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
