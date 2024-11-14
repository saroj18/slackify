import { asyncHandler } from "@/helper/asyncHandler";
import { sendMail } from "@/helper/mailConfig";
import { InviteMessage } from "@/lib/invition-message";
import env from "@/utils/env";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest) => {
  const { userList, workspaceId } = await req.json();

  if (userList.length === 0) {
    return NextResponse.json(
      { status: "error", message: "No email provided" },
      { status: 400 }
    );
  }

  if (!workspaceId) {
    return NextResponse.json(
      { status: "error", message: "No workspace id provided" },
      { status: 400 }
    );
  }
  const link = `${env.NEXT_PUBLIC_API_URL}/invite?workspaceId=${workspaceId}`;
  const data = await sendMail(
    userList,
    "Invitation to join workspace",
    InviteMessage(link)
  );
  console.log(data);

  return NextResponse.json(
    { status: "success", message: "Invitation sent successfully" },
    { status: 200 }
  );
});
