/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import "./styles.css";
import { Deck } from "@/types/Deck";
import { toast } from "react-toastify";
import { createDeck } from "@/services/deck.services";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [deck, setDeck] = useState<Deck>({
    name: "",
    image: "",
    creatorId: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("Crea un nuevo Deck");
  const userState = useAppSelector((state) => state.user);
  // const userState = {
  //   authenticated: true,
  //   id: 1,
  // };

  useEffect(() => {
    if (!userState.authenticated) {
      toast.error("No puedes crear un deck si no estás logeado.");
    }
    if (userState.authenticated) {
      setDeck({ ...deck, creatorId: userState.id });
    }
  }, [userState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeck({ ...deck, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (deck.name.length < 5) {
      toast.error("Escribe un nombre coherente de mínimo 5 caracteres.");
      return;
    }
    if (deck.id === 0) {
      return;
    }
    setIsLoading(true);
    const result = await createDeck(deck);
    if (result.ok) {
      setIsLoading(false);
      setTitle("¡Creado! ¿Uno más?");
      toast.success("Deck Creado");
      setDeck({ name: "", image: "", creatorId: 1 });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Crea notas de tus estudios y repasa siempre que quieras, gratis (por
            ahora 😁).
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label
                htmlFor="name"
                className="sr-only"
              >
                Deck Name
              </label>
              <input
                type="text"
                disabled={!userState.authenticated}
                id="name"
                name="name"
                value={deck.name}
                onChange={handleChange}
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  !userState.authenticated ? "cursor-not-allowed" : ""
                }`}
                placeholder="Deck Name"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="sr-only"
              >
                Deck Image URL
              </label>
              <input
                type="text"
                disabled={!userState.authenticated}
                id="image"
                name="image"
                value={deck.image}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  !userState.authenticated ? "cursor-not-allowed" : ""
                }`}
                placeholder="Deck Image URL"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!userState.authenticated}
              className={`${
                isLoading ? "rainbow-animation" : ""
              } group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                !userState.authenticated ? "cursor-not-allowed" : ""
              }`}
            >
              {userState.authenticated
                ? "Create Deck"
                : "Debes iniciar sesión para crear un deck"}
            </button>
          </div>
        </form>
        {userState.authenticated ? null : (
          <button
            onClick={() => router.push("/auth/login")}
            disabled={userState.authenticated}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 my-4`}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default page;
