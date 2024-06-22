import { Card } from "@/types/Card";

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
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllCards = async () => {
  try {
    const result = await fetch(cardsURL);
    const data = await result.json();
    return data.cards;
  } catch (error: any) {
    throw new Error(error.message);
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
    if (data.ok) {
      return data.cards;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCardById = async (cardId: number) => {
  try {
    const result = await fetch(`${cardsURL}/${cardId}`);
    const data = await result.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
