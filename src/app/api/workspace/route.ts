import { asyncHandler } from "@/helper/asyncHandler";
import { getUser, UserType } from "@/utils/checkUserOnServer";
import { prisma } from "@/utils/prismaDb";
import { NextResponse } from "next/server";

export const GET = asyncHandler(async (req) => {
  const { id } = await getUser<UserType>();
  const workspace = await prisma.workspace.findMany({
    where: {
      OR: [
        {
          createdBy: id,
        },
        {
          workspaceUsers: {
            some: {
              id,
            },
          },
        },
      ],
    },
    include: {
      workspaceCreator: {
        select: {
          name: true,
          email: true,
        },
      },
      channels: {
        select: {
          id: true,
          name: true,
        },
      },
      workspaceUsers: true,
    },
  });

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  return NextResponse.json({ success: true, data: workspace }, { status: 200 });
});
