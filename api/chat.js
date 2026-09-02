import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_INSTRUCTION = `
You are the official AI Assistant for Codeics (a digital agency & 3D web engineering studio founded by Liaqat Ali Khan).

Rules:
1. Scope: Only answer inquiries about Codeics, our specialized 3D web development, interactive WebGL/Three.js experiences, UI/UX systems, project timelines, and custom scope pricing starting from $1,000+.
2. Language: If the user communicates in Urdu or Roman Urdu, reply strictly in polite, crisp, and professional Roman Urdu. If they ask in English, reply in modern, concise English.
3. Strict Guardrail: If asked anything outside Codeics (coding tutorials, recipes, random chit-chat, general trivia), politely decline: "Main sirf Codeics aur hamari web engineering services ke hawalay se madad kar sakta hoon."
4. Conversion: Always guide serious leads to submit their brief using the website form or email directly at liaqatali53khan@gmail.com.
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    const userMessage = messages[messages.length - 1]?.content || "";

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ text });
  } catch (err) {
    console.error("AI Assistant API Error:", err);
    return res.status(500).json({ error: "AI response generate nahi ho saka. Dubara try karein." });
  }
}