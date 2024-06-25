import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import CardsIcon from "@/assets/cards-icon.png";
import Link from "next/link";
import DeckPlaceHolderIMG from "@/assets/placeholder-256x256.svg";

interface DeckPreviewProps {
  src: StaticImageData | string;
  deckName: string;
  deckSize?: number;
  deckSlug: string;
  deckId: number;
}

const DeckPreview: React.FC<DeckPreviewProps> = ({
  src = DeckPlaceHolderIMG,
  deckName,
  deckSize,
  deckSlug,
  deckId,
}) => {

  return (
    <Link
      href={`/deck-${deckId}-${deckSlug}`}
      className="flex flex-col gap-2 transform transition-transform duration-200 active:scale-95 hover:scale-105"
    >
      <Image
        className="w-32 h-32 object-cover rounded-xl shadow-lg"
        src={src === "" ? DeckPlaceHolderIMG : src}
        width={120}
        height={120}
        alt="Deck vista previa"
        priority
      />
      <div className="flex flex-col">
        <h2 className="max-w-32 md:max-w-64">{deckName}</h2>
        <div className="flex items-center gap-[2px]">
          <p className="text-sm">{deckSize}</p>
          <Image
            className="w-[13.92px] h-[12.67]"
            src={CardsIcon}
            alt="Icono de varias cartas"
          />
        </div>
      </div>
    </Link>
  );
};

export default DeckPreview;
