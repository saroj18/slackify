import React from "react";
import SideBtnView from "./_components/side-btn-view";
import HomeSideBar from "./_components/home-sidebar";

const WorkSpaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      {/* <SideBtnView /> */}
      <HomeSideBar />
      {children}
    </div>
  );
};

export default WorkSpaceLayout;
