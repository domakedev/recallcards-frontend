"use client";
import { usePathname } from "next/navigation";
import QuillJsCardCreator from "./QuillJsCardCreator";
import { headers } from "next/headers";
import { useEffect, useState } from "react";

interface CardAswerOnlyTextProps {
  question: string;
  answer: string;
  preview?: boolean;
}

const CardAswerOnlyText = ({
  question,
  answer,
  preview,
}: CardAswerOnlyTextProps) => {
  const [path, setPath] = useState<string>("");
  const pathName = usePathname();

  useEffect(() => {
    setPath(pathName);
  }, [pathName]);
  return (
    <>
      {preview ? (
        <div className="bg-[#101728] p-6 rounded-xl  shadow-xl w-[160px] h-[200px] sm:w-[200px] sm:h-[250px] md:w-[250px] md:h-[312.5px]  border-gray-800 border-2 min-h-[200px] flex justify-center items-center">
          {/* Nice Title styles  */}
          <h1 className=" text-xs sm:text-base md:text-lg font-bold text-gray-100 max-w-[150px] text-ellipsis    break-words ">
            {question}
          </h1>
        </div>
      ) : (
        <div
          className={`${
            path === "/"
              ? "h-[350px] sm:h-[350px] md:h-[400px]"
              : "h-[450px] sm:h-[550px] md:h-[610px]"
          } bg-gray-800 p-3 flex flex-col gap-2 rounded-xl shadow-xl w-full sm:w-full border-gray-800 border-2`}
        >
          {/* Nice Title styles  */}
          <h1 className=" text-xl font-bold text-gray-100 mb-6 self-center text-center min-w-[250px] max-w-[200px] md:max-w-[500px] break-words">
            {question}
          </h1>
          <div className="text-xs sm:text-sm md:text-base flex-1 bg-slate-100 justify-center items-start flex shadow-inner rounded-lg p-1 md:p-1 text-gray-700 font-normal  break-words  whitespace-pre-wrap overflow-y-auto">
            {answer.startsWith("<") ? (
              // <iframe src={answer} className="w-full h-full" />
              // <div dangerouslySetInnerHTML={{ __html: answer }} />
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
        </div>
      )}
    </>
  );
};

export default CardAswerOnlyText;
