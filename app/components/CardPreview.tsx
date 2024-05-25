'use client'

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from 'next/navigation'

interface CardViewProps {
  image: StaticImageData;
}
const CardPreview: React.FC<CardViewProps> = ({ image }) => {
  const pathname = usePathname()
  return (
    <Link href={`${pathname}/card`}>
      <Image
        className="object-cover w-32 h-40 rounded-[10px] shadow-lg"
        src={image}
        alt="Carta vista previa"
      />
    </Link>
  );
};

export default CardPreview;
