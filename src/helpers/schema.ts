import { z } from "zod";

export const cvSchema = z.object({
    cvs: z.array(
        z.object({
            title: z.string().describe("Title of the CV, usually representing the profile (e.g., 'Full Stack CV')"),
            summary: z.string().optional().describe("Brief professional summary or profile statement"),

            skills: z.string().describe("Comma-separated list of skills (e.g., 'React, Node.js, Python')").optional(),

            experiences: z.string().describe("Comma-separated list of experiences in format 'Title at Company (Years)'").optional(),

            educations: z.string().describe("Comma-separated list of degrees in format 'Degree at School (Year)'").optional(),

            certifications: z.string().describe("Comma-separated list of certifications in format 'Name from Organization (Year)'").optional(),

            projects: z.string().describe("Comma-separated list of projects in format 'Title (URL)'").optional(),

            languages: z.string().describe("Comma-separated list of languages (e.g., 'English, French')").optional(),

            hobbies: z.string().describe("Comma-separated list of hobbies (e.g., 'Coding, Reading, Football')").optional()
        })
    )
});