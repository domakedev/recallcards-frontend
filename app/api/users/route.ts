import { User } from "@/types/User";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const data: User = await req.json();

  //Validar si usuario existe
  const userExist = await prisma.users.findMany({
    where: { email: data.email },
  });
  if (userExist.length > 0) {
    return NextResponse.json({ ok: false, message: "User already exists." });
    // throw new Error("User already exists.");
  }

  try {
    const result = await prisma.users.create({
      data,
    });
    // console.log("🚀 ~ POST ~ result:", result);
    return NextResponse.json({ ok: true, message: "User created" });
  } catch (error: any | { message: string }) {
    console.log("❌ Ups1:", error.message);
    return NextResponse.json({ ok: false, message: "User already exists." });
    // return NextResponse.error();
    // throw new Error("XDDDD");
  }
};

export const GET = async () => {
  try {
    const users = await prisma.users.findMany();
    console.log("🚀 ~ GET ~ users:", users);
    NextResponse.json(users);
  } catch (error: any | { message: string }) {
    if (error) {
      console.log("❌Ups:", error.message);
      NextResponse.json({ message: error.message });
    }
  }
};

export const DELETE = async (req: Request) => {
  try {
    const data = await req.json();
    //Validar si usuario existe
    const userExist = await prisma.users.findMany({
      where: { email: data.email },
    });
    if (userExist.length == 0) {
      throw new Error("User doesn't exists.");
    }

    const result = await prisma.users.delete({
      where: { email: data.email },
    });
    console.log("🚀 ~ DELETE ~ result:", result);
    return NextResponse.json({ message: "User deleted" });
  } catch (error: any | { message: string }) {
    if (error) {
      console.log("❌Ups:", error.message);
      NextResponse.json({ message: error.message });
    }
  }
};
