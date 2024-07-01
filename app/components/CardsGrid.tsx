import React from "react";
import CardPreview from "./CardPreview";
import { CardDB, cardsDifficultiesByUserAndDeck } from "@/types/Card";
import LargeButton from "./LargeButton";
import DadosIcon from "@/assets/dados-icon.svg";
import { Deck } from "@/types/Deck";
import { nameToSlug } from "@/utils/nameToSlug";

interface CardsGridProps {
  cards?: CardDB[];
  userId: number;
  difficultyId?: 1 | 2 | 3;
  getCardDifficulty?: (
    userId: number,
    cardId: number,
    cardsDifficultiesByUserAndDeck?: cardsDifficultiesByUserAndDeck
  ) => 1 | 2 | 3 | undefined;
  actualDeck?: Deck;
  cardsDifficultiesByUserAndDeck?: cardsDifficultiesByUserAndDeck;
}

const CardsGrid = ({
  cards,
  userId,
  getCardDifficulty,
  actualDeck,
  cardsDifficultiesByUserAndDeck,
}: CardsGridProps) => {
  return (
    <>
      {cards && actualDeck && (
        <LargeButton
          text={"Ir a una carta al azar"}
          icon={DadosIcon}
          bgColor={"bg-[#3a3a3a]"}
          href={`/deck-${actualDeck.id}-${nameToSlug(actualDeck.name)}/${
            cards[Math.floor(Math.random() * cards.length)].id
          }`}
        ></LargeButton>
      )}
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
            id={e.id}
            userId={userId}
            difficultyId={
              getCardDifficulty &&
              getCardDifficulty(userId, e.id, cardsDifficultiesByUserAndDeck)
            }
          />
        ))}
      </div>
    </>
  );
};

export default CardsGrid;
