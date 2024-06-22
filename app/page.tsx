/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import DeckPreview from "./components/DeckPreview";
import NavBar from "./components/NavBar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Deck } from "@/types/Deck";
import { getDecks } from "@/services/deck.services";
import { nameToSlug } from "@/utils/nameToSlug";
import { v4 as uuidv4 } from "uuid";

const page = () => {
  const dispatch = useAppDispatch();
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
            key={uuidv4()}
            src={e.image || ""}
            deckName={e.name}
            deckSize={e.deckSize || 0}
            deckSlug={nameToSlug(e.name)}
            deckId={e.id}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
