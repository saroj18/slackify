import { ApiError } from "@/helper/ApiError";
import { asyncHandler } from "@/helper/asyncHandler";
import { prisma } from "@/utils/prismaDb";
import { NextResponse } from "next/server";

export const GET = asyncHandler(async (req) => {
  const workspaceId = req.nextUrl.pathname.split("/")[3];

  if (!workspaceId) {
    throw new ApiError("provide workspaceId");
  }

  const findWorkspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
    },
  });

  if (!findWorkspace) {
    throw new ApiError("workspace not found");
  }

  const findUser = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
    },
    include: {
      workspaceUsers: true,
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
