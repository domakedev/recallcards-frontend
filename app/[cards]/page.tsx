"use client";

import React from "react";
import NavBar from "../components/NavBar";
import CardPreview from "../components/CardPreview";
import CardImage from "@/assets/image-card-example.jpg";
import DadosIcon from "@/assets/dados-icon.svg";
import LargeButton from "../components/LargeButton";
import { StaticImageData } from "next/image";
import { DeckType } from "@/types/Deck";
import { useParams } from "next/navigation";
import { Decks } from "@/mock/decks";
import Link from "next/link";

interface DeckObj {
  deckObj: DeckType;
}

declare const require: {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp
  ): {
    keys: () => string[];
    <T>(id: string): T;
  };
};

const page: React.FC<DeckObj> = ({ deckObj }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useParams();

  const actualDeck = Decks.find((deck) => deck.deckSlug === params.cards);

  const arrayDeck = Array.from(
    { length: actualDeck?.deckSize || 0 },
    (_, i) => i + 1
  );

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
          "Cartas de: " + actualDeck?.deckName ||
          "No has seleccionado un deck o no se ha encontrado"
        }
        goBack
      />
      <Link href={`/${params.cards}/${Math.floor(Math.random()* (actualDeck?.deckSize || 0)) + 1}`}>
        <LargeButton
          text="Elegir una carta al azar"
          icon={DadosIcon}
          bgColor="bg-[#3a3a3a]"
        />
      </Link>
      <div className="flex flex-wrap gap-4 p-5 justify-center">
        {arrayDeck.map((e) => (
          <CardPreview
            key={e}
            image={`/decks/${actualDeck?.deckSlug}/${e}.png`}
            cardName={`${e}`}
          />
        ))}
        {/* <CardPreview image={CardImage} />
        <CardPreview image={CardImage} />
        <CardPreview image={CardImage} /> */}
      </div>
    </div>
  );
};

export default page;
