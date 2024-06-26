import prisma from "@/config/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data = await req.json();

  try {
    const result = await prisma.card_difficulty_per_user.create({
      data: {
        userId: Number(data.userId),
        cardId: Number(data.cardId),
        difficultyId: Number(data.difficultyId),
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
};
