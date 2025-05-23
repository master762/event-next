// app/api/event-finance/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");

  if (!eventId || isNaN(Number(eventId))) {
    return new Response(JSON.stringify({ error: "Invalid eventId" }), {
      status: 400,
    });
  }

  const event = await prisma.event.findUnique({
    where: { id: parseInt(eventId, 10) },
    include: {
      EventTask: true,
    },
  });

  if (!event) {
    return new Response(JSON.stringify({ error: "Event not found" }), {
      status: 404,
    });
  }

  const totalExpenses = event.EventTask.reduce(
    (sum, task) => sum + task.expenses,
    0
  );
  const remainingBudget = (event.budget || 0) - totalExpenses;

  const expensesByMonth = {};
  event.EventTask.forEach((task) => {
    const date = new Date(task.createdAt);
    if (!isNaN(date)) {
      const month = date.toISOString().slice(0, 7); // "2025-05"
      expensesByMonth[month] = (expensesByMonth[month] || 0) + task.expenses;
    }
  });

  return new Response(
    JSON.stringify({
      totalExpenses,
      remainingBudget,
      expensesByMonth,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
