"use client";

import { FaHome } from "react-icons/fa";
import { FaSwatchbook } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Decks } from "@/mock/decks";
import { log } from "console";

const Footer = () => {
  const params = useParams();

  const actualDeck = Decks.find((deck) => deck.deckSlug === params.cards);

  //To choose a random deck
  const randomNumber0toNum = (max: number): number => {
    const number = Math.floor(Math.random() * (max + 1));
    console.log(number);
    return number;
  };

  //To choose a random card from a deck
  const randomNumber1toNum = (max: number): number => {
    const number = Math.floor(Math.random() * max) + 1;
    console.log(number);
    return number;
  };

  const randomDeck = Decks[randomNumber0toNum(Decks.length - 1)];

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
          href={`/${params.cards || ""}`}
          className="w-1/3 h-full active:bg-gray-700 flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            <FaSwatchbook className="text-2xl" />
            <span className="text-xs">Deck</span>
          </div>
        </Link>
        <Link
          href={`/${randomDeck.deckSlug}/${
            randomNumber1toNum(randomDeck.deckSize)
          }`}
          className="w-1/3 h-full active:bg-gray-700 flex items-center justify-center "
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
