import { Input } from "@/components/ui/input";
import React from "react";

export default function YourName() {
  return (
    <div className="max-w-2xl space-y-6 mx-auto w-full border-2 rounded-md shadow-md p-3">
      <h1 className="text-5xl font-bold">What’s your name?</h1>
      <p>Help your teammates recognize and connect with you more easily.</p>
      <Input className="h-[50px]" placeholder="Saroj Aryal" />
    </div>
  );
}
