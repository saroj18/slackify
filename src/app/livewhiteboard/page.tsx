import React, { Suspense } from "react";
import WhiteBoardPage from "./_components/whiteboard-preview";

export default function page() {
  return (
    <Suspense fallback={<p>loading</p>}>
      <WhiteBoardPage />
    </Suspense>
  );
}
