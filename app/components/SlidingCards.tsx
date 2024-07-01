import Image from "next/image";
import React from "react";
import CardLevel from "@/app/components/CardLevel";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SlidingCardProps {
  id: number;
  image: string;
  cardName: string;
  userId?: number;
  difficulty?: 1 | 2 | 3;
  cardDifficultyId?: number;
}

const SlidingCard = ({
  image,
  cardName,
  userId,
  difficulty,
  id,
  cardDifficultyId,
}: SlidingCardProps) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-center gap-1 w-full">
      <Link
        href={`${pathname}/${id}`}
        className="relative"
      >
        <Image
          src={image}
          alt={cardName}
          width={1080}
          height={1350}
          className=""
        />
      </Link>
      <CardLevel
        dificultadActual={difficulty}
        cardId={id}
        cardDifficultId={cardDifficultyId}
      />
    </div>
  );
};

export default SlidingCard;
