// "use client"
// import React, { useRef, useEffect, useState } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";

// import "highlight.js/styles/github.css"; // Light theme
// import "highlight.js/styles/github-dark.css"; // Dark theme
// import DOMPurify from "dompurify";

// interface QuillEditorProps {
//   onChange: (content: string) => void;
//   value: string;
// }

// const QuillEditor: React.FC<QuillEditorProps> = ({ onChange, value }) => {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const quillRef = useRef<Quill | null>(null);

//   useEffect(() => {
//     if (editorRef.current && !quillRef.current) {
//       var formats = [
//         "background",
//         "bold",
//         "color",
//         "font",
//         "code",
//         "italic",
//         "link",
//         "size",
//         "strike",
//         "script",
//         "underline",
//         "blockquote",
//         "header",
//         "indent",
//         "list",
//         "align",
//         "direction",
//         "code-block",
//         "formula",
//         // 'image'
//         // 'video'
//       ];

//       quillRef.current = new Quill(editorRef.current, {
//         theme: "snow",
//         placeholder: "Tu apunte aquí...",
//         modules: {
//           toolbar: [
//             [{ header: [1, 2, 3, 4, 5, 6, false] }],
//             ["bold", "italic", "underline", "strike"],
//             [{ list: "ordered" }, { list: "bullet" }],
//             [{ color: [] }, { background: [] }],
//             // [{ font: [] }],
//             [{ align: [] }],
//             [{ script: "sub" }, { script: "super" }],
//             [{ indent: "-1" }, { indent: "+1" }],
//             // ["code-block"],
//             ["blockquote"],
//             ["link"],
//             ["clean"],
//           ],
//         },
//         formats: formats,
//       });

//       quillRef.current.on("text-change", () => {
//         if (quillRef.current) {
//           onChange(DOMPurify.sanitize(quillRef.current.root.innerHTML));
//         }
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (quillRef.current && quillRef.current.root.innerHTML !== value) {
//       quillRef.current.root.innerHTML = value;
//     }
//   }, [value]);

//   return (
//     <div
//       className={`relative shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[150px]`}
//       ref={editorRef}
//     />
//   );
// };

// export default QuillEditor;

"use client";
import { useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Light theme
import "highlight.js/styles/github-dark.css"; // Dark theme
import DOMPurify from "dompurify";

interface QuillEditorProps {
  onChange: (content: string) => void;
  value: string;
  theme?: "snow" | "bubble";
  readOnly?: boolean;
}

// Carga diferida de ReactQuill para evitar problemas en SSR
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const QuillJsCardCreator: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  theme,
  readOnly = false,
}) => {
  // Configuración de los módulos de Quill
  const modules = useMemo(
    () => ({
      syntax: {
        highlight: (text: string) =>
          hljs.highlightAuto(text, [
            "javascript",
            "python",
            "c",
            "cpp",
            "java",
            "html",
            "css",
            "json",
            "xml",
            "markdown",
            "sql",
            "php",
            "typescript",
            "bash",
            "shell",
            "yaml",
            "makefile",
            "dockerfile",
            "plaintext",
          ]).value,
      },
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["blockquote"],
        ["link"],
        ["code-block"],
        ["clean"],
      ],
    }),
    []
  );

  var formats = [
    "background",
    "bold",
    "color",
    "font",
    "code",
    "italic",
    "link",
    "size",
    "strike",
    "script",
    "underline",
    "blockquote",
    "header",
    "indent",
    "list",
    "align",
    "direction",
    "code-block",
    "formula",
    // 'image'
    // 'video'
  ];

  return (
    <div className="relative shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[150px]">
      <ReactQuill
        theme={theme || "snow"}
        value={value}
        onChange={(content) => onChange(content)}
        modules={modules}
        formats={formats}
        readOnly={readOnly}
        placeholder="Tu apunte en formato texto simple aquí..."
      />
    </div>
  );
};

export default QuillJsCardCreator;
