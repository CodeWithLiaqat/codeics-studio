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

  const apiKey = (process.env.GEMINI_API_KEY || "").trim();
  if (!apiKey) {
    return res.status(200).json({
      text: "API Key configure nahi hai. Vercel environment variables check karein.",
    });
  }

  try {
    const { messages } = req.body || {};
    const userMessage =
      messages && messages.length > 0 ? messages[messages.length - 1].content : "";

    const systemPrompt = `You are the official AI Assistant for Codeics (a digital agency and 3D web engineering studio founded by Liaqat Ali Khan).
Rules:
1. Answer only about Codeics services (3D interactive web experiences, React Three Fiber, GSAP animations, UI/UX systems), custom budgets starting from $1,000+, and project timelines.
2. If asked in Roman Urdu or Urdu, reply warmly and professionally in Roman Urdu. If in English, reply in crisp English.
3. Decline unrelated queries politely: "Main sirf Codeics aur hamari web engineering services ke hawalay se madad kar sakta hoon."
4. Guide leads to fill the project brief or contact liaqatali53khan@gmail.com.`;

    const fullPrompt = `${systemPrompt}\n\nUser Question: ${userMessage}\nAssistant Response:`;

    // Updated model endpoint path: gemini-1.5-flash-latest
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: fullPrompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Google API Error:", data);
      const errDetail = data.error?.message || "Google API request rejected";
      return res.status(200).json({
        text: `Maazrat: ${errDetail}`,
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Salam! Main Codeics ka AI assistant hoon. Main aapki kis project mein madad kar sakta hoon?";

    return res.status(200).json({ text: reply });
  } catch (err) {
    console.error("Handler Exception:", err);
    return res.status(500).json({ text: `Connection error: ${err.message}` });
  }
}