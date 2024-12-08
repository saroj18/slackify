"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import env from "@/utils/env";
import { useSyncDemo } from "@tldraw/sync";
import { useSession } from "next-auth/react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useCall } from "../../_components/Provider";
import { Clipboard, EyeIcon, EyeOff, PhoneCall } from "lucide-react";

export default function WhiteBoardPage() {
  const { data } = useSession();
  const store = useSyncDemo({ roomId: `whiteboard-${data?.user.id}` });
  const { toast } = useToast();
  const { callState, setCallState, visible, setVisible } = useCall();

  const shareHandler = () => {
    // const url = `${env.NEXT_PUBLIC_API_URL}/api/publiccanvas/initialcanvas/?id=${data?.user.id}`;
    const url = `${env.NEXT_PUBLIC_API_URL}/livewhiteboard/?id=${data?.user.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied",
        description: "Link copied to clipboard",
      });
    }
  };

  return (
    <div className={`tldraw__editor h-full `}>
      <div className="flex gap-x-2 items-center">
        <Clipboard
          strokeWidth={1.5}
          onClick={shareHandler}
          className="absolute cursor-pointer left-[25%] top-2 z-30 opacity-50 "
        />
        {!callState && (
          <PhoneCall
            strokeWidth={1.5}
            onClick={() => setCallState(true)}
            className="absolute cursor-pointer left-[28%] top-2 z-30 opacity-50 "
          />
        )}
        {callState &&
          (visible ? (
            <EyeOff
              strokeWidth={1.5}
              className="cursor-pointer absolute left-[28%] top-2 z-30 opacity-50"
              onClick={() => setVisible(false)}
            />
          ) : (
            <EyeIcon
              strokeWidth={1.5}
              className="cursor-pointer absolute left-[28%] top-2 z-30 opacity-50"
              onClick={() => setVisible(true)}
            />
          ))}
      </div>
      <Tldraw store={store} />
    </div>
  );
}
