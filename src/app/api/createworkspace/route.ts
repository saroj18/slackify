import { ApiError } from "@/helper/ApiError";
import { asyncHandler } from "@/helper/asyncHandler";
import { WorkSpaceZodSchema } from "@/schema/workspace";
import { authOptions } from "@/utils/authOptions";
import { getUser, UserType } from "@/utils/checkUserOnServer";
import { prisma } from "@/utils/prismaDb";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest) => {
  const { id } = await getUser<UserType>();

  const { workspaceName, creatorName, users, projectName } = await req.json();

  const validator = WorkSpaceZodSchema.parse({
    workspaceName,
    creatorName,
    users,
    projectName,
  });

  const workspace = await prisma.workspace.findFirst({
    where: {
      name: validator.workspaceName,
    },
  });

  if (workspace) {
    throw new ApiError("Workspace already exists", 400);
  }

  const newWorkspace = await prisma.workspace.create({
    data: {
      name: validator.workspaceName,
      adminName: validator.creatorName,
      users: validator.users,
      projectName: validator.projectName,
      createdBy: id,
    },
  });

  await prisma.channel.create({
    data: {
      name: "general",
      workspaceId: newWorkspace.id,
    },
  });

  if (!newWorkspace) {
    throw new ApiError("Workspace creation failed", 400);
  }

  return NextResponse.json(
    {
      success: true,
      message: "Workspace created successfully",
      data: newWorkspace,
    },
    {
      status: 201,
    }
  );
});
