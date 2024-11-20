"use client";

import { useSyncDemo } from "@tldraw/sync";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Tldraw, TLUiComponents, useEditor } from "tldraw";
import "tldraw/tldraw.css";

const components: TLUiComponents = {
  ContextMenu: null,
  ActionsMenu: null,
  HelpMenu: null,
  // ZoomMenu: null,
  MainMenu: null,
  // Minimap: null,
  StylePanel: null,
  PageMenu: null,
  // NavigationPanel: null,
  Toolbar: null,
  KeyboardShortcutsDialog: null,
  QuickActions: null,
  HelperButtons: null,
  DebugPanel: null,
  DebugMenu: null,
  SharePanel: null,
  MenuPanel: null,
  TopPanel: null,
  CursorChatBubble: null,
};

export default function WhiteBoardPage() {
  const params = useSearchParams();
  const store = useSyncDemo({ roomId: `whiteboard-${params.get("id")}` });

  return (
    <div
      aria-readonly
      className={`tldraw__editor relative h-[800px] border-2 border-red-500  `}
    >
      <Tldraw components={components} store={store} />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
          backgroundColor: "transparent",
          // pointerEvents: "all",
        }}
      ></div>
    </div>
  );
}
