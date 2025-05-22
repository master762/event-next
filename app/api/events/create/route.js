import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const budget = parseFloat(formData.get("budget") || "0");
    const deadlineRaw = formData.get("deadline");
    const deadline = deadlineRaw ? new Date(deadlineRaw) : null;

    const participantsRaw = formData.get("participants"); // JSON string
    const participants = participantsRaw ? JSON.parse(participantsRaw) : [];

    // Обработка coverImage
    const file = formData.get("coverImage");
    let coverImagePath = null;

    if (file && typeof file === "object" && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name}`;
      const uploadPath = path.join(process.cwd(), "public/uploads", filename);
      await writeFile(uploadPath, buffer);
      coverImagePath = `/uploads/${filename}`;
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        coverImage: coverImagePath,
        budget,
        deadline,
        participants: {
          create: participants.map((p) => ({
            name: p.name,
            email: p.email,
            role: p.role,
            subRole: p.subRole || null,
          })),
        },
      },
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
