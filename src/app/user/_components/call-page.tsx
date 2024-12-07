"use client";

import CallPage from "@/app/livewhiteboard/_components/call-page";
import React from "react";
import { useCall } from "./Provider";

export default function PublicCallPage() {
  const { visible, callState, setCallState } = useCall();
  return (
    <div className="absolute top-0 left-0 z-10">
      {callState && <CallPage setCallState={setCallState} visible={visible} />}
    </div>
  );
}
