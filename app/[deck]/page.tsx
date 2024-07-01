/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useRouter } from "next/navigation";
import { CardDB, cardsDifficultiesByUserAndDeck } from "@/types/Card";
import { getCardsByDeckId } from "@/services/card.services";
import { Deck } from "@/types/Deck";
import { getDecks } from "@/services/deck.services";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Button from "../components/Button";
import { setCardsIds } from "@/redux/deckSlice";
import { getCardsDifficultyByDeckId } from "@/services/cardDifficulty.services";
import {
  getCardDifficulty,
  getCardDifficultyId,
  sortCards,
} from "@/lib/card.functions";

import SlidingCard from "../components/SlidingCards";
import CardsSlider from "../components/CardSlider/CardsSlider";
import { SwiperSlide } from "swiper/react";
import CardsGrid from "../components/CardsGrid";

const page = ({ params }: { params: { deck: string } }) => {
  const userState = useAppSelector((state) => state.user);
  const dispacth = useAppDispatch();
  const router = useRouter();
  const deckId = params.deck.split("-")[1];

  const [deckCards, setDeckCards] = useState<CardDB[]>();
  const [actualDeck, setActualDeck] = useState<Deck>();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();
  const [cardsDifficultiesByUserAndDeck, setcardsDifficultiesByUserAndDeck] =
    useState<cardsDifficultiesByUserAndDeck>();

  useEffect(() => {
    if (userState) {
      setIsAuth(userState.authenticated);
      setUserId(userState.id);
    }
    if (!userState.authenticated) {
      setcardsDifficultiesByUserAndDeck(undefined);
    }
  }, [userState]);

  useEffect(() => {
    if (deckId === undefined || !deckId) {
      router.push("/");
    }
    if (deckId) {
      // getDecks().then((data) => setDecks(data.decks));
      getDecks().then((data) =>
        setActualDeck(
          data.decks?.find((deck: { id: number }) => deck.id === Number(deckId))
        )
      );
      getCardsByDeckId(Number(deckId)).then((data) => {
        if (data && data.length > 0) {
          const idsArr = data.map((data: { id: any }) => data.id);
          // Uso a: "idsArr"  para el random card
          // setDeckCardsIds(idsArr);
          dispacth(setCardsIds(idsArr));
          if (userId === undefined) {
            return;
          }
          if (userId === 0) {
            return setDeckCards(data);
          }
          if (userId !== undefined && userId !== 0 && cardsDifficultiesByUserAndDeck) {
            const resetCards = sortCards(
              data,
              userId,
              cardsDifficultiesByUserAndDeck
            );
            return setDeckCards(resetCards);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId, userId, cardsDifficultiesByUserAndDeck]);

  useEffect(() => {
    if (userId && deckId) {
      getCardsDifficultyByDeckId({ userId, deckId: Number(deckId) }).then(
        (data) => {
          setcardsDifficultiesByUserAndDeck(data);
        }
      );
    }
  }, [userId, deckId]);

  return (
    <div className="w-full flex flex-col items-center">
      <NavBar
        title={`
          ${
            actualDeck?.name && deckCards?.length
              ? actualDeck.name + "(" + deckCards?.length + ")"
              : "Selecciona un deck"
          }
        `}
        goBack
      />

      {/* @TODO: Mejorar esto  */}
      <CardsSlider>
        {deckCards?.map((e, i) => (
          <SwiperSlide key={i}>
            <SlidingCard
              key={i}
              image={
                e.answer.includes("http") || e.answer.includes("data:image")
                  ? e.answer
                  : ""
              }
              cardName={e.question || "-"}
              id={e.id}
              userId={userId}
              difficulty={getCardDifficulty(
                userId,
                e.id,
                cardsDifficultiesByUserAndDeck
              )}
              cardDifficultyId={getCardDifficultyId(
                userId,
                e.id,
                cardsDifficultiesByUserAndDeck
              )}
            />
          </SwiperSlide>
        ))}
      </CardsSlider>

      {isAuth && userId === actualDeck?.creatorId ? (
        <Button href="/create-card">Crear Card</Button>
      ) : null}

      <CardsGrid
        cards={deckCards}
        userId={userId || 0}
        getCardDifficulty={getCardDifficulty}
        actualDeck={actualDeck}
        cardsDifficultiesByUserAndDeck={cardsDifficultiesByUserAndDeck}
      />
    </div>
  );
};

export default React.memo(page);
