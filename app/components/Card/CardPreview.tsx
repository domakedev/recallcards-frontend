"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import PlaceHolderIMG from "@/assets/placeholder-ig-img.svg";
import { useAppSelector } from "@/redux/hooks";

interface CardViewProps {
  image: string;
  cardName: string;
  id: number;
  userId?: number;
  difficultyId?: 1 | 2 | 3;
}
const CardPreview: React.FC<CardViewProps> = ({
  image,
  cardName,
  id,
  difficultyId,
}) => {
  const userState = useAppSelector((state) => state.user);

  const CardDifficulty = useMemo(() => {
    if (userState.authenticated && difficultyId) {
      return difficultyId;
    } else {
      return undefined;
    }
  }, [userState, difficultyId]);

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
      {image?.startsWith("https://res.cloudinary.com") ? (
        <Image
          className="max-w-[160px] transform rounded-[10px] object-cover shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 sm:max-w-[200px] md:max-w-[250px]"
          src={image === "" ? PlaceHolderIMG : image}
          alt="Carta vista previa"
          width={540}
          height={675}
        />
      ) : (
        <div className="flex h-[200px] min-h-[200px] w-[160px] items-center justify-center rounded-xl border-2 border-gray-800 bg-[#101728] p-6 shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 sm:h-[250px] sm:w-[200px] md:h-[312.5px] md:w-[250px]">
          <h1 className="max-w-[150px] text-ellipsis break-words text-xs font-bold text-gray-100 sm:text-base md:text-lg">
            {cardName}
          </h1>
        </div>
      )}
      <div
        className={`absolute right-0 top-0 h-4 w-4 rounded-bl-md ${getColor(CardDifficulty)}`}
      />
    </Link>
  );
};

export default React.memo(CardPreview);
