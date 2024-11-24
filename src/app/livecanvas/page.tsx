import React, { Suspense } from "react";
import LiveCanvasPreviewPage from "./_components/canvas-page";

export default function page() {
  return (
    <Suspense fallback={<p>loading</p>}>
      <LiveCanvasPreviewPage />
    </Suspense>
  );
}
