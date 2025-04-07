import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const coverLetter = await prisma.coverLetter.findUnique({
        where: {id,}
    })
    if (!coverLetter) {
        return NextResponse.json({message: "certification not found"})
    }
    return NextResponse.json(coverLetter)
}

export async function DELETE(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    await prisma.coverLetter.delete({where: {id,}})
}