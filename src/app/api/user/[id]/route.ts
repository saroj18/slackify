import { ApiError } from "@/helper/ApiError";
import { asyncHandler } from "@/helper/asyncHandler";
import { prisma } from "@/utils/prismaDb";
import { NextResponse } from "next/server";

export const GET = asyncHandler(async (req, { params }) => {
  const userId = params?.id;

  if (!userId) {
    throw new ApiError("provide userId");
  }

  const findUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new ApiError("user not found");
  }

  return NextResponse.json(
    {
      success: true,
      message: "",
      data: findUser,
    },
    {
      status: 200,
    }
  );
});
