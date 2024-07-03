import React from "react";

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
        <div className="bg-yellow-100 p-6 rounded-xl  shadow-xl w-full  border-gray-800 border-2 min-h-[200px] flex justify-center items-center">
          {/* Nice Title styles  */}
          <h1 className=" text-xs font-bold text-gray-800 max-w-[100px] text-ellipsis    break-words    ">
            {question}
          </h1>
        </div>
      ) : (
        <div className="bg-yellow-100 p-6 flex flex-col gap-2 rounded-xl  shadow-xl w-full sm:w-full border-gray-800 border-2">
          {/* Nice Title styles  */}
          <h1 className=" text-xl font-bold text-gray-800 mb-6 self-center text-center min-w-[250px] max-w-[200px] md:max-w-[500px] break-words">
            {question}
          </h1>
          <p className="text-xs sm:text-sm md:text-base flex-1 bg-slate-100 justify-center items-center flex shadow-inner rounded-lg p-4 md:p-8 text-gray-700 font-normal">
            {answer}
          </p>
        </div>
      )}
    </>
  );
};

export default CardAswerOnlyText;
