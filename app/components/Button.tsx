import Link from "next/link";
import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

const Button = ({ children, href = "", className }: ButtonProps) => {
  return (
    <Link
      className={`m-3 mx-auto block w-[150px] transform rounded-lg bg-blue-500 px-4 py-2 text-center font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default Button;
