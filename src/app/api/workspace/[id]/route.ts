import { asyncHandler } from "@/helper/asyncHandler";
import { prisma } from "@/utils/prismaDb";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest, { params }) => {
  // const id = req.nextUrl.pathname.split("/")[3];
  const id = params?.id;
  console.log(id);

  if (!id) {
    throw new Error("Invalid workspace id");
  }

  const workspace = await prisma.workspace.findUnique({
    where: {
      id,
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
    },
  });

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  return NextResponse.json({ success: true, data: workspace }, { status: 200 });
});

export const DELETE = asyncHandler(async (req: NextRequest, { params }) => {
  const id = params?.id;
  console.log(id);

  if (!id) {
    throw new Error("Invalid workspace id");
  }

  const workspace = await prisma.workspace.delete({
    where: {
      id,
    },
  });

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  return NextResponse.json(
    {
      success: true,
      data: workspace,
      messssage: "workspace deleted successfully",
    },
    { status: 200 }
  );
});
