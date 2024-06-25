import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <div
      className=" mt-5 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 active:scale-95 block mx-auto my-5
    "
    >
      {children}
    </div>
  );
};

export default Button;
