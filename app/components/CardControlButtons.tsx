import DadosIcon from "@/assets/dados-icon.svg";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import LargeButton from "@/app/components/LargeButton";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Decks } from "@/mock/decks";

const CardControlButtons = () => {
  const router = useRouter();
  const params = useParams();

  const cardName = params.card;

  const [disableLeftButton, setDisableLeftButton] = useState(false);
  const [disableRightButton, setDisableRightButton] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardName]);

  const goNext = (condition: boolean) => {
    console.log("Next", condition);

    if (condition) {
      router.push(`/${params.cards}/${Number(params.card) + 1}`);
    }
  };
  const goPrev = (condition: boolean) => {
    console.log("Prev", condition);

    if (condition) {
      router.push(`/${params.cards}/${Number(params.card) - 1}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goNext(!disableRightButton);
      }
      if (event.key === "ArrowLeft") {
        goPrev(!disableLeftButton);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [disableRightButton, disableLeftButton]);

  return (
    <div className="mt-5 flex gap-1 mx-auto">
      <Link
        href={
          !disableLeftButton
            ? `/${params.cards}/${Number(params.card) - 1}`
            : ""
        }
        className="rounded-[12px] w-12 min-h-[60px] bg-[#3a3a3a] flex justify-center items-center transform transition-transform duration-200 active:scale-95 hover:scale-105"
      >
        <FaCaretLeft
          color={`${!disableLeftButton ? "#F8A62B" : "#DDDDDD"}`}
          size={50}
        />
      </Link>
      <Link
        href={`/${params.cards}/${
          Math.floor(Math.random() * (actualDeck?.deckSize || 0)) + 1
        }`}
        className="w-full min-h-[60px] bg-[#3a3a3a] flex justify-center items-center transform transition-transform duration-200 active:scale-95 hover:scale-105 rounded-[12px]"
      >
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
        className="rounded-[12px] w-12 min-h-[60px] bg-[#3a3a3a] flex justify-center items-center transform transition-transform duration-200 active:scale-95 hover:scale-105"
      >
        <FaCaretRight
          color={`${!disableRightButton ? "#38B6FF" : "#DDDDDD"}`}
          size={50}
        />
      </Link>
    </div>
  );
};

export default CardControlButtons;
