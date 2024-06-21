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
import { getDecks } from "@/services/deck.services";
import { Deck } from "@/types/Deck";
import { set } from "@cloudinary/url-gen/actions/variable";
import { unSlug } from "@/utils/unSlug";
import { Card } from "@/types/Card";
import { getAllCards } from "@/services/card.services";
import IGIMGPlaceholder from "@/assets/placeholder-ig.jpg"

// declare const require: {
//   context(
//     directory: string,
//     useSubdirectories?: boolean,
//     regExp?: RegExp
//   ): {
//     keys: () => string[];
//     <T>(id: string): T;
//   };
// };

const page = () => {
  const params = useParams();
  console.log("🚀 ~ page ~ params:", params);

  const actualDeck = Decks.find((deck) => deck.deckSlug === params.cards);
  console.log("🚀 ~ page ~ actualDeck:", actualDeck);

  const deckName = unSlug(
    typeof params.cards === "string" ? params.cards : params.cards[0]
  );

  const arrayDeck = Array.from(
    { length: actualDeck?.deckSize || 0 },
    (_, i) => i + 1
  );

  const [cards, setCards] = useState<Card[]>()

  useEffect(() => {
    const cards = async()=> await getAllCards()

    cards().then((data) => setCards(data))
  }, [])

  // eslint-disable-next-line react-hooks/rules-of-hooks

  // Obtener el contexto de todas las imágenes en la carpeta 'images'
  // const imagesContext = require.context('/public/decks/react-entrevista', false, /\.(png|jpe?g|svg)$/);
  // console.log('🚀 ~ imagesContext:', imagesContext)

  // Obtener las rutas de todas las imágenes
  // const imagePaths = imagesContext.keys().map(imagesContext);

  // imagePaths ahora es un array que contiene las rutas de todas las imágenes
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",imagePaths[0].default.src, imagePaths.length);


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
        href={`/${params.cards}/${
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
        {cards?.map((e,i) => (
          <CardPreview
            key={i}
            image={e.answer.includes("http") ? e.answer : ""}
            cardName={e.question || "No hay pregunta"}
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
