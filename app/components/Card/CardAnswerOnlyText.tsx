"use client";
import { usePathname } from "next/navigation";
import QuillJsCardCreator from "./QuillJsCardCreator";
import { useEffect, useState } from "react";
import React from "react";

interface CardAnswerOnlyTextProps {
  question: string;
  answer: string;
}

const CardAnswerOnlyText = ({ question, answer }: CardAnswerOnlyTextProps) => {
  const [path, setPath] = useState<string>("");
  const pathName = usePathname();

  useEffect(() => {
    setPath(pathName);
  }, [pathName]);
  return (
    <CardLayout path={path}>
      <QuestionTitle question={question} />
      <div className="flex flex-1 items-start justify-center overflow-y-auto whitespace-pre-wrap break-words rounded-lg bg-slate-100 p-1 text-xs font-normal text-gray-700 shadow-inner sm:text-sm md:p-1 md:text-base">
        {answer.startsWith("<") ? (
          <QuillJsCardCreator
            onChange={() => {}}
            value={answer}
            readOnly={true}
            theme="bubble"
          />
        ) : (
          answer
        )}
      </div>
    </CardLayout>
  );
};

export default CardAnswerOnlyText;

interface QuestionTitleProps {
  question: string;
}

const QuestionTitle = ({ question }: QuestionTitleProps) => {
  return (
    <h1 className="min-w-[200px] max-w-[250px] self-center break-words text-center text-xl font-bold text-gray-100 md:max-w-[500px] px-5">
      {question}
    </h1>
  );
};

interface CardLayoutProps {
  children: React.ReactNode;
  path: string;
}

const CardLayout = ({ children, path }: CardLayoutProps) => {
  return (
    <div
      className={`${
        path === "/"
          ? "h-[350px] sm:h-[350px] md:h-[400px]"
          : "h-[450px] sm:h-[550px] md:h-[610px]"
      } flex w-full flex-col gap-3 rounded-xl border-2 border-gray-800 bg-gray-800 p-3 shadow-xl sm:w-full`}
    >
      {children}
    </div>
  );
};
