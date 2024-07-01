import React from "react";
import NavBar from "../components/NavBar";
import { redirect } from "next/navigation";

import CardsSlider from "../components/CardSlider/CardsSlider";
import CardsGrid from "../components/CardsGrid";
import CreateDeckButton from "../components/Button/CreateDeckButton";
import prisma from "@/config/db";

const page = async ({ params }: { params: { deck: string } }) => {
  const deckId = params.deck.split("-")[1];

   //x
   if (deckId === undefined || !deckId) {
    redirect("/");
  }

  //Funcion para traer el deck actual por id en prisma
   const deckById = await prisma.decks.findUnique({
    where: {
      id: +deckId,
    },
   })

  //Funcion para traer las cartas del deck con prisma
  const deckCards = await prisma.cards.findMany({
    where: {
      deckId: +deckId,
    },
  });
  //Funcion para traer las dificultades de las cartas del deck

 
  return (
    <div className="w-full flex flex-col items-center">
      <NavBar
        title={`
          ${
            deckById?.name && deckCards?.length
              ? deckById.name + "(" + deckCards?.length + ")"
              : "Selecciona un deck"
          }
        `}
        goBack
      />

      <CardsSlider
        cards={deckCards}
        deckId={+deckId}
      ></CardsSlider>

     <CreateDeckButton/>

      <CardsGrid
        cards={deckCards}
        deckId={+deckId}
      />
    </div>
  );
};

export default React.memo(page);
