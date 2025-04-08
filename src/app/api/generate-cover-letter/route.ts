import { NextResponse } from "next/server";
import { streamObject } from "ai";
import { gemini } from "@/lib/gemini";
import { z } from "zod";
import { generateCoverLetterPrompt, generateCoverLetterSystemPrompt } from "@/helpers/helpers";

const coverLetterSchema = z.object({
  title: z.string().describe("Title of the cover letter (e.g., 'Cover Letter for Frontend Role at Stripe')"),
  content: z.string().describe("Full generated content of the cover letter (markdown or plain text)"),

  company: z.string().optional().describe("Name of the company targeted by the letter (e.g., 'Stripe')"),
  jobTitle: z.string().optional().describe("Job title of the position (e.g., 'Frontend Software Engineer')"),
  location: z.string().optional().describe("Location of the job or company (optional)")
});


export async function POST(req: Request) {
    const { description, user } = await req.json()
    const prompt = generateCoverLetterPrompt({ description, user })
    const system = generateCoverLetterSystemPrompt()
    try {
        const result = await streamObject({
            model: gemini("gemini-1.5-flash"),
            output: 'array',
            schema: coverLetterSchema,
            system: system,
            prompt: prompt,
        });
    
        return result.toTextStreamResponse();
    } catch (error) {
        console.error("Error while generating the cover letter:", error);
        return new NextResponse(
            JSON.stringify({ error: "Failed to generate cover letter" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}