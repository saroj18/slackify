import { ApiError } from "@/helper/ApiError";
import { asyncHandler } from "@/helper/asyncHandler";
import { getUser, UserType } from "@/utils/checkUserOnServer";
import { prisma } from "@/utils/prismaDb";
import { PUSHER_SERVER } from "@/utils/pusher";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req) => {
  const { message, type, workspaceId, channelId } = await req.json();
  const { id, name } = await getUser<UserType>();

  if (!message) {
    throw new ApiError("provide message");
  }

  if (!type) {
    throw new ApiError("provide type");
  }

  if (!workspaceId) {
    throw new ApiError("provide workspaceId");
  }

  if (!channelId) {
    throw new ApiError("provide channelId");
  }

  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
    },
  });

  if (!workspace) {
    throw new ApiError("workspace not found");
  }

  const channel = await prisma.channel.findFirst({
    where: {
      id: channelId,
    },
  });

  if (!channel) {
    throw new ApiError("channel not found");
  }

  const newMessage = await prisma.message.create({
    data: {
      message,
      type,
      channelId,
      workspaceId,
      senderId: id,
    },
  });

  if (!newMessage) {
    throw new ApiError("message creation failed");
  }
  console.log("demo");
  await PUSHER_SERVER.trigger(`channel-${channelId}`, "new-message", {
    message,
    workspaceId,
    channelId,
    senderId: id,
    type,
    channelName: channel.name,
    senderName: name,
  });

  return NextResponse.json(
    { success: "true", message: "message sent successfully" },
    { status: 200 }
  );
});
