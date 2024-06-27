"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import PlaceHolderIMG from "@/assets/placeholder-ig-img.svg";
import { getCardDifficulty } from "@/services/cardDifficulty.services";

interface CardViewProps {
  image: string;
  // image: StaticImageData;
  cardName: string;
  id: number;
  userId?: number;
  difficultyId?: 1 | 2 | 3;
}
const CardPreview: React.FC<CardViewProps> = ({
  image,
  cardName,
  id,
  userId,
  difficultyId,
}) => {
  const [cardDifficulty, setCardDifficulty] = useState<1 | 2 | 3>();
  //useRef render Counter
  // const renderCounter = useRef(0);
  // useEffect(() => {
  //   renderCounter.current = renderCounter.current + 1;
  // });

  useEffect(() => {
    if (difficultyId) {
      setCardDifficulty(difficultyId);
    }
  }, [difficultyId]);

  // useEffect(() => {
  //   if (userId) {
  //   getCardDifficulty({ userId, cardId: id }).then((data) => {
  //     setCardDifficulty(data?.difficultyId);
  //   });
  //   }
    
     // eslint-disable-next-line react-hooks/exhaustive-deps    
  // }, [userId]);

  const pathname = usePathname();

  const getColor = (nivel: number | undefined) => {
    switch (nivel) {
      case 1:
        return "bg-green-500 text-white";
      case 2:
        return "bg-yellow-500 text-white";
      case 3:
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400 text-black";
    }
  };
  return (
    <Link
      href={`${pathname}/${id}`}
      className="relative"
    >
      {/* <p>
        Render Counter: <span>{renderCounter.current}</span>
      </p> */}
      <Image
        className="object-cover max-w-[160px] rounded-[10px] shadow-lg transform transition-transform duration-200 active:scale-95 hover:scale-105"
        src={image === "" ? PlaceHolderIMG : image}
        alt="Carta vista previa"
        width={540}
        height={675}
      />
      {/* Circle in the top right corner */}
      <div
        className={`absolute top-0 right-0 w-4 h-4 ${getColor(
          cardDifficulty
        )} rounded-bl-md flex items-center justify-center shadow-lg`}
      >
        <p className="text-black font-bold"></p>
      </div>
    </Link>
  );
};

export default React.memo(CardPreview);
