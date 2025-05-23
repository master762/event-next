import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// POST: создать мероприятие
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Неавторизованный доступ" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const creatorId = session.user.id;
    const creatorEmail = session.user.email;
    const creatorName = session.user.name;

    // Участник-организатор (создатель мероприятия)
    const participantsData = [
      {
        name: creatorName || "",
        email: creatorEmail,
        role: "организатор",
        subRole: null,
        userId: creatorId,
      },
    ];

    // Добавляем остальных участников
    const otherParticipants = await Promise.all(
      body.participants.map(async (participant) => {
        const existingUser = await prisma.user.findUnique({
          where: { email: participant.email },
        });

        return {
          name: existingUser?.name || "",
          email: participant.email,
          role: participant.role,
          subRole: participant.subRole || null,
          userId: existingUser?.id || null,
        };
      })
    );

    participantsData.push(...otherParticipants);

    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        budget: body.budget,
        deadline: new Date(body.deadline),
        coverImage: body.coverImage || null,
        participants: {
          create: participantsData,
        },
      },
      include: {
        participants: true,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Ошибка при создании мероприятия:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// GET: получить мероприятия текущего пользователя
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Неавторизованный доступ" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const events = await prisma.event.findMany({
      where: {
        participants: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        participants: true,
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Ошибка при получении мероприятий:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
