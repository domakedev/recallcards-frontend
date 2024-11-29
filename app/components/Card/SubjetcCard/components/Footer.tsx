import Image from "next/image";
import React, { FC } from "react";

interface FooterProps {
  subjectName: string;
  icon: React.ReactNode;
}

const Footer: FC<FooterProps> = ({ subjectName, icon }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-1 rounded-b-lg bg-blue-500 p-2 sm:flex-nowrap sm:gap-3 sm:p-4">
      <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-gray-800 p-2 text-white sm:p-3">
        {icon}
        <p className="rounded-md bg-blue-600 p-1 text-center text-xs sm:px-2 sm:text-sm">
          {subjectName}
        </p>
      </div>
      <div className="flex w-fit items-center justify-center rounded-xl bg-gray-800 p-2 text-white sm:p-3">
        <span className="mr-1 text-xs font-bold text-red-500 sm:text-xl">
          {"<"}
        </span>
        <p className="text-xs font-bold sm:text-xl">DoMakeDev.com</p>
        <span className="text-xs font-bold text-blue-500 sm:text-xl">/</span>
        <span className="ml-1 text-xs font-bold text-yellow-500 sm:text-xl">
          {">"}
        </span>
      </div>
      <Image
        src="https:www.domakedev.com/icon.jpg?9847d6b629f0f82b"
        alt="Preview"
        width={100}
        height={100}
        quality={100}
        className="w-10 sm:w-20"
      />
    </div>
  );
};

export default Footer;
