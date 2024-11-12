"use client";

import useLocalStorage from "@/hooks/use-local-storage";
import React, { createContext} from "react";

export const AppContext = createContext<{
  font: string;
  setFont: (value: string) => void;
}>({
  font: "Default",
  setFont: () => {},
});

export default function EditorProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [font, setFont] = useLocalStorage<string>("novel__font", "Default");
  return (
    <AppContext.Provider
      value={{
        font,
        setFont,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
