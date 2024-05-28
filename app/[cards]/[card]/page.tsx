/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import NavBar from "@/app/components/NavBar";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import CardImage from "@/assets/image-card-example.jpg";
import DadosIcon from "@/assets/dados-icon.svg";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import LargeButton from "@/app/components/LargeButton";
import { useParams, usePathname } from "next/navigation";
import { Decks } from "@/mock/decks";
import Link from "next/link";

const page = () => {
  const [disableLeftButton, setDisableLeftButton] = useState(false);
  const [disableRightButton, setDisableRightButton] = useState(false);
  const pathname = usePathname();

  const params = useParams();

  const cardName = params.card;

  const actualDeck = Decks.find((deck) => deck.deckSlug === params.cards);

  useEffect(() => {
    const numberCard = Number(cardName);
    if (numberCard === 1) {
      setDisableLeftButton(true);
    }
    if (numberCard > 1) {
      setDisableLeftButton(false);
    }
    if (numberCard === Number(actualDeck?.deckSize)) {
      setDisableRightButton(true);
    }
    if (numberCard < Number(actualDeck?.deckSize)) {
      setDisableRightButton(false);
    }
  }, [cardName]);

  return (
    <>
      <NavBar
        title={`${actualDeck?.deckName} | ${cardName} de ${actualDeck?.deckSize}`}
        goBack
      />
      <div className="flex flex-col justify-center px-3">
        <Image
          src={`/decks/${actualDeck?.deckSlug}/${cardName}.png`}
          className="w-full max-w-[500px] mx-auto shadow-xl rounded-xl"
          alt="Carta"
          width={1080}
          height={1350}
        />
        <div className="mt-5 flex gap-1 mx-auto">
          <Link
            href={
              !disableLeftButton
                ? `/${params.cards}/${Number(params.card) - 1}`
                : ""
            }
            className="rounded-l-[12px] w-6 min-h-[46px] bg-[#3a3a3a] flex justify-center items-center"
          >
            <FaCaretLeft
              color={`${!disableLeftButton ? "#F8A62B" : "#DDDDDD"}`}
              size={25}
            />
          </Link>
          <Link href={`/${params.cards}/${Math.floor(Math.random()* (actualDeck?.deckSize || 0)) + 1}`}>
            <LargeButton
              text="Elegir una carta al azar"
              icon={DadosIcon}
              bgColor="bg-[#3a3a3a]"
            />
          </Link>
          <Link
            href={
              !disableRightButton
                ? `/${params.cards}/${Number(params.card) + 1}`
                : ""
            }
            className="rounded-r-[12px] w-6 min-h-[46px] bg-[#3a3a3a] flex justify-center items-center"
          >
            <FaCaretRight
              color={`${!disableRightButton ? "#38B6FF" : "#DDDDDD"}`}
              size={25}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
