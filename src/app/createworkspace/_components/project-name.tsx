import { Input } from "@/components/ui/input";
import React from "react";
import { WorkSpaceProps } from "../page";

export default function ProjectName({
  workspace,
  setWorkspace,
}: WorkSpaceProps) {
  return (
    <div className="max-w-2xl space-y-6 mx-auto w-full border-2 rounded-md shadow-md p-3">
      <h1 className="text-4xl font-bold">
        What’s your team working on right now?
      </h1>
      <p>
        This name will be the first thing your team sees in reference to your
        template.
      </p>
      <Input
        value={workspace.projectName}
        onChange={(e) =>
          setWorkspace((prv) => ({ ...prv, projectName: e.target.value }))
        }
        className="h-[50px]"
        placeholder="Ex:Meeting"
      />
      <p className="text-red-500 text-sm">
        {!workspace.projectName && workspace.projectName.length < 5
          ? "project's name is required"
          : ""}
      </p>
    </div>
  );
}
