import React from "react";
import HomeSideBar from "./_components/home-sidebar";
import HomePage from "./_components/home-page";

export default function Page() {
  return (
    <div className="flex w-full border-2 border-red-500">
      <HomeSideBar />
      <HomePage />
    </div>
  );
}
