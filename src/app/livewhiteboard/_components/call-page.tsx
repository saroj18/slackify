"use client";

import env from "@/utils/env";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { twMerge } from "tailwind-merge";

export default function CallPage({
  visible,
  setCallState,
  className,
  setLoading,
  loading
}: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  className?: string;
  visible: boolean;
  setCallState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [token, setToken] = useState<string>("");
  const { data } = useSession();
  const params = useSearchParams();
  const roomId = params.get("id") ?? data?.user.id;

  useEffect(() => {
    if (token) return;

    async function generateToken() {
      try {
        const response = await fetch("/api/calltoken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            app_id: env.ZEGOCLOUD_APP_ID as unknown as number,
            user_id: data?.user.id ?? "Guest",
            secret: env.ZEGOCLOUD_SECRETE,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to generate token: ${response.statusText}`);
        }

        const result = await response.json();
        setToken(result.token);
      } catch (error) {
        console.error("Error generating token:", error);
      }
    }

    generateToken();
  }, [roomId, env]);

  const myMeeting = useCallback(
    (element: HTMLDivElement | null) => {
      if (!loading) {
        setLoading(true);
      }
      if (element && token) {
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          env.ZEGOCLOUD_APP_ID as unknown as number,
          token,
          roomId as string,
          data?.user.id ?? "Guest",
          data?.user.name ?? "Guest"
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        //   zp.autoLeaveRoomWhenOnlySelfInRoom = true;

        zp.joinRoom({
          container: element,
          showPreJoinView: false,
          turnOnCameraWhenJoining: false,
          showMyCameraToggleButton: false,
          showAudioVideoSettingsButton: false,
          showScreenSharingButton: false,
          onLeaveRoom() {
            console.log("leave a room");
            zp.destroy();
            setToken("");
            setCallState(false);
            setLoading(false);
          },
          onJoinRoom() {
            setLoading(false);
          },

          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall,
          },
        });
      }
    },
    [token]
  );

  return (
    <Draggable defaultPosition={{ x: 700, y: 0 }}>
      <div
        style={{ visibility: visible ? "visible" : "hidden" }}
        className={twMerge("h-[10px] w-[10px] z-10 ", className)}
        ref={myMeeting}
      ></div>
    </Draggable>
  );
}
