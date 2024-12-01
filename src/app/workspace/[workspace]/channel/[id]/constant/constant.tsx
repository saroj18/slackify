import { PUSHER_CLIENT } from "@/utils/pusher";
import { Eye, Image, MessageCircle, PenIcon, Speaker } from "lucide-react";

export const NavList = [
  {
    name: "Message",
    icon: <MessageCircle />,
    hidden: false,
  },
  {
    name: "Canvas",
    icon: <Image />,
    hidden: true,
  },
  {
    name: "Canvas Preview",
    icon: <Eye />,
    hidden: false,
  },
  {
    name: "WhiteBoard",
    icon: <PenIcon />,
    hidden: false,
  },
];

export const config = {
  placeholderText: "Type your messages..",
  charCounterCount: false,
  events: {
    focus: function () {
      console.log("focus dam");
      const data = PUSHER_CLIENT.channel("typing").trigger("client-typing", {
        typing: true,
      });

      console.log(data);
    },
  },
  imageUpload: true,
  toolbarButtons: {
    moreText: {
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "subscript",
        "superscript",
        "fontFamily",
        "fontSize",
        "textColor",
        "backgroundColor",
        "inlineClass",
        "inlineStyle",
        "clearFormatting",
        "paragraphFormat",
      ],
    },
    moreParagraph: {
      buttons: [
        "alignLeft",
        "alignCenter",
        "formatOLSimple",
        "alignRight",
        "alignJustify",
        "formatOL",
        "formatUL",
        "paragraphFormat",
        "paragraphStyle",
        "lineHeight",
        "outdent",
        "indent",
        "quote",
      ],
    },
    moreRich: {
      buttons: [
        "insertLink",
        "insertImage",
        "insertVideo",
        "insertTable",
        "emoticons",
        "fontAwesome",
        "specialCharacters",
        "embedly",
        "insertFile",
        "insertHR",
      ],
    },
    moreMisc: {
      buttons: [
        "undo",
        "redo",
        "fullscreen",
        "print",
        "getPDF",
        "spellChecker",
        "selectAll",
        "html",
      ],
    },
  },
  paragraphFormat: {
    N: "Normal",
    H1: "Heading 1",
    H2: "Heading 2",
    H3: "Heading 3",
    H4: "Heading 4",
  },
  imageUploadURL: "/upload_image",
};
