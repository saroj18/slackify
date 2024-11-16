"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProjectCard() {
  const [workspace, setWorkspace] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    const getWorkspace = async () => {
      try {
        setLoading(true);
        const resp = await fetch("/api/workspace");
        const data = await resp.json();
        setWorkspace(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getWorkspace();
  }, []);

  return (
    <div className="mx-auto my-4 max-w-4xl rounded-lg bg-purple-50/95 p-6">
      <h1 className="mb-6 text-lg font-medium text-gray-900">
        Workspaces for {data && data.user.email}
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        workspace &&
        workspace.map((ws: any) => (
          <Card key={ws.id} className="border-0 shadow-sm">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded">
                  <div className="relative h-full w-full flex justify-center items-center">
                    <span className="text-5xl font-bold text-purple-500">
                      {ws.name[0].toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h2 className="font-semibold text-xl">{ws.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Avatar className="h-5 w-5 flex items-center justify-center">
                      <AvatarFallback className="bg-gray-200 text-[10px]">
                        M
                      </AvatarFallback>
                    </Avatar>
                    <span>{ws.channels.length} member</span>
                    <Avatar className="h-5 w-5 flex justify-center items-center">
                      <AvatarFallback className="bg-gray-200 text-[10px]">
                        #
                      </AvatarFallback>
                    </Avatar>
                    <span>{ws.channels.length} channels</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/workspace/${ws.id}`}>
                  <Button>LAUNCH SLACK</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
