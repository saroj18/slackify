import { Input } from "@/components/ui/input";
import React from "react";
import { WorkSpaceProps } from "../page";

export default function YourName({ workspace, setWorkspace }: WorkSpaceProps) {
  return (
    <div className="max-w-2xl space-y-6 mx-auto w-full border-2 rounded-md shadow-md p-3">
      <h1 className="text-4xl font-bold">What’s your name?</h1>
      <p>Help your teammates recognize and connect with you more easily.</p>
      <Input
        value={workspace.creatorName}
        onChange={(e) =>
          setWorkspace((prv) => ({ ...prv, creatorName: e.target.value }))
        }
        className="h-[50px]"
        placeholder="Saroj Aryal"
      />
      <p className="text-red-500 text-sm">
        {!workspace.creatorName && workspace.creatorName.length < 5
          ? "workspace creator's name is required"
          : ""}
      </p>
    </div>
  );
}
