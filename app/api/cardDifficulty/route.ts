import prisma from "@/config/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data = await req.json();
  console.log("🚀 ~ POST ~ data:", data);
  try {
    const result = await prisma.card_difficulty_per_user.findFirst({
      where: {
        userId: Number(data.userId),
        cardId: Number(data.cardId),
      },
    });
    console.log("🚀 ~ POST ~ result:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(error);
  }
};

export const PATCH = async (req: Request) => {
  try {
    const data = await req.json();
    console.log("🚀 ~ PATCH ~ data:", data);
    //Actualiza y devuelve el registro actualizado
    const result = await prisma.card_difficulty_per_user.update({
      where: {
        id: Number(data.id),
      },
      data: {
        difficultyId: Number(data.difficultyId),
      },
    });
    console.log("🚀 ~ PATCH ~ result:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.log("🚀 ~ PATCH ~ error:", error);
    return NextResponse.json(error);
  }
};
