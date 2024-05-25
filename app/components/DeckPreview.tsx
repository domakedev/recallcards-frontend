import Image from "next/image";
import React from "react";
import CardsIcon from "@/assets/cards-icon.png";
import Link from "next/link";

interface DeckPreviewProps {
  src: string;
  deckName: string;
  deckSize: number;
}

const DeckPreview: React.FC<DeckPreviewProps> = ({
  src,
  deckName,
  deckSize,
}) => {
  return (
    <Link href="/cards" className="flex flex-col gap-2">
      <Image
        className="w-32 h-32 object-cover rounded-xl shadow-lg"
        src={src}
        width={120}
        height={120}
        alt="Deck vista previa"
      />
      <div className="flex flex-col">
        <h2>{deckName}</h2>
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
