"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import env from "@/utils/env";
import { useSyncDemo } from "@tldraw/sync";
import { useSession } from "next-auth/react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

export default function WhiteBoardPage() {
  const { data } = useSession();
  const store = useSyncDemo({ roomId: `whiteboard-${data?.user.id}` });
  const { toast } = useToast();

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
      <Button className="my-2" onClick={shareHandler}>
        Copy Share Link
      </Button>
      <Tldraw store={store} />
    </div>
  );
}
