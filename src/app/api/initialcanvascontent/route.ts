import { asyncHandler } from "@/helper/asyncHandler";
import { PUSHER_SERVER } from "@/utils/pusher";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req) => {
  const { initialContent, workspaceId, channelId } = await req.json();

  PUSHER_SERVER.trigger(`channel-canvas-${channelId}`, "sent-canvas", {
    initialContent,
    channelId,
    workspaceId,
  });

  return NextResponse.json({ success: true }, { status: 200 });
});
