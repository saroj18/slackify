import { Input } from "@/components/ui/input";
import React from "react";

export default function WorkSpaceName() {
  return (
    <div className="max-w-2xl space-y-6 mx-auto w-full border-2 rounded-md shadow-md p-3">
      <h1 className="text-5xl font-bold">
        What’s the name of your company or team?
      </h1>
      <p>This will be the name of your Slack workspace.</p>
      <Input className="h-[50px]" placeholder="Ex:Meeting" />
    </div>
  );
}
