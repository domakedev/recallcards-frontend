//Swiper
// Import Swiper React components
import { SwiperSlide, Swiper } from "swiper/react";
import { getCardsDifficultyByDeckId } from "@/services/cardDifficulty.services";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "./styles.css";

// import required modules
import { EffectCards } from "swiper/modules";
import SlidingCard from "../SlidingCards";
import type { Swiper as SwiperType } from "swiper";
import React, { useEffect, useRef, useState } from "react";
import { CardDB } from "@/types/Card";
import LargeButton from "../LargeButton";
import DadosIcon from "@/assets/dados-icon.svg";

interface CardsSliderProps {
  // cards: CardDB[];
  children: React.ReactNode;
}

const CardsSlider = ({ children }: CardsSliderProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const numeroDeHijos = React.Children.count(children);

  const goToSlide = () => {
    if (swiperRef.current) {
      const random = Math.floor(Math.random() * numeroDeHijos);
      // const random = numeroDeHijos?.length
      //   ? Math.floor(Math.random() * numeroDeHijos.length)
      //   : 0;
      swiperRef.current.slideTo(random);
    }
  };

  return (
    <div className="w-full overflow-hidden mb-2 flex flex-col items-center gap-2">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {children}
      </Swiper>
      {numeroDeHijos > 1 && (
        <LargeButton
          text=" Ver una carta al azar"
          icon={DadosIcon}
          bgColor="bg-[#2a9c97]"
          onClick={() => goToSlide()}
        />
      )}
    </div>
  );
};

export default CardsSlider;
