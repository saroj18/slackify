"use client";

import React from "react";
import SideBar from "./side-bar";
import WhiteBoard from "@/app/_components/whiteboard/whiteboard";
import Navbar from "./nav-bar";

export default function WhiteBoardPage() {
  const [state, setState] = React.useState("WhiteBoard");
  return (
    <div className="flex w-full ">
      <SideBar />
      <div className="flex-grow p-3">
        <Navbar state={state} setState={setState} />
        <WhiteBoard />
      </div>
    </div>
  );
}
