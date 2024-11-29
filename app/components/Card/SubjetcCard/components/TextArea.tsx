import { countLetters } from "@/utils/countLetters";
import { highlightWord } from "@/utils/hightLightWord";
import React, { FC } from "react";

interface TextAreaProps {
  title: string;
  answeredValue?: string;
  required?: boolean;
  isEditing: boolean;
  value: string;
  valueChange: (field: string, value: string) => void;
  question?: string;
  titleColor?: string;
  field: string;
}

const TextArea: FC<TextAreaProps> = ({
  title,
  titleColor,
  required,
  isEditing,
  value,
  valueChange,
  answeredValue,
  question,
  field,
}) => {
  return (
    <div>
      <p className={`text-base font-bold ${titleColor} sm:text-lg`}>
        {title}
        {required && (
          <span className="ml-2 text-xs text-red-500">Requerido</span>
        )}
      </p>
      {isEditing ? (
        <div className="relative">
          <textarea
            maxLength={200}
            value={value}
            onChange={(e) => valueChange(field, e.target.value)}
            className="h-[100px] w-full rounded border px-3 py-2 focus:ring-2 focus:ring-green-600"
          />
          <p
            className={`absolute -bottom-8 right-0 rounded-xl bg-gray-700 px-2 text-xs text-white ${
              countLetters(value) >= 200 ? "bg-red-700" : ""
            }`}
          >
            {countLetters(value)} /200 letras
          </p>
        </div>
      ) : (
        <p className="text-sm sm:text-base">
          {highlightWord(answeredValue, question)}
        </p>
      )}
    </div>
  );
};

export default TextArea;
