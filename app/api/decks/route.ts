import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

//
const prisma = new PrismaClient();

async function main2() {
  try {
    const user = await prisma.users.create({
      data: {
        email: "alice@prisma.io",
        password: "password",
      },
    });
    const deck = await prisma.decks.create({
      data: {
        name: "Deck1",
        image: "image1",
      },
    });
    console.log(user, deck);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("🚀 ~ main2 ~ error:", error?.code, error.message);
    }
  }
}
//

export const GET = async () => {
  await main2();
  const api = "https://api.escuelajs.co/api/v1/products";
  const fetchCall = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const answer = await fetchCall.json();

  console.log("rocketTTTTTTTTTTT: ", answer.length);
  return NextResponse.json(answer);
};

export const POST = async (request: Request) => {
  const data = await request.json();
  console.log("🚀 ~ POST ~ data:", data);
  const api = "https://api.escuelajs.co/api/v1/products";

  const fetchCall = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const answer = await fetchCall.json();
  console.log("🚀 ~ POST ~ answer:", answer);
  return NextResponse.json(answer);
};
