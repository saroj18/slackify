import { asyncHandler } from "@/helper/asyncHandler";
import { PUSHER_SERVER } from "@/utils/pusher";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req) => {
  const { socket_id, channel_name } = await req.json();

  const authResponse = PUSHER_SERVER.authenticateUser(socket_id, channel_name);

  return NextResponse.json(authResponse, { status: 200 });
});
