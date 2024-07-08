import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import "highlight.js/styles/github.css"; // Light theme
import "highlight.js/styles/github-dark.css"; // Dark theme
import DOMPurify from "dompurify";

interface QuillEditorProps {
  onChange: (content: string) => void;
  value: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ onChange, value }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
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

      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Tu apunte aquí...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            // [{ font: [] }],
            [{ align: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            // ["code-block"],
            ["blockquote"],
            ["link"],
            ["clean"],
          ],
        },
        formats: formats,
      });

      quillRef.current.on("text-change", () => {
        if (quillRef.current) {
          onChange(DOMPurify.sanitize(quillRef.current.root.innerHTML));
        }
      });
    }
  }, []);

  useEffect(() => {
    if (quillRef.current && quillRef.current.root.innerHTML !== value) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div
      className={`relative shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[150px]`}
      ref={editorRef}
    />
  );
};

export default QuillEditor;
