import { asyncHandler } from "@/helper/asyncHandler";
import { getUser, UserType } from "@/utils/checkUserOnServer";
import { prisma } from "@/utils/prismaDb";
import { NextResponse } from "next/server";

export const GET = asyncHandler(async (req) => {
  await getUser<UserType>();

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("id");

  if (!query) {
    throw new Error("Invalid channel id");
  }

  const channel = await prisma.channel.findUnique({
    where: {
      id: query,
    },
  });

  if (!channel) {
    throw new Error("Channel not found");
  }

  return NextResponse.json(
    { message: "", data: channel },
    { status: 200 }
  );
});
