"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import PlaceHolderIMG from "@/assets/placeholder-ig-img.svg";

interface CardViewProps {
  image: string;
  // image: StaticImageData;
  cardName: string;
}
const CardPreview: React.FC<CardViewProps> = ({ image, cardName }) => {
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/${cardName}`}>
      <Image
        className="object-cover max-w-[160px] rounded-[10px] shadow-lg transform transition-transform duration-200 active:scale-95 hover:scale-105"
        src={image === "" ? PlaceHolderIMG : image}
        alt="Carta vista previa"
        width={540}
        height={675}
      />
    </Link>
  );
};

export default CardPreview;
