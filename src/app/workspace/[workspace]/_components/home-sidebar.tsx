"use client";

import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronRight,
  EyeClosed,
  Plus,
  User,
  UserPlus,
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import env from "@/utils/env";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import SideBtnView from "./side-btn-view";
import { useWorkspaceContext } from "../context/workspace-context";
import CallPage from "./call-page";

export default function HomeSideBar() {
  const [isOpen, setIsOpen] = React.useState({
    channel: true,
    chat: true,
  });
  const [userList, setUserList] = useState<string[]>([]);
  const [channelName, setChannelName] = useState("");
  const [workspace, setWorkspace] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [channelLoading, setChannelLoading] = useState(false);
  const id = useParams();
  const { toast } = useToast();
  const router = useRouter();
  const { data } = useSession();
  const { callState, setCallState, visible,setCallLoading } = useWorkspaceContext();

  const clickHandler = (param: string) => {
    if (param === "channel") {
      setIsOpen({ ...isOpen, channel: !isOpen.channel });
    }
    if (param === "chat") {
      setIsOpen({ ...isOpen, chat: !isOpen.chat });
    }
  };

  useEffect(() => {
    const getIWorkSpace = async () => {
      try {
        setChannelLoading(true);
        const res = await fetch(`/api/workspace/${id.workspace}`);
        const respData = await res.json();
        console.log(respData);
        setWorkspace(respData.data);
        setChannelLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setChannelLoading(false);
      }
    };
    getIWorkSpace();

    const getUser = async () => {
      try {
        setUserLoading(true);
        const res = await fetch(`/api/workspaceuser/${id.workspace}`);
        const data = await res.json();
        setUser(data.data);
        setUserLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setUserLoading(false);
      }
    };
    getUser();
  }, []);

  const channelCreateHandler = async () => {
    try {
      setChannelLoading(true);
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
      setChannelLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setChannelLoading(false);
    }
  };

  const getInviteLink = () => {
    console.log(env.NEXT_PUBLIC_API_URL);
    console.log(workspace);
    const inviteLink = `${env.NEXT_PUBLIC_API_URL}/invite?workspaceId=${id.workspace}`;
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Invite Link Copied",
      description: "Invite link copied to clipboard",
      type: "background",
    });
  };

  const userInviteHandler = async () => {
    const resp = await fetch("/api/invite", {
      method: "POST",
      body: JSON.stringify({ userList, workspaceId: id.workspace }),
    });
    const data = await resp.json();
    if (data?.status) {
      toast({
        title: "Invitation Sent",
        description: "Invitation sent successfully",
        type: "background",
      });
    }
  };

  return (
    <div className="flex w-full max-w-xs">
      <SideBtnView />
      <div className="w-full  p-5 border-2 space-y-2">
        <Dialog onOpenChange={() => setUserList([])}>
          {workspace?.createdBy == data?.user.id && (
            <DialogTrigger asChild>
              <p className="flex cursor-pointer items-center gap-x-1  my-3">
                <UserPlus strokeWidth={1} className="size-5 text-gray-600" />
                Add People
              </p>
            </DialogTrigger>
          )}
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Add Users on Your Channel.</DialogTitle>
              <DialogDescription>
                Enter the email address.automatacally goes to invite link on
                email.use comma(,) for email seperation.
              </DialogDescription>
              <DialogDescription className="flex gap-x-1 flex-wrap">
                {userList.length > 0 &&
                  userList.map(
                    (user, index) =>
                      user && (
                        <p
                          className="border-2 border-pink-300 rounded-xl px-2 my-1 py-1"
                          key={index}
                        >
                          {user}
                        </p>
                      )
                  )}
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Textarea
                  onChange={(e) => setUserList(e.target.value.split(","))}
                  placeholder="Ex:john@gmail.com"
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <div className="flex justify-between text-sm text-blue-500 cursor-pointer items-center w-full">
                  <Button
                    onClick={userInviteHandler}
                    type="button"
                    variant="secondary"
                  >
                    Send Invite
                  </Button>
                  <p onClick={getInviteLink}>invite link</p>
                </div>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Collapsible defaultOpen={true}>
          <CollapsibleTrigger
            onClick={() => clickHandler("channel")}
            className="flex items-center transition-all duration-100 "
          >
            {!isOpen.channel ? <ChevronRight /> : <ChevronDown />}
            <p className=" text-lg">Channels</p>
          </CollapsibleTrigger>
          <div className="pl-4">
            {channelLoading
              ? Array(2)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton key={index} className="h-[20px] w-[170px] my-1" />
                  ))
              : workspace?.channels?.map((channel: any) => (
                  <CollapsibleContent
                    key={channel.id}
                    onClick={() =>
                      router.push(
                        `/workspace/${workspace.id}/channel/${channel.id}`
                      )
                    }
                    className={` cursor-pointer my-1 text-lg ${
                      channel.id == id.id && "text-blue-500"
                    }`}
                  >
                    # {channel.name}
                  </CollapsibleContent>
                ))}
          </div>
        </Collapsible>

        <Dialog>
          {workspace?.createdBy == data?.user.id && (
            <DialogTrigger asChild>
              <p className="flex cursor-pointer items-center gap-x-1">
                <Plus strokeWidth={1} className="size-5 text-gray-600" />
                Create Channel
              </p>
            </DialogTrigger>
          )}
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

        <Collapsible defaultOpen={true}>
          <CollapsibleTrigger
            onClick={() => clickHandler("chat")}
            className="flex items-center "
          >
            {!isOpen.chat ? <ChevronRight /> : <ChevronDown />}
            <p className=" text-lg">Direct Chat</p>
          </CollapsibleTrigger>
          <div className="pl-4">
            {userLoading
              ? Array(2)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton key={index} className="h-[20px] w-[170px] my-1" />
                  ))
              : user?.workspaceUsers?.length > 0 &&
                user.workspaceUsers.map((u: any) => (
                  <CollapsibleContent
                    onClick={() =>
                      router.push(`/workspace/${id.workspace}/chats/${u.id}`)
                    }
                    className={` cursor-pointer flex items-center gap-x-2 my-1 text-lg ${
                      id.id == u.id && "text-blue-500"
                    }`}
                    key={u.id}
                  >
                    <User size={20} className="opacity-40" />{" "}
                    <span aria-disabled={u.id == data?.user.id ? true : false}>
                      {u.id == data?.user.id ? "You" : u.name}
                    </span>
                  </CollapsibleContent>
                ))}
          </div>
        </Collapsible>
      </div>
      {callState && (
        <CallPage
          setCallLoading={setCallLoading}
          setCallState={setCallState}
          roomId={((id.id as string) + id.workspace) as string}
          visible={visible}
          callState={callState}
        />
      )}
    </div>
  );
}
