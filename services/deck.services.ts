import { Deck } from "@/types/Deck";

const deckURL = "/api/decks";

export const createDeck = async (deck: Deck) => {
  try {
    const result = await fetch(deckURL, {
      method: "POST",
      body: JSON.stringify(deck),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    // console.log("🚀 ~ createDeck ~ data:", data)
    if (data.ok) {
      return data;
    } else if (!data.ok) {
      throw new Error(data.message);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getDecks = async () => {
  try {
    const result = await fetch(deckURL);
    const data = await result.json();
    if (data.ok) {
      return data;
    } else if (!data.ok) {
      throw new Error(data.message);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
