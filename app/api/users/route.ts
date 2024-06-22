import { User } from "@/types/User";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/config/db";

// const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const data: User = await req.json();
  //Encriptar contraseña
  const saltRounds = 10;
  const myPlaintextPassword = data.password;
  const salt = await bcrypt.genSalt(saltRounds);
  const passwordHashed = await bcrypt.hash(myPlaintextPassword, salt);

  const newUser = {
    email: data.email,
    password: passwordHashed,
  };
  try {
    //Validar si usuario existe
    const userExist = await prisma.users.findMany({
      where: { email: newUser.email },
    });
    if (userExist.length > 0) {
      return NextResponse.json(
        { message: "Este email no esta disponible", ok: false },
        { status: 500 }
      );
    }
    const result = await prisma.users.create({
      data: newUser,
    });
    return NextResponse.json(
      { ok: true, message: `Usuario: ${result.email}, creado con éxito.` },
      { status: 201 }
    );
  } catch (error: any | { message: string }) {
    return NextResponse.json(
      { ok: false, message: "¡Falla de la app!" },
      { status: 500 }
    );
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
    return NextResponse.json({ message: "User deleted" });
  } catch (error: any | { message: string }) {
    if (error) {
      NextResponse.json({ message: error.message });
    }
  }
};
