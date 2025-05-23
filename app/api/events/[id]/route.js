// app/api/events/[id]/route.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const eventId = parseInt(params.id);

  if (isNaN(eventId)) {
    return new Response(JSON.stringify({ error: "Неверный ID мероприятия" }), {
      status: 400,
    });
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      participants: {
        include: {
          User: {
            include: {
              profile: true,
            },
          },
        },
      },
    },
  });

  if (!event) {
    return new Response(JSON.stringify({ error: "Мероприятие не найдено" }), {
      status: 404,
    });
  }

  const participants = event.participants.map((p) => ({
    id: p.id,
    name: p.name || p.User?.name || null,
    email: p.email || p.User?.email || null,
    role: p.role,
    company: p.User?.profile?.company || null,
    avatar: p.User?.image || "/default-avatar.jpg",
    subRole: p.subRole || null,
  }));

  const result = {
    id: event.id,
    title: event.title,
    description: event.description,
    coverImage: event.coverImage,
    budget: event.budget,
    deadline: event.deadline,
    participants,
  };

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(req, { params }) {
  const eventId = parseInt(params.id);
  if (isNaN(eventId)) {
    return new Response(JSON.stringify({ error: "Неверный ID мероприятия" }), {
      status: 400,
    });
  }

  try {
    const body = await req.json();

    const { title, description, budget, coverImage } = body;

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        title,
        description,
        budget: budget !== "" ? parseFloat(budget) : null,
        coverImage,
      },
    });

    return new Response(JSON.stringify(updatedEvent), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Ошибка при обновлении мероприятия:", error);
    return new Response(
      JSON.stringify({ error: "Не удалось обновить мероприятие" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const eventId = parseInt(params.id);

  if (isNaN(eventId)) {
    return new Response(JSON.stringify({ error: "Неверный ID мероприятия" }), {
      status: 400,
    });
  }

  try {
    await prisma.$transaction([
      prisma.participant.deleteMany({ where: { eventId } }),
      prisma.task.deleteMany({ where: { eventId } }),
      prisma.eventTask.deleteMany({ where: { eventId } }),
      prisma.event.delete({ where: { id: eventId } }),
    ]);

    return new Response(
      JSON.stringify({
        message: "Мероприятие и связанные данные успешно удалены",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Ошибка при удалении мероприятия:", error);
    return new Response(
      JSON.stringify({ error: "Не удалось удалить мероприятие" }),
      { status: 500 }
    );
  }
}
