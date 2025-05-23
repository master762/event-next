import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    return Response.json(users);
  } catch (error) {
    console.error("Ошибка при получении пользователей:", error);
    return new Response("Ошибка сервера", { status: 500 });
  }
}
