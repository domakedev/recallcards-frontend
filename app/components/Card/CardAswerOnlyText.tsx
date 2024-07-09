
import React from "react";
import DOMPurify from 'dompurify';

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
  return (
    <>
      {preview ? (
        <div className="bg-[#101728] p-6 rounded-xl  shadow-xl w-[160px]  border-gray-800 border-2 min-h-[200px] flex justify-center items-center">
          {/* Nice Title styles  */}
          <h1 className=" text-xs sm:text-base md:text-lg font-bold text-gray-100 max-w-[100px] text-ellipsis    break-words ">
            {question}
          </h1>
        </div>
      ) : (
        <div className="min-h-[335px] sm:h-[550px] md:h-[610px] bg-gray-800 p-6 flex flex-col gap-2 rounded-xl shadow-xl w-full sm:w-full border-gray-800 border-2">
          {/* Nice Title styles  */}
          <h1 className=" text-xl font-bold text-gray-100 mb-6 self-center text-center min-w-[250px] max-w-[200px] md:max-w-[500px] break-words">
            {question}
          </h1>
          <div className="text-xs sm:text-sm md:text-base flex-1 bg-slate-100 justify-center items-center flex shadow-inner rounded-lg p-4 md:p-8 text-gray-700 font-normal  break-words break-all whitespace-pre-wrap">
            {answer.startsWith("<") ? (
              // <iframe src={answer} className="w-full h-full" />
              <div dangerouslySetInnerHTML={{ __html: answer }} />
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
