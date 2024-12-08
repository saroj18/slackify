"use client";

import { Button } from "@/components/ui/button";
import { useSyncDemo } from "@tldraw/sync";
import { EyeIcon, EyeOff, LoaderIcon, PhoneCall } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tldraw, TLUiComponents, useEditor } from "tldraw";
import "tldraw/tldraw.css";
import CallPage from "./call-page";

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
  const [visible, setVisible] = useState(true);
  const [callState, setCallState] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(loading);

  return (
    <div aria-readonly className={`tldraw__editor relative h-[800px]`}>
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
      {loading && (
        <LoaderIcon className="absolute cursor-pointer left-[3%] top-2 z-30 opacity-50 " />
      )}
      {!loading && !callState && (
        <PhoneCall
          strokeWidth={1.5}
          onClick={() => setCallState(true)}
          className="absolute cursor-pointer left-[3%] top-2 z-30 opacity-50 "
        />
      )}
      {callState &&
        !loading &&
        (visible ? (
          <EyeOff
            className="cursor-pointer absolute left-[3%] top-2 z-30 opacity-50"
            onClick={() => setVisible(false)}
          />
        ) : (
          <EyeIcon
            className="cursor-pointer absolute left-[3%] top-2 z-30 opacity-50"
            onClick={() => setVisible(true)}
          />
        ))}
      {callState && (
        <CallPage
        loading={loading}
          setLoading={setLoading}
          className="absolute left-0 top-0"
          setCallState={setCallState}
          visible={visible}
        />
      )}
    </div>
  );
}
