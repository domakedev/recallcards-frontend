"use client";

import { FaSwatchbook } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { DeckDB } from "@/types/Deck";
import { nameToSlug } from "@/utils/nameToSlug";
import Image from "next/image";
import { GoHomeFill } from "react-icons/go";


const Footer = () => {
  const deckState = useAppSelector((state) => state.deck);

  const [actualDeck, setActualDeck] = useState<DeckDB>();

  useEffect(() => {
    if (deckState) {
      setActualDeck({
        id: deckState.id,
        name: deckState.deckName,
        image: deckState.deckImage,
        creatorId: deckState.creatorId,
      });
    }
  }, [deckState]);

  return (
    <footer className="sticky bottom-0 w-full bg-gray-800 text-white z-20 py-1">
      <div className="flex justify-around items-center h-16">
        <Link
          href={"/"}
          className="w-1/3 h-full active:bg-gray-700 flex items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center">
            <GoHomeFill  className="text-2xl my-1" />
            <span className="text-xs md:text-sm">Inicio</span>
          </div>
        </Link>
        <Link
          href={actualDeck?.id !== 0 ? `/deck-${actualDeck?.id}-${nameToSlug(actualDeck?.name || "")}` : "/#"}
          className="w-1/3 h-full active:bg-gray-700 flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            {actualDeck?.image && actualDeck?.image !== "" ? (
              <Image
                src={actualDeck?.image}
                alt={"Deck"}
                width={30}
                height={30}
                className="text-2xl my-1 object-cover rounded-sm w-6 h-6"
              />
            ) : (
              <FaSwatchbook className="text-2xl my-1" />
            )}
            <span className="text-xs md:text-sm text-center text-clip capitalize max-h-4 md:max-h-5 overflow-hidden">
              {actualDeck?.name || "Deck"}
            </span>
          </div>
        </Link>
        <Link
          href={"/mis-decks"}
          className="w-1/3 h-full active:bg-gray-700 flex items-center justify-center "
        >
          <div className="flex flex-col items-center">
            <FaLayerGroup className="text-2xl my-1" />
            <span className="text-xs md:text-sm">Mis Apuntes</span>
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
