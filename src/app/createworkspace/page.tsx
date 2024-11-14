"use client";

import React, { useState } from "react";
import WorkSpaceName from "./_components/workspace-name";
import { Button } from "@/components/ui/button";
import YourName from "./_components/your-name";
import Invite from "./_components/invite";
import ProjectName from "./_components/project-name";
import { useRouter } from "next/navigation";

type WorkSpace = {
  workspaceName: string;
  creatorName: string;
  users: string;
  projectName: string;
};

export type WorkSpaceProps = {
  workspace: WorkSpace;
  setWorkspace: React.Dispatch<React.SetStateAction<WorkSpace>>;
};

export default function page() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [workspace, setWorkspace] = useState({
    workspaceName: "",
    creatorName: "",
    users: "",
    projectName: "",
  });

  const stepHandler = async (param: string) => {
    console.log("demo");
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
      if (
        !workspace.workspaceName ||
        !workspace.creatorName ||
        !workspace.users ||
        !workspace.projectName
      ) {
        alert("Please fill all the fields");
        return null;
      } else {
        const res = await fetch("/api/createworkspace", {
          method: "POST",
          body: JSON.stringify(workspace),
        });
        const respData = await res.json();
        console.log(respData);
        if (respData.success) {
          const newWorkspace = respData.data;
          router.push(`/workspace/${newWorkspace.id}`);
        }
      }
    }
  };

  console.log(workspace);
  return (
    <div className="bg-secondary h-screen flex flex-col justify-center items-center">
      <p>Step {step} of 4</p>
      {step == 1 && (
        <WorkSpaceName setWorkspace={setWorkspace} workspace={workspace} />
      )}
      {step == 2 && (
        <YourName setWorkspace={setWorkspace} workspace={workspace} />
      )}
      {step == 3 && (
        <Invite setWorkspace={setWorkspace} workspace={workspace} />
      )}
      {step == 4 && (
        <ProjectName setWorkspace={setWorkspace} workspace={workspace} />
      )}

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
