"use client";

import React, { useEffect, useState } from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/inline_style.min.js";
import "froala-editor/js/plugins/line_height.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/quote.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/entities.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/image.min.js";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { config } from "../constant/constant";
import { PUSHER_CLIENT } from "@/utils/pusher";

export default function TextEditor({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  useEffect(() => {
    const typing = PUSHER_CLIENT.subscribe("typing");
    typing.bind("client-typing", (data: any) => {
      console.log("data");
    });
  }, []);
  
  return (
    <div className="w-full h-[100px] ">
      <FroalaEditorComponent
        onModelChange={setValue}
        config={config}
        tag="textarea"
      />
    </div>
  );
}
