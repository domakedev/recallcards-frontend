export const dynamic = "force-dynamic";
export const revalidate = 0;

import NavBar from "./components/NavBar";
import CreateButton from "./components/CreateButton";
import { getDecksAction } from "@/services/deck.actions";
import DeckGrid from "./components/DeckGrid";
import Image from "next/image";
import ImageLanding from "@/public/images/landing-image.jpeg";
import UserAvatar from "./components/Auth/Avatar";
import Navbar from "./components/Navigation/NavBarTUI";

const page = async () => {
  const decks = await getDecksAction();

  return (
    <div className="max-w-5xl mx-auto">
      {/* <NavBar
        title="Repaso Activo"
        goBack={false}
      /> */}

      <div className="flex justify-center mb-6">
        <ActiveRecallBanner />
        {/* <CreateButton
          showCondition={"userAuth"}
          route={"/create-deck"}
        /> */}
      </div>

      <h1 className=" text-2xl font-semibold text-gray-800 text-center mt-16">
        📚 Decks de la comunidad 🗺️
      </h1>

      <DeckGrid decks={decks} />
    </div>
  );
};

export default page;

const ActiveRecallBanner = () => {
  return (
    <div className="flex flex-col items-center sm:flex-row mx-auto bg-[#101728] max-h-[380px] sm:max-h-fit overflow-hidden">
      <div className="w-full sm:w-1/2 md:pr-8 p-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-green-500">¡Sube</span>{" "}
          <span className="text-yellow-500">tus apuntes,</span>{" "}
          <span className="text-white">repasa</span>{" "}
          <span className="text-red-500">y nunca</span>{" "}
          <span className="text-white">olvides!</span>
        </h1>
        <p className="mb-5 text-gray-200 flex flex-col items-start gap-2">
          <span>🛠️Esta app es una herramienta de estudio</span>
          <span>✨Que usa la técnica: Active Recall, asi...</span>
          <span>⚡Lo que marques como difícil te aparecerá primero!</span>
          <span>✍️Puedes crear tu propias Cards organizadas en ➡️ Decks</span>
        </p>
        <div className="flex justify-start w-fit">
          <CreateButton
            showCondition={"always"}
            route={"/create-deck"}
          />
        </div>
      </div>
      <div className="w-full sm:w-1/2 h-full">
        <Image
          src={ImageLanding}
          alt="Active Recall"
          width={700}
          height={700}
          className=" max-h-[200px] sm:max-h-max object-cover h-full"
        />
      </div>
    </div>
  );
};

ActiveRecallBanner;
