import { ApiError } from "@/helper/ApiError";
import { asyncHandler } from "@/helper/asyncHandler";
import { getUser, UserType } from "@/utils/checkUserOnServer";
import { prisma } from "@/utils/prismaDb";
import { PUSHER_SERVER } from "@/utils/pusher";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest) => {
  const { id } = await getUser<UserType>();

  const { message, receiver, workspaceId } = await req.json();

  if (!message || !receiver) {
    throw new ApiError("Provide message and receiver", 400);
  }

  if (!workspaceId) {
    throw new ApiError("Provide workspaceId", 400);
  }

  const findWorkspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
    },
  });

  if (!findWorkspace) {
    throw new ApiError("Workspace not found", 404);
  }

  const findReceiver = await prisma.user.findFirst({
    where: {
      id: receiver,
    },
  });

  if (!findReceiver) {
    throw new ApiError("Receiver not found", 404);
  }

  const saveMessage = await prisma.message.create({
    data: {
      message,
      type: "personalChat",
      senderId: id,
      receiverId: receiver,
      workspaceId,
    },
    include: {
      sender: {
        select: {
          name: true,
        },
      },
    },
  });
  console.log(saveMessage);

  if (!saveMessage) {
    throw new ApiError("Message not saved", 400);
  }
  console.log("chat receiver", `chat-${receiver}`);
  const dta = await PUSHER_SERVER.trigger(`chat-${receiver}`, "message", {
    message,
    senderId: id,
    receiverId: receiver,
    senderName: saveMessage.sender.name,
    workspaceId,
  });
  console.log("dta>>", dta);

  return NextResponse.json(
    { status: "success", message: "", data: saveMessage },
    { status: 200 }
  );
});

export const GET = asyncHandler(async (req: NextRequest) => {
  const { id } = await getUser<UserType>();
  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get("workspaceId");
  const receiverId = searchParams.get("receiver");
  console.log("workspaceId", workspaceId);
  console.log("receiverId", receiverId);

  if (!workspaceId || !receiverId) {
    throw new ApiError("please provide required id!!");
  }

  const messages = await prisma.message.findMany({
    where: {
      workspace: {
        id: workspaceId as string,
      },
      OR: [
        {
          senderId: id,
          receiverId,
          type: "personalChat",
        },
        {
          senderId: receiverId as string,
          receiverId: id,
          type: "personalChat",
        },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      sender: {
        select: {
          name: true,
          id: true,
        },
      },
      receiver: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  if (messages.length < 1) {
    throw new ApiError("No message found", 404);
  }

  return NextResponse.json(
    {
      success: true,
      data: messages,
    },
    { status: 200 }
  );
});
