import { CardDB, cardsDifficultiesByUserAndDeck } from "@/types/Card";

const cardsDifficultiesByUserAndDeckTemp: cardsDifficultiesByUserAndDeck = [
  {
    id: 0,
    userId: 0,
    cardId: 0,
    difficultyId: 1,
    deckId: 0,
  },
];

export const getCardDifficulty = (
  userId: number = 0,
  cardId: number,
  cardsDifficultiesByUserAndDeck: cardsDifficultiesByUserAndDeck = cardsDifficultiesByUserAndDeckTemp
) => {
  if (
    cardsDifficultiesByUserAndDeck &&
    cardsDifficultiesByUserAndDeck?.length > 0 &&
    userId &&
    cardId
  ) {
    const card = cardsDifficultiesByUserAndDeck.find(
      (e) => e.cardId === cardId && e.userId === userId
    );
    return card?.difficultyId;
  }
  return;
};

export const getCardDifficultyId = (
  userId: number | undefined,
  cardId: number | undefined,
  cardsDifficultiesByUserAndDeck?: cardsDifficultiesByUserAndDeck
) => {
  if (
    cardsDifficultiesByUserAndDeck &&
    cardsDifficultiesByUserAndDeck?.length > 0 &&
    userId &&
    cardId
  ) {
    const card = cardsDifficultiesByUserAndDeck.find(
      (e) => e.cardId === cardId && e.userId === userId
    );
    return card?.id;
  }
  return;
};

export const sortCards = (
  data: CardDB[],
  userId?: number,
  cardsDifficultiesByUserAndDeck?: cardsDifficultiesByUserAndDeck,
) => {
  const cardsWithDifficulty = data.map((card: CardDB) => {
    if (
      userId &&
      cardsDifficultiesByUserAndDeck &&
      cardsDifficultiesByUserAndDeck?.length > 0
    ) {
      const cardDifficulty = getCardDifficulty(
        userId,
        card.id,
        cardsDifficultiesByUserAndDeck
      );
      const newCard = { ...card, cardDifficulty: cardDifficulty || 0 };
      return newCard;
    }
    const newCard2 = { ...card, cardDifficulty: 0 };
    return newCard2;
  });
  const sortedCards = [...cardsWithDifficulty].sort(
    (a: { cardDifficulty: number }, b: { cardDifficulty: number }) => {
      return b.cardDifficulty - a.cardDifficulty;
    }
  );
  const resetCards = [...sortedCards].map((card: any) => {
    if (card != null) {
      delete card["cardDifficulty"];
    } else {
    }
    return card;
  });
  return resetCards as CardDB[];
};


// const cardsWithDifficulty = data.map((card: CardDB) => {
//     if (
//       userId &&
//       cardsDifficultiesByUserAndDeck &&
//       cardsDifficultiesByUserAndDeck?.length > 0
//     ) {
//       const cardDifficulty = getCardDifficulty(
//         userId,
//         card.id,
//         cardsDifficultiesByUserAndDeck
//       );
//       const newCard = { ...card, cardDifficulty };
//       return newCard;
//     }
//     return card;
//   });
//   const sortedCards = cardsWithDifficulty.sort(
//     (a: { cardDifficulty: number }, b: { cardDifficulty: number }) => {
//       return b.cardDifficulty - a.cardDifficulty;
//     }
//   );
//   const resetCards = sortedCards.map((card: any) => {
//     if (card != null) {
//       delete card["cardDifficulty"];
//     } else {
//       console.log("El objeto 'card' es undefined o null.");
//     }
//     return card;
//   });

export function extractPublicId(secureUrl: string) {
  const index = secureUrl.indexOf("recall-cards");
  const urlParts = secureUrl.slice(index);
  const indexExtention = urlParts.indexOf(".");
  const withoutExtention = urlParts.slice(0, indexExtention);
  return withoutExtention;
}