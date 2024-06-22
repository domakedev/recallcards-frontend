/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import CardPreview from "../components/CardPreview";
import DadosIcon from "@/assets/dados-icon.svg";
import LargeButton from "../components/LargeButton";
import { useParams } from "next/navigation";
import { Decks } from "@/mock/decks";
import Link from "next/link";
import { unSlug } from "@/utils/unSlug";
import { Card } from "@/types/Card";
import { getAllCards } from "@/services/card.services";

const page = () => {
  const params = useParams();

  const actualDeck = Decks.find((deck) => deck.deckSlug === params.deck);

  const deckName = unSlug(
    typeof params.deck === "string" ? params.deck : params.deck[0]
  );

  const arrayDeck = Array.from(
    { length: actualDeck?.deckSize || 0 },
    (_, i) => i + 1
  );

  const [cards, setCards] = useState<Card[]>();

  useEffect(() => {
    const cards = async () => await getAllCards();

    cards().then((data) => setCards(data));
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <NavBar
        title={
          "Cartas de: " + deckName ||
          "No has seleccionado un deck o no se ha encontrado"
        }
        goBack
      />
      <Link
        href={`/${params.deck}/${
          Math.floor(Math.random() * (actualDeck?.deckSize || 0)) + 1
        }`}
        className=" bg-[#3a3a3a] flex justify-center items-center transform transition-transform duration-200 active:scale-95 hover:scale-105 rounded-[12px]"
      >
        <LargeButton
          text="Elegir una carta al azar"
          icon={DadosIcon}
          bgColor="bg-[#3a3a3a]"
        />
      </Link>
      <div className="flex flex-wrap gap-4 p-5 justify-center">
        {cards?.map((e, i) => (
          <CardPreview
            key={i}
            image={
              e.answer.includes("http") || e.answer.includes("data:image")
                ? e.answer
                : ""
            }
            cardName={e.question || "-"}
          />
        ))}
        {arrayDeck.map((e) => (
          <CardPreview
            key={e}
            image={`/decks/${actualDeck?.deckSlug}/${e}.png`}
            cardName={`${e}`}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
