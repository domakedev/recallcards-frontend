"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

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
        className="object-cover w-32 h-40 rounded-[10px] shadow-lg"
        src={image}
        alt="Carta vista previa"
        width={128}
        height={160}
      />
    </Link>
  );
};

export default CardPreview;
