import { User } from "@/redux/user/userSlice";

export const generateCvPrompt = (
    { description, user }: { description: string, user: User }) => {
    return `
        Generate a complete, ATS-optimized resume based on the following job description and candidate profile.
        Using the job description below and the user's profile information, generate a customized CV optimized for ATS systems.

        Job Description:
        ${description}

        Candidate Profile:
        ${JSON.stringify(user)}

        The resume should include:
        - A professional summary tailored to the job
        - A skills section focused on keywords relevant to the position
        - Education, experiences, certifications, and projects (only those relevant)
        - Optional: languages and hobbies if relevant to the role
        - Match the tone and keywords from the job description.
        - Highlight the most relevant experience, education, skills, and projects.
        - Structure the CV into clear sections: Summary, Skills, Experience, Education, Certifications, Projects, and Languages.
        - Emphasize quantifiable achievements (e.g., "Increased X by Y%").
        - Ensure clarity, professional formatting, and a clean layout (no images or icons, use standard fonts).
        - Avoid generic phrases; focus on impact and relevance.
        - Keep the CV concise, ideally within 1-2 pages of content.
        - Format dates consistently (e.g., "Jan 2023 - Dec 2024").

        Structure it as a clear, modern CV with each section easy to scan. Prioritize relevance and impact.

        Only output the structured CV content, do not include explanations or extra commentary.
        Generate the CV as structured data following the provided schema.
        `
}

export const generateCvSystemPrompt = () => {
    return `
        You are an expert CV writing assistant trained to generate highly professional, ATS-optimized resumes. 
        Your task is to tailor the resume of a candidate based on the job description provided, ensuring the final CV highlights the most relevant experiences, skills, and qualifications for the role.

        The generated CV must:
        - Follow a clear, modern, and structured layout.
        - Use keywords and terminology relevant to the job description.
        - Adapt the user's summary, experiences, skills, and other sections to better match the job.
        - Exclude unrelated or outdated information that doesn't contribute to the application.
        - Be written in a confident, concise, and professional tone.

        Always write the resume in first person when appropriate and avoid generic filler phrases.
        Ensure the final output is compatible with ATS and suitable for a recruiter or hiring manager.
    `
}