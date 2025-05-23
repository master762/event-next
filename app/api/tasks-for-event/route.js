import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return new Response("Missing id", { status: 400 });

  const tasks = await prisma.task.findMany({
    where: { eventId: parseInt(id) },
  });

  return Response.json(tasks);
}
