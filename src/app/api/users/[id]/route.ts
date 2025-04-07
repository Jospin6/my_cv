import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const user = await prisma.user.findUnique({
        where: {id,}
    })
    if (!user) {
        return NextResponse.json({message: "User not found"})
    }
    return NextResponse.json(user)
}

export async function PUT(req: Request) {
    try {
      const url = new URL(req.url);
      const id = url.pathname.split('/').pop() as string;
  
      const body = await req.json();
  
      const {
        name,
        phone,
        address,
        linkedin,
        portfolio,
        summary,
        skills,
        hobbies,
      } = body;
  
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
  
      return NextResponse.json(updatedUser);
    } catch (error) {
      console.error('[USER_PUT]', error);
      return new NextResponse('Error updating user', { status: 500 });
    }
  }

  export async function DELETE(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    await prisma.user.delete({where: {id,}})
}