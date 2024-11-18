import { asyncHandler } from "@/helper/asyncHandler";
import { getUser, UserType } from "@/utils/checkUserOnServer";
import { prisma } from "@/utils/prismaDb";
import { NextResponse } from "next/server";

export const GET = asyncHandler(async (req, { params }) => {
  const data = await getUser<UserType>();
  console.log(data);

  const id = params?.id;

  if (!id) {
    throw new Error("Invalid channel id");
  }

  const channel = await prisma.channel.findUnique({
    where: {
      id,
    },
    include: {
      workspace: {
        select: {
          id: true,
          createdBy: true,
        },
      },
    },
  });

  if (!channel) {
    throw new Error("Channel not found");
  }

  return NextResponse.json({ message: "", data: channel }, { status: 200 });
});
