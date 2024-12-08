import React from "react";
import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="animate-pulse">
          <Loader2
            className="h-16 w-16 text-blue-500 animate-spin"
            strokeWidth={1.5}
          />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white drop-shadow-lg">
            Creating Workspace
          </h2>
          <p className="text-lg text-gray-200 mt-2 animate-pulse">
            Please wait while we set up your environment...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
