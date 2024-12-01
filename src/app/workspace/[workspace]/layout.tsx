import React from "react";
import SideBtnView from "./_components/side-btn-view";
import HomeSideBar from "./_components/home-sidebar";
import WorkspaceStateProvider from "./context/workspace-context";

const WorkSpaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WorkspaceStateProvider>
      <div className="flex">
        {/* <SideBtnView /> */}
        <HomeSideBar />
        {children}
      </div>
    </WorkspaceStateProvider>
  );
};

export default WorkSpaceLayout;
