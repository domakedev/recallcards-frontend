import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import prisma from "@/config/db";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password || "");
      if (!passwordMatch) {
        return NextResponse.json(
          { ok: false, message: "Usuario o contraseña erróneos" },
          { status: 404 }
        );
      }
      const token = jwt.sign(
        { id: user.id, email },
        "e6d625f9-ac31-4ef8-b56e-c2ee34c7917f",
        {
          expiresIn: "1h",
        }
      );
      cookies().set("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
        // maxAge: 15,
      });
      const userResult = {
        id: user.id,
        email: user.email,
        roles: user.roles,
      };
      return NextResponse.json(
        { ok: true, message: "Usuario logueado", user: userResult },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { ok: false, message: "Usuario o contraseña erróneos" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: "Ocurrió un error interno en API/Login" },
      { status: 500 }
    );
  }
};
