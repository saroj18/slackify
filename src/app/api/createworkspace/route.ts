import { ApiError } from "@/helper/ApiError";
import { asyncHandler } from "@/helper/asyncHandler";
import { sendMail } from "@/helper/mailConfig";
import { InviteMessage } from "@/lib/invition-message";
import { WorkSpaceZodSchema } from "@/schema/workspace";
import { getUser, UserType } from "@/utils/checkUserOnServer";
import env from "@/utils/env";
import { prisma } from "@/utils/prismaDb";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest) => {
  const { id, email, name } = await getUser<UserType>();

  let { workspaceName, creatorName, users, projectName } = await req.json();
  users = Array.isArray(users) ? users : [users];

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
      projectName: validator.projectName,
      createdBy: id,
      workspaceUsers: {
        connect: {
          id,
        },
      },
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

  const link = `${env.NEXT_PUBLIC_API_URL}/invite?workspaceId=${newWorkspace.id}`;
  const data = await sendMail(
    users,
    "Invitation to join workspace",
    InviteMessage(link)
  );

  if (!data) {
    throw new ApiError("Email sending failed", 400);
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
