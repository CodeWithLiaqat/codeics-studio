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

    const systemPrompt = `You are the official AI Assistant for Codeics, an interactive 3D web development studio founded by Liaqat Ali Khan.
Guidelines:
1. Always reply politely in Roman Urdu if the user writes in Urdu/Roman Urdu, or English if they write in English.
2. Services: Custom 3D immersive websites (Three.js, React Three Fiber), WebGL animations, GSAP, and modern UI/UX design.
3. Pricing: Starting from $1,000+ depending on 3D complexity and scope.
4. Encourage serious clients to share their requirements or reach out at liaqatali53khan@gmail.com.
5. Politely decline any query unrelated to Codeics web agency services.`;

    const fullPrompt = `${systemPrompt}\n\nClient: ${userMessage}\nCodeics Assistant:`;

    // Production stable endpoint (v1)
    const targetUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: fullPrompt }],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Fallback: Agar v1 par query key reject ho toh v1beta fallback test karein
      console.error("Google API Response Error:", data);
      const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
      const fallbackRes = await fetch(fallbackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
        }),
      });

      const fallbackData = await fallbackRes.json();
      if (fallbackRes.ok && fallbackData.candidates?.[0]?.content?.parts?.[0]?.text) {
        return res.status(200).json({
          text: fallbackData.candidates[0].content.parts[0].text,
        });
      }

      return res.status(200).json({
        text: `Google API Error: ${data.error?.message || "Model not responding"}`,
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Salam! Main Codeics ka AI assistant hoon. Main aapki kis web project mein madad kar sakta hoon?";

    return res.status(200).json({ text: reply });
  } catch (err) {
    console.error("Handler Exception:", err);
    return res.status(500).json({ text: `Connection issue: ${err.message}` });
  }
}