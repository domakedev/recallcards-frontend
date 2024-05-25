import NavBar from "@/app/components/NavBar";
import Image from "next/image";
import React from "react";
import CardImage from "@/assets/image-card-example.jpg";
import DadosIcon from "@/assets/dados-icon.svg";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import LargeButton from "@/app/components/LargeButton";

const page = () => {
  return (
    <>
      <NavBar title="Carta:" goBack />
      <div className="flex flex-col justify-center px-3">
        <Image
          src={CardImage}
          alt="Carta"
          className="w-full max-w-[600px] min-w-[290px] mx-auto shadow-xl rounded-xl"
        />
        <div className="mt-5 flex gap-1 mx-auto">
          <button className="rounded-l-[12px] w-6 min-h-[46px] bg-[#3a3a3a]">
            <FaCaretLeft 
            color={`${true ? "#F8A62B" : "#DDDDDD"}`} size={25} />
          </button>
          <LargeButton
            text="Elegir una carta al azar"
            icon={DadosIcon}
            bgColor="bg-[#3a3a3a]"
          />
          <button className="rounded-r-[12px] w-6 min-h-[46px] bg-[#3a3a3a]">
            <FaCaretRight
              color={`${true ? "#38B6FF" : "#DDDDDD"}`}
              size={25}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default page;

/* Rectangle 14 */
