import DadosIcon from "@/assets/dados-icon.svg";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import LargeButton from "@/app/components/LargeButton";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

const CardControlButtons = () => {
  const cardsIdsState = useAppSelector((state) => state.deck.cardsIds);
  const router = useRouter();
  const params = useParams();

  const cardName = params.card;

  const [disableLeftButton, setDisableLeftButton] = useState(false);
  const [disableRightButton, setDisableRightButton] = useState(false);
  const [randomCardNumber, setRandomCardNumber] = useState<number>(0);
  const [cardsIds, setcardsIds] = useState<number[]>(cardsIdsState);


  useEffect(() => {
    setRandomCardNumber(
      Math.floor(Math.random() * (cardsIds.length)) 
    );
  }, [cardsIds]);

  const goNext = (condition: boolean) => {
    if (condition) {
      router.push(`/${params.deck}/${Number(params.card) + 1}`);
    }
  };
  const goPrev = (condition: boolean) => {
    if (condition) {
      router.push(`/${params.deck}/${Number(params.card) - 1}`);
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

  useEffect(() => {
    if (cardsIds.indexOf(Number(cardName)) === 0) {
      setDisableLeftButton(true);
    }
    if (cardsIds.indexOf(Number(cardName)) === cardsIds.length - 1) {
      setDisableRightButton(true);
    }
  }, [cardsIds]);

  return (
    <div className="mt-5 flex gap-1 mx-auto">
      <Link
        href={
          !disableLeftButton
            ? `${cardsIds[cardsIds.indexOf(Number(cardName)) - 1]}`
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
        href={`${cardsIds[randomCardNumber]}`}
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
            ? `${cardsIds[cardsIds.indexOf(Number(cardName)) + 1]}`
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
