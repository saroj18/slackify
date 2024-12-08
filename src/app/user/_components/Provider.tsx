"use client";

import React from "react";

type CallContextType = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  callState: boolean;
    setCallState: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CallContext = React.createContext<CallContextType | null>(null);

export default function Provider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = React.useState(true);
    const [callState, setCallState] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
  return (
    <CallContext.Provider
      value={{ visible, setVisible, callState, setCallState, loading, setLoading }}
    >
      {children}
    </CallContext.Provider>
  );
}

export const useCall = () => {
  const context = React.useContext(CallContext);
  if (!context) {
    throw new Error("useCallbackContext must be used within a CallProvider");
  }
  return context;
};
