/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import DeckPreview from "./components/DeckPreview";
import NavBar from "./components/NavBar";
import { Decks } from "@/mock/decks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Deck } from "@/types/Deck";
import { getDecks } from "@/services/deck.services";
import { nameToSlug } from "@/utils/nameToSlug";




const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const state = useAppSelector((state) => state.user);

  const [decks, setDecks] = useState<Deck[]>();

  useEffect(() => {
    getDecks().then((data) => setDecks(data.decks));
  }, []);
  return (
    <div>
      <NavBar
        title="Decks"
        goBack={false}
      />
      <div className="flex gap-7 flex-wrap justify-center">
      {decks?.map((e, i) => (
        <DeckPreview
        key={i}
        src={e.image || ""}
        deckName={e.name}
        deckSize={e.deckSize || 0}
        deckSlug={nameToSlug(e.name)}
      />
        ))}
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
