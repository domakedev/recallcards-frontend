/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import DeckPreview from "./components/DeckPreview";
import NavBar from "./components/NavBar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Deck, DeckDB } from "@/types/Deck";
import { getDecks } from "@/services/deck.services";
import { nameToSlug } from "@/utils/nameToSlug";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { set } from "@cloudinary/url-gen/actions/variable";

const page = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const router = useRouter();

  const [decks, setDecks] = useState<DeckDB[]>();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (userState.authenticated) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [userState]);

  useEffect(() => {
    getDecks().then((data) => setDecks(data.decks));
  }, []);
  return (
    <div>
      <NavBar
        title="Decks"
        goBack={false}
      />
      <div className="mx-auto">
        {isAuth ? (
          <button
            onClick={() => {
              // toast("YEIII")
              //crear timer 2 segundos
              // setTimeout(() => {
              router.push("/create-deck");
              // }, 4000)

              // router.push("/create-deck")}
            }}
            className="mt-5 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 active:scale-95 block mx-auto my-5"
          >
            Crear Deck
          </button>
        ) : null}
      </div>
      <div className="flex gap-7 flex-wrap justify-center">
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
          />
        ))}
      </div>
    </div>
  );
};

export default page;
