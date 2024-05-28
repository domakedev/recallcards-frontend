import React from "react";
import DeckPreview from "./components/DeckPreview";
import NavBar from "./components/NavBar";
import { Decks } from "@/mock/decks";

const page = () => {
  return (
    <div>
      <NavBar
        title="Decks"
        goBack={false}
      />
      <div className="flex gap-7 flex-wrap justify-center">
        {Decks?.map((d) => (
          <DeckPreview
            key={d.deckName}
            src={d.deckImage}
            deckName={d.deckName}
            deckSize={d.deckSize}
            deckSlug={d.deckSlug}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
