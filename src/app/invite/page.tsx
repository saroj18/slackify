"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const { data, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const workspaceId = params.get("workspaceId");
  console.log(workspaceId);

  useEffect(() => {
    console.log(status);
    if (!data && status == "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [data]);

  const clickHandler = async () => {
    await fetch(`api/invite/${data?.user.id}?workspaceId=${workspaceId}`);
  };

  return (
    <div className="w-full">
      <Button onClick={clickHandler} className="w-fit mx-auto">
        Accept Invition
      </Button>
    </div>
  );
}
