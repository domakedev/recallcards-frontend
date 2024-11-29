/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import "./styles.css";
import { Deck } from "@/types/Deck";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import Button from "../components/Button";
import DeckForm from "./components/DeckForm";

const page = () => {
  const [deck, setDeck] = useState<Deck>({
    name: "",
    image: "",
    creatorId: 0,
  });
  const [isAuth, setIsAuth] = useState(false);
  const userState = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!userState.authenticated) {
      setIsAuth(false);
      toast.error("Para crear un deck regístrate o inicia sesión.");
    }
    if (userState.authenticated) {
      setDeck({ ...deck, creatorId: userState.id });
      setIsAuth(true);
    }
  }, [userState]);

  return (
    <div className="flex min-h-[calc(100vh-136px)] items-center justify-center bg-gray-100 px-2 py-8">
      <div className="z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-lg sm:p-10">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Crea un nuevo Deck
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Usa un nombre para <strong>identificar</strong> el{" "}
            <strong>tema</strong> de tu deck y luego dentro podrás crear tus
            flashcards ¡gratis!✨
          </p>
        </div>
        <DeckForm
          deck={deck}
          setDeck={setDeck}
          isAuth={isAuth}
        />
        {!isAuth && (
          <>
            <Button
              href="/auth/login"
              className="w-full rounded-md bg-green-600 text-sm font-normal shadow-none"
            >
              Iniciar Sesión
            </Button>
            <Button
              href="/auth/register"
              className="w-full rounded-md bg-blue-600 text-sm font-normal shadow-none"
            >
              Registrarme
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
