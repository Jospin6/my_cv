import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"


export async function POST(req: Request) {
    const { email } = await req.json()

    try {
        const users = await prisma.user.create({
            data: {
                email
            }
        })
        return NextResponse.json(users, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}


export async function GET(req: Request) {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}