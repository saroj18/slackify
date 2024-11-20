"use client";
import {
  //@ts-ignore
  EditorCommand,
  //@ts-ignore
  EditorCommandEmpty,
  //@ts-ignore
  EditorCommandItem,
  //@ts-ignore
  EditorCommandList,
  //@ts-ignore
  EditorContent,
  //@ts-ignore
  EditorRoot,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from "./extension";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { NodeSelector } from "./selectors/node-selector";
import { MathSelector } from "./selectors/math-selector";

import { handleImageDrop, handleImagePaste } from "novel/plugins";
import GenerativeMenuSwitch from "./generative/generative-menu-switch";
import { uploadFn } from "./image-upload";
import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";
import { defaultEditorContent } from "@/lib/content";
import { Separator } from "@/components/ui/separator";
import { Editor, JSONContent, Range } from "@tiptap/core";
import { EditorView } from "@tiptap/pm/view";
import React from "react";
import * as jsondiffpatch from "jsondiffpatch";
import hljs from "highlight.js";
import { Slice } from "@tiptap/pm/model";
import { compareEditorContent } from "@/utils/findDifference";
import { useParams } from "next/navigation";

const extensions = [...defaultExtensions, slashCommand];

type EditorType = {
  novelLocalStorageKey: string;
  setNewChanges: React.Dispatch<React.SetStateAction<any[]>>;
  setInitialContent: any;
  initialContent: any;
};

const CanvasEditor = ({
  novelLocalStorageKey,
  setNewChanges,
  setInitialContent,
  initialContent,
}: EditorType) => {
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [charsCount, setCharsCount] = useState();

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);
  const canvasContentRef = useRef<null | JSONContent>(null);

  //Apply Codeblock Highlighting on the HTML from editor.getHTML()
  const highlightCodeblocks = (content: string) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    doc.querySelectorAll("pre code").forEach((el) => {
      // @ts-ignore
      // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
      hljs.highlightElement(el);
    });
    return new XMLSerializer().serializeToString(doc);
  };

  const debouncedUpdates = useDebouncedCallback(async (editor: Editor) => {
    const json = editor.getJSON();
    const data = compareEditorContent(canvasContentRef.current, json);
    canvasContentRef.current = json;

    if (data.length > 0) {
      setNewChanges(data);
    }
    console.log(data);
    setCharsCount(editor.storage.characterCount.words());
    setInitialContent(json);

    window.localStorage.setItem(novelLocalStorageKey, JSON.stringify(json));
    const newContent = window.localStorage.getItem(novelLocalStorageKey);

    setSaveStatus("Saved");
  }, 300);

  useEffect(() => {
    const content = window.localStorage.getItem(novelLocalStorageKey);
    console.log("content", content);

    setInitialContent(JSON.parse(content!));
    canvasContentRef.current = JSON.parse(content!);
  }, []);

  console.log("component rerender");

  return (
    <div className="relative w-full max-h-[620px]  ">
      <div className="flex absolute right-5 top-5 z-10 mb-5 gap-2">
        <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
          {saveStatus}
        </div>
        <div
          className={
            charsCount
              ? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground"
              : "hidden"
          }
        >
          {charsCount} Words
        </div>
      </div>
      <EditorRoot>
        <EditorContent
          key={initialContent}
          initialContent={initialContent}
          extensions={extensions}
          className="relative max-h-[635px] overflow-y-scroll border-2w-full border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view: EditorView, event: KeyboardEvent) =>
                handleCommandNavigation(event),
            },
            handlePaste: (view: EditorView, event: ClipboardEvent) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (
              view: EditorView,
              event: DragEvent,
              _slice: Slice,
              moved: boolean
            ) => handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
            },
          }}
          onUpdate={({ editor }: { editor: Editor }) => {
            debouncedUpdates(editor);
            setSaveStatus("Unsaved");
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={({
                    editor,
                    range,
                  }: {
                    editor: Editor;
                    range: Range;
                  }) => item.command?.({ editor, range })}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />

            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <MathSelector />
            <Separator orientation="vertical" />
            <TextButtons />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </GenerativeMenuSwitch>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default CanvasEditor;
