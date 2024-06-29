import prisma from "@/config/db";
import { DeckDB } from "@/types/Deck";

export const getDecksAction = async (): Promise<DeckDB[]|null > => {
    try {
        const decks = await prisma.decks.findMany();
        return decks
      } catch (error : any) {
        throw new Error(error.message);
      }
  };