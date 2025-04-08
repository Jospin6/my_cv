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

export const generateCoverLetterPrompt = (
    { description, user }: { description: string, user: User }) => {
    return `
        Using the job description below and the user's profile, write a professional, personalized, and ATS-optimized cover letter for a job application.

        Job Description:
        ${description}

        User Information:
        ${user}

        Instructions:
        - Address the letter to the hiring manager if a name is mentioned, otherwise use "Dear Hiring Manager".
        - Start with a strong introduction showing enthusiasm and referencing the role.
        - Clearly link the user's background, experience, and skills to the key requirements of the job.
        - Emphasize achievements, motivations, and value the user brings to the role.
        - Use a professional but natural tone; avoid clichés and overly generic statements.
        - Keep the letter within 3 to 5 paragraphs and under 400 words.
        - End with a call to action (e.g., looking forward to the opportunity to discuss further).
        - Do NOT repeat the full CV. The letter should complement it, not copy it.
        - Use keywords from the job description to ensure ATS compatibility.
        - Ensure the letter is well-structured and easy to read.
    `
}

export const generateCoverLetterSystemPrompt = () => {
    return `
        You are an expert career coach and professional writer specialized in crafting personalized and 
        impactful cover letters. Your goal is to write a compelling, concise, and ATS-optimized cover letter 
        that aligns the candidate's background with the job description. The letter must feel tailored, 
        highlight motivation and relevant experiences, and make the candidate stand out to recruiters.

        The cover letter must:
        - Be written in a formal and engaging tone
        - Reflect the candidate's most relevant experiences and skills for the role
        - Be structured clearly: opening, motivation, key qualifications, and closing
        - Mirror key terms and language from the job description without sounding forced
        - Convey genuine enthusiasm and cultural fit for the company

        Always adapt the tone and focus to match the industry and role level. 
        Make it sound human and personalized, not generic or templated.
    `
}