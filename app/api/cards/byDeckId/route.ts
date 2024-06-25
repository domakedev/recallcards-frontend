import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "@/config/db";

// const prisma = new PrismaClient();

//Get Cards by deckID
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const result = await prisma.cards.findMany({
      where: {
        deckId: Number(body.deckId),
      },
    });
    if (result.length === 0) {
      return NextResponse.json(
        { ok: true, message: "Este Deck no tiene Cards", cards: result },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { ok: true, message: "Card/s encontrada/s", cards: result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: "Error en API de CARDS BY DECK" },
      { status: 500 }
    );
  }
};
