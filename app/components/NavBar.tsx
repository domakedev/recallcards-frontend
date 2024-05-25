'use client'

import React from "react";
import Image from "next/image";
import BackArrowIcon from "@/assets/backarrow-icon.svg";
import { useRouter } from "next/navigation";

interface NavBarProps {
  title: string;
  goBack: boolean;
}
const NavBar: React.FC<NavBarProps> = ({ title, goBack = false }) => {
  const router = useRouter();
  return (
    <div className="mt-5 mb-[41px] px-3 flex  justify-between w-full">
      {goBack ? (
        <button onClick={()=>{router.back()}}>
          <Image
            src={BackArrowIcon}
            className="w-6 h-6"
            // width={24}
            // height={24}
            alt="Volver atras"
          />
        </button>
      ) : (
        <div className="w-6 h-6"></div>
      )}

      <h1 className="font-bold text-lg text-center">{title}</h1>
      <div className="w-6 h-6"></div>
      {/* <Image
            src={BackArrowIcon}
            width={24}
            height={24}
            alt='Volver atras'
        ></Image> */}
    </div>
  );
};

export default NavBar;
