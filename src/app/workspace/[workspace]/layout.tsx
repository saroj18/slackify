import React from "react";
import SideBtnView from "./_components/side-btn-view";

const WorkSpaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <SideBtnView />
      {children}
    </div>
  );
};

export default WorkSpaceLayout;
