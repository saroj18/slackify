"use client";

import React, { useState } from "react";
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

export default function TextEditor() {
  const [value, setValue] = useState("");
  console.log(value);
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
