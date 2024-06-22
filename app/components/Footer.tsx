"use client";

import { FaHome } from "react-icons/fa";
import { FaSwatchbook } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Decks } from "@/mock/decks";
import { useEffect, useState } from "react";
import { getAllCards } from "@/services/card.services";
import { Card } from "@/types/Card";

const Footer = () => {
  const params = useParams();

  const deckName =
    params.deck &&
    (typeof params.deck === "string" ? params.deck : params.deck[0]);

  const [randomCard, setRandomCard] = useState<Card>();
  console.log("🚀 ~ Footer ~ randomCard:", randomCard);
  const [resetCard, setResetCard] = useState<boolean>(false);
  const [allCards, setAllCards] = useState<Card[]>([]);

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

  // useEffect(() => {
  //   const randomDeckNumber = randomNumber0toNum(Decks.length - 1);
  //   const randomDeck = Decks[randomDeckNumber];
  //   const randomCardNumber = randomNumber1toNum(randomDeck.deckSize);

  //   setRandomCardNumber(randomCardNumber);
  // }, [resetCard]);

  useEffect(() => {
    getAllCards().then((data) => setAllCards(data));
  }, []);

  useEffect(() => {
    console.log("allCards");
    if (allCards?.length > 0) {
      const randomIndex = randomNumber0toNum(allCards.length - 1);
      const randomCard: Card = allCards[randomIndex];
      setRandomCard(randomCard);
      console.log("🚀 ~ useEffect ~ randomIndex:", randomCard.id);
    }
  }, [resetCard, allCards]);

  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 text-white">
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
          href={`/deck-${randomCard?.deckId}`}
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
