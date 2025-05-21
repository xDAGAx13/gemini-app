import { GoogleGenAI } from "@google/genai";
const genAI = new GoogleGenAI({
  apiKey: "AIzaSyBvwseRVm1MhLfVkJ8LBxaiy9nH8BARI90",
});

export async function useGemini(prompt) {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: `
You are an AI assistant helping users interact with the contents of a resume uploaded as a PDF. The document contains structured information like education, skills, work experience, and projects.

Do the following:
- Present answers in a well-organized and readable format.
- Maintain paragraph breaks between sections for clarity.
- Do not use raw Markdown (e.g., avoid using ** or __ for bolding).
- Use section headers (e.g., Education:, Skills:) when appropriate.
- Use bullet points if listing multiple items.
- Don't make the output too large

If a user asks for the full content of the resume, summarize it section-wise in a human-readable, clean format without using any special formatting symbols.
`,
      },
    });
    return response.text;
  } catch (e) {
    console.error("Gemini AI error: ", e.message);
    return "Sorry, something went wrong.";
  }
}
