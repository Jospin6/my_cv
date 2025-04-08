import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../prisma/prisma"


export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      const {
        title,
        summary,
        skills,
        experiences,
        educations,
        certifications,
        projects,
        languages,
        userId,
      } = body;
  
      const newCv = await prisma.cv.create({
        data: {
          title,
          summary,
          skills,
          experiences,
          educations,
          certifications,
          projects,
          languages,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
  
      return NextResponse.json(newCv, { status: 201 });
    } catch (error) {
      console.error("Error creating Cv:", error);
      return NextResponse.json(
        { error: "Une erreur est survenue lors de la création du Cv." },
        { status: 500 }
      );
    }
  }


export async function GET(req: Request) {
    const generateCv = await prisma.cv.findMany()
    return NextResponse.json(generateCv)
}