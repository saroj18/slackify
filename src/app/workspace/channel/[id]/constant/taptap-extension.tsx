import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
// import TextColor from "@tiptap/extension-text-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";

export const tiptapExtension = [
  StarterKit, // Basic setup with bold, italic, paragraph, etc.
  Underline, // Underline text
  TextAlign.configure({ types: ["heading", "paragraph"] }), // Text alignment options
  // TextColor, // Text color
  Highlight, // Text highlighting
  Link.configure({ openOnClick: false }), // Hyperlink text
  Image, // Insert images
  Table.configure({ resizable: true }), // Basic table structure
  TableRow, // Table rows
  TableCell, // Table cells
  TableHeader, // Table headers
  ListItem, // List items
  BulletList, // Bullet list
  OrderedList, // Numbered list
  Heading.configure({ levels: [1, 2, 3, 4] }), // Headings H1 - H4
  Blockquote, // Blockquote
  CodeBlock,
];
