import prisma from "@/config/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data = await req.json();
  try {

    //Cualquiera de las dos formas funciona pero elegí usar una sentencia SQL para hacer la consulta
    
    // const result = await prisma.card_difficulty_per_user.findMany({
    //   select: {
    //     userId: true,
    //     cardId: true,
    //     difficultyId: true,
    //     cards: {
    //       // Asegúrate de que el nombre de la relación aquí coincida con tu esquema
    //       select: {
    //         deckId: true,
    //       },
    //       where: {
    //         deckId: Number(data.deckId), // Filtra para incluir solo los registros con deckId = 8
    //       },
    //     },
    //   },
    //   where: {
    //     userId: Number(data.userId),
    //     //dont select null values in cards
    //     cards: {
    //       deckId: Number(data.deckId),
    //     },

    //     // cards:{
    //     //     isNot: null
    //     // }
    //   },
    // });
    const result = await prisma.$queryRaw`
    select a."id", a."userId", a."cardId", a."difficultyId", b."deckId" from 
    card_difficulty_per_user a inner join cards b
    on a."cardId" = b."id"
    where a."userId"=${Number(data.userId)} and b."deckId"=${Number(
      data.deckId
    )}
    `;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
};
