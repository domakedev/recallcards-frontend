import Image, { StaticImageData } from "next/image";
import React from "react";

interface LargeButtonProps {
  text: string;
  icon: StaticImageData;
  bgColor: string;
}
const LargeButton: React.FC<LargeButtonProps> = ({ text, icon, bgColor }) => {
  return (
    <button
      className={`w-full px-4 max-w-[289px] h-[46px] top-0 ${bgColor} rounded-[12px] text-white text-sm font-bold`}
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
    </button>
  );
};

export default LargeButton;
