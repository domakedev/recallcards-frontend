/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CardControlButtons from "@/app/components/CardControlButtons";

//Skeleton
import "react-loading-skeleton/dist/skeleton.css";
import { getCardById } from "@/services/card.services";
import { CardDB } from "@/types/Card";
import { toast } from "react-toastify";
import CardLevel from "@/app/components/CardLevel";
import { useAppSelector } from "@/redux/hooks";
import { UserDB } from "@/types/User";
import { getCardDifficulty } from "@/services/cardDifficulty.services";
import DeleteCardButton from "@/app/components/Button/DeleteCardButton";
import { DeckDB } from "../../../types/Deck";
import CardAnswerOnlyText from "@/app/components/Card/CardAnswerOnlyText";
import SubjectCard from "@/app/components/Card/SubjetcCard/SubjectCard";

const page = () => {
  const [userDB, setUserDB] = useState<UserDB>();
  const [cardDB, setCardDB] = useState<CardDB>();
  console.log("🚀 ~ page ~ cardDB:", cardDB);
  const [cardDifficult, setCardDifficult] = useState<1 | 2 | 3>();
  const [cardDifficultId, setCardDifficultId] = useState<number>();
  const [actualDeck, setActualDeck] = useState<DeckDB>();

  const params = useParams();
  const userState = useAppSelector((state) => state.user);
  const deckState = useAppSelector((state) => state.deck);

  useEffect(() => {
    const newDeck = {
      id: deckState.id,
      name: deckState.deckName,
      image: deckState.deckImage,
      creatorId: deckState.creatorId,
    };
    setActualDeck(newDeck);
  }, [deckState]);

  useEffect(() => {
    setUserDB(userState);
  }, [userState]);

  const cardName =
    typeof params.card === "string" ? params.card : params.card[0];

  useEffect(() => {
    const getCard = async () => {
      try {
        const res = await getCardById(Number(cardName));
        setCardDB(res.result);
        if (!res.ok) {
          toast.error(res.message);
        }
      } catch (error) {}
    };
    getCard();
  }, [cardName]);

  //Bring card difficulty per user
  useEffect(() => {
    //Llamar al servicio para traer la dificultad de la carta
    if (cardDB && cardDB?.id && userDB) {
      const difficultyFn = async () => {
        const res = await getCardDifficulty({
          userId: userDB.id,
          cardId: cardDB.id,
        });
        res && setCardDifficult(res.difficultyId);
        res && setCardDifficultId(res.id);
      };
      difficultyFn();
    }
  }, [cardDB, userDB]);

  if (!cardDB?.answer) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-blue-500" />
      </div>
    );
  }

  const isCloudinaryImage = () => {
    return cardDB?.answer.startsWith("https://res.cloudinary.com");
  };

  const isAnswerObject = () => {
    try {
      JSON.parse(cardDB.answer);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="min-h-[calc(100vh-136px)]">
      {userDB?.id === 0 ||
      !cardDB?.id ||
      userDB?.id !== cardDB.creatorId ? null : (
        <DeleteCardButton
          userId={userDB.id}
          cardId={cardDB.id}
          cardImage={
            (cardDB?.answer.includes("cloudinary") && cardDB?.answer) || ""
          }
        />
      )}
      <div className="flex flex-col items-center justify-center px-3">
        {cardDB?.id && userDB ? (
          <CardLevel
            cardId={cardDB.id}
            userEmail={userDB.email}
            dificultadActual={cardDifficult}
            cardDifficultId={cardDifficultId}
          />
        ) : (
          <div className="min-h-12" />
        )}
        <div className="relative flex h-fit min-h-max w-full grow justify-center">
          {isCloudinaryImage() ? (
            <Image
              src={cardDB.answer}
              alt="Carta"
              width={1080}
              height={1350}
              className={`rounded-xl shadow-xl ${""} max-h-[625px] w-full max-w-[500px] overflow-y-scroll object-cover`}
              quality={100}
              priority
            />
          ) : isAnswerObject() ? (
            <SubjectCard
              answer={cardDB.answer}
              question={cardDB.question || "-"}
            />
          ) : (
            cardDB.answer && (
              <CardAnswerOnlyText
                question={cardDB.question || "-"}
                answer={cardDB.answer}
              />
            )
          )}
        </div>

        {params.deck === "random" ||
        !actualDeck?.id ||
        actualDeck.id === 0 ? null : (
          <CardControlButtons />
        )}
      </div>
    </div>
  );
};

export default page;
