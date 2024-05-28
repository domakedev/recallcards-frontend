"use client";

import { FaHome } from "react-icons/fa";
import { FaSwatchbook } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Decks } from "@/mock/decks";

const Footer = () => {
  const params = useParams();

  const actualDeck = Decks.find((deck) => deck.deckSlug === params.cards);
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 text-white">
      <div className="flex justify-around items-center h-16">
        <Link
          href={"/"}
          className="w-1/3"
        >
          <div className="flex flex-col items-center">
            <FaHome className="text-2xl" />
            <span className="text-xs">Decks</span>
          </div>
        </Link>
        <Link
          href={`/${params.cards || ""}`}
          className="w-1/3"
        >
          <div className="flex flex-col items-center">
            <FaSwatchbook className="text-2xl" />
            <span className="text-xs">Deck</span>
          </div>
        </Link>
        <Link
          href={
            params.cards
              ? `/${params.cards}/${
                  Math.floor(Math.random() * (actualDeck?.deckSize || 0)) + 1
                }`
              : ""
          }
          className="w-1/3"
        >
          <div className="flex flex-col items-center">
            <FaLayerGroup className="text-2xl" />
            <span className="text-xs">Al azar</span>
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
