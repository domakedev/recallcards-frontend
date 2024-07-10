"use client";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import CardsIcon from "@/assets/cards-icon.svg";
import Link from "next/link";
import DeckPlaceHolderIMG from "@/assets/placeholder-256x256.svg";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks";
import { setDeck } from "@/redux/deckSlice";
import { TbCardsFilled } from "react-icons/tb";

interface DeckPreviewProps {
  src: StaticImageData | string;
  deckName: string;
  deckSize?: number;
  deckSlug: string;
  deckId: number;
  deckCreatorId: number;
}

const DeckPreview: React.FC<DeckPreviewProps> = ({
  src = DeckPlaceHolderIMG,
  deckName,
  deckSize,
  deckSlug,
  deckId,
  deckCreatorId,
}) => {
  const dispatch = useAppDispatch();

  //Set Actual Deck
  const setActualDEck = () => {
    dispatch(
      setDeck({
        id: deckId,
        deckName,
        deckImage: src,
        creatorId: deckCreatorId,
      })
    );
  };

  return (
    <Link
      href={`/deck-${deckId}-${deckSlug}`}
      className="relative flex flex-col gap-2 transform transition-transform duration-200 active:scale-95 hover:scale-105 bg-gray-800 rounded-2xl"
      onClick={setActualDEck}
    >
      <Image
        className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-xl shadow-lg"
        src={src === "" ? DeckPlaceHolderIMG : src}
        width={700}
        height={700}
        alt="Deck vista previa"
        priority
      />
      <div className="absolute bottom-0 text-center rounded-b-xl text-white bg-gray-800 p-2 w-full flex justify-center items-start text-md max-w-40 md:max-w-64 ">
        <div className="min-w-5 mr-1">
          <TbCardsFilled className="w-[20px] mt-[3px]" />
        </div>

        <h2 className=" text-sm sm:text-base sm:max-w-36 md:text-lg max-w-32 md:max-w-44 break-words capitalize text-ellipsis overflow-hidden text-nowrap">
          {deckName}
        </h2>
        {/* <div className="flex items-center gap-[2px]"> */}
        {/* <p className="text-sm">{deckSize}</p> */}
        {/* <Image
            className="w-[13.92px] h-[12.67]"
            src={CardsIcon}
            alt="Icono de varias cartas"
          /> */}
        {/* </div> */}
      </div>
    </Link>
  );
};

export default DeckPreview;
