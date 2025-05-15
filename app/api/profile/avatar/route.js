import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.formData();
    const avatarFile = data.get("avatar");

    if (!avatarFile) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Создаем уникальное имя файла
    const fileName = `${Date.now()}_${avatarFile.name.replace(/\s+/g, "_")}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
    const filePath = path.join(uploadDir, fileName);
    const relativePath = `/uploads/avatars/${fileName}`;

    // Создаем папку, если ее нет
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Конвертируем File в Buffer и сохраняем
    const bytes = await avatarFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(filePath, buffer);

    // Обновляем запись в базе данных
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: relativePath },
    });

    return NextResponse.json({
      imageUrl: relativePath,
      message: "Avatar uploaded successfully",
    });
  } catch (error) {
    console.error("Avatar upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload avatar" },
      { status: 500 }
    );
  }
}
