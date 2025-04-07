import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      content,
      company,
      jobTitle,
      location,
      userId,
      cvId,
    } = body;

    if (!title || !content || !userId) {
      return NextResponse.json(
        { error: "title, content, and userId are required." },
        { status: 400 }
      );
    }

    const coverLetter = await prisma.coverLetter.create({
      data: {
        title,
        content,
        company,
        jobTitle,
        location,
        userId,
        cvId,
      },
    });

    return NextResponse.json(coverLetter, { status: 201 });
  } catch (error) {
    console.error("Error creating cover letter:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId in query parameters." },
        { status: 400 }
      ); 
    }

    const coverLetters = await prisma.coverLetter.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(coverLetters, { status: 200 });
  } catch (error) {
    console.error("Error fetching cover letters:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

