/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import CardPreview from "../components/CardPreview";
import DadosIcon from "@/assets/dados-icon.svg";
import LargeButton from "../components/LargeButton";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CardDB } from "@/types/Card";
import { getCardsByDeckId } from "@/services/card.services";
import { Deck } from "@/types/Deck";
import { getDecks } from "@/services/deck.services";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Button from "../components/Button";
import { setCardsIds } from "@/redux/deckSlice";
import { getCardsDifficultyByDeckId } from "@/services/cardDifficulty.services";
import { nameToSlug } from "@/utils/nameToSlug";

//Swiper
// Import Swiper React components
import { SwiperSlide, Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "./styles.css";

// import required modules
import { EffectCards } from "swiper/modules";
import SlidingCard from "../components/SlidingCards";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

const page = () => {
  const userState = useAppSelector((state) => state.user);
  const dispacth = useAppDispatch();
  const params = useParams();
  const router = useRouter();
  const deckId =
    typeof params.deck === "string"
      ? params.deck.split("-")[1]
      : params.deck[0].split("-")[1];

  const [deckCards, setDeckCards] = useState<CardDB[]>();
  const [actualDeck, setActualDeck] = useState<Deck>();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();
  const [cardsDifficultiesByUserAndDeck, setcardsDifficultiesByUserAndDeck] =
    useState<
      {
        id: number;
        userId: number;
        cardId: number;
        difficultyId: 1 | 2 | 3;
        deckId: number;
      }[]
    >();

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
          const cardsWithDifficulty = data.map((card: CardDB) => {
            if (
              userId &&
              cardsDifficultiesByUserAndDeck &&
              cardsDifficultiesByUserAndDeck?.length > 0
            ) {
              const cardDifficulty = getCardDifficulty(userId, card.id);
              const newCard = { ...card, cardDifficulty };
              return newCard;
            }
            return card;
          });
          const sortedCards = cardsWithDifficulty.sort(
            (a: { cardDifficulty: number }, b: { cardDifficulty: number }) => {
              return b.cardDifficulty - a.cardDifficulty;
            }
          );
          const resetCards = sortedCards.map((card: any) => {
            if (card != null) {
              delete card["cardDifficulty"];
            } else {
              console.log("El objeto 'card' es undefined o null.");
            }
            return card;
          });
          return setDeckCards(resetCards);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId, userId, cardsDifficultiesByUserAndDeck]);

  const swiperRef = useRef<SwiperType | null>(null);

  const goToSlide = () => {
    const random = deckCards?.length
      ? deckCards[Math.floor(Math.random() * deckCards.length)].id
      : 0;
    if (swiperRef.current) {
      swiperRef.current.slideTo(random);
    }
  };

  useEffect(() => {
    if (userId && deckId) {
      getCardsDifficultyByDeckId({ userId, deckId: Number(deckId) }).then(
        (data) => {
          setcardsDifficultiesByUserAndDeck(data);
        }
      );
    }
  }, [userId, deckId]);

  const getCardDifficulty = (
    userId: number | undefined,
    cardId: number | undefined
  ) => {
    if (
      cardsDifficultiesByUserAndDeck &&
      cardsDifficultiesByUserAndDeck?.length > 0 &&
      userId &&
      cardId
    ) {
      const card = cardsDifficultiesByUserAndDeck.find(
        (e) => e.cardId === cardId && e.userId === userId
      );
      return card?.difficultyId;
    }
    return;
  };

  const getCardDifficultyId = (
    userId: number | undefined,
    cardId: number | undefined
  ) => {
    if (
      cardsDifficultiesByUserAndDeck &&
      cardsDifficultiesByUserAndDeck?.length > 0 &&
      userId &&
      cardId
    ) {
      const card = cardsDifficultiesByUserAndDeck.find(
        (e) => e.cardId === cardId && e.userId === userId
      );
      return card?.id;
    }
    return;
  };
  return (
    <div className="w-full flex flex-col items-center">
      <NavBar
        title={`
          ${
            actualDeck?.name
              ? actualDeck.name + "(" + deckCards?.length + ")"
              : "Seleccionado un deck"
          }
        `}
        goBack
      />

      <div className="w-full overflow-hidden mb-2">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
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
                difficultyId={getCardDifficulty(userId, e.id)}
                cardDifficultyId={getCardDifficultyId(userId, e.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {deckCards && actualDeck ? (
        <>
          <div
            className="bg-[#2a9c97] active:scale-95 hover:scale-105 rounded-[12px] transform transition-transform duration-200 mb-10"
            onClick={() => goToSlide()}
          >
            <LargeButton
              text=" Ver una carta al azar"
              icon={DadosIcon}
              bgColor="bg-[#2a9c97]"
            />
           
          </div>
          <Link
            href={`/deck-${actualDeck.id}-${nameToSlug(actualDeck.name)}/${
              deckCards[Math.floor(Math.random() * deckCards.length)].id
            }`}
            className=" bg-[#3a3a3a] active:scale-95 hover:scale-105 rounded-[12px] transform transition-transform duration-200"
          >
            <LargeButton
              text="Ir a una carta al azar"
              icon={DadosIcon}
              bgColor="bg-[#3a3a3a]"
            />
          </Link>
        </>
      ) : null}
      {isAuth && userId === actualDeck?.creatorId ? (
        <Link href={`/create-card`}>
          <Button>Crear Card</Button>
        </Link>
      ) : null}

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
            difficultyId={getCardDifficulty(userId, e.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(page);
