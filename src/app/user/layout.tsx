import React from "react";
import SideBtnView from "../workspace/[workspace]/_components/side-btn-view";
import Provider from "./_components/Provider";
import PublicCallPage from "./_components/call-page";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SideBtnView />
      <Provider>
        {children}
        <PublicCallPage />
      </Provider>
    </div>
  );
}
