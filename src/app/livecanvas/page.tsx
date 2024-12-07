import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const LiveCanvasPreviewPage=dynamic(()=>import("./_components/canvas-page"),{ssr:false,loading:()=><p>loading...</p>});

export default function page() {
  return (
      <LiveCanvasPreviewPage />
  );
}
