import React from "react";
import SideBtnView from "../workspace/[workspace]/_components/side-btn-view";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SideBtnView />
      {children}
    </div>
  );
}
