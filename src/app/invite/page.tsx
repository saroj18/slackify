"use client";

import { useToast } from "@/hooks/use-toast";
import { Request } from "@/utils/axios";
import { Check } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";

// Separate the logic dependent on useSearchParams
function InviteHandler() {
  const params = useSearchParams();
  const workspaceId = params.get("workspaceId");
  const { data, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!data && status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [data, status]);

  const clickHandler = async () => {
    const resp = await fetch(
      `api/invite/${data?.user.id}?workspaceId=${workspaceId}`
    );
    if (resp.status === 200) {
      router.push("/");
    }
    if (resp.status === 500) {
      console.log("You are already accept this invitation");
      toast({
        title: "Error",
        description: "You are already accept this invitation",
      });
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl border border-gray-200 p-8 max-w-md w-full space-y-6 transform transition-all duration-300 hover:scale-105">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
            Invitation
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            You've been invited to join an exclusive workspace
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Workspace Details
            </h2>
            <p className="text-gray-500">
              Collaborative platform for team productivity and innovation
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={clickHandler}
              className="flex-1 bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Check className="w-6 h-6" />
              <span>Accept Invitation</span>
            </button>
          </div>
        </div>
      </div>
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
