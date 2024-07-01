"use client";
import React, { useEffect, useState } from "react";
import CardPreview from "./CardPreview";
import { CardDB, cardsDifficultiesByUserAndDeck } from "@/types/Card";
import LargeButton from "./LargeButton";
import DadosIcon from "@/assets/dados-icon.svg";
import { Deck } from "@/types/Deck";
import { nameToSlug } from "@/utils/nameToSlug";
import { getDecks } from "@/services/deck.services";
import { getCardsDifficultyByDeckId } from "@/services/cardDifficulty.services";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCardDifficulty, sortCards } from "@/lib/card.functions";
import { setCardsIds } from "@/redux/deckSlice";

interface CardsGridProps {
  cards: CardDB[];
  difficultyId?: 1 | 2 | 3;
  cardsDifficultiesByUserAndDeck?: cardsDifficultiesByUserAndDeck;
  deckId: number;
}

const CardsGrid = ({ cards, deckId }: CardsGridProps) => {
  const [actualDeck, setActualDeck] = useState<Deck>();
  const [cardsDifficultiesByUserAndDeck, setcardsDifficultiesByUserAndDeck] =
    useState<cardsDifficultiesByUserAndDeck>();
  const [userId, setUserId] = useState<number>(0);
  const [deckCards, setDeckCards] = useState<CardDB[]>(cards);
  const userState = useAppSelector((state) => state.user);
  const dispacth = useAppDispatch();

  useEffect(() => {
    if (userState) {
      setUserId(userState.id);
    }
    if (!userState.authenticated) {
      setcardsDifficultiesByUserAndDeck(undefined);
    }
  }, [userState]);

  useEffect(() => {
    const idsArr = cards.map((cards: { id: any }) => cards.id);
    // Uso a: "idsArr"  para el random card
    // setDeckCardsIds(idsArr);
    dispacth(setCardsIds(idsArr));
    if (userId === undefined) {
      return;
    }
    if (userId === 0) {
      return setDeckCards(cards);
    }
    if (
      userId !== undefined &&
      userId !== 0 &&
      cardsDifficultiesByUserAndDeck
    ) {
      const resetCards = sortCards(
        cards,
        userId,
        cardsDifficultiesByUserAndDeck
      );
      return setDeckCards(resetCards);
    }
  }, [cards, cardsDifficultiesByUserAndDeck, dispacth, userId]);

  useEffect(() => {
    if (deckId) {
      // getDecks().then((data) => setDecks(data.decks));
      getDecks().then((data) =>
        setActualDeck(
          data.decks?.find((deck: { id: number }) => deck.id === Number(deckId))
        )
      );
    }
    if (userId && deckId) {
      getCardsDifficultyByDeckId({ userId, deckId: Number(deckId) }).then(
        (data) => {
          setcardsDifficultiesByUserAndDeck(data);
        }
      );
    }
  }, [deckId, userId]);

  return (
    <>
      {deckCards && actualDeck && (
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
        {deckCards?.map((e, i) => (
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
