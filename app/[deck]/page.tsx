export const dynamic = "force-dynamic";
export const revalidate = 0;

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
import { FaWhatsapp } from "react-icons/fa";

type Props = {
  params: { deck: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<any> {
  // read route params
  const id = params.deck.split("-")[1];

  // fetch data
  const product = await prisma.decks.findUnique({
    where: {
      id: Number(id),
    },
  });

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
      {/* <h2 className=" text-2xl font-bold text-gray-800 my-6">
        Pre-Visualizador
      </h2> */}
      <CardsSlider
        cards={deckCards}
        deckId={+deckId}
      ></CardsSlider>

      <div className="flex flex-col items-center sm:flex-row  gap-3 my-5">
        <CreateDeckButton
          href={"/create-card"}
          text={"Crear Apunte"}
        />
        <DeleteDeckButton />
        <CreateDeckButton
          href={"/create-cards"}
          text={"Crear Apuntes"}
        />
      </div>
      {deckCards.length > 0 ? (
        <div className="  my-6 text-center flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800">Elije una carta</h2>
          <span className="block text-xs text-gray-500">
            Actualiza la página si no aparece tu cambio
          </span>
        </div>
      ) : (
        <div className="  my-6 text-center flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            No hay Apuntes(cards), si eres el creador puedes crear uno como
            imagen o texto.
          </h2>
          <blockquote className="bg-yellow-200 p-4 rounded-lg shadow-md flex items-center gap-2 m-8 w-fit max-w-[800px]">
            <a
              href="https://api.whatsapp.com/send?phone=51943047804&text=Hola%2C%20me%20gustaria%20contactar%20contigo%20sobre%3A%20"
              className="text-green-800 hover:text-green-600 flex"
              target="_blank"
            >
              <p className="text-base font-semibold">
                ⚠️ Si tienes problemas para crear un apunte o tienes dudas,
                escríbeme para ayudarte o solucionar el problema, ¡Gracias!, soy
                el creador:
              </p>
              <FaWhatsapp
                size={24}
                className="min-w-12 self-center"
              />
            </a>
          </blockquote>
        </div>
      )}
      <CardsGrid
        cards={deckCards}
        deckId={+deckId}
      />
    </div>
  );
};

export default React.memo(page);
