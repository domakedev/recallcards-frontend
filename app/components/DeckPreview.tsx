"use client"
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import CardsIcon from "@/assets/cards-icon.svg";
import Link from "next/link";
import DeckPlaceHolderIMG from "@/assets/placeholder-256x256.svg";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks";
import { setDeck } from "@/redux/deckSlice";

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
      className="flex flex-col gap-2 transform transition-transform duration-200 active:scale-95 hover:scale-105 "
      onClick={setActualDEck}
    >
      <Image
        className="w-32 h-32 object-cover rounded-xl shadow-lg"
        src={src === "" ? DeckPlaceHolderIMG : src}
        width={120}
        height={120}
        alt="Deck vista previa"
        priority
      />
      <div className="flex justify-start items-start text-md max-w-32 md:max-w-64 ">
        <div className="min-w-5 mr-1">
          <Image
            className="w-[20px] mt-1"
            src={CardsIcon}
            alt="Icono de varias cartas"
          />
        </div>
        <h2 className="  max-w-28">{deckName}</h2>
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
