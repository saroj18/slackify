import { ApiError } from "@/helper/ApiError";
import { asyncHandler } from "@/helper/asyncHandler";
import { prisma } from "@/utils/prismaDb";
import { NextResponse } from "next/server";

export const GET = asyncHandler(async (req) => {
  const workspaceId = req.nextUrl.searchParams.get("workspaceId");
  const userId = req.nextUrl.pathname.split("/")[3];

  if (!workspaceId) {
    throw new ApiError("provide workspaceId");
  }

  if (!userId) {
    throw new ApiError("provid userId");
  }

  const findWorkspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
    },
  });

  if (!findWorkspace) {
    throw new ApiError("workspace not found");
  }

  const findExtingUser = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
      workspaceUsers: {
        some: {
          id: userId,
        },
      },
    },
  });

  if (findExtingUser) {
    throw new ApiError("user already exist");
  }

  console.log(userId);
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError("user not found");
  }

  const updateUser = await prisma.workspace.update({
    where: {
      id: workspaceId,
    },
    data: {
      workspaceUsers: {
        connect: {
          id: userId,
        },
      },
    },
  });

  if (!updateUser) {
    throw new ApiError("failed to update user");
  }

  return NextResponse.json(
    { success: true, message: "added successfully", data: updateUser },
    { status: 200 }
  );
});
