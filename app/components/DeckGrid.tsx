import { DeckDB } from "@/types/Deck";
import React from "react";
import DeckPreview from "./DeckPreview";
import { v4 as uuidv4 } from "uuid";
import { nameToSlug } from "@/utils/nameToSlug";

interface DeckPreviewProps {
  decks: DeckDB[] | null;
}

const DeckGrid = ({ decks }: DeckPreviewProps) => {
  return (
    <div className="flex gap-7 md:gap-10 flex-wrap justify-center p-8">
      {decks?.map((e, i) => (
        <DeckPreview
          key={uuidv4()}
          src={
            e.image?.includes("http") || e.image?.includes("data:image")
              ? e.image
              : ""
          }
          deckName={e.name}
          // deckSize={e.deckSize || 0}
          deckSlug={nameToSlug(e.name)}
          deckId={e.id}
          deckCreatorId={e.creatorId}
        />
      ))}
    </div>
  );
};

export default DeckGrid;
