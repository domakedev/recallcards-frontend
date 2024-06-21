import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary'

const prisma = new PrismaClient();

//Create a new Card
//@TODO: con cloudinary
export const POST = async (req: Request) => {
  const data = await req.json();
  console.log("🚀 ~ POST ~ data:", data);
  try {
    const result = await prisma.cards.create({
      data,
    });
    console.log("🚀 ~ POST ~ result:", result);
    return NextResponse.json(
      { ok: true, message: "Card creada con éxito" },
      { status: 201 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { ok: false, message: "Ocurrió un error en la API de Cards" },
      { status: 500 }
    );
  }
};

//Bring all the cards 
//@TODO: Bring only 30 cards
export const GET = async () => {
  try {
    const result = await prisma.cards.findMany();
    console.log("🚀 ~ GET ~ result:", result);
    if (result.length === 0) {
      return NextResponse.json(
        { ok: false, message: "Cards no encontradas", cards: result},
        { status: 200 }
      );
    }
    return NextResponse.json(
      { ok: true, message: "Cards encontradas", cards: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return NextResponse.json(
      { ok: false, message: "Ocurrio un error en la API de Cards" },
      { status: 500 }
    );
  }
};
