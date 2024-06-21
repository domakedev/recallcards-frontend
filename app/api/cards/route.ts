import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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
      { ok: false, message: "Ocurrio un error en la API de Cards" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const result = await prisma.cards.findMany();
    console.log("🚀 ~ GET ~ result:", result);
    if (result.length === 0) {
      return NextResponse.json(
        { ok: false, message: "Cards no encontradas"},
        { status: 200 }
      );
    }
    return NextResponse.json(
      { ok: true, message: "Cards encontradas", result },
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
