import React from "react";
import HomePage from "./_components/home-page";
import HomeSideBar from "./_components/home-sidebar";

export default function Page() {
  return (
    <div className="flex w-full">
      <HomeSideBar />
      <HomePage />
    </div>
  );
}