export const dynamic = "force-dynamic";
export const revalidate = 0;

import NavBar from "./components/NavBar";
import CreateButton from "./components/CreateButton";
import { getDecksAction } from "@/services/deck.actions";
import DeckGrid from "./components/DeckGrid";
import Image from "next/image";
import ImageLanding from "@/public/images/landing-image.jpeg";
import UserAvatar from "./components/Auth/Avatar";
import Navbar from "./components/Navigation/NavBarTUI";
import CardsSlider from "./components/CardSlider/CardsSlider";
import prisma from "@/config/db";

const page = async () => {
  const decks = await getDecksAction();

  return (
    <div className="max-w-5xl mx-auto">
      {/* <NavBar
        title="Repaso Activo"
        goBack={false}
      /> */}

      <div className="flex justify-center mb-6">
        <ActiveRecallBanner />
        {/* <CreateButton
          showCondition={"userAuth"}
          route={"/create-deck"}
        /> */}
      </div>

      <h1 className=" text-2xl font-semibold text-gray-800 text-center mt-16">
        📚 Decks de la comunidad 👨‍🎓👩‍🎓
      </h1>

      <DeckGrid decks={decks} />
    </div>
  );
};

export default page;

const ActiveRecallBanner = async () => {
  const deckID = 2;
  const randomCards = await prisma.cards.findMany({
    take: 10,
    where: {
      deckId: deckID,
    },
  });

  return (
    <div className="flex flex-col items-center sm:flex-row mx-auto bg-[#101728]  sm:max-h-fit overflow-hidden ">
      <div className="w-full sm:w-1/2 md:pr-8 p-4 order-2 sm:order-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-white">¡Sube</span>{" "}
          <span className="text-white">tus apuntes,</span>{" "}
          <span className="text-green-500">repasa,</span>{" "}
          <span className="text-yellow-500">registra</span>{" "}
          <span className="text-red-500">y nunca </span>{" "}
          <span className="text-white">los olvides!</span>
        </h1>
        <p className="mb-5 text-gray-200 flex flex-col items-start gap-2 text-sm md:text-base">
          <span>
            🛠️ Esta app es una herramienta de estudio{" "}
            <span className="font-bold">¡Gratuita!</span>
          </span>
          <span>✨ Que usa la técnica: Active Recall</span>
          <span>
            {"⚡ Lo que registres como "}
            <span className="bg-red-500 p-1 text-xs md:text-sm rounded-sm font-bold">
              {"Difícil"}
            </span>
            {" te aparecerá primero"}
          </span>
          <span>
            {"⚡ Y lo "}
            <span className="bg-green-500 p-1 text-xs md:text-sm rounded-sm font-bold">
              {"Fácil"}
            </span>
            {" ¡después!"}
          </span>
          <span>✍️ Para crear tus apuntes primero crea un ➡️ Deck</span>
        </p>
        <div className="flex justify-start w-fit">
          <CreateButton
            showCondition={"always"}
            route={"/create-deck"}
          />
        </div>
      </div>
      <div className="p-1 md:p-5 w-5/6 sm:w-1/2 order-1 sm:order-2 ">
        {/* <Image
          src={ImageLanding}
          alt="Active Recall"
          width={700}
          height={700}
          className=" max-h-[200px] sm:max-h-max object-cover h-full"
        /> */}
        <CardsSlider
          cards={randomCards}
          showRandomCard={false}
          deckId={deckID}
        ></CardsSlider>
      </div>
    </div>
  );
};

ActiveRecallBanner;
