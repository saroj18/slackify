import React from "react";
//@ts-ignore
import { EditorContent, EditorRoot } from "novel";
import { defaultExtensions } from "@/app/_components/canvas-editor/extension";

export default function CanvasPreview({ content }: { content: string }) {
  console.log(content);
  return (
    <div className="max-h-[635px] h-full overflow-y-scroll">
      <EditorRoot>
        <EditorContent
          initialContent={content}
          extensions={defaultExtensions}
          editorProps={{
            attributes: {
              class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full pointer-events-none`,
            },
          }}
        ></EditorContent>
      </EditorRoot>
    </div>
  );
}
