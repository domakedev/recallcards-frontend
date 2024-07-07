/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import NavBar from "@/app/components/NavBar";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CardControlButtons from "@/app/components/CardControlButtons";
import PlaceHolderIMG from "@/assets/placeholder-ig-img.svg";

//Skeleton
import "react-loading-skeleton/dist/skeleton.css";
import { getCardById } from "@/services/card.services";
import { Card, CardDB } from "@/types/Card";
import { toast } from "react-toastify";
import CardLevel from "@/app/components/CardLevel";
import { useAppSelector } from "@/redux/hooks";
import { UserDB } from "@/types/User";
import { getCardDifficulty } from "@/services/cardDifficulty.services";
import DeleteButton from "@/app/components/Button/DeleteCardButton";
import DeleteCardButton from "@/app/components/Button/DeleteCardButton";
import { DeckDB } from "../../../types/Deck";
import CardAswerOnlyText from "@/app/components/Card/CardAswerOnlyText";

const page = () => {
  const router = useRouter();
  const [showCard, setShowCard] = useState<boolean>(true);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [userDB, setUserDB] = useState<UserDB>();
  const [cardDB, setCardDB] = useState<CardDB>();
  const [cardDifficult, setCardDifficult] = useState<1 | 2 | 3>();
  const [cardDifficultId, setCardDifficultId] = useState<number>();
  const cardsIdsState = useAppSelector((state) => state.deck.cardsIds);
  const [cardsIds, setcardsIds] = useState<number[]>(cardsIdsState);
  const [disableLeftButton, setDisableLeftButton] = useState(false);
  const [disableRightButton, setDisableRightButton] = useState(false);
  const [prevCardNumber, setPrevCardNumber] = useState<number>();
  const [nextCardNumber, setNextCardNumber] = useState<number>();

  const params = useParams();
  const userState = useAppSelector((state) => state.user);

  useEffect(() => {
    setUserDB(userState);
  }, [userState]);

  useEffect(() => {
    if (cardsIds.indexOf(Number(cardName)) === 0) {
      setDisableLeftButton(true);
    }
    if (cardsIds.indexOf(Number(cardName)) === cardsIds.length - 1) {
      setDisableRightButton(true);
    }
    //  ? `${cardsIds[cardsIds.indexOf(Number(cardName)) + 1]}`
    setNextCardNumber(cardsIds[cardsIds.indexOf(Number(cardName)) + 1]);
    setPrevCardNumber(cardsIds[cardsIds.indexOf(Number(cardName)) - 1]);
  }, [cardsIds]);

  const cardName =
    typeof params.card === "string" ? params.card : params.card[0];

  //function than detect the width of an element
  // const getWidth = () => {
  //   const skeletonParent = document.getElementById("skeletonId");
  //   const imgParent = document.getElementById("imgParent");
  //   if (imgParent) {
  //     const imgParentWidth = imgParent.offsetWidth;
  //     const imgParentHeight = imgParent.offsetHeight;
  //     //set height of the imgParent
  //     //insert new style in skeletonWidth
  //     if (skeletonParent) {
  //       skeletonParent.style.height = `${imgParentHeight}px`;
  //       skeletonParent.style.width = `${imgParentWidth}px`;
  //     }
  //   }
  // };
  // useEffect(() => {
  //   getWidth();
  //   window.addEventListener("resize", getWidth);
  //   return () => window.removeEventListener("resize", getWidth);
  // }, []);

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
      //Setear la dificultad de la carta
    }
  }, [cardDB, userDB]);

  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  // La distancia mínima para considerar que fue un deslizamiento
  const minSwipeDistance = 100;

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart - touchEnd > minSwipeDistance) {
      // Deslizamiento a la izquierda
      toast.info("Cargando ⏭️", {
        autoClose: 1000,
      });
      router.push(`${nextCardNumber}`);
    }

    if (touchEnd - touchStart > minSwipeDistance) {
      // Deslizamiento a la derecha
      toast.info("Cargando ⏮️", {
        autoClose: 1000,
      });
      router.push(`${prevCardNumber}`);
    }
  };

  return (
    // <div className="min-h-screen">
    <div className="">
      {/* <NavBar
        title={`${cardDB?.question || cardName}`}
        goBack
      /> */}
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
      <div className="flex flex-col justify-center items-center px-3 ">
        {cardDB?.id && userDB ? (
          <CardLevel
            cardId={cardDB.id}
            userEmail={userDB.email}
            dificultadActual={cardDifficult}
            cardDifficultId={cardDifficultId}
          />
        ) : (
          <div className="min-h-12"></div>
        )}
        <div className="relative w-full max-w-[500px] grow max-h-[625px] mx-auto ">
          <div
            id="imgParent"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className={`min-h-max h-fit`}
          >
            {cardDB?.answer.includes("cloudinary") ? (
              <Image
                src={cardDB?.answer || PlaceHolderIMG}
                alt="Carta"
                width={1080}
                height={1350}
                onLoad={() => setImgLoaded(true)}
                className={` rounded-xl  shadow-xl ${""} max-h-[625px] overflow-y-scroll w-full object-cover`}
                quality={100}
                priority
              />
            ) : (
              cardDB?.question &&
              cardDB?.answer && (
                <CardAswerOnlyText
                  question={cardDB.question}
                  answer={cardDB.answer}
                ></CardAswerOnlyText>
              )
            )}
          </div>

          {/* Como centrar un elemento absolute */}
          {!showCard || !imgLoaded ? null : (
            <div className="">
              <div
                className={`min-w-full min-h-[85%] bg-gray-800 absolute bottom-0 ${
                  showCard ? "blur brightness-100" : ""
                }`}
              ></div>
              <div className="p-4 w-11/12 text-sm  bg-white ring-1 ring-gray-400 rounded-md absolute m-auto left-0 right-0 top-0 bottom-0 text-center self-center">
                <p className="font-bold">¿Ya recordaste este contenido?</p>
                <br />
                <p className="italic">
                  Active Recall es una de las mejores técnicas de estudio,
                  actívala:
                  {/* <iframe
                    className="aspect-video mx-auto rounded-lg my-4"
                    src="https://www.youtube.com/embed/QD-zwXc3dtQ?si=RHDV6-8hMhRpG4iE"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>{" "} */}
                  <br />
                  <br /> ✅Recordando la información <br /> ❌ sin leerla.
                </p>{" "}
                <br />
                <button
                  onClick={() => setShowCard((prev) => !prev)}
                  className="bg-[#3a3a3a] text-white rounded-lg px-4 py-2 mt-2"
                >
                  ¡Verificar respuesta🤔!
                </button>
              </div>
            </div>
          )}
        </div>
        {params.deck === "random" ? null : <CardControlButtons />}
      </div>
    </div>
  );
};

export default page;
