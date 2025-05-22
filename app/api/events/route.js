import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        budget: body.budget,
        deadline: new Date(body.deadline),
        participants: body.participants,
        coverImage: body.coverImage || null,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Ошибка при создании мероприятия:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
// на получение
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: { participants: true },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Ошибка при получении мероприятий:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
