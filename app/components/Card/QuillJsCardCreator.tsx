"use client";
import { useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
// import "highlight.js/styles/github.css"; // Light theme
// import "highlight.js/styles/github-dark.css"; // Dark theme
// import "highlight.js/styles/monokai-sublime.css"
import "highlight.js/styles/atom-one-dark.css";

interface QuillEditorProps {
  onChange: (content: string) => void;
  value: string;
  theme?: "snow" | "bubble";
  readOnly?: boolean;
}

// Carga diferida de ReactQuill para evitar problemas en SSR
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Cargando editor...</p>,
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
            "typescript",
            "java",
            "python",
            "json",
            "html",
            "css",
            "scss",
            "sql",
            "shell",
            "markdown",
            "yaml",
            "xml",
            "http",
            "nginx",
            "dockerfile",
            "plaintext",
          ]).value,
      },
      toolbar: !readOnly && [
        [{ header: [1, 2, 3, false] }],
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
    [readOnly],
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
    <div className="focus:shadow-outline h-full w-full appearance-none rounded px-1 py-1 leading-tight text-gray-700 shadow focus:outline-none">
      <ReactQuill
        theme={theme || "snow"}
        value={value}
        onChange={(content) => onChange(content)}
        modules={modules}
        formats={formats}
        readOnly={readOnly}
        placeholder="Para código selecciona: </>"
        className="md:text-xl"
      />
    </div>
  );
};

export default QuillJsCardCreator;
