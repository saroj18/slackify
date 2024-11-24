"use client";

import { useSyncDemo } from "@tldraw/sync";
import { useParams,  } from "next/navigation";
import { Tldraw, } from "tldraw";
import "tldraw/tldraw.css";

// const components: TLUiComponents = {
//   ContextMenu: null,
//   ActionsMenu: null,
//   HelpMenu: null,
//   // ZoomMenu: null,
//   MainMenu: null,
//   // Minimap: null,
//   StylePanel: null,
//   PageMenu: null,
//   // NavigationPanel: null,
//   Toolbar: null,
//   KeyboardShortcutsDialog: null,
//   QuickActions: null,
//   HelperButtons: null,
//   DebugPanel: null,
//   DebugMenu: null,
//   SharePanel: null,
//   MenuPanel: null,
//   TopPanel: null,
//   CursorChatBubble: null,
// };

export default function WhiteBoardPage() {
  const { workspace } = useParams();
  const store = useSyncDemo({ roomId: `chat-whiteboard-${workspace}` });

  return (
    <div aria-readonly className={`tldraw__editor relative h-[620px]`}>
      <Tldraw store={store} />
    </div>
  );
}
