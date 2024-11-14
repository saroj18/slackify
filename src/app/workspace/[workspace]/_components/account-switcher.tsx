import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Bell } from "lucide-react";

export default function AccountSwitch() {
  return (
    <Card className="mx-auto max-w-xl  bg-slate-800 text-slate-200">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Current Workspace */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-purple-600 font-semibold">
              S
            </div>
            <div>
              <div className="font-medium">sdd</div>
              <div className="text-sm text-slate-400">
                sdd-w5e1786.slack.com
              </div>
            </div>
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
            <div className="flex items-center gap-3 rounded p-2 hover:bg-slate-700/50 cursor-pointer">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-emerald-600 font-semibold">
                LS
              </div>
              <div>
                <div className="font-medium">learn something</div>
                <div className="text-sm text-slate-400">
                  learn-something-talk.slack.com
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded p-2 hover:bg-slate-700/50 cursor-pointer">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-blue-600 font-semibold">
                NW
              </div>
              <div>
                <div className="font-medium">New Workspace</div>
                <div className="text-sm text-slate-400">
                  newworkspace-fzf2453.slack.com
                </div>
              </div>
            </div>
          </div>

          {/* Add Workspace Button */}
          <Button
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
