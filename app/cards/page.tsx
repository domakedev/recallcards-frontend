import React from "react";
import NavBar from "../components/NavBar";
import CardPreview from "../components/CardPreview";
import CardImage from "@/assets/image-card-example.jpg";
import DadosIcon from "@/assets/dados-icon.svg";
import LargeButton from "../components/LargeButton";

const page = () => {
  return (
    <div className="bg-red-100 w-full flex flex-col items-center">
      <NavBar title="Cartas de:" goBack />
      <LargeButton 
        text="Elegir una carta al azar"
        icon={DadosIcon}
        bgColor="bg-[#f8f8]"
      />
      <div className="flex flex-wrap gap-4 p-5 justify-center">
        <CardPreview image={CardImage} />
        <CardPreview image={CardImage} />
        <CardPreview image={CardImage} />
        <CardPreview image={CardImage} />
      </div>
    </div>
  );
};

export default page;
