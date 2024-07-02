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

export const deleteCardAction = async (
  userId: number,
  cardId: number,
  cardImage: string
) => {
  "use server";
  if (userId === 0 || cardId === 0) {
    return;
  }
  //test
  const publicId = extractPublicId(cardImage);

  //1. Delete difficulty per user
  const deleteCardDifficultyPerUser =
    await prisma.card_difficulty_per_user.deleteMany({
      where: {
        userId: userId,
        cardId: cardId,
      },
    });
 
  //2. Delete card
      const deleteCard = await prisma.cards.delete({
          where: {
          id: cardId,
          creatorId: userId,
          },
      });

    //3. Delete image from cloudinary
    const cloudDestroy = cloudinaryDestroyImage(publicId)
    return "Card eliminada";
};



