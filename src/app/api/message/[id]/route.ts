import { ApiError } from "@/helper/ApiError";
import { asyncHandler } from "@/helper/asyncHandler";
import { prisma } from "@/utils/prismaDb";
import { NextResponse } from "next/server";

export const GET = asyncHandler(async (req, { params }) => {
  const channelId = params?.id;

  if (!channelId) {
    throw new ApiError("provide channelId");
  }

  const channel = await prisma.channel.findFirst({
    where: {
      id: channelId,
    },
  });

  if (!channel) {
    throw new ApiError("channel not found");
  }

  const messages = await prisma.message.findMany({
    where: {
      channelId,
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
    },
  });

  if (messages.length < 1) {
    throw new ApiError("no message found");
  }

  return NextResponse.json(
    {
      success: true,
      data: messages,
    },
    { status: 200 }
  );
});
