"use client";

import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, PenIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SideBar() {
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
          onClick={() => clickHandler("chat")}
          className="flex items-center "
        >
          {!isOpen.chat ? <ChevronRight /> : <ChevronDown />}
          <p className="font-semibold text-lg">Boards</p>
        </CollapsibleTrigger>
        <div className="pl-4">
          <CollapsibleContent
            className="flex items-center gap-x-1"
            onClick={() => router.push("/workspace/chats/1")}
          >
            <PenIcon strokeWidth={1} className=" size-5 text-gray-600" />
            First
          </CollapsibleContent>
          <CollapsibleContent className="flex items-center gap-x-1">
            <PenIcon strokeWidth={1} className=" size-5 text-gray-600" />
            First
          </CollapsibleContent>
        </div>
      </Collapsible>

      <Dialog>
        <DialogTrigger asChild>
          <p className="flex cursor-pointer items-center gap-x-1">
            <Plus strokeWidth={1} className="size-5 text-gray-600" />
            Add Board
          </p>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create a Board.</DialogTitle>
            <DialogDescription>
              This is your board's public name.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" placeholder="Ex:John Doe Board.." />
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
    </div>
  );
}
