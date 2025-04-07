import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"


export async function POST(req: Request) {
    const { title, url, description, userId } = await req.json()

    try {
        const projects = await prisma.project.create({
            data: {
                title, 
                url, 
                description, 
                userId 
            }
        })
        return NextResponse.json(projects, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}


export async function GET(req: Request) {
    const projects = await prisma.project.findMany()
    return NextResponse.json(projects)
}