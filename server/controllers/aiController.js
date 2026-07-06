const OpenAI = require("openai");

const openAiKey = process.env.OPENAI_API_KEY;

const getOpenAI = () => {
  if (!openAiKey) return null;
  return new OpenAI({ apiKey: openAiKey });
};

exports.chat = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required." });
  }

  const openai = getOpenAI();
  if (!openai) {
    return res.json({
      answer: "OpenAI is not configured on this server yet, but here is a quick studio tip: offer a bundled discount for weekday bookings and include a free mini-session to increase conversions.",
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are StudioPro's smart assistant. Provide helpful studio management advice, pricing tips, and image enhancement suggestions in a friendly, concise tone.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 250,
      temperature: 0.8,
    });

    const answer = response?.choices?.[0]?.message?.content?.trim();
    if (!answer) {
      return res.status(500).json({ error: "AI did not return an answer." });
    }

    res.json({ answer });
  } catch (error) {
    console.error("OpenAI request failed", error?.response?.data || error.message || error);
    const message = error?.response?.data?.error?.message || "AI service is unavailable.";
    res.status(500).json({ error: message });
  }
};
