import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const WhiteBoardPage = dynamic(
  () => import("./_components/whiteboard-preview"),
  { ssr: false,loading: () => <p>loading...</p> }
);

export default function page() {
  return (
      <WhiteBoardPage />
  );
}
