import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const chatWithId = searchParams.get("chatWithId");

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: chatWithId },
        { senderId: chatWithId, receiverId: userId },
      ],
    },
    orderBy: { time: "asc" },
  });

  return NextResponse.json(messages);
}

export async function POST(req) {
  const body = await req.json();
  const { text, senderId, receiverId } = body;

  const message = await prisma.message.create({
    data: {
      text,
      senderId,
      receiverId,
    },
  });

  return NextResponse.json(message);
}
