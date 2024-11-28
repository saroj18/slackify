import { ApiError } from "@/helper/ApiError";
import { asyncHandler } from "@/helper/asyncHandler";
import { getUser, UserType } from "@/utils/checkUserOnServer";
import { prisma } from "@/utils/prismaDb";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req, { params }) => {
  const receiver = params?.id;
  const { initialContent, workspaceId } = await req.json();
  const { id } = await getUser<UserType>();
  console.log("user", id);

  if (!workspaceId) {
    throw new ApiError("workspaceId is required");
  }

  if (!receiver) {
    throw new ApiError("receiverId is required");
  }

  if (initialContent?.content.length === 0) {
    throw new ApiError("initialContent is required");
  }

  const findReceiver = await prisma.user.findFirst({
    where: {
      id: receiver,
    },
  });

  if (!findReceiver) {
    throw new ApiError("receiver not found");
  }

  const findCanvas = await prisma.canvas.findFirst({
    where: {
      createdBy: id,
      workspaceId,
    },
  });
  console.log("findCanvas", findCanvas);

  if (findCanvas) {
    const updateCanvas = await prisma.canvas.update({
      where: {
        id: findCanvas.id,
        receiver,
      },
      data: {
        content: initialContent,
        isPublic: false,
      },
    });

    if (!updateCanvas) {
      throw new ApiError("failed to update canvas");
    }

    return NextResponse.json(
      {
        message: "canvas update successfully",
        data: updateCanvas,
        success: true,
      },
      { status: 200 }
    );
  }

  const createCanvas = await prisma.canvas.create({
    data: {
      content: initialContent,
      workspaceId: workspaceId,
      createdBy: id,
      receiver,
      isPublic: false,
    },
  });

  if (!createCanvas) {
    throw new Error("Error in saving data");
  }

  return NextResponse.json(
    { message: "Data saved successfully", success: true },
    { status: 200 }
  );
});

export const GET = asyncHandler(async (req, { params }) => {
  const canvasCreator = params?.id;
  const workspace = req.nextUrl.searchParams.get("workspace");
  const receiver = req.nextUrl.searchParams.get("receiver");

  console.log(req.nextUrl.searchParams);

  if (!canvasCreator) {
    throw new ApiError("provide canvasCreator id first");
  }

  const creator = await prisma.user.findFirst({
    where: {
      id: canvasCreator,
    },
  });

  if (!creator) {
    throw new ApiError("canvasCreator not found");
  }

  const findCanvas = await prisma.canvas.findFirst({
    where: {
      createdBy: canvasCreator,
      workspaceId: workspace,
      receiver,
      isPublic: false,
    },
  });

  if (!findCanvas) {
    throw new ApiError("canvas not found");
  }

  return NextResponse.json({ data: findCanvas }, { status: 200 });
});
