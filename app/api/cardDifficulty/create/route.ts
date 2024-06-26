import prisma from "@/config/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data = await req.json();
  console.log("🚀 ~ POST ~ data:", data)

  try {
    const result = await prisma.card_difficulty_per_user.create({
      data: {
        userId: Number(data.userId),
        cardId: Number(data.cardId),
        difficultyId: Number(data.difficultyId),
      },
    });
    console.log("🚀 ~ POST ~ result:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(error);
  }
};
