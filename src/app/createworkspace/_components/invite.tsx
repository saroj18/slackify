import { Textarea } from "@/components/ui/textarea";
import React, { useEffect } from "react";
import { WorkSpaceProps } from "../page";

export default function Invite({ workspace, setWorkspace }: WorkSpaceProps) {
  const [email, setEmail] = React.useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (email) {
      const emailList = email.split(",");
      const filterEmail = emailList.filter((user) => user != "");
      console.log(filterEmail);
      setWorkspace((prv) => ({
        ...prv,
        users: filterEmail,
      }));
    }
  }, [email]);

  return (
    <div className="max-w-2xl space-y-4 mx-auto w-full border-2 rounded-md shadow-md p-3">
      <h1 className="text-4xl font-bold">Who else is on the sdd team?</h1>
      <p>Add coworker by email.use comma(,) for seperate a email</p>
      <Textarea value={workspace.users} onChange={changeHandler} />
    </div>
  );
}
