"use client";
import React from "react";
import DeckPreview from "./components/DeckPreview";
import NavBar from "./components/NavBar";
import { Decks } from "@/mock/decks";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const state = useAppSelector((state) => state.user);
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
      <ToastContainer />
    </div>
  );
};

export default page;
