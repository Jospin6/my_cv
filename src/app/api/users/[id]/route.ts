import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma"
import { generateToken } from "../route";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop() as string
  const user = await prisma.user.findUnique({
    where: { id, }
  })
  if (!user) {
    return NextResponse.json({ message: "User not found" })
  }
  return NextResponse.json(user)
}

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop() as string;
  const body = await req.json();

  const {
    name,
    email,
    phone,
    address,
    linkedin,
    portfolio,
    summary,
    skills,
    hobbies,
  } = body;

  let user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        address,
        linkedin,
        portfolio,
        summary,
        skills,
        hobbies,
      },
    });

    const token = await generateToken(user);

    (await cookies()).set("token_cv", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 100 * 365 * 24 * 60 * 60, // 100 ans
    });
    return NextResponse.json(user, { status: 200 });
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name,
      phone,
      address,
      linkedin,
      portfolio,
      summary,
      skills,
      hobbies,
    },
  });

  return NextResponse.json(updatedUser, { status: 200 });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop() as string
  await prisma.user.delete({ where: { id, } })
}