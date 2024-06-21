import { User } from "@/types/User";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const creation = await prisma.decks.create({
      data,
    });
    // console.log("🚀 ~ POST ~ creation:", creation)
    return NextResponse.json(
      { ok: true, message: `Deck ${creation.name} creado con éxito` },
      { status: 200 }
    );
  } catch (error) {
    // console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { ok: false, message: "Error al crear el Deck" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const decks = await prisma.decks.findMany();
    if (decks.length === 0) {
      return NextResponse.json(
        { ok: false, message: "No se encontraron decks" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { ok: true, message: "Decks encontrados", decks, deckSize: decks.length },
      { status: 200 }
    );
  } catch (error) {}
};
