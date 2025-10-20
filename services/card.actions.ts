"use server";

import { cloudinaryDestroyImage } from "@/cloudinary";
import prisma from "@/config/db";
import { extractPublicId } from "@/lib/card.functions";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Trae una carta al azar por userId
export const getRandomCardByUserIdAction = async (userId: number) => {
  try {
    const card = await prisma.cards.findFirst({
      where: {
        creatorId: userId,
      },
      include: {
        decks: true,
      },
      orderBy: {
        id: 'desc', // Usamos desc para tener consistencia, pero realmente queremos aleatorio
      },
      skip: Math.floor(Math.random() * await prisma.cards.count({ where: { creatorId: userId } })),
    });
    return card;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteCardAction = async (
  userId: number,
  cardId: number,
  cardImage: string
) => {
  ("use server");
  if (userId === 0 || cardId === 0) {
    return { ok: false, message: "Error al eliminar la carta." };
  }
  //test
  const publicId = extractPublicId(cardImage);

  //0.Verify if the card is marked by someone else
  const card = await prisma.card_difficulty_per_user.findMany({
    where: {
      cardId,
      userId: {
        not: userId,
      }
    },
  });

  if(card.length >= 1){
    return {ok: false, message:"La carta le es útil a alguien mas, ya no puedes eliminarla 😿"}
  }

  //1. Delete difficulty per user
  const deleteCardDifficultyPerUser =
  await prisma.card_difficulty_per_user.deleteMany({
    where: {
      cardId: cardId,
      cards:{
        creatorId: userId,
      }
    }
  });

  //2. Delete card
  const deleteCard = await prisma.cards.delete({
    where: {
      id: cardId,
      creatorId: userId,
    },
  });

  //3. Delete image from cloudinary
  const cloudDestroy = cloudinaryDestroyImage(publicId);
  return {ok: true, message:"Card eliminada"}
};
