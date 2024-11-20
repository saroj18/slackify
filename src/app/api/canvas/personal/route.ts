import { ApiError } from "@/helper/ApiError";
import { asyncHandler } from "@/helper/asyncHandler";
import { getUser, UserType } from "@/utils/checkUserOnServer";
import { prisma } from "@/utils/prismaDb";
import { PUSHER_SERVER } from "@/utils/pusher";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req, { params }) => {
  const { id } = await getUser<UserType>();
  const { newChanges, workspaceId, receiver } = await req.json();
  console.log("newChanges>>", newChanges);

  if (!newChanges) {
    throw new ApiError("required newChanges!!");
  }

  if (!receiver) {
    throw new ApiError("please provide createdBy");
  }

  const findReceiver = await prisma.user.findFirst({
    where: {
      id: receiver,
    },
  });

  if (!findReceiver) {
    throw new ApiError("receiver not found");
  }

  const findWorkspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
    },
  });

  if (!findWorkspace) {
    throw new ApiError("workspace not found");
  }

  const data = await PUSHER_SERVER.trigger(
    `chat-canvas-${receiver}`,
    "sent-canvas",
    {
      sender: id,
      workspaceId: findWorkspace.id,
      newChanges,
      receiver,
    }
  );
  console.log("data>>", data);

  return NextResponse.json({ message: "", success: true }, { status: 200 });
});

export const GET = asyncHandler(async (req, { params }) => {
  const channelId = params?.canvas;
  console.log("channelId>>", channelId);

  if (!channelId) {
    throw new ApiError("provide canvasId first");
  }

  const findChannel = await prisma.channel.findFirst({
    where: {
      id: channelId,
    },
  });

  if (!findChannel) {
    throw new ApiError("channel not found");
  }

  const findCanvas = await prisma.canvas.findFirst({
    where: {
      channelId,
    },
  });

  if (!findCanvas) {
    throw new ApiError("canvas not found");
  }

  return NextResponse.json({ data: findCanvas }, { status: 200 });
});
