"use client";

import { Button } from "@/components/ui/button";
import { Request } from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";

// Separate the logic dependent on useSearchParams
function InviteHandler() {
  const params = useSearchParams();
  const workspaceId = params.get("workspaceId");
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!data && status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [data, status]);

  const clickHandler = async () => {
    await Request.get(`api/invite/${data?.user.id}?workspaceId=${workspaceId}`);
  };

  return (
    <div className="w-full">
      <Button onClick={clickHandler} className="w-fit mx-auto">
        Accept Invitation
      </Button>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <InviteHandler />
    </Suspense>
  );
}
