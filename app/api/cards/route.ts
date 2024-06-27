import prisma from "@/config/db";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

//Create a new Card
//@TODO: con cloudinary
export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const result = await prisma.cards.create({
      data,
    });
    return NextResponse.json(
      { ok: true, message: "Card creada con éxito" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: "Ocurrió un error en la API de Cards" },
      { status: 500 }
    );
  }
};

//Bring all the cards
export const GET = async () => {
  try {
    const result = await prisma.cards.findMany({
      select: { id: true, deckId: true },
    });
    if (result.length === 0) {
      return NextResponse.json(
        { ok: false, message: "Cards no encontradas", cards: result },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { ok: true, message: "Cards encontradas", cards: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error)
    return NextResponse.json(
      { ok: false, message: "Ocurrio un error en la API de Cards" },
      { status: 500 }
    );
  }
};
