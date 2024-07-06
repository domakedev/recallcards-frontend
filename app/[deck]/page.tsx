import React from "react";
import NavBar from "../components/NavBar";
import { redirect } from "next/navigation";

import CardsSlider from "../components/CardSlider/CardsSlider";
import CardsGrid from "../components/CardsGrid";
import CreateDeckButton from "../components/Button/CreateDeckButton";
import prisma from "@/config/db";
import DeleteDeckButton from "../components/Button/DeleteDeckButton";

import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

type Props = {
  params: { deck: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<any> {
  // read route params
  const id = params.deck.split("-")[1];
  console.log("🚀 ~ id :", id);


  // fetch data
  const product = await prisma.decks.findUnique({
    where: {
      id: Number(id),
    },
  });
  console.log("🚀 ~ product:", product);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  if (!product) {
    return {
      title: "Deck not found",
    };
  }

  return {
    title: product.name,
    openGraph: {
      images: [
        {
          url:
            product.image ||
            "https://res.cloudinary.com/domakedev/image/upload/v1720011553/recall-cards/jnla7elnujumhabiw2dz.png",
          alt: product.name || "Repaso Activo",
          width: 1200,
          height: 1200,
        },
      ],
    },
  };
}

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
  });

  if (!deckById) {
    redirect("/");
  }

  //Funcion para traer las cartas del deck con prisma
  const deckCards = await prisma.cards.findMany({
    where: {
      deckId: +deckId,
    },
  });
  //Funcion para traer las dificultades de las cartas del deck

  return (
    <div className="w-full flex flex-col items-center">
      {/* <NavBar
        title={`
          ${
            deckById?.name
              ? deckById.name + "(" + deckCards?.length + ")"
              : "Selecciona un deck"
          }
        `}
        goBack
      /> */}

      <CardsSlider
        cards={deckCards}
        deckId={+deckId}
      ></CardsSlider>

      <CardsGrid
        cards={deckCards}
        deckId={+deckId}
      />
      <div className="flex flex-col items-center sm:flex-row  gap-3 my-5">
        <CreateDeckButton
          href={"/create-card"}
          text={"Crear una Card"}
        />
        <DeleteDeckButton />
        <CreateDeckButton
          href={"/create-cards"}
          text={"Crear varias Cards"}
        />
      </div>
    </div>
  );
};

export default React.memo(page);
