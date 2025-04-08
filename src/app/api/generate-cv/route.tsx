import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../prisma/prisma"
import axios from "axios";
import { generateObject, streamObject } from "ai";
import { gemini } from "@/lib/gemini";
import { z } from "zod";
import { generateCvPrompt, generateCvSystemPrompt } from "@/helpers/helpers";

const cvSchema = z.object({
  title: z.string().describe("Title of the CV, usually representing the profile (e.g., 'Full Stack CV')"),
  summary: z.string().optional().describe("Brief professional summary or profile statement"),

  skills: z.array(z.string()).optional().describe("List of skills and technologies (e.g., ['ReactJs', 'Python'])"),

  experiences: z.array(
    z.object({
      title: z.string().describe("Job title or role held"),
      company: z.string().describe("Name of the company or organization"),
      years: z.string().describe("Time period in the format 'start-end' (e.g., '2022-2024')")
    })
  ).optional().describe("List of professional experiences"),

  educations: z.array(
    z.object({
      degree: z.string().describe("Degree obtained (e.g., BSc Informatique)"),
      school: z.string().describe("Name of the educational institution"),
      year: z.string().describe("Year of graduation or completion")
    })
  ).optional().describe("List of education history"),

  certifications: z.array(
    z.object({
      name: z.string().describe("Certification name (e.g., AWS Certified)"),
      organization: z.string().describe("Issuing organization (e.g., Amazon)"),
      year: z.string().describe("Year the certification was obtained")
    })
  ).optional().describe("List of certifications"),

  projects: z.array(
    z.object({
      title: z.string().describe("Title of the project"),
      url: z.string().url().describe("URL or link to the project (e.g., GitHub, live demo)")
    })
  ).optional().describe("List of personal or professional projects"),

  languages: z.array(z.string()).optional().describe("Languages spoken or written (e.g., ['french', 'english'])"),

  hobbies: z.array(z.string()).optional().describe("List of personal interests or hobbies")
});


export async function POST(req: Request) {
  const { description, user } = await req.json()
  const prompt = generateCvPrompt({ description, user })
  const system = generateCvSystemPrompt()
  try {
    const result = await streamObject({
      model: gemini("gemini-1.5-flash"),
      output: 'array',
      schema: cvSchema,
      system: system,
      prompt: prompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error while generating the cv:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to generate cv" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}