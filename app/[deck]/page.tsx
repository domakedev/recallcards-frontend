/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import CardPreview from "../components/CardPreview";
import DadosIcon from "@/assets/dados-icon.svg";
import LargeButton from "../components/LargeButton";
import { useParams, useRouter } from "next/navigation";
import { Decks } from "@/mock/decks";
import Link from "next/link";
import { unSlug } from "@/utils/unSlug";
import { getAllCards } from "@/services/card.services";
import { Card } from "@/types/Card";
import { getCardsByDeckId } from "@/services/card.services";
import { v4 as uuidv4 } from "uuid";
import { Deck } from "@/types/Deck";
import { getDecks } from "@/services/deck.services";
import { useAppSelector } from "@/redux/hooks";

const page = () => {
  const userState = useAppSelector((state) => state.user);
  const params = useParams();
  const router = useRouter();
  const deckId =
    typeof params.deck === "string"
      ? params.deck.split("-")[1]
      : params.deck[0].split("-")[1];

  const [deckCards, setDeckCards] = useState<Card[]>();
  const [decks, setDecks] = useState<Deck[]>();
  const [actualDeck, setActualDeck] = useState<Deck>();

  useEffect(() => {
    if (deckId === undefined) {
      router.push("/");
    }
    if (deckId) {
      getDecks().then((data) => setDecks(data.decks));
      getCardsByDeckId(Number(deckId)).then((data) => {
        return setDeckCards(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId]);

  useEffect(() => {
    if (decks && deckId) {
      const actualDeck = decks?.find((deck) => deck.id === Number(deckId));
      setActualDeck(actualDeck);
    }
  }, [decks, deckId]);

  return (
    <div className="w-full flex flex-col items-center">
      <NavBar
        title={
          "Cartas de: " + actualDeck?.name ||
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

      {/* <button
        onClick={() =>
          console.log("Abrir modal o página para crear un nuevo deck.")
        }
        className="mt-5 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        Crear Deck
      </button> */}

      <div className="flex flex-wrap gap-4 p-5 justify-center">
        {deckCards?.map((e, i) => (
          <CardPreview
            key={uuidv4()}
            image={
              e.answer.includes("http") || e.answer.includes("data:image")
                ? e.answer
                : ""
            }
            cardName={e.question || "-"}
            id={e.id}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
