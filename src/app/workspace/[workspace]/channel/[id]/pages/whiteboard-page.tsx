"use client";

import useWorkspace from "@/api_data/get_workspace";
import { useSyncDemo } from "@tldraw/sync";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Tldraw, TLUiComponents, useEditor } from "tldraw";
import "tldraw/tldraw.css";

const creatorComponent: TLUiComponents = {};
const viewerComponent: TLUiComponents = {
  ContextMenu: null,
  // ActionsMenu: null,
  HelpMenu: null,
  //   ZoomMenu: null,
  MainMenu: null,
  //   Minimap: null,
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
  const { workspace, id } = useParams();
  const store = useSyncDemo({
    roomId: `channel-whiteboard-${workspace}-${id}`,
  });
  const { workspaceData } = useWorkspace(workspace as string);
  const { data } = useSession();

  return (
    <div className={`tldraw__editor relative h-[620px]`}>
      <Tldraw
        components={
          workspaceData?.createdBy == data?.user.id
            ? creatorComponent
            : viewerComponent
        }
        store={store}
      />
      {workspaceData?.createdBy !== data?.user.id && (
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
      )}
    </div>
  );
}
