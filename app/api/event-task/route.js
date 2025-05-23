import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const eventId = Number(searchParams.get("eventId"));
  if (!eventId) return new Response("Missing eventId", { status: 400 });

  const tasks = await prisma.eventTask.findMany({
    where: { eventId },
    orderBy: { id: "asc" },
  });

  return Response.json(tasks);
}

export async function POST(req) {
  const data = await req.json();
  const { title, description, status, expenses, eventId } = data;

  if (!title || !eventId) {
    return new Response("Missing required fields", { status: 400 });
  }

  const task = await prisma.eventTask.create({
    data: { title, description, status, expenses, eventId },
  });

  return Response.json(task);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  if (!id) return new Response("Missing id", { status: 400 });

  await prisma.eventTask.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
