import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const generateCv = await prisma.cv.findUnique({
        where: {id,}
    })
    if (!generateCv) {
        return NextResponse.json({message: "certification not found"})
    }
    return NextResponse.json(generateCv)
}

export async function DELETE(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    await prisma.cv.delete({where: {id,}})
}