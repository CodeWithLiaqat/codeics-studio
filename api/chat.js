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
4. Guide leads to fill the brief or contact liaqatali53khan@gmail.com.`;

    const fullPrompt = `${systemPrompt}\n\nUser Question: ${userMessage}\nAssistant Response:`;

    // 1. Google se khud poochho ke is key par kaunse models available hain
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

    // 2. Wo model pick karein jo content generate kar sakta ho
    const usableModels = (listData.models || []).filter(
      (m) =>
        m.supportedGenerationMethods &&
        m.supportedGenerationMethods.includes("generateContent")
    );

    // Flash model ko tarjeeh dein, warna jo bhi pehla generation model ho usay utha lein
    const chosenModel =
      usableModels.find((m) => m.name.includes("flash")) ||
      usableModels.find((m) => m.name.includes("gemini")) ||
      usableModels[0];

    if (!chosenModel) {
      return res.status(200).json({
        text: "Aapki API key par koi bhi generateContent model active nahi mila. Google AI Studio par key permissions check karein.",
      });
    }

    // 3. Exact active model name par call karein
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