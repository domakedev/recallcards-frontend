"use client";

import { FaHome } from "react-icons/fa";
import { FaSwatchbook } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllCards } from "@/services/card.services";
import { Card } from "@/types/Card";
import { useAppSelector } from "@/redux/hooks";
import { DeckDB } from "@/types/Deck";
import { nameToSlug } from "@/utils/nameToSlug";

const Footer = () => {
  const params = useParams();
  const deckState = useAppSelector((state) => state.deck);

  const [randomCard, setRandomCard] = useState<Card>();
  const [resetCard, setResetCard] = useState<boolean>(false);
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [actualDeck, setActualDeck] = useState<DeckDB>();

  useEffect(() => {
    if (deckState) {
      setActualDeck({
        id: deckState.id,
        name: deckState.deckName,
        image: deckState.deckImage,
        creatorId: deckState.creatorId,
      })
    }
  }, [deckState]);

  //To choose a random deck
  const randomNumber0toNum = (max: number): number => {
    const number = Math.floor(Math.random() * (max + 1));
    return number;
  };

  //To choose a random card from a deck
  const randomNumber1toNum = (max: number): number => {
    const number = Math.floor(Math.random() * max) + 1;
    return number;
  };

  useEffect(() => {
    getAllCards().then((data) => setAllCards(data));
  }, []);

  useEffect(() => {
    if (allCards?.length > 0) {
      const randomIndex = randomNumber0toNum(allCards.length - 1);
      const randomCard: Card = allCards[randomIndex];
      setRandomCard(randomCard);
    }
  }, [resetCard, allCards]);

  return (
    <footer className="sticky bottom-0 w-full bg-gray-800 text-white z-20">
      <div className="flex justify-around items-center h-16">
        <Link
          href={"/"}
          className="w-1/3 h-full active:bg-gray-700 flex items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center">
            <FaHome className="text-2xl" />
            <span className="text-xs">Decks</span>
          </div>
        </Link>
        <Link
          href={`/deck-${actualDeck?.id}-${nameToSlug(actualDeck?.name||"")}`}
          className="w-1/3 h-full active:bg-gray-700 flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            <FaSwatchbook className="text-2xl" />
            <span className="text-xs">Deck</span>
          </div>
        </Link>
        <Link
          href={`/random/${randomCard?.id}`}
          className="w-1/3 h-full active:bg-gray-700 flex items-center justify-center "
          onClick={() => setResetCard((state) => !state)}
        >
          <div className="flex flex-col items-center">
            <FaLayerGroup className="text-2xl" />
            <span className="text-xs">Carta al azar</span>
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
