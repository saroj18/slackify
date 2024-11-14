import { ApiError } from "@/helper/ApiError";
import { asyncHandler } from "@/helper/asyncHandler";
import { authOptions } from "@/utils/authOptions";
import { getUser, UserType } from "@/utils/checkUserOnServer";
import { prisma } from "@/utils/prismaDb";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req) => {
  await getUser<UserType>();

  const { name, workspaceId } = await req.json();

  if (!name || !workspaceId) {
    throw new ApiError("Invalid channel name or workspace id", 400);
  }

  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
    },
  });

  if (!workspace) {
    throw new ApiError("Workspace not found", 404);
  }

  const checkDuplicateChannel = await prisma.channel.findFirst({
    where: {
      name,
      workspaceId,
    },
  });

  if (checkDuplicateChannel) {
    throw new ApiError("Channel already exists", 400);
  }

  const channel = await prisma.channel.create({
      data: {
      name,
      workspaceId,
      },
      
  });

  if (!channel) {
    throw new ApiError("Channel creation failed", 400);
  }

  return NextResponse.json(
    {
      success: true,
      message: "Channel created successfully",
      data: channel,
    },
    {
      status: 201,
    }
  );
});

export const GET = asyncHandler(async (req) => {
  const { id } = await getUser<UserType>();

  const channels = await prisma.channel.findMany({
      where: {
        workspace: {
          createdBy: id,
        },
      },
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
      },
  });

  if (!channels) {
    throw new ApiError("Channels not found", 404);
  }

  return NextResponse.json(
    {
      success: true,
      data: channels,
    },
    {
      status: 200,
    }
  );
});
