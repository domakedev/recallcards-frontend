import Image from "next/image";
import React from "react";
import CardLevel from "@/app/components/CardLevel";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CardAnswerOnlyText from "./Card/CardAnswerOnlyText";
import { EnglishCard, SimpleCard, SoftwareCard } from "./Card/SubjetcCard";

interface SlidingCardProps {
  id: number;
  answer: string;
  cardName: string;
  userId?: number;
  userEmail?: string;
  difficulty?: 1 | 2 | 3;
  cardDifficultyId?: number;
}

const SlidingCard = ({
  answer,
  cardName,
  userId,
  userEmail,
  difficulty,
  id,
  cardDifficultyId,
}: SlidingCardProps) => {
  const pathname = usePathname();
  return (
    <div className="flex w-full flex-col items-center gap-1 font-normal text-black">
      <Link
        href={pathname === "/" ? "#" : `${pathname}/${id}`}
        // href={`${pathname}/${id}`}
        className="relative w-full"
      >
        {answer?.includes("cloudinary") ? (
          <Image
            src={answer}
            alt={cardName}
            width={1080}
            height={1350}
            className="max-h-[625px] w-full object-cover"
          />
        ) : answer.includes("ingles") ? (
          <EnglishCard
            answer={answer}
            isEditing={false}
            question={cardName}
            className="mx-auto max-h-[525px] overflow-y-auto"
          />
        ) : answer.includes("software") ? (
          <SoftwareCard
            answer={answer}
            isEditing={false}
            question={cardName}
            className="mx-auto max-h-[525px] overflow-y-auto"
          />
        ) : answer.includes("simple") ? (
          <SimpleCard
            answer={answer}
            isEditing={false}
            question={cardName}
            className="mx-auto max-h-[525px] overflow-y-auto"
          />
        ) : (
          <div className="w-full p-1">
            <CardAnswerOnlyText
              question={cardName}
              answer={answer}
            ></CardAnswerOnlyText>
          </div>
        )}
      </Link>

      <CardLevel
        dificultadActual={difficulty}
        cardId={id}
        cardDifficultId={cardDifficultyId}
        userEmail={userEmail}
      />
    </div>
  );
};

export default SlidingCard;
