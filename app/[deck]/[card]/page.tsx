/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import NavBar from "@/app/components/NavBar";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Decks } from "@/mock/decks";
import CardControlButtons from "@/app/components/CardControlButtons";

//Skeleton
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getCardById } from "@/services/card.services";
import { Card } from "@/types/Card";
import { toast } from "react-toastify";

const page = () => {
  const [showCard, setShowCard] = useState<boolean>(true);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [cardDB, setCardDB] = useState<Card>();

  const params = useParams();

  const actualDeck = Decks.find((deck) => deck.deckSlug === params.deck);

  const cardName =
    typeof params.card === "string" ? params.card : params.card[0];

  //function than detect the width of an element
  const getWidth = () => {
    const skeletonParent = document.getElementById("skeletonId");
    const imgParent = document.getElementById("imgParent");
    if (imgParent) {
      const imgParentWidth = imgParent.offsetWidth;
      const imgParentHeight = imgParent.offsetHeight;
      //set height of the imgParent
      //insert new style in skeletonWidth
      if (skeletonParent) {
        skeletonParent.style.height = `${imgParentHeight}px`;
        skeletonParent.style.width = `${imgParentWidth}px`;
      }
    }
  };
  useEffect(() => {
    getWidth();
    window.addEventListener("resize", getWidth);
    return () => window.removeEventListener("resize", getWidth);
  }, []);

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

  return (
    <>
      <NavBar
        title={`${cardName}`}
        goBack
      />
      <div className="flex flex-col justify-center px-3">
        <div className="relative w-full max-w-[500px] grow max-h-[625px] mx-auto ">
          <div
            id="imgParent"
            className="min-h-max h-fit"
          >
            {!imgLoaded && (
              // <div className="absolute -top-[4px] w-full">
              /* <Skeleton className="w-full h-[200px] leading-[0px]" /> */
              <div
                id="skeletonId"
                className="absolute top-0 left-0 w-full"
              >
                <Skeleton className="w-full min-h-full skeletonClass" />
              </div>
              // </div>
            )}
            {cardDB?.answer.includes("http") ||
            cardDB?.answer.includes("data:image") ? (
              <Image
                src={cardDB.answer}
                alt="Carta"
                width={1080}
                height={1350}
                onLoad={() => setImgLoaded(true)}
                className={` rounded-xl  shadow-xl  `}
                quality={100}
                priority
              />
            ) : null}
          </div>
          {/* //use Skeleton to show a loading animation */}

          {/* Como centrar un elemento absolute */}
          {!showCard || !imgLoaded ? null : (
            <div className="">
              <div
                className={`min-w-full min-h-[85%] bg-gray-500 absolute bottom-0 ${
                  showCard ? "blur brightness-100" : ""
                }`}
              >
                .
              </div>
              <div className="p-4 w-3/4 h-auto bg-white ring-1 ring-black rounded-md absolute m-auto left-0 right-0 top-0 bottom-0 text-center self-center">
                <p className="font-bold">¿Ya recordaste este contenido?</p>
                <br />
                <p className="italic">
                  Active Recall es la técnica con la cual nunca olvidarás nada.
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
                  ¡Lo tengo claro!...¿🤔?
                </button>
              </div>
            </div>
          )}
        </div>
        <CardControlButtons />
      </div>
    </>
  );
};

export default page;
