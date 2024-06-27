import prisma from "@/config/db";
import { NextResponse } from "next/server";

//Bring one card_difficulty_per_user
export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const result = await prisma.card_difficulty_per_user.findFirst({
      where: {
        userId: Number(data.userId),
        cardId: Number(data.cardId),
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const PATCH = async (req: Request) => {
  try {
    const data = await req.json();
    //Actualiza y devuelve el registro actualizado
    const result = await prisma.card_difficulty_per_user.update({
      where: {
        id: Number(data.id),
      },
      data: {
        difficultyId: Number(data.difficultyId),
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
};
