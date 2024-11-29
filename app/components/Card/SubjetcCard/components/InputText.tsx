import React, { FC } from "react";

interface InputTextProps {
  title: string;
  isEditing: boolean;
  value: string;
  valueChange: (field: string, value: string) => void;
  required: boolean;
  answeredValue: any;
  inputColor?: string;
  field: string;
}

const InputText: FC<InputTextProps> = ({
  title,
  isEditing,
  value,
  valueChange,
  required,
  answeredValue,
  inputColor,
  field
}) => {
  return (
    <div>
      <p className={`text-base font-bold sm:text-lg ${inputColor}`}>
        {title}
        {required && (
          <span className="ml-2 text-xs text-red-500">Requerido</span>
        )}
      </p>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => valueChange(field, e.target.value)}
          className="w-full rounded-md px-2 py-1"
        />
      ) : (
        <p className="text-sm sm:text-base">{answeredValue}</p>
      )}
    </div>
  );
};

export default InputText;
