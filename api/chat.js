export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
  }

  try {
    const { messages } = req.body || {};
    const userMessage =
      messages && messages.length > 0 ? messages[messages.length - 1].content : "";

    const systemPrompt = `
You are the official AI Assistant for Codeics (a digital agency and 3D web engineering studio founded by Liaqat Ali Khan).

Rules:
1. Scope: Only assist with Codeics services (3D interactive web experiences, React Three Fiber, GSAP animations, UI/UX systems), budgets starting from $1,000+, and project timelines.
2. Language: If the user asks in Roman Urdu or Urdu, reply strictly in warm, polite, and professional Roman Urdu. If they ask in English, reply in modern, crisp English.
3. Strict Guardrail: For any unrelated inquiries (homework, general questions, recipes, unrelated coding), politely decline: "Main sirf Codeics aur hamari web engineering services ke hawalay se madad kar sakta hoon."
4. Conversion: Encourage serious clients to submit a brief or email contact@codeics.me.
`;

    // Direct fetch call - zero external packages needed
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: userMessage }],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Google API returned error:", data);
      return res.status(500).json({ error: data.error?.message || "Google API request failed" });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Maazrat, jawab generate nahi ho saka.";

    return res.status(200).json({ text: reply });
  } catch (err) {
    console.error("Serverless handler crash:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}