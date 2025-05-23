import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { title, day, startHour, duration, color, eventId } = body;

  if (!title || !day || !startHour || !duration || !color || !eventId) {
    return new Response("Missing fields", { status: 400 });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        day,
        startHour,
        duration,
        color,
        eventId: parseInt(eventId),
      },
    });

    return Response.json(task);
  } catch (error) {
    console.error(error);
    return new Response("Failed to create task", { status: 500 });
  }
}
