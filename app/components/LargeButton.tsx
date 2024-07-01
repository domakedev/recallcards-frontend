import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

interface LargeButtonProps {
  text: string;
  icon: StaticImageData;
  bgColor: string;
  href?: string;
  onClick?: () => void;
}
const LargeButton: React.FC<LargeButtonProps> = ({ text, icon, bgColor, href="", onClick }) => {
  return (
    <Link
      href={href}
      className={`px-4 py-3 ${bgColor} text-white text-sm font-bold active:scale-95 hover:scale-105 rounded-lg transform transition-transform duration-200 items-center justify-center flex gap-2 mx-auto`}
      onClick={onClick}
    >
      <div className="flex gap-2 justify-center">
        <p>{text}</p>

        <Image
          src={icon}
          alt="Icono de botón"
          width={20}
          height={20}
        />
      </div>
    </Link>
  );
};

export default LargeButton;
