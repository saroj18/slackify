"use client";

import env from "@/utils/env";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import Draggable from "react-draggable";

type CallPageProps = {
  visible: boolean;
  setCallState: React.Dispatch<React.SetStateAction<boolean>>;
  callState?: boolean;
  roomId: string;
};

export default function CallPage({
  visible,
  setCallState,
  roomId,
}: CallPageProps) {
  const { data } = useSession();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (!data?.user || token) return;

    async function generateToken() {
      try {
        const response = await fetch("/api/calltoken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            app_id: env.ZEGOCLOUD_APP_ID as unknown as number,
            user_id: data?.user.id,
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
  }, [data, env]);

  const myMeeting = useCallback(
    (element: HTMLDivElement | null) => {
      if (element && token) {
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          env.ZEGOCLOUD_APP_ID as unknown as number,
          token,
          roomId,
          data?.user.id as string,
          data?.user.name || "Guest"
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
          },
          sharedLinks: [
            {
              name: "Personal link",
              url:
                window.location.origin +
                window.location.pathname +
                "?roomID=" +
                roomId,
            },
          ],
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
        className="h-[10px] w-[10px] z-10 "
        ref={myMeeting}
      ></div>
    </Draggable>
  );
}
