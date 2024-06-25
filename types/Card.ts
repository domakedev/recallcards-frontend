export type Card = {
    id?: number;
    question?: string;
    answer: string;
    creatorId: number;
    deckId: number;
}

export type CardDB = {
    id: number;
    question?: string;
    answer: string;
    creatorId: number;
    deckId: number;
}
