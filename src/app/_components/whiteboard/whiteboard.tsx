"use client";

import { Tldraw, TLUiComponents } from "tldraw";
import "tldraw/tldraw.css";
import { useSyncDemo } from "@tldraw/sync";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

const components: Required<TLUiComponents> = {
  ContextMenu: null,
  ActionsMenu: null,
  HelpMenu: null,
  ZoomMenu: null,
  MainMenu: null,
  Minimap: null,
  StylePanel: null,
  PageMenu: null,
  NavigationPanel: null,
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

export default function WhiteBoard({ workspace }: { workspace?: any }) {
  const { id } = useParams();
  const store = useSyncDemo({ roomId: `channel-${id}` });
  const { data } = useSession();
  return (
    <div
      className={`tldraw__editor  max-h-[635px] h-full ${
        workspace?.data?.createdBy !== data?.user.id
          ? "pointer-events-none"
          : ""
      }`}
    >
      <Tldraw
        components={
          (workspace?.data?.createdBy !== data?.user.id && components) ||
          undefined
        }
        store={store}
      />
    </div>
  );
}
