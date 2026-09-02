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

    const systemPrompt = `You are the official AI Assistant for Codeics (a digital agency and 3D web engineering studio founded by Liaqat Ali Khan, website: codeics.me).
Codeics specializes in award-winning, high-end 3D interactive web experiences, WebGL, React Three Fiber, GSAP animations, and dark luxury UI/UX systems. Custom projects start from $1,000+.

LANGUAGE & SCRIPT MIRRORING RULES:
1. Detect and reply in the EXACT same language and script used by the user:
   - If user writes in Roman Urdu -> Reply in warm, natural, professional Roman Urdu.
   - If user writes in Urdu Script (اردو رسم الخط) -> Reply in proper Urdu script (e.g. خوش آمدید! کوڈکس میں آپ کا خیر مقدم ہے).
   - If user writes in English -> Reply in crisp, modern, executive-level English.
   - If user mixes English and Roman Urdu -> Reply in natural Roman Urdu with tech terms in English.

FORM & PROJECT BRIEF DIRECTIVES:
- NEVER tell the user to email first to receive a form link.
- When asked for a form, quote, or starting a project:
  1. Guide them to click the "Start a project brief" button directly inside this chat window.
  2. Or direct them to scroll to the Contact / Brief section on codeics.me.
  3. Mention liaqatali53khan@gmail.com strictly as an optional backup for direct inquiries or custom RFPs.

SCOPE RESTRICTION:
- Only discuss Codeics services, 3D web engineering, custom pricing ($1,000+), and project timelines.
- Decline unrelated questions politely in the matching language/script:
  * Roman Urdu: "Main sirf Codeics aur hamari 3D web engineering services ke hawalay se madad kar sakta hoon."
  * Urdu Script: "میں صرف کوڈکس اور ہماری 3D ویب انجینئرنگ سروسز کے حوالے سے آپ کی رہنمائی کر سکتا ہوں۔"
  * English: "I can only assist with inquiries regarding Codeics and our 3D web engineering services."`;

    const fullPrompt = `${systemPrompt}\n\nUser Question: ${userMessage}\nAssistant Response:`;

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