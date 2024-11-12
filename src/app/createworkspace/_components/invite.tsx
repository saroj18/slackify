import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function Invite() {
  return (
    <div className="max-w-2xl space-y-6 mx-auto w-full border-2 rounded-md shadow-md p-3">
      <h1 className="text-5xl font-bold">Who else is on the sdd team?</h1>
      <p>Add coworker by email</p>
      <Textarea />
    </div>
  );
}
