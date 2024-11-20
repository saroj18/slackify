import React, { useEffect, useRef, useState } from "react";
//@ts-ignore
import { EditorContent, EditorRoot, useEditor } from "novel";
import { defaultExtensions } from "@/app/_components/canvas-editor/extension";

const dummyContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 1 },
      content: [{ type: "text", text: "Welcome to Canvas Preview" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This is a simple example of a rich text content rendered using the EditorContent component.",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Feature 1: Easy to use" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Feature 2: Customizable" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Feature 3: Fast rendering" }],
            },
          ],
        },
      ],
    },
  ],
};

export default function CanvasPreview({ content }: { content: any }) {
  return (
    <div className="max-h-[635px] h-full overflow-y-scroll">
      <EditorContent
        key={JSON.stringify(content)}
        editable={false}
        initialContent={content}
        extensions={defaultExtensions}
        editorProps={{
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full pointer-events-none`,
          },
        }}
      ></EditorContent>
    </div>
  );
}
