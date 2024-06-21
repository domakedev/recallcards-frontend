import { Card } from "@/types/Card";
import { NextResponse } from "next/server";

const cardsURL = "/api/cards";

export const createCard = async (card: Card) => {
  try {
    const result = await fetch(cardsURL, {
      method: "POST",
      body: JSON.stringify(card),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    if (!data.ok) {
      throw new Error(data.message);
    }
    console.log("🚀 ~ createCard ~ data:", data);
    return data
  } catch (error: any) {
    console.log("🚀 ~ createCard ~ error:", error);
    throw new Error(error.message);
  }
};

export const getAllCards = async () => {
  try {
    const result = await fetch(cardsURL);
    const data = await result.json();
    console.log("🚀 ~ getCards ~ data:", data);
    return data.cards
  } catch (error) {
    console.log("🚀 ~ getCards ~ error:", error);
  }
};

export const getCardsByDeckId = async (deckId: number) => {
  try {
    const result = await fetch(`${cardsURL}/byDeckId`, {
      method: "POST",
      body: JSON.stringify({ deckId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    console.log("🚀 ~ getCardByDeck ~ data:", data);
    return data
  } catch (error) {}
};

export const getCardById = async (cardId: number) => {
  try {
    const result = await fetch(`${cardsURL}/${cardId}`);
    const data = await result.json();
    console.log("🚀 ~ getCardById ~ data:", data)
    return data
  } catch (error) {
    console.log("🚀 ~ getCardById ~ error:", error);
  }
};
