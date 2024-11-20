import { ApiError } from "@/helper/ApiError";
import { asyncHandler } from "@/helper/asyncHandler";
import { prisma } from "@/utils/prismaDb";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req, { params }) => {
  const userId = params && params.userId;
  const { initialContent } = await req.json();

  if (!userId) {
    throw new ApiError("provide userId first");
  }

  const findUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new ApiError("user not found");
  }

  const findCanvas = await prisma.canvas.findFirst({
    where: {
      createdBy: userId,
    },
  });

  if (findCanvas) {
    await prisma.canvas.update({
      where: {
        createdBy: userId,
      },
      data: {
        content: initialContent,
      },
    });

    return NextResponse.json(
      {
        message: "canvas update successfully",
        data: findCanvas,
        success: true,
      },
      { status: 200 }
    );
  }

  const savecanvas = await prisma.canvas.create({
    data: {
      content: initialContent,
      createdBy: userId,
    },
  });

  if (!savecanvas) {
    throw new ApiError("failed to save canvas");
  }

  return NextResponse.json(
    { message: "canvas save successfully", data: savecanvas, success: true },
    { status: 200 }
  );
});
