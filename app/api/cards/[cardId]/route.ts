import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "@/config/db";

// const prisma = new PrismaClient();

//Get card by ID
export const GET = async (
  req: Request,
  { params }: { params: { cardId: number } }
) => {
  try {
    const result = await prisma.cards.findUnique({
      where: {
        id: Number(params.cardId),
      },
    });
    if (!result) {
      return NextResponse.json(
        { ok: false, message: "Card no encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { ok: true, message: "Card encontrada", result },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return NextResponse.json(
      { ok: false, message: "Error en CARDID API" },
      { status: 500 }
    );
  }
};
