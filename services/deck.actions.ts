"use server"
import { cloudinaryDestroyImage } from "@/cloudinary";
import prisma from "@/config/db";
import { extractPublicId } from "@/lib/card.functions";
import { DeckDB } from "@/types/Deck";

export const getDecksAction = async (): Promise<DeckDB[] | null> => {
  try {
    const decks = await prisma.decks.findMany();
    return decks;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteDeckAction = async (
  deckId: number,
  userId: number,
  deckImage: string
) => {
  try {
    const cardsByDeckId = await prisma.cards.findMany({
      where: {
        deckId: deckId,
      },
    });
    if (cardsByDeckId.length > 0) {
      // return "No se puede eliminar un deck con cartas";
      throw new Error("No se puede eliminar un deck con cartas, elimina todas las cartas primero");
    }
    const deleteDeck = await prisma.decks.delete({
      where: {
        id: deckId,
        creatorId: userId,
      },
    });
    if (deleteDeck.image) {
      const publicId = extractPublicId(deleteDeck.image)
      cloudinaryDestroyImage(publicId)      
    }
    return "Deck eliminado";
  } catch (error: any) {
    throw new Error(error.message);
  }
};
