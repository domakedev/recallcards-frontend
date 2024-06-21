import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Get card by ID
export const GET = async (
  req: Request,
  { params }: { params: { cardId: number } }
) => {
  try {
    console.log("🚀 ~ GET ~ params:cardId", params.cardId);
    const result = await prisma.cards.findUnique({
      where: {
        id: Number(params.cardId),
      },
    });
    if (!result) {
      return NextResponse.json({ok: false, message: "Card no encontrada"},{status: 404})
    }
    console.log("🚀 ~ result:", result)
    return NextResponse.json({ ok: true, message: "Card encontrada", result}, { status: 200});
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
  }
};
