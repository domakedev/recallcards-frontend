export type Card = {
  id?: number;
  question?: string;
  answer: string;
  creatorId: number;
  deckId: number;
};

export type CardDB = {
  id: number;
  question?: string;
  answer: string;
  creatorId: number;
  deckId: number;
};

export type cardsDifficultiesByUserAndDeck = {
  id: number;
  userId: number;
  cardId: number;
  difficultyId: 1 | 2 | 3;
  deckId: number;
}[];
