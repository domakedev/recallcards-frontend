import React, { FC } from "react";

interface HeaderProps {
  question: string;
  isEditing: boolean;
  setQuestion?: (question: string) => void;
}

const Header: FC<HeaderProps> = ({ question, isEditing, setQuestion }) => {
  return (
    <div className="rounded-t-lg bg-blue-500 p-3 sm:p-5">
      {isEditing && setQuestion ? (
        <input
          type="text"
          id="question"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mx-auto block w-10/12 rounded-xl bg-gray-700 p-2 text-center font-bold text-white sm:p-4 sm:text-xl"
          placeholder="Ingresa un titulo o pregunta"
        />
      ) : (
        <p className="mx-auto block w-10/12 rounded-xl bg-gray-700 p-2 text-center font-bold text-white sm:text-xl">
          {question}
        </p>
      )}
    </div>
  );
};

export default Header;
