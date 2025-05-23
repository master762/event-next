// app/api/events/[id]/route.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const event = await prisma.event.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!event) {
    return new Response(JSON.stringify({ error: "Не найдено" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(event), { status: 200 });
}
