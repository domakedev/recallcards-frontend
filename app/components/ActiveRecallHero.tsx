import prisma from "@/config/db";
import CreateButton from "./CreateButton";
import CardsSlider from "./CardSlider/CardsSlider";

const ActiveRecallHero = async () => {
  const deckID = 105;
  const randomCards = await prisma.cards.findMany({
    take: 20,
    orderBy: {
      id: "desc",
    },
    where: {
      deckId: deckID,
    },
  });

  return (
    <div className="mx-auto mb-6 flex flex-col items-center justify-center overflow-hidden bg-[#101728] sm:max-h-fit sm:flex-row">
      <div className="order-2 w-full p-4 sm:order-1 sm:w-1/2 md:pr-8">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
          <span className="text-green-500">¡Crea</span>{" "}
          <span className="text-white">tus flashcards,</span>{" "}
          <span className="text-blue-500">estúdialas</span>{" "}
          <span className="text-white">y</span>{" "}
          <span className="text-yellow-500">registra tu progreso!</span>{" "}
        </h1>
        <p className="mb-5 flex flex-col items-start gap-2 text-sm text-gray-200 md:text-base">
          <span>✍️ Crea tus flashcards dentro de un ➡️ Deck</span>
          <span>
            🛠️ Esta app es una herramienta de estudio{" "}
            <span className="font-bold">¡Gratuita!</span>
          </span>
          <span>✨ Que usa la técnica: Active Recall</span>
          <span>
            {"⚡ Los apuntes que registres como "}
            <span className="rounded-sm bg-red-500 p-1 text-xs font-bold md:text-sm">
              {"Difícil"}
            </span>
            {" te aparecerán primero"}
          </span>
          <span>
            {"⚡ Y los "}
            <span className="rounded-sm bg-green-500 p-1 text-xs font-bold md:text-sm">
              {"Fáciles"}
            </span>
            {" ¡después!"}
          </span>
        </p>
        <div className="flex w-fit justify-start">
          <CreateButton
            showCondition="always"
            route="/create-deck"
          />
        </div>
      </div>
      <div className="order-1 w-5/6 p-1 sm:order-2 sm:w-1/2 md:p-5">
        <CardsSlider
          cards={randomCards}
          showRandomCard={false}
          deckId={deckID}
        />
      </div>
    </div>
  );
};

export default ActiveRecallHero;
