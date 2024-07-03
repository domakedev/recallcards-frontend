import Link from "next/link";
import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
}

const Button = ({ children, href = "" }: ButtonProps) => {
  return (
    <Link
      className=" m-3 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 active:scale-95 block mx-auto"
      href={href}
    >
      {children}
    </Link>
  );
};

export default Button;
