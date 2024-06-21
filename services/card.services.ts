import { Card } from "@/types/Card";

const cardsURL = "http://localhost:3000/api/cards";

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
    console.log("🚀 ~ createCard ~ data:", data)
  } catch (error) {
  console.log("🚀 ~ createCard ~ error:", error)
  }
};

export const getCards = async () => {
  try {
    const result = await fetch(cardsURL);
    const data = await result.json();
    console.log("🚀 ~ getCards ~ data:", data)
  } catch (error) {
    console.log("🚀 ~ getCards ~ error:", error)
  }
}