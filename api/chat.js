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
Codeics specializes in award-winning, high-end 3D interactive web experiences, WebGL, React Three Fiber, GSAP animations, and dark luxury UI/UX systems. Custom project budgets start from $1,000+.

COMMUNICATION & LANGUAGE MIRRORING RULES:
1. Always mirror the user's exact language and script:
   - If user asks in Roman Urdu -> Reply in warm, natural, and professional Roman Urdu.
   - If user asks in Urdu Script (اردو رسم الخط / Arabic script) -> Reply in proper Urdu script (مثال: خوش آمدید! میں کوڈکس کی طرف سے آپ کی کیا مدد کر سکتا ہوں؟).
   - If user asks in English -> Reply in crisp, modern, executive-level English.
   - If mixed Roman Urdu + English -> Reply in conversational Roman Urdu with technical terms in English.

STRICT RULES FOR FORMS & PROJECT BRIEFS:
- NEVER instruct the user to email first to receive a form link.
- If the user asks where the form is ("Form kahan mile ga", "فارم کہاں ملے گا", "Where is the form?"), or wants a quote:
  1. Direct them immediately to the chat widget itself: tell them to click the "Start a project brief" button right here in this chat window.
  2. Or direct them to scroll down to the Contact / Brief form section on codeics.me.
  3. Mention liaqatali53khan@gmail.com strictly as an optional backup for custom inquiries or direct file sharing.

SCOPE & RESTRICTION:
- Answer only regarding Codeics services, 3D web experiences, pricing ($1,000+), and timelines.
- Politely decline unrelated queries in the user's matching script:
  * Roman Urdu: "Main sirf Codeics aur hamari 3D web engineering services ke hawalay se madad kar sakta hoon."
  * Urdu Script: "میں صرف کوڈکس اور ہماری 3D ویب انجینئرنگ سروسز کے حوالے سے رہنمائی کر سکتا ہوں۔"
  * English: "I can only assist with inquiries regarding Codeics and our 3D web engineering services."`;

    const fullPrompt = `${systemPrompt}\n\nUser Question: ${userMessage}\nAssistant Response:`;

    // 1. Google se active models fetch karein
    const listRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    const listData = await listRes.json();

    if (!listRes.ok) {
      console.error("ListModels Error:", listData);
      return res.status(200).json({
        text: `Key Error: ${listData.error?.message || "Invalid Google API key"}`,
      });
    }

    // 2. Usable generateContent model filter karein
    const usableModels = (listData.models || []).filter(
      (m) =>
        m.supportedGenerationMethods &&
        m.supportedGenerationMethods.includes("generateContent")
    );

    const chosenModel =
      usableModels.find((m) => m.name.includes("flash")) ||
      usableModels.find((m) => m.name.includes("gemini")) ||
      usableModels[0];

    if (!chosenModel) {
      return res.status(200).json({
        text: "Aapki API key par koi bhi generateContent model active nahi mila. Google AI Studio par key permissions check karein.",
      });
    }

    // 3. Auto-discovered model ke zariye response generate karein
    const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${chosenModel.name}:generateContent?key=${apiKey}`;

    const genRes = await fetch(generateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
      }),
    });

    const genData = await genRes.json();

    if (!genRes.ok) {
      return res.status(200).json({
        text: `Generation error (${chosenModel.name}): ${genData.error?.message}`,
      });
    }

    const reply =
      genData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Salam! Main Codeics ka AI assistant hoon. Main aapki kis web project mein madad kar sakta hoon?";

    return res.status(200).json({ text: reply });
  } catch (err) {
    console.error("Auto-discovery exception:", err);
    return res.status(500).json({ text: `Connection issue: ${err.message}` });
  }
}