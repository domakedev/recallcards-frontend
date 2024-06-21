/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import "./styles.css";
import { Deck } from "@/types/Deck";
import { toast } from "react-toastify";
import { createDeck } from "@/services/deck.services";

const page = () => {
  const [deck, setDeck] = useState<Deck>({ name: "", image: "", creatorId: 1 });
  const [isLoading, setIsLoading] = useState(false);

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
    try {
      setIsLoading(true);
      const result = await createDeck(deck);
      if (result.ok) {
        setIsLoading(false);
        toast.success(result.message);
        setDeck({ name: "", image: "", creatorId: 1 });
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Crea un nuevo Deck
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Crea notas de tus estudios y repasa siempre que quieras, gratis (por
            ahora 😁).
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name="remember"
            value="true"
          />
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
                id="name"
                name="name"
                value={deck.name}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                id="image"
                name="image"
                value={deck.image}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Deck Image URL"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`${
                isLoading ? "rainbow-animation" : ""
              } group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              Create Deck
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
