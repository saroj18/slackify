import React from "react";
import HomeSideBar from "../../_components/home-sidebar";

export default function ChannelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      {/* <HomeSideBar /> */}
      {children}
    </div>
  );
}
