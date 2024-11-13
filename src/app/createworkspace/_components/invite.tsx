import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { WorkSpaceProps } from "../page";

export default function Invite({ workspace, setWorkspace }: WorkSpaceProps) {
  return (
    <div className="max-w-2xl space-y-6 mx-auto w-full border-2 rounded-md shadow-md p-3">
      <h1 className="text-4xl font-bold">Who else is on the sdd team?</h1>
      <p>Add coworker by email</p>
      <Textarea
        value={workspace.users}
        onChange={(e) =>
          setWorkspace((prv) => ({ ...prv, users: e.target.value }))
        }
      />
      <p className="text-red-500 text-sm">
        {!workspace.users && workspace.users.length < 5
          ? "user's name is required"
          : ""}
      </p>
    </div>
  );
}
