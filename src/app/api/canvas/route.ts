import { asyncHandler } from "@/helper/asyncHandler";
import { prisma } from "@/utils/prismaDb";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req) => {
  const { initialContent, workspaceId, channelId } = await req.json();

  if (!workspaceId) {
    throw new Error("workspaceId is required");
  }

  if (!channelId) {
    throw new Error("channelId is required");
  }

  if (initialContent?.content.length === 0) {
    throw new Error("initialContent is required");
  }

  const findCanvas = await prisma.canvas.findFirst({
    where: {
      channelId: channelId,
    },
  });
  console.log("findCanvas>>", findCanvas);


  if (findCanvas) {
    const update = await prisma.canvas.update({
      where: {
        id: findCanvas.id,
      },
      data: {
        content: initialContent,
      },
    });

    if (!update) {
      throw new Error("Error in updating data");
    }
    return NextResponse.json(
      { message: "Data update successfully", success: true },
      { status: 200 }
    );
  }

  const createCanvas = await prisma.canvas.create({
    data: {
      channelId: channelId,
      content: initialContent,
      workspaceId: workspaceId,
    },
  });
  console.log("createCanvas>>", createCanvas);

  if (!createCanvas) {
    throw new Error("Error in saving data");
  }

  return NextResponse.json(
    { message: "Data saved successfully", success: true },
    { status: 200 }
  );
});
