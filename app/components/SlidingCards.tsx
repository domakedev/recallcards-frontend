import Image from "next/image";
import React from "react";
import CardLevel from "@/app/components/CardLevel";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CardAswerOnlyText from "./Card/CardAswerOnlyText";

interface SlidingCardProps {
  id: number;
  image: string;
  cardName: string;
  userId?: number;
  userEmail?: string;
  difficulty?: 1 | 2 | 3;
  cardDifficultyId?: number;
}

const SlidingCard = ({
  image,
  cardName,
  userId,
  userEmail,
  difficulty,
  id,
  cardDifficultyId,
}: SlidingCardProps) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-center gap-1 w-full">
      <Link
        href={`${pathname}/${id}`}
        className="relative w-full"
      >
        {image?.includes("cloudinary") ? (
          <Image
            src={image}
            alt={cardName}
            width={1080}
            height={1350}
            className="max-h-[625px] w-full object-cover"
          />
        ) : (
          <div className="w-full p-1">
            <CardAswerOnlyText
              question={cardName}
              answer={image}
            ></CardAswerOnlyText>
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
