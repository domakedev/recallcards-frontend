"use client";
//Swiper
// Import Swiper React components
import { SwiperSlide, Swiper } from "swiper/react";
import { getCardsDifficultyByDeckId } from "@/services/cardDifficulty.services";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "./styles.css";

// import required modules
import { EffectCards } from "swiper/modules";
import SlidingCard from "../SlidingCards";
import type { Swiper as SwiperType } from "swiper";
import React, { useEffect, useRef, useState } from "react";
import { CardDB, cardsDifficultiesByUserAndDeck } from "@/types/Card";
import LargeButton from "../LargeButton";
import DadosIcon from "@/assets/dados-icon.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getCardDifficulty,
  getCardDifficultyId,
  sortCards,
} from "@/lib/card.functions";
import { setCardsIds } from "@/redux/deckSlice";
import { useRouter } from "next/navigation";
import { getDecks } from "@/services/deck.services";
import { Deck } from "@/types/Deck";

interface CardsSliderProps {
  cards: CardDB[];
  // children: React.ReactNode;
  deckId: number;
  showRandomCard?: boolean;
}

const CardsSlider = ({ cards, deckId, showRandomCard = true }: CardsSliderProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const dispacth = useAppDispatch();

  // const numeroDeHijos = React.Children.count(children);
  const userState = useAppSelector((state) => state.user);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();
  const [userEmail, setUserEmail] = useState<string>();
  const [cardsDifficultiesByUserAndDeck, setcardsDifficultiesByUserAndDeck] =
    useState<cardsDifficultiesByUserAndDeck>();
  const [deckCards, setDeckCards] = useState<CardDB[]>(cards);
  const [actualDeck, setActualDeck] = useState<Deck>();

  const router = useRouter();

  useEffect(() => {
    if (userState) {
      setIsAuth(userState.authenticated);
      setUserId(userState.id);
      setUserEmail(userState.email);
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
    }
    if (userId && deckId) {
      getCardsDifficultyByDeckId({ userId, deckId: Number(deckId) }).then(
        (data) => {
          setcardsDifficultiesByUserAndDeck(data);
        }
      );
    }
  }, [deckId, userId]);

  const goToSlide = () => {
    if (swiperRef.current) {
      // const random = Math.floor(Math.random() * numeroDeHijos);
      const random = cards?.length
        ? Math.floor(Math.random() * cards.length)
        : 0;
      swiperRef.current.slideTo(random);
    }
  };

  return (
    <div className="w-full overflow-hidden mb-2 flex flex-col items-center gap-2 my-5">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {deckCards.map((e, i) => (
          <SwiperSlide key={i}>
            <SlidingCard
              key={i}
              image={e.answer}
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
              userEmail={userEmail}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {showRandomCard ? (
        <>
          {cards.length > 1 && (
            <LargeButton
              text=" Ver una carta al azar"
              icon={DadosIcon}
              bgColor="bg-[#2a9c97]"
              onClick={() => goToSlide()}
            />
          )}
        </>
      ) : null}
    </div>
  );
};

export default CardsSlider;
