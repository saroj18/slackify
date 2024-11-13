import { Input } from "@/components/ui/input";
import React from "react";
import { WorkSpaceProps } from "../page";

export default function WorkSpaceName({
  setWorkspace,
  workspace,
}: WorkSpaceProps) {
  return (
    <div className="max-w-2xl space-y-6 mx-auto w-full border-2 rounded-md shadow-md p-3">
      <h1 className="text-4xl font-bold">
        What’s the name of your company or team?
      </h1>
      <p>This will be the name of your Slackify workspace.</p>
      <Input
        value={workspace.workspaceName}
        onChange={(e) =>
          setWorkspace((prv) => ({ ...prv, workspaceName: e.target.value }))
        }
        className="h-[50px]"
        placeholder="Ex:Meeting"
      />
      <p className="text-red-500 text-sm">
        {!workspace.workspaceName && workspace.workspaceName.length < 5
          ? "workspace's name is required"
          : ""}
      </p>
    </div>
  );
}
