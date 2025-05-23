// app/api/user-by-email/route.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email обязателен" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Пользователь не найден" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}
