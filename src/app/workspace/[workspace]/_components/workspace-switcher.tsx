import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useLocalStorage from "@/hooks/use-local-storage";
import { Plus, Bell, Trash } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function WorkSpaceSwitcher() {
  const [workspace, setWorkspace] = useState<any>(null);
  const [currentWorkspace, setCurrentWorkspace] = useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const id = useParams();

  useEffect(() => {
    const getIWorkSpace = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/workspace/");
        const data = await res.json();

        setWorkspace(data.data);

        const current = data.data.find((ws: any) => ws.id === id.workspace);

        setCurrentWorkspace(current);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getIWorkSpace();
  }, []);

  const deleteWorkspaceHandler = async (id: string) => {
    try {
      const resp = await fetch("/api/workspace/" + id, {
        method: "DELETE",
      });
      const respData = await resp.json();
      if (respData?.success) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(currentWorkspace);
  return (
    <Card className="mx-auto max-w-xl  bg-slate-800 text-slate-200">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Current Workspace */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-purple-600 font-semibold">
              {currentWorkspace?.name[0]?.toUpperCase()}
            </div>
            {loading ? (
              <p>loading</p>
            ) : (
              <div>
                <div className="font-medium">{currentWorkspace?.name}</div>
                <div className="text-sm text-slate-400">
                  -{currentWorkspace?.id}
                </div>
              </div>
            )}
          </div>

          {/* Notification Banner */}
          <div className="rounded-md bg-slate-700/50 p-3">
            <h3 className="flex items-center gap-2 font-medium">
              <Bell className="h-4 w-4" />
              Never miss a notification
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              <span className="text-blue-400 hover:underline cursor-pointer">
                Get the Slack app
              </span>{" "}
              to see notifications from your other workspaces
            </p>
          </div>

          {/* Other Workspaces */}
          <div className="space-y-2">
            {loading ? (
              <p>loading....</p>
            ) : (
              workspace?.length > 0 &&
              workspace.map((ws: any) => {
                return (
                  <div
                    onClick={() => {
                      setCurrentWorkspace(ws);
                    }}
                    key={ws.id}
                    className="flex items-center justify-between "
                  >
                    <Link
                      href={`/workspace/${ws.id}`}
                      className="flex gap-3 cursor-pointer"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded bg-purple-600 font-semibold">
                        {ws.name[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{ws.name}</div>
                        <div className="text-sm text-slate-400">-{ws.id}</div>
                      </div>
                    </Link>
                    <Trash
                      onClick={() => deleteWorkspaceHandler(ws.id)}
                      className=" text-slate-400 cursor-pointer"
                    />
                  </div>
                );
              })
            )}
          </div>

          {/* Add Workspace Button */}
          <Button
            onClick={() => router.push("/createworkspace")}
            variant="ghost"
            className="w-full justify-start gap-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
          >
            <Plus className="h-5 w-5" />
            Add a workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
