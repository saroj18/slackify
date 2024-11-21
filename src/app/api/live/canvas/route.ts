import { ApiError } from "@/helper/ApiError";
import { asyncHandler } from "@/helper/asyncHandler";
import { prisma } from "@/utils/prismaDb";
import { PUSHER_SERVER } from "@/utils/pusher";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req, { params }) => {
  const { newChanges, createdBy } = await req.json();

  if (!newChanges) {
    throw new ApiError("required newChanges!!");
  }

  if (!createdBy) {
    throw new ApiError("provide created user");
  }

  const findUser = await prisma.user.findFirst({
    where: {
      id: createdBy,
    },
  });

  if (!findUser) {
    throw new ApiError("user not found");
  }

  await PUSHER_SERVER.trigger(`public-canvas-${createdBy}`, "sent-canvas", {
    createdBy: findUser.id,
    newChanges,
  });

  return NextResponse.json({ message: "", success: true }, { status: 200 });
});

export const GET = asyncHandler(async (req) => {
  const createdBy = req.nextUrl.searchParams.get("userId");

  if (!createdBy) {
    throw new ApiError("provide userId first");
  }

  const findUser = await prisma.user.findFirst({
    where: {
      id: createdBy,
    },
  });

  if (!findUser) {
    throw new ApiError("user not found");
  }

  const findCanvas = await prisma.canvas.findFirst({
    where: {
      createdBy,
      isPublic: true,
    },
  });

  if (!findCanvas) {
    throw new ApiError("canvas not found");
  }

  return NextResponse.json({ data: findCanvas }, { status: 200 });
});
