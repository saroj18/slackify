"use client";

import React, { useState } from "react";
import WorkSpaceName from "./_components/workspace-name";
import { Button } from "@/components/ui/button";
import YourName from "./_components/your-name";
import Invite from "./_components/invite";
import ProjectName from "./_components/project-name";
import { useRouter } from "next/navigation";

export default function page() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const stepHandler = (param: string) => {
    if (param === "next") {
      if (step < 4) {
        setStep(step + 1);
      }
    }
    if (param === "prv") {
      if (step > 1) {
        setStep(step - 1);
      }
    }
    if (param == "finish") {
      router.push("/workspace");
    }
  };
  return (
    <div className="bg-secondary h-screen flex flex-col justify-center items-center">
      <p>Step {step} of 4</p>
      {step == 1 && <WorkSpaceName />}
      {step == 2 && <YourName />}
      {step == 3 && <Invite />}
      {step == 4 && <ProjectName />}

      <div className="flex gap-x-5 items-center">
        {step > 1 && (
          <Button onClick={() => stepHandler("prv")} className="my-5">
            Prv
          </Button>
        )}
        {step < 4 && (
          <Button onClick={() => stepHandler("next")} className="my-5">
            Next
          </Button>
        )}
        {step == 4 && (
          <Button onClick={() => stepHandler("finish")} className="my-5">
            Finished
          </Button>
        )}
      </div>
    </div>
  );
}
