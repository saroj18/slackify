"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import env from "@/utils/env";
import { useSyncDemo } from "@tldraw/sync";
import { useSession } from "next-auth/react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useCall } from "../../_components/Provider";
import { EyeIcon, EyeOff } from "lucide-react";

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
    <div className={`tldraw__editor h-[700px] `}>
      <div className="flex gap-x-2 items-center">
        <Button onClick={shareHandler}>Copy Share Link</Button>
        <Button disabled={callState} onClick={() => setCallState(true)}>
          Start Call
        </Button>
        {callState &&
          (visible ? (
            <EyeOff
              className="cursor-pointer"
              onClick={() => setVisible(false)}
            />
          ) : (
            <EyeIcon
              className="cursor-pointer"
              onClick={() => setVisible(true)}
            />
          ))}
      </div>
      <Tldraw store={store} />
    </div>
  );
}
