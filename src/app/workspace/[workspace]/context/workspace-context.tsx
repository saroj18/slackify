"use client";

import React from "react";

type ContextType = {
  visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    callState: boolean;
    setCallState: React.Dispatch<React.SetStateAction<boolean>>;
};

const WorkspaceContext = React.createContext({});

export default function WorkspaceStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [callState, setCallState] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  return (
    <WorkspaceContext.Provider
      value={{
        setCallState,
        callState,
        visible,
        setVisible,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export const useWorkspaceContext = () => {
  if (!React.useContext(WorkspaceContext)) {
    throw new Error(
      "useWorkspaceContext must be used within a WorkspaceStateProvider"
    );
  }

  return React.useContext(WorkspaceContext) as ContextType;
};
